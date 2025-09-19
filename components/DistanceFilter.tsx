const BUCKETS = [
  { label: "≤15 min" },
  { label: "15–30 min" },
  { label: "30+ min" },
  { label: "Show All" },
];

type Props = {
  selected: string;
  onChange: (label: string) => void;
  showAll: boolean;
  onShowAll: () => void;
};

export default function DistanceFilter({ selected, onChange, showAll, onShowAll }: Props) {
  return (
    <div className="edge-fade -mx-4 px-4">
      <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory">
        <div className="flex gap-2 py-2">
          {BUCKETS.map((b) => {
            const isActive = (b.label === "Show All" && showAll) || selected === b.label;
            const base = "snap-start px-3 py-1.5 rounded-full text-sm ring-1 transition whitespace-nowrap";
            const cls = isActive
              ? "bg-blue-600 text-white ring-blue-600 shadow"
              : "bg-[var(--muted)]/80 text-[var(--text)] ring-[var(--ring)] hover:ring-blue-500";
            const handler = b.label === "Show All" ? onShowAll : () => onChange(b.label);
            return (
              <button
                key={b.label}
                onClick={handler}
                className={base + " " + cls}
                aria-pressed={isActive}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
