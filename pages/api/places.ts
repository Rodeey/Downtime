// pages/api/places.ts
import type { NextApiRequest, NextApiResponse } from "next";

type NearbyResult = {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry?: { location: { lat: number; lng: number } };
  opening_hours?: { open_now?: boolean };
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
};

type Resp = NearbyResult[];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Fetch a single Nearby Search page (20 results max)
async function fetchNearbyPage({
  apiKey,
  lat,
  lng,
  radius,
  type,
  opennow,
  pagetoken,
}: {
  apiKey: string;
  lat: number;
  lng: number;
  radius: number;
  type?: string;
  opennow?: boolean;
  pagetoken?: string;
}): Promise<{ results: NearbyResult[]; next_page_token?: string }> {
  const base = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  const params = base.searchParams;
  params.set("key", apiKey);
  params.set("location", `${lat},${lng}`);
  params.set("radius", String(radius));
  if (type) params.set("type", type);
  if (opennow) params.set("opennow", "true");
  if (pagetoken) params.set("pagetoken", pagetoken);
  const res = await fetch(base.toString());
  if (!res.ok) {
    throw new Error(`Google Places HTTP ${res.status}`);
  }
  const data = await res.json();
  return { results: data.results ?? [], next_page_token: data.next_page_token };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const typesParam = (req.query.type ?? req.query.types ?? "restaurant") as string;
    const openNow = String(req.query.openNow ?? req.query.opennow ?? "") === "true";
    const radius = Number(req.query.radius ?? 5000);
    const limit = Math.min(Number(req.query.limit ?? 200), 200);
    const strategy = (req.query.strategy as string) || "wide"; // "wide" | "deep"

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ error: "lat & lng required" });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Google API key missing" });

    const types = String(typesParam).split(",").map(s=>s.trim()).filter(Boolean);
    const center = { lat, lng };

    async function pageForType(t?: string) {
      const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
      url.searchParams.set("location", `${center.lat},${center.lng}`);
      url.searchParams.set("radius", String(radius));
      if (openNow) url.searchParams.set("opennow", "true");
      if (t) url.searchParams.set("type", t);
      else url.searchParams.set("rankby", "prominence");
      url.searchParams.set("key", apiKey);
      const r = await fetch(url.toString());
      if (!r.ok) throw new Error(`Google Places HTTP ${r.status}`);
      return (await r.json()) as { results: NearbyResult[]; next_page_token?: string };
    }

    const collected: NearbyResult[] = [];
    const seen = new Set<string>();

    if (strategy === "deep") {
      // Old behavior: walk pages per type (can be slow)
      for (const t of types.length ? types : [undefined]) {
        let token: string | undefined = undefined;
        let page = 0;
        do {
          if (page > 0) await sleep(2100);
          const { results, next_page_token } = await fetchNearbyPage({
            apiKey, location: `${center.lat},${center.lng}`, radius, type: t, openNow, pagetoken: token,
          });
          page++;
          for (const r of results) {
            if (seen.has(r.place_id)) continue;
            seen.add(r.place_id); collected.push(r);
            if (collected.length >= limit) break;
          }
          token = next_page_token;
        } while (collected.length < limit && token);
        if (collected.length >= limit) break;
      }
      return res.status(200).json(collected as Resp);
    }

    // "wide": first page across all types in parallel with small concurrency
    const typeList = types.length ? types : [undefined];
    const MAX_CONCURRENCY = 5;
    async function* chunks(arr: (string|undefined)[], n: number) {
      for (let i=0;i<arr.length;i+=n) yield arr.slice(i,i+n);
    }
    for await (const group of chunks(typeList, MAX_CONCURRENCY)) {
      const batch = await Promise.allSettled(group.map(t => pageForType(t)));
      for (const item of batch) {
        if (item.status !== "fulfilled") continue;
        for (const r of item.value.results) {
          if (seen.has(r.place_id)) continue;
          seen.add(r.place_id); collected.push(r);
          if (collected.length >= limit) break;
        }
        if (collected.length >= limit) break;
      }
      if (collected.length >= limit) break;
    }

    return res.status(200).json(collected.slice(0, limit) as Resp);
  } catch (err: any) {
    console.error("Unexpected /api/places error", err?.message || err);
    return res.status(500).json({ error: err?.message || "Internal error" });
  }
}
