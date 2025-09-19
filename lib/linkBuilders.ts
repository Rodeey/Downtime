// lib/linkBuilders.ts
// Robust link builders that prefer verified fields and gracefully fallback.
export type BasicPlace = {
  name: string;
  city?: string;
  vicinity?: string;
  website?: string | null;
  coords?: { lat: number; lng: number } | null;
};

const norm = (s?: string | null) => (s || "").trim();
const enc = (s: string) => encodeURIComponent(s);

// Take first 2 tokens of a name for cleaner searches
function firstTwoWords(name: string) {
  return norm(name).split(/\s+/).slice(0, 2).join(" ");
}

function extractCity(vicinity?: string) {
  if (!vicinity) return "";
  // common formats: "123 Main St, Detroit", "Detroit", "Detroit, MI"
  const parts = vicinity.split(",").map(s=>s.trim()).filter(Boolean);
  if (parts.length === 0) return "";
  // Prefer the first non-street token if street number present
  if (/^\d+\s+/.test(parts[0]) && parts[1]) return parts[1];
  return parts[0];
}

export function buildMapsSearch(name: string, vicinity?: string) {
  const q = enc(`${norm(name)} ${norm(vicinity)}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function buildDirections(p: BasicPlace) {
  if (p.coords) {
    return `https://www.google.com/maps/dir/?api=1&destination=${p.coords.lat},${p.coords.lng}`;
  }
  return buildMapsSearch(p.name, p.vicinity || p.city);
}

export function buildYelp(p: BasicPlace) {
  const base = "https://www.yelp.com/search?find_desc=";
  const city = norm(p.city) || extractCity(p.vicinity) || "";
  const cleanName = firstTwoWords(p.name);
  const q = enc(`${cleanName} ${city}`.trim());
  const loc = enc(city);
  // If we have a city, set find_loc to city; otherwise just do a broader search
  return city ? `${base}${q}&find_loc=${loc}` : `${base}${q}`;
}

export function buildTikTok(p: BasicPlace) {
  const city = norm(p.city) || extractCity(p.vicinity) || "";
  const cleanName = firstTwoWords(p.name);
  const q = enc(`${cleanName} ${city}`.trim());
  return `https://www.tiktok.com/search?q=${q}`;
}

export function buildWebsite(p: BasicPlace) {
  if (p.website) return p.website;
  // Fallback: search for official site
  const q = `${norm(p.name)} ${norm(p.city) || norm(p.vicinity)} official site`.trim();
  return `https://duckduckgo.com/?q=${enc(q)}`;
}

export function buildAllLinks(p: BasicPlace) {
  return {
    mapsSearch: buildMapsSearch(p.name, p.vicinity || p.city),
    directions: buildDirections(p),
    yelp: buildYelp(p),
    tiktok: buildTikTok(p),
    website: buildWebsite(p),
  };
}