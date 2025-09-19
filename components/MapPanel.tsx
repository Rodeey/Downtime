import dynamic from "next/dynamic";
const MapLeaflet = dynamic(() => import("./MapLeaflet"), { ssr: false });

type Coords = { lat: number; lng: number };
type Place = any;

type Props = {
  userCoords: Coords | null;
  places: Place[];
};

export default function MapPanel({ userCoords, places }: Props) {
  return <MapLeaflet userCoords={userCoords} places={places} />;
}
