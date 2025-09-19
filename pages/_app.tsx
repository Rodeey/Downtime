import { useEffect, useState } from "react";
import OrientationNotice from "@/components/OrientationNotice";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/components.css";
import "leaflet/dist/leaflet.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/.edge-fade.css";
import { initPosthog } from "@/lib/analytics";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [showOrientationNotice, setShowOrientationNotice] = useState(false);

  useEffect(() => {
    initPosthog();

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isLandscape = window.innerWidth > window.innerHeight;
      setShowOrientationNotice(isMobile && isLandscape);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={jakarta.className}>
      {/* Orientation guard only on mobile landscape */}
      {showOrientationNotice && <OrientationNotice />}

      {/* App content */}
      <Component {...pageProps} />
    </div>
  );
}
