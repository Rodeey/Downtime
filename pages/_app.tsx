import OrientationNotice from "@/components/OrientationNotice";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/components.css";
import "leaflet/dist/leaflet.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/.edge-fade.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={jakarta.className}>
      <Component {...pageProps} />
    </div>
  );
}

{/* Orientation guard for mobile */}
<OrientationNotice />
