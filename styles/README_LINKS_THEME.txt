Downtime Links + Theme patch (UI-only, safe).

FILES CHANGED/ADDED
- lib/linkBuilders.ts          -> robust links (Directions, Yelp, TikTok, Website)
- components/PlaceCard.tsx     -> uses linkBuilders, clickable card without nested anchors
- styles/globals.css           -> refined palette with better contrast
- components/HeaderHero.tsx    -> accepts optional 'title' prop (defaults to "Make the most of your Downtime")

HOW TO APPLY
1) Copy these files into your project under 'Downtime V2/' (create 'lib/' if missing). Overwrite when prompted.
2) Ensure your components import path uses the alias '@/lib/linkBuilders'. If you don't have the '@' alias, change the import to: 
     import { buildAllLinks } from "../lib/linkBuilders";
   (relative path from components/ to lib/)
3) Restart the dev server: npm run dev

NOTES
- No API or filtering logic touched.
- Links now handle coords when present, and gracefully fallback to search-based URLs when data is sparse.
- To try a different headline, pass a prop: <HeaderHero title="Find something open right now" />
