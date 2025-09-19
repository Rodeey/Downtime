import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${key}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (data.status !== "OK" || !data.results?.length) {
      return res.status(404).json({ error: data.status || "No results" });
    }

    const loc = data.results[0].geometry.location;

    // ✅ Return in the format your modal expects
    return res.status(200).json({
      location: { lat: loc.lat, lng: loc.lng },
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: e.message || "Geocode error" });
  }
}
