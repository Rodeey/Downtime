import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CATEGORY_META, getPrimaryCategory } from "./categoryMeta";
import { googleDirectionsLink } from "@/lib/geo";
import { CarIcon, WalkIcon } from "./Icons";
import { estimatedMinutesFromKm } from "@/lib/geo";
import {
  GoogleIcon,
  YelpIcon,
  TikTokIcon,
  GlobeIcon,
} from "./Icons";




type LatLng = { lat: number; lng: number };
type Place = {
  place_id: string;
  name: string;
  coords: LatLng;
  vicinity?: string;
  rating?: number;
  user_ratings_total?: number;  
  distanceKm?: number;
  website?: string;             
  types?: string[];
};


import { CATEGORY_LABELS } from "./categoryLabels";

function markerIcon(category: string) {
  const meta = CATEGORY_META[category] || CATEGORY_META["All"];
  const emoji = CATEGORY_LABELS[category]?.split(" ")[0] || "📍"; // first char is the emoji
  const html = `
    <div style="position:relative; display:flex; align-items:center; justify-content:center;">
      <div style="
        width:32px;
        height:32px;
        border-radius:50%;
        background:white;
        border:3px solid ${meta.color};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
      ">
        ${emoji}
      </div>
      <div style="
        position:absolute;
        left:50%;
        top:30px;
        transform:translateX(-50%);
        width:0;
        height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:8px solid ${meta.color};
      "></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });
}


type Props = {
  center: LatLng;
  places: Place[];
};

export default function MapView({ center, places }: Props) {
  return (
    <div className="w-full h-full">
      {center && (
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  subdomains={['a','b','c','d']}
/>

          {/* You are here glowing dot */}
          <Marker
            position={[center.lat, center.lng]}
            icon={L.divIcon({
              html: `
  <div style="
    width:20px;
    height:20px;
    border-radius:50%;
    background:#2563eb;
    border:2px solid white;
    box-shadow:0 0 15px rgba(37,99,235,0.8);
    animation:pulse 2s infinite;
  "></div>
  <style>
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.6); opacity: 0.6; }
      100% { transform: scale(1); opacity: 1; }
    }
  </style>
`,

              className: "",
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })}
          >
            <Popup>You are here</Popup>
          </Marker>

          {/* Place pins with emoji + category color */}
          {places.map((p) => {
            const cat = getPrimaryCategory(p.types as any);
            const dirHref = googleDirectionsLink(p.coords, center, "driving");
            return (
              <Marker
                key={p.place_id}
                position={[p.coords.lat, p.coords.lng]}
                icon={markerIcon(cat)}
              >
                <Popup>
  <div className="text-sm min-w-[180px] max-w-[220px]">
    {/* Name */}
    <div className="font-bold text-base text-neutral-900 mb-1">
      {p.name}
    </div>

    {/* Ratings */}
    {typeof p.rating === "number" && (
      <div className="flex items-center text-yellow-500 text-sm mb-1">
        ★ {p.rating.toFixed(1)}
        {p.user_ratings_total && (
          <span className="ml-1 text-neutral-400 text-xs">
            ({p.user_ratings_total})
          </span>
        )}
      </div>
    )}

    {/* Address */}
    {p.vicinity && (
      <div className="text-xs text-neutral-500 mb-2">
        {p.vicinity}
      </div>
    )}

    {/* Links row */}
    <div className="flex flex-wrap gap-2 mb-2">
  {/* Google Maps */}
  <a
    href={`https://www.google.com/maps/place/?q=place_id:${p.place_id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-8 h-8 rounded-md 
             bg-white hover:bg-neutral-100 
             border border-neutral-300 
             no-underline"
    title="Google Maps"
  >
    <GoogleIcon />
  </a>

  {/* Website (if available) */}
  {p.website && (
    <a
      href={p.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-md 
             bg-white hover:bg-neutral-100 
             border border-neutral-300 
             no-underline"
      title="Website"
    >
      <GlobeIcon />
    </a>
  )}

  {/* Yelp */}
  <a
    href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(
      p.name + " " + (p.vicinity || "")
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-8 h-8 rounded-md 
             bg-white hover:bg-neutral-100 
             border border-neutral-300 
             no-underline"
    title="Yelp"
  >
    <YelpIcon />
  </a>

  {/* TikTok */}
  <a
    href={`https://www.tiktok.com/search?q=${encodeURIComponent(
      p.name + " " + (p.vicinity || "")
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-8 h-8 rounded-md 
             bg-white hover:bg-neutral-100 
             border border-neutral-300 
             no-underline"
    title="TikTok"
  >
    <TikTokIcon />
  </a>
</div>


    {/* Directions button with distance */}
    {(() => {
      let mins: number | null = null;
      let mode: "walking" | "driving" = "driving";
      if (typeof p.distanceKm === "number") {
        mins = estimatedMinutesFromKm(p.distanceKm);
        if (mins <= 15) mode = "walking";
      }
      return (
        <a
  href={dirHref}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl 
             bg-white hover:bg-neutral-100 
             text-blue-600 font-semibold 
             shadow-sm ring-1 ring-blue-400 active:scale-95"
>
  {mode === "walking" ? (
    <WalkIcon className="w-4 h-4" />
  ) : (
    <CarIcon className="w-4 h-4" />
  )}
  <span>
    {mins !== null
      ? mode === "walking"
        ? `Walk • ${mins} min`
        : `Drive • ${mins} min`
      : "Directions"}
  </span>
</a>

      );
    })()}
  </div>
</Popup>





              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}