import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type SortKey = "distance" | "closingSoon" | "alphabetical";

type Props = { value: SortKey; onChange: (k: SortKey) => void };

export default function SortControl({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const opts: { key: SortKey; label: string }[] = [
    { key: "distance", label: "Distance" },
    { key: "closingSoon", label: "Closing time" },
    { key: "alphabetical", label: "A → Z" },
  ];
  const current = opts.find(o => o.key === value)?.label ?? "Sort";

  return (
    <div className="relative inline-block text-left">
      <button
  onClick={() => setOpen(v => !v)}
  className="topbar-btn"
  aria-haspopup="listbox"
  aria-expanded={open}
>

        {current}
        <ChevronDown className="inline-block ml-1 align-[-2px]" size={16} />
      </button>
      {open && (
        <div role="listbox" className="absolute right-0 mt-2 w-44 rounded-xl ring-1 ring-neutral-700 bg-neutral-900 shadow-xl z-20 overflow-hidden">
          {opts.map((o) => (
            <button key={o.key} role="option" aria-selected={o.key === value} onClick={() => { onChange(o.key); setOpen(false); }}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-neutral-800 ${o.key===value ? "text-white" : "text-neutral-300"}`}>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
