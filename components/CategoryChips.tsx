import { useEffect, useRef, useState } from "react";
import { CATEGORY_META } from "./categoryMeta";
import { CATEGORY_LABELS } from "./categoryLabels";

type Props = {
  categories: { name: string; count: number }[];
  selected: string;
  onChange: (name: string) => void;
};

export default function CategoryChips({ categories, selected, onChange }: Props) {
  const visible = categories.filter((c) => c.count > 0);
  const [showNudge, setShowNudge] = useState(true);
  const timer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timer.current = window.setTimeout(() => setShowNudge(false), 2200);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="edge-fade -mx-4 px-4 relative">
      {showNudge && (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 bg-neutral-900/70 px-2 py-1 rounded-full sm:hidden">
          swipe →
        </div>
      )}

      {/* Desktop scroll buttons */}
      <button
        onClick={scrollLeft}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/80 text-neutral-200 hover:text-white p-1 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/80 text-neutral-200 hover:text-white p-1 rounded-full shadow"
      >
        ▶
      </button>

      <div
        ref={containerRef}
        className="no-scrollbar overflow-x-auto snap-x snap-mandatory"
      >
        <div className="flex gap-2 py-2">
          {visible.map((c) => {
            const active =
              selected === c.name || (selected === "" && c.name === "All");
            const meta = CATEGORY_META[c.name] || CATEGORY_META["All"];
            const base =
              "snap-start px-3 py-1.5 rounded-full text-sm ring-1 transition whitespace-nowrap inline-flex items-center gap-2";
            const cls = active
              ? "text-white shadow"
              : "text-[var(--text)] hover:ring-blue-500";
            const style = active
              ? { background: meta.color, borderColor: meta.color }
              : { borderColor: "var(--ring)" };
            const label = CATEGORY_LABELS[c.name] ?? c.name;
            return (
              <button
                key={c.name}
                onClick={() => onChange(c.name)}
                className={base + " " + cls}
                aria-pressed={active}
                style={style as any}
              >
                <span>
                  {label}
                  {c.name !== "All" ? ` • ${c.count}` : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
