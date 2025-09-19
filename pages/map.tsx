"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import { SortKey } from "@/components/SortToggle";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

import {
  haversineKm,
  LatLng,
  saveUserLocation,
  loadStoredUserLocation,
} from "@/lib/geo";
import LocationPromptModal from "@/components/LocationPromptModal";
import { CATEGORY_MAP, ALL_TYPES } from "@/components/categoryMeta";
import { fetchTravelTimes } from "@/lib/getTravelTimes";

export default function MapPage() {
  // 🔹 Sorting toggle state (📍 distance / ⭐ rating)
  const [sortKey, setSortKey] = useState<SortKey>("distance");

  // 🔹 Location + refresh
  const [userLoc, setUserLoc] = useState<LatLng | null>(null);
  const handleRefreshClick = () => {
    try {
      localStorage.removeItem("dt_user_loc");
    } catch {}
    setUserLoc(null as any);
    setAllPlaces([]);
  };

  // Try cached location on mount
  useEffect(() => {
    try {
      const cached = loadStoredUserLocation();
      if (cached) setUserLoc(cached);
    } catch {}
  }, []);

  // 🔹 Category (read from URL param, default All)
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("cat") || "All";
    }
    return "All";
  });

  // 🔹 Places + travel times state
  const [allPlaces, setAllPlaces] = useState<any[]>([]);
  const [travelTimes, setTravelTimes] = useState<
    Record<string, { walkingMinutes: number | null; drivingMinutes: number | null }>
  >({});
  const [loading, setLoading] = useState(false);

  // Fetch travel times for a subset (keeps UI snappy)
  useEffect(() => {
    if (!userLoc || allPlaces.length === 0) return;
    const candidates = allPlaces
      .slice(0, 50)
      .filter((p) => p.geometry?.location || p.location);
    const dests = candidates.map((p: any) => {
      const loc = p.geometry?.location ?? p.location;
      return { id: p.place_id, lat: loc.lat, lng: loc.lng };
    });
    fetchTravelTimes(userLoc, dests)
      .then(setTravelTimes)
      .catch(() => {});
  }, [userLoc, allPlaces]);

  // Location resolved from prompt
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

  // 🔹 Fetch ALL types once per location (limit 200)
  useEffect(() => {
    if (!userLoc) return;
    setLoading(true);
    const url =
      `/api/places?lat=${userLoc.lat}&lng=${userLoc.lng}&type=${encodeURIComponent(
        ALL_TYPES.join(",")
      )}` + `&limit=200&openNow=true&radius=7000`;

    fetch(url)
      .then(async (r) => {
        const data = await r.json();
        const rows: any[] = Array.isArray(data) ? data : data.results ?? data.places ?? [];
        return rows;
      })
      .then((rows) => {
        const normalized: any[] = rows.map((p: any) => ({
          ...p,
          geometry: p.geometry ?? (p.location ? { location: p.location } : undefined),
          types: Array.isArray(p.types) ? p.types : typeof p.types === "string" ? [p.types] : [],
        }));
        setAllPlaces(normalized);
      })
      .finally(() => setLoading(false));
  }, [userLoc]);

  // 🔹 Compute coords + distance once
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

  // 🔹 Filter by category
  const filtered = useMemo(() => {
    if (selectedCategory === "All") return enrichedAll;
    const bucket = CATEGORY_MAP[selectedCategory] ?? [];
    return enrichedAll.filter((p: any) => (p.types ?? []).some((t: string) => bucket.includes(t)));
  }, [enrichedAll, selectedCategory]);

  // 🔹 Sort by toggle
  const sorted = useMemo(() => {
    if (sortKey === "rating") {
      return [...filtered].sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    }
    // default: distance
    return [...filtered].sort(
      (a: any, b: any) => (a.distanceKm || Infinity) - (b.distanceKm || Infinity)
    );
  }, [filtered, sortKey]);

  // 🔹 Category counts for the top bar
  const categoryCounts = useMemo(() => {
    const byName: Record<string, number> = Object.fromEntries(
      Object.keys(CATEGORY_MAP).map((n) => [n, 0])
    );
    enrichedAll.forEach((p: any) => {
      const t = p.types ?? [];
      for (const [name, bucket] of Object.entries(CATEGORY_MAP)) {
        if (name === "All") {
          byName["All"] += 1;
          continue;
        }
        if (t.some((tt: string) => bucket.includes(tt))) byName[name] += 1;
      }
    });
    return Object.keys(CATEGORY_MAP).map((name) => ({
      name,
      count: byName[name] ?? 0,
    }));
  }, [enrichedAll]);

  return (
    <div className="page-root min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]">
      {!userLoc && <LocationPromptModal onResolved={handleResolved} />}

      {userLoc && (
        <>
          <TopBar
            onRefresh={handleRefreshClick}
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onCategory={setSelectedCategory}
            sortKey={sortKey}
            onSort={setSortKey}
            view="map"
          />

          {/* Keep content constrained so TopBar edges align with cards */}
          <div className="app-shell mx-auto max-w-screen-sm sm:max-w-6xl px-3 sm:px-4">
            <div className="map-shell">
              <div className="map-wrap">
                <MapView center={userLoc} places={sorted as any} />
                {loading && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-neutral-900/80 backdrop-blur rounded-full px-3 py-1 text-xs">
                    Loading…
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
