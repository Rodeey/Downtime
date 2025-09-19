import { useState } from "react";

type Props = {
  onResolved: (loc: { lat:number; lng:number; accuracy?:number }) => void;
};

export default function LocationPromptModal({ onResolved }: Props) {
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allowBrowser = () => {
    try { localStorage.setItem("dt_loc_prompted","1"); } catch {}
    setBusy(true);
    if (!navigator.geolocation) {
      setBusy(false);
      setError("Your browser doesn't support geolocation. You can enter an address instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setBusy(false);
        onResolved({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
      },
      (err) => {
        setBusy(false);
        setError(err?.message || "We couldn't get your location. Try entering an address.");
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 12000 }
    );
  };

  const useAddress = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`/api/geocode?query=${encodeURIComponent(address)}`);
      if (!r.ok) throw new Error("Geocode failed");
      const j = await r.json();
      const loc = j?.location;
      if (!loc) throw new Error("No results for that address");
      onResolved({ lat: loc.lat, lng: loc.lng });
    } catch (e:any) {
      setError(e?.message || "Couldn't find that address.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full sm:max-w-md bg-white text-neutral-900 rounded-2xl shadow-xl p-5 sm:p-6">
       <h2 className="text-lg sm:text-xl font-extrabold mb-2 logo-text">
  See what’s open near you
</h2>

        <p className="text-sm text-neutral-600 mb-4">Allow location or enter an address to load results.</p>

        <div className="space-y-3">
          <button
            onClick={allowBrowser}
            disabled={busy}
            className="w-full rounded-xl border border-neutral-300 bg-white text-black py-2.5 font-medium hover:bg-neutral-50 active:scale-[0.99] disabled:opacity-60"
          >
            {busy ? "Requesting…" : "Allow browser location"}
          </button>

          <div className="flex items-center gap-2">
            <input
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="Enter address or city"
              className="flex-1 px-3 py-2 rounded-xl border border-neutral-300"
            />
            <button
              onClick={useAddress}
              disabled={busy || !address.trim()}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black disabled:opacity-60"
            >
              Use
            </button>
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <p className="mt-4 text-xs text-neutral-500">We won't load results until a location is provided.</p>
      </div>
    </div>
  );
}