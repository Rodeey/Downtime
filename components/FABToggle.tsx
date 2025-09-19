import Link from "next/link";
import { MapIcon, ListIcon } from "./Icons";

export default function FABToggle({ to }: { to: "map" | "list" }) {
  const href = to === "map" ? "/map" : "/";
  const label = to === "map" ? "Map" : "List";
  return (
    <Link href={href} className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white shadow-xl ring-1 ring-blue-500/50 active:scale-95 transition" aria-label={`Switch to ${label} view`}>
      {to === "map" ? <MapIcon /> : <ListIcon />}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
