import { useEffect, useState } from "react";
import OrientationNotice from "@/components/OrientationNotice";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/components.css";
import "leaflet/dist/leaflet.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/.edge-fade.css";
import { initPosthog } from "@/lib/analytics";
import Image from "next/image";

// Branded Under Construction component
function OfflinePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md text-center rounded-2xl bg-white/90 p-8 shadow-2xl">
        {/* Optional logo if you have one in /public/logo.png */}
        {/* 
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Downtime Logo"
            width={80}
            height={80}
            className="rounded-full shadow-md"
          />
        </div>
        */}

        <h1 className="text-3xl font-extrabold mb-4 text-indigo-700">
          🚧 Downtime is under construction 🚧
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We’re working hard behind the scenes to bring you something special.  
          Please check back soon — exciting things are on the way!
        </p>

        <p className="text-sm text-gray-600 mb-2">
          🍦 What’s your favorite ice cream flavor? <br />
          <span className="italic">(We’ll go first: Mint Chocolate Chip 💚)</span>
        </p>

        <p className="text-sm text-gray-500 italic">
          Thank you for your patience 💛
        </p>
      </div>
    </div>
  );
}

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [showOrientationNotice, setShowOrientationNotice] = useState(false);

  // Toggle this to quickly enable/disable maintenance mode
  const maintenanceMode = true;

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

  if (maintenanceMode) {
    return (
      <div className={jakarta.className}>
        <OfflinePage />
      </div>
    );
  }

  return (
    <div className={jakarta.className}>
      {/* Orientation guard only on mobile landscape */}
      {showOrientationNotice && <OrientationNotice />}

      {/* App content */}
      <Component {...pageProps} />
    </div>
  );
}
