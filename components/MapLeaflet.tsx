'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icons in Next/Leaflet
// @ts-ignore
import iconUrl from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import icon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl: icon2xUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Coords = { lat: number; lng: number };
type Place = any;
type Props = { userCoords: Coords | null; places: Place[] };

export default function MapLeaflet({ userCoords, places }: Props) {
  const first = places.find((p) => p?.coords?.lat && p?.coords?.lng);
  const center: Coords = userCoords || first?.coords || { lat: 42.3314, lng: -83.0458 };

  return (
    <div className="card overflow-hidden" style={{ height: 420 }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places
          .filter((p) => p?.coords?.lat && p?.coords?.lng)
          .map((p) => (
            <Marker key={p.id || p.name} position={[p.coords.lat, p.coords.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{p.name}</div>
                  {p.vicinity && <div className="opacity-80">{p.vicinity}</div>}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
