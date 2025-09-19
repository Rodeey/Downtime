// lib/getTravelTimes.ts
export type LatLng = { lat:number; lng:number };
export type TravelRecord = Record<string, { walkingMinutes: number | null; drivingMinutes: number | null }>;

export async function fetchTravelTimes(origin: LatLng, destinations: { id:string; lat:number; lng:number }[]): Promise<TravelRecord> {
  if (!origin || destinations.length === 0) return {};
  const r = await fetch("/api/travel-times", {
    method: "POST",
    headers: { "content-type":"application/json" },
    body: JSON.stringify({ origin, destinations })
  });
  const j = await r.json();
  const out: TravelRecord = {};
  (j.results || []).forEach((row: any) => {
    out[row.id] = { walkingMinutes: row.walkingMinutes ?? null, drivingMinutes: row.drivingMinutes ?? null };
  });
  return out;
}
