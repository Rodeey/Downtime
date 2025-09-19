Downtime Final UI Patch (links + theme + header + MAP).

WHAT'S INCLUDED
- lib/linkBuilders.ts       -> prefers verified `place.website`; robust fallbacks.
- components/PlaceCard.tsx  -> uses linkBuilders; higher contrast; clickable card.
- styles/globals.css        -> 'Vibrant Dusk' palette; consistent chips/pills.
- components/HeaderHero.tsx -> Defaults to "Make the most of your Downtime".
- components/MapPanel.tsx   -> dynamic wrapper for Leaflet (no SSR issues).
- components/MapLeaflet.tsx -> OSM map with markers from `place.coords`.
- pages/_app.tsx            -> adds Leaflet CSS import.

INSTALL
1) Copy these files into your project under 'Downtime V2/' and overwrite when prompted.
2) Install map deps:
     npm i react-leaflet leaflet
3) Ensure you're rendering the map toggle in your page and pass props:
     import MapPanel from "@/components/MapPanel";
     ...
     {showList === "map" ? (
       <MapPanel userCoords={userCoords} places={filtered} />
     ) : (
       /* your list */
     )}

NOTES
- No API or data logic changed.
- If your project doesn't support the '@' alias, update imports to use relative paths.
