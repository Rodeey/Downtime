// pages/api/travel-times.ts
import type { NextApiRequest, NextApiResponse } from "next";

type LatLng = { lat: number; lng: number };
type Dest = { id: string; lat: number; lng: number };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Google API key missing" });

  try {
    const { origin, destinations } = req.body as { origin: LatLng; destinations: Dest[] };
    if (!origin || !destinations?.length) {
      return res.status(400).json({ error: "origin and destinations[] required" });
    }

    const CHUNK = 25;
    const destChunks: Dest[][] = [];
    for (let i = 0; i < destinations.length; i += CHUNK) {
      destChunks.push(destinations.slice(i, i + CHUNK));
    }

    const matrix = async (
      mode: "driving" | "walking",
      dests: Dest[]
    ): Promise<number[]> => {
      const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
      url.searchParams.set("origins", `${origin.lat},${origin.lng}`);
      url.searchParams.set(
        "destinations",
        dests.map((d) => `${d.lat},${d.lng}`).join("|")
      );
      url.searchParams.set("mode", mode);
      url.searchParams.set("key", apiKey);

      const r = await fetch(url.toString());
      const data = await r.json();
      if (data.status !== "OK")
        throw new Error(
          `DistanceMatrix API non-OK ${mode.toUpperCase()} ${data.status}`
        );
      const row = data.rows?.[0]?.elements ?? [];
      return row.map((e: any) => (e.status === "OK" ? e.duration.value : null));
    };

    const allDriving: number[] = [];
    const allWalking: number[] = [];
    for (const chunk of destChunks) {
      const [d, w] = await Promise.all([
        matrix("driving", chunk),
        matrix("walking", chunk),
      ]);
      allDriving.push(...d);
      allWalking.push(...w);
    }

    const results = destinations.map((d, i) => ({
      id: d.id,
      drivingMinutes: allDriving[i] != null ? Math.round(allDriving[i] / 60) : null,
      walkingMinutes: allWalking[i] != null ? Math.round(allWalking[i] / 60) : null,
    }));

    return res.status(200).json({ results });
  } catch (e: any) {
    console.error("travel-times error", e?.message || e);
    return res
      .status(500)
      .json({ error: e?.message || "Failed to fetch travel times" });
  }
}
