const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL ||
  "https://downtime-places-main-f4012b8.d2.zuplo.dev";

if (!GATEWAY_URL) {
  throw new Error("NEXT_PUBLIC_GATEWAY_URL is not set");
}

export type GatewayPlace = {
  place_id: string;
  provider: "cache" | "fsq" | "yelp" | string;
  name: string;
  categories: string[];
  primary_category: string;
  category_label: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  website: string | null;
  phone: string | null;
  distance_m: number;
  open_now: boolean;
  closing_soon: boolean;
  todayClosingTime: string | null;
  travel?: {
    walk_min: number | null;
    drive_min: number | null;
  };
  rating?: number | null;
};

export type PlacesResponse = {
  source: string;
  places: GatewayPlace[];
  categories_available: { name: string; count: number }[];
  duration_ms: number;
};

export async function fetchPlacesFromGateway({
  lat,
  lng,
  radius_m = 1000,
  categories,
}: {
  lat: number;
  lng: number;
  radius_m?: number;
  categories?: string;
}): Promise<PlacesResponse> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius_m: radius_m.toString(),
  });

  if (categories) {
    params.set("categories", categories);
  }

  const url = `${GATEWAY_URL.replace(/\/$/, "")}/places?${params.toString()}`;
  console.log("[Gateway] Fetching places:", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`);
  }

  const data = (await response.json()) as PlacesResponse;
  console.log(
    "[Gateway] Received:",
    Array.isArray(data.places) ? data.places.length : 0,
    "places from",
    data.source
  );
  return data;
}

export type GeocodeResponse = {
  location: { lat: number; lng: number };
};

export async function geocodeFromGateway(query: string): Promise<GeocodeResponse> {
  const url = `${GATEWAY_URL.replace(/\/$/, "")}/geocode?query=${encodeURIComponent(
    query
  )}`;
  console.log("[Gateway] Geocoding:", query);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocode error: ${response.status}`);
  }

  return (await response.json()) as GeocodeResponse;
}

export type TravelTimesResponse = {
  results: Array<{
    id: string;
    drivingMinutes: number | null;
    walkingMinutes: number | null;
  }>;
};

export async function getTravelTimesFromGateway(
  origin: { lat: number; lng: number },
  destinations: Array<{ id?: string; lat: number; lng: number }>
): Promise<TravelTimesResponse> {
  const url = `${GATEWAY_URL.replace(/\/$/, "")}/travel-times`;
  console.log("[Gateway] Fetching travel times for", destinations.length, "destinations");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin,
      destinations: destinations.map((dest, index) => ({
        id: dest.id ?? String(index),
        lat: dest.lat,
        lng: dest.lng,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Travel times error: ${response.status}`);
  }

  return (await response.json()) as TravelTimesResponse;
}
