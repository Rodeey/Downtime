// pages/api/places.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GatewayPlace,
  fetchPlacesFromGateway,
} from "@/lib/api/gateway";

type NearbyResult = {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry?: { location: { lat: number; lng: number } };
  opening_hours?: { open_now?: boolean };
  rating?: number | null;
  user_ratings_total?: number;
  types?: string[];
  distanceKm?: number;
  formatted_phone_number?: string | null;
  website?: string | null;
  url?: string;
};

type Resp = NearbyResult[];

function transformPlace(place: GatewayPlace): NearbyResult {
  const geometry = {
    location: { lat: place.lat, lng: place.lng },
  };

  return {
    place_id: place.place_id,
    name: place.name,
    vicinity: place.address,
    geometry,
    opening_hours: { open_now: place.open_now },
    rating: place.rating ?? null,
    types: place.categories,
    distanceKm: place.distance_m ? place.distance_m / 1000 : undefined,
    formatted_phone_number: place.phone,
    website: place.website ?? undefined,
    url: `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(
      place.place_id
    )}`,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radius = Number(req.query.radius ?? req.query.radius_m ?? 1000);
    const categories = (req.query.categories as string | undefined) ?? undefined;

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ error: "lat & lng required" });
    }

    const data = await fetchPlacesFromGateway({
      lat,
      lng,
      radius_m: Number.isFinite(radius) ? radius : 1000,
      categories,
    });

    const transformed: Resp = Array.isArray(data.places)
      ? data.places.map(transformPlace)
      : [];

    return res.status(200).json(transformed);
  } catch (error: any) {
    console.error("[Places API] Gateway proxy error", error?.message || error);
    return res.status(500).json({ error: "Failed to fetch places" });
  }
}

/*
Previous Google Places implementation retained for reference during rollout.

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

type NearbySearchResponse = {
  results: NearbyResult[];
  next_page_token?: string;
  status?: string;
  html_attributions?: any[];
};

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
}): Promise<NearbySearchResponse> {
  const base = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  const params = base.searchParams;
  params.set("key", apiKey);
  params.set("location", `${lat},${lng}`);
  params.set("radius", String(radius));
  if (type) params.set("type", type);
  if (opennow) params.set("opennow", "true");
  if (pagetoken) params.set("pagetoken", pagetoken);

  const res = await fetch(base.toString());
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);
  return (await res.json()) as NearbySearchResponse;
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

    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Google API key missing" });

    const types = String(typesParam).split(",").map((s) => s.trim()).filter(Boolean);
    const center = { lat, lng };

    const pageForType = async (t?: string): Promise<NearbySearchResponse> => {
      const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
      url.searchParams.set("location", `${center.lat},${center.lng}`);
      url.searchParams.set("radius", String(radius));
      if (openNow) url.searchParams.set("opennow", "true");
      if (t) url.searchParams.set("type", t);
      url.searchParams.set("key", apiKey);

      const r = await fetch(url.toString());
      if (!r.ok) throw new Error(`Google Places HTTP ${r.status}`);
      return (await r.json()) as NearbySearchResponse;
    };

    const collected: NearbyResult[] = [];
    const seen = new Set<string>();

    if (strategy === "deep") {
      for (const t of types.length ? types : [undefined]) {
        let token: string | undefined = undefined;
        let page = 0;
        do {
          if (page > 0) await sleep(2100);
          const { results, next_page_token } = await fetchNearbyPage({
            apiKey,
            lat: center.lat,
            lng: center.lng,
            radius,
            type: t,
            opennow: openNow,
            pagetoken: token,
          });
          page++;
          for (const r of results) {
            if (seen.has(r.place_id)) continue;
            seen.add(r.place_id);
            collected.push(r);
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

    const chunks = async function* (
      arr: (string | undefined)[],
      n: number
    ): AsyncGenerator<(string | undefined)[]> {
      for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
      }
    };

    for await (const group of chunks(typeList, MAX_CONCURRENCY)) {
      const batch = await Promise.allSettled(group.map((t) => pageForType(t)));
      for (const item of batch) {
        if (item.status !== "fulfilled") continue;
        for (const r of item.value.results) {
          if (seen.has(r.place_id)) continue;
          seen.add(r.place_id);
          collected.push(r);
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
*/
