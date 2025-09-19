import React from "react";

export type SortKey = "distance" | "rating";

type Props = {
  value: SortKey;
  onChange: (k: SortKey) => void;
};

export default function SortToggle({ value, onChange }: Props) {
  const btn = (k: SortKey, label: string) => (
    <button
      key={k}
      aria-pressed={value === k}
      onClick={() => onChange(k)}
      className={`topbar-btn transition-colors ${
  value === k
    ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
    : "bg-transparent text-neutral-400 hover:bg-neutral-800"
}`}


      title={k === "distance" ? "Sort by distance" : "Sort by rating"}
    >
      {label}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-neutral-700 bg-black/40 backdrop-blur-sm h-9">

      {btn("distance", "📍")}
      {btn("rating", "⭐")}
    </div>
  );
}
