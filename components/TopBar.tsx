import CategoryChips from "./CategoryChips";
import SortToggle, { SortKey } from "./SortToggle";
import Link from "next/link";

type Props = {
  categories: { name: string; count: number }[];
  selectedCategory: string;
  onCategory: (name: string) => void;
  sortKey: SortKey;
  onSort: (k: SortKey) => void;
  view: "list" | "map";
  onRefresh?: () => void;
};

export default function TopBar({
  categories, selectedCategory, onCategory, sortKey, onSort, view, onRefresh
}: Props) {
  return (
    <header className="topbar sticky inset-x-0 top-0 w-full z-40 bg-[var(--bg)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/60">
      <div className="app-shell mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex items-center justify-between py-3 gap-2">
          <Link href="/" className="logo-text font-extrabold tracking-tight text-xl">
  Downtime
</Link>


          <div className="flex flex-wrap items-center gap-2">
            <button
  onClick={onRefresh}
  className="topbar-btn"
>
  Refresh location
</button>

            <div className="inline-flex rounded-xl ring-1 ring-neutral-700 overflow-hidden">
  <Link
    href={{ pathname: "/", query: { cat: selectedCategory, sort: sortKey } }}
    className={`topbar-btn transition-colors ${
  view === "list"
    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    : "bg-transparent text-neutral-400 hover:bg-neutral-800"
}`}
  >
    List
  </Link>
  <Link
    href={{ pathname: "/map", query: { cat: selectedCategory, sort: sortKey } }}
    className={`topbar-btn transition-colors ${
  view === "map"
    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    : "bg-transparent text-neutral-400 hover:bg-neutral-800"
}`}
  >
    Map
  </Link>
</div>

            <SortToggle value={sortKey} onChange={onSort} />
          </div>
        </div>
        <CategoryChips categories={categories} selected={selectedCategory} onChange={onCategory} />
      </div>
    </header>
  );
}