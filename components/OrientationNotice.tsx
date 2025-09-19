
import { useEffect, useState } from "react";

export default function OrientationNotice() {
  const [landscape, setLandscape] = useState(false);
  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth, h = window.innerHeight;
      setLandscape(w > h && Math.min(w,h) < 1024);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);
  if (!landscape) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 text-white p-8 text-center">
      <div>
        <div className="text-2xl font-semibold mb-2">Rotate your device</div>
        <div className="opacity-80">For the best experience, use portrait mode.</div>
      </div>
    </div>
  );
}
