type Props = {
  categories: string[];
  selected: string;
  onChange: (cat: string) => void;
};

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <div className="edge-fade -mx-4 px-4">
      <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory">
        <div className="flex gap-2 py-2">
          {categories.map((cat) => {
            const active = selected === cat || (selected === "" && cat === "All");
            const base = "snap-start px-3 py-1.5 rounded-full text-sm ring-1 transition whitespace-nowrap";
            const cls = active
              ? "bg-blue-600 text-white ring-blue-600 shadow"
              : "bg-[var(--muted)]/80 text-[var(--text)] ring-[var(--ring)] hover:ring-blue-500";
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={base + " " + cls}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
