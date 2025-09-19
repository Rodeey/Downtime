Downtime design upgrade (UI-only). No API/logic touched.

WHAT'S IN THIS PATCH
- styles/globals.css      -> gradient backdrop, carousel helpers, tokens
- components/HeaderHero.tsx (NEW) -> 'Make the most of your Downtime' sticky hero
- components/CategoryFilter.tsx   -> horizontally scrolling chips (Airbnb-style)
- components/DistanceFilter.tsx   -> horizontally scrolling chips
- components/PlaceCard.tsx        -> richer card visual / same props

HOW TO APPLY
1) Copy these files into your project under 'Downtime V2/' and overwrite when prompted.
2) Ensure pages/_app.tsx imports the stylesheet (already in your project):
   import '../styles/globals.css'
3) Restart dev server: npm run dev

HOW TO USE THE NEW HEADER
In pages/index.tsx, near the top of your return, replace your current <h1> header with:
    import HeaderHero from '@/components/HeaderHero';
    ...
    <HeaderHero />
This only changes the heading text to 'Make the most of your Downtime' and adds a sticky glass effect.

OPTIONAL TWEAKS (no logic changes)
- Make the filters sticky under the header:
  Wrap your two filters with:
    <div className='sticky top-14 z-20 glass-top'>
      ...CategoryFilter...
      ...DistanceFilter...
    </div>

If anything looks off, it's just CSS. Your fetching/filtering/dedupe logic stays exactly the same.
