"use client";
import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import PlaceCard from "@/components/PlaceCard";
import FABToggle from "@/components/FABToggle";
import { haversineKm, LatLng, saveUserLocation, loadStoredUserLocation } from "@/lib/geo";
import SortToggle, { SortKey } from "@/components/SortToggle";
import LocationPromptModal from "@/components/LocationPromptModal";
import { CATEGORY_MAP, ALL_TYPES, getPrimaryCategory } from "@/components/categoryMeta";
import { fetchTravelTimes } from "@/lib/getTravelTimes";

import { selectTopK } from "@/lib/selectTopK";
import { makeSelectionConfig } from "@/lib/categoryCaps";
import { isFastFoodFromTypes } from "@/lib/isFastFood";

type GPlace = any;

export default function HomePage() {
  const [userLoc, setUserLoc] = useState<LatLng | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("cat") || "All";
    }
    return "All";
  });
  const [sortKey, setSortKey] = useState<SortKey>(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const s = p.get("sort") as SortKey | null;
      return (s || "distance") as SortKey;
    }
    return "distance";
  });
  const [allPlaces, setAllPlaces] = useState<GPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [travelTimes, setTravelTimes] = useState<Record<string,{walkingMinutes:number|null, drivingMinutes:number|null}>>({});

  useEffect(() => {
    try {
      const cached = loadStoredUserLocation();
      if (cached) setUserLoc(cached);
    } catch {}
  }, []);

  const handleResolved = async (loc: { lat: number; lng: number; accuracy?: number }) => {
    const payload = saveUserLocation({ ...loc, ts: Date.now() });
    setUserLoc({ lat: payload.lat, lng: payload.lng });
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
  };

  useEffect(() => {
    if (!userLoc) return;
    setLoading(true);
    setError(null);
    const types = ALL_TYPES;
    const params = new URLSearchParams({
      lat: String(userLoc.lat),
      lng: String(userLoc.lng),
      type: types.join(","),
      limit: "200",
      openNow: "true",
      radius: "7000",
    });
    fetch(`/api/places?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : data.results ?? data.places ?? [];
        const normalized = rows.map((p: any) => ({
          ...p,
          geometry: p.geometry ?? (p.location ? { location: p.location } : undefined),
          types: Array.isArray(p.types)
            ? p.types
            : typeof p.types === "string"
            ? [p.types]
            : [],
        }));
        setAllPlaces(normalized);
      })
      .catch((e) => setError(e.message || "Failed to load places"))
      .finally(() => setLoading(false));
  }, [userLoc]);

  const enrichedAll = useMemo(() => {
    return allPlaces
      .map((p) => {
        const loc = p.geometry?.location ?? p.location;
        const coords = loc ? { lat: loc.lat, lng: loc.lng } : null;
        const distanceKm = userLoc && coords ? haversineKm(userLoc, coords) : undefined;
        return { ...p, coords, distanceKm };
      })
      .filter((p: any) => p.coords);
  }, [allPlaces, userLoc]);

  const proximitySorted = useMemo(() => [...enrichedAll].sort((a:any,b:any)=>(a.distanceKm||0)-(b.distanceKm||0)), [enrichedAll]);

  const selectedPool = useMemo(() => {
    const toArray = (t:any) => Array.isArray(t) ? t : (typeof t === "string" ? [t] : []);
    const cfg = makeSelectionConfig<any>({
      getCategory: (p) => getPrimaryCategory(toArray(p.types)),
      getTypes: (p) => toArray(p.types),
      isFastFood: (p) => isFastFoodFromTypes(toArray(p.types)),
    });
    return selectTopK<any>(proximitySorted, cfg);
  }, [proximitySorted]);
  useEffect(() => {
    if (!userLoc || enrichedAll.length === 0) return;
    const candidates = enrichedAll.slice(0, 50).filter((p:any) => p.coords);
    const dests = candidates.map((p:any)=>({ id: p.place_id, lat: p.coords.lat, lng: p.coords.lng }));
    fetchTravelTimes(userLoc, dests).then(setTravelTimes).catch(()=>{});
  }, [userLoc, enrichedAll]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return selectedPool;
    const wanted = new Set((CATEGORY_MAP[selectedCategory] || []).map((s) => s.toLowerCase()));
    return selectedPool.filter((p:any) => (p.types || []).some((t:string) => wanted.has(t.toLowerCase())));
  }, [selectedCategory, selectedPool]);

  const sorted = useMemo(() => {
    switch (sortKey) {
      case "rating":
        return [...filtered].sort((a:any, b:any) => (b.rating || 0) - (a.rating || 0));
      case "distance":
      default:
        return [...filtered].sort((a:any, b:any) => (a.distanceKm || 0) - (b.distanceKm || 0));
    }
  }, [filtered, sortKey]);

  const categoryCounts = useMemo(() => {
    const byName: Record<string, number> = {};
    for (const [name, types] of Object.entries(CATEGORY_MAP)) {
      const wanted = new Set(types.map((s)=>s.toLowerCase()));
      byName[name] = selectedPool.filter((p:any) => (p.types||[]).some((t:string)=>wanted.has(t.toLowerCase()))).length;
    }
    const allCount = selectedPool.length;
    return [{ name: "All", count: allCount }, ...Object.keys(CATEGORY_MAP).map((name)=>({ name, count: byName[name] ?? 0}))];
  }, [selectedPool]);

  const handleRefreshClick = () => {
    try { localStorage.removeItem("dt_user_loc"); } catch {}
    setUserLoc(null);
    setAllPlaces([]);
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]">
      {!userLoc && <LocationPromptModal onResolved={handleResolved} />}

      {userLoc && (
        <>
          <TopBar
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onCategory={setSelectedCategory}
            sortKey={sortKey}
            onSort={setSortKey}
            view="list"
            onRefresh={handleRefreshClick}
          />

          <main className="flex-1 overflow-y-auto mx-auto max-w-6xl px-3 sm:px-4 pb-20 sm:pb-10 pt-4">

            {error && <div className="mb-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 p-3 text-sm">{error}</div>}
            {loading && <div className="mb-3 text-sm text-neutral-400">Loading…</div>}

            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p: any) => (
                <PlaceCard
                  key={p.place_id}
                  place={{
                    place_id: p.place_id,
                    name: p.name,
                    vicinity: p.vicinity,
                    rating: p.rating,
                    user_ratings_total: p.user_ratings_total,
                    coords: p.coords,
                    distanceKm: p.distanceKm,
                    website: (p as any).website ?? null,
                    url: (p as any).url ?? null,
                    types: Array.isArray(p.types)
                      ? p.types
                      : typeof p.types === "string"
                      ? [p.types]
                      : [],
                    formatted_phone_number: (p as any).formatted_phone_number ?? null,
                    international_phone_number: (p as any).international_phone_number ?? null,
                  }}
                  userLoc={userLoc}
                  travel={travelTimes[p.place_id] ?? null}
                />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
