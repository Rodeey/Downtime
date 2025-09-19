export type LatLng = { lat: number; lng: number };

export function haversineKm(a: LatLng, b: LatLng): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const s1 = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c1 = 2 * Math.atan2(Math.sqrt(s1), Math.sqrt(1 - s1));
  return R * c1;
}

export function estimatedMinutesFromKm(km: number): number {
  const minutes = (km / 18) * 60; // ~11 mph baseline
  return Math.max(1, Math.round(minutes));
}

export function googleDirectionsLink(
  from: LatLng | null,
  to: LatLng,
  mode: "walking" | "driving" = "driving"
): string {
  const dest = `${to.lat},${to.lng}`;
  const travelmode = `&travelmode=${mode}`;

  if (from) {
    const src = `${from.lat},${from.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      src
    )}&destination=${encodeURIComponent(dest)}${travelmode}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    dest
  )}${travelmode}`;
}


// Persist with ts + accuracy for analytics
export function saveUserLocation(loc: { lat:number; lng:number; accuracy?:number; ts?:number }) {
  const payload = { lat: loc.lat, lng: loc.lng, accuracy: loc.accuracy ?? null, ts: loc.ts ?? Date.now() };
  try { localStorage.setItem("dt_user_loc", JSON.stringify(payload)); } catch {}
  return payload;
}


export function loadStoredUserLocation(): LatLng | null {
  try {
    const raw = localStorage.getItem("dt_user_loc");
    if (!raw) return null;
    const j = JSON.parse(raw);
    if (j && typeof j.lat === "number" && typeof j.lng === "number") {
      return { lat: j.lat, lng: j.lng };
    }
  } catch {}
  return null;
}
