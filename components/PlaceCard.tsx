import { estimatedMinutesFromKm, googleDirectionsLink } from "@/lib/geo";
import {
  DirectionsIcon,
  GoogleIcon,
  YelpIcon,
  TikTokIcon,
  GlobeIcon,
  PhoneIcon,
  WalkIcon,
  CarIcon,
} from "./Icons";
import { CATEGORY_META, getPrimaryCategory } from "./categoryMeta";
import { initPosthog, posthog } from "@/lib/analytics";


type Place = {
  place_id: string;
  name: any;
  vicinity?: any;
  rating?: number;
  user_ratings_total?: number;
  coords: { lat: number; lng: number };
  distanceKm?: number;
  website?: string | null;
  url?: string | null;
  formatted_phone_number?: string | null;
  international_phone_number?: string | null;
  types?: string[] | any;
  opening_hours?: {
    open_now?: boolean;
  };
};

type Props = {
  place: Place;
  userLoc: { lat: number; lng: number } | null;
  travel?: { walkingMinutes: number | null; drivingMinutes: number | null } | null;
};

function googlePlaceLink(place: Place) {
  if (place.url) return place.url;
  if (place.place_id)
    return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(
      place.place_id
    )}`;
  return `https://www.google.com/search?q=${encodeURIComponent(
    String(place.name)
  )}`;
}

function makeYelpLink(name: string, vicinity?: string) {
  const city =
    typeof vicinity === "string"
      ? vicinity.split(",").pop()?.trim() || ""
      : "";
  const q = `${String(name)} ${city}`.trim();
  return `https://www.yelp.com/search?find_desc=${encodeURIComponent(q)}`;
}

function makeTikTokSearch(name: string, vicinity?: string) {
  const city =
    typeof vicinity === "string"
      ? vicinity.split(",").pop()?.trim() || ""
      : "";
  return `https://www.tiktok.com/search?q=${encodeURIComponent(
    String(name) + " " + city
  )}`;
}

export default function PlaceCard({ place, userLoc, travel }: Props) {
  // minutes + mode selection
  let mins: number | null = null;
  let mode: "walking" | "driving" = "driving";
  if (travel && (travel.walkingMinutes != null || travel.drivingMinutes != null)) {
    if (travel.walkingMinutes != null && travel.walkingMinutes <= 15) {
      mins = travel.walkingMinutes;
      mode = "walking";
    } else if (travel.drivingMinutes != null) {
      mins = travel.drivingMinutes;
      mode = "driving";
    }
  } else {
    mins =
      typeof place.distanceKm === "number"
        ? estimatedMinutesFromKm(place.distanceKm)
        : null;
  }

  const coords = place.coords;
  const dirHref = googleDirectionsLink(coords, userLoc || undefined, mode);

  const googleHref = googlePlaceLink(place);
  const websiteHref = place.website || null;
  const phone =
    place.formatted_phone_number || place.international_phone_number || null;

  const yelpHref = makeYelpLink(place.name, place.vicinity);
  const tiktokHref = makeTikTokSearch(place.name, place.vicinity);

  const safeTypes: string[] = Array.isArray(place.types)
    ? place.types
    : typeof place.types === "string"
    ? [place.types]
    : [];

  const primaryCat = getPrimaryCategory(safeTypes);
  const meta = CATEGORY_META[primaryCat] || CATEGORY_META["All"];
  const isOpenNow = (place as any).opening_hours?.open_now ?? true;

  const OpenDot = () => (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ backgroundColor: isOpenNow ? "#22c55e" : "#ef4444" }}
    />
  );

  return (
    <article className="card p-4 flex gap-3 items-start min-h-[96px] w-full overflow-hidden">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {place.opening_hours?.open_now ? (
            <span className="open-now-badge">Open now</span>
          ) : null}{" "}
          <OpenDot />
          <h3 className="font-semibold text-white truncate">
            {typeof place.name === "string" ? place.name : ""}
          </h3>
        </div>
        <p className="text-sm text-neutral-300 truncate">
          {typeof place.vicinity === "string" ? place.vicinity : ""}
        </p>
        <div className="mt-1 text-sm flex items-center gap-2">
          {typeof place.rating === "number" && (
            <span className="font-semibold text-yellow-400 flex items-center">
              ★ {place.rating.toFixed(1)}
            </span>
          )}
          {place.user_ratings_total && (
            <span className="text-neutral-300 text-xs">
              ({place.user_ratings_total})
            </span>
          )}
        </div>

        <div className="linkbar mt-2">
          <a
            className="iconlink"
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Google Maps"
            onClick={() =>
              posthog.capture("Clicked Google Link", {
                place_id: place.place_id,
                place_name: place.name,
              })
            }
          >
            <GoogleIcon />
          </a>
          {websiteHref && (
            <a
              className="iconlink"
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Website"
              onClick={() =>
                posthog.capture("Clicked Website Link", {
                  place_id: place.place_id,
                  place_name: place.name,
                })
              }
            >
              <GlobeIcon />
            </a>
          )}
          <a
            className="iconlink"
            href={yelpHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Yelp"
            onClick={() =>
              posthog.capture("Clicked Yelp Link", {
                place_id: place.place_id,
                place_name: place.name,
              })
            }
          >
            <YelpIcon />
          </a>
          <a
            className="iconlink"
            href={tiktokHref}
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            onClick={() =>
              posthog.capture("Clicked TikTok Link", {
                place_id: place.place_id,
                place_name: place.name,
              })
            }
          >
            <TikTokIcon />
          </a>
          {phone && (
            <a
              className="iconlink"
              href={`tel:${phone.replace(/\s/g, "")}`}
              title="Call"
              onClick={() =>
                posthog.capture("Clicked Phone", {
                  place_id: place.place_id,
                  place_name: place.name,
                  phone,
                })
              }
            >
              <PhoneIcon />
            </a>
          )}
        </div>
      </div>
      <a
        href={dirHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          posthog.capture("Clicked Directions", {
            place_id: place.place_id,
            place_name: place.name,
            mode,
            minutes: mins,
          })
        }
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium ring-1 ring-emerald-500/60 active:scale-95 shrink-0 max-w-[40%] truncate"
      >
        {mode === "walking" ? <WalkIcon /> : <CarIcon />}
        <span>
          {mins !== null
            ? mode === "walking"
              ? `Walk • ${mins} min`
              : `Drive • ${mins} min`
            : mode === "walking"
            ? "Walk"
            : "Drive"}
        </span>
      </a>
    </article>
  );
}
