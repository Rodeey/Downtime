import { ForkKnife, TreeIcon, BagIcon, MasksIcon, DiceIcon, MugIcon } from "./Icons";

export const CATEGORY_MAP: Record<string, string[]> = {
  "All": [],
  "Food & Drink": ["restaurant", "cafe", "bar", "bakery", "meal_takeaway", "meal_delivery"],
  "Outdoors & Parks": ["park", "campground", "tourist_attraction", "zoo", "natural_feature"],
  "Shops & Errands": ["convenience_store", "supermarket", "grocery_or_supermarket", "hardware_store", "shopping_mall", "store", "pharmacy"],
  "Arts & Culture": ["museum", "art_gallery", "library", "movie_theater"],
  "Activities & Fun": ["bowling_alley", "amusement_park", "aquarium", "stadium", "casino"],
  "Coffee & WFH": ["cafe", "library"],
};

export const CATEGORY_META: Record<string, { color: string; Icon: any }> = {
  "Food & Drink": { color: "#F97316", Icon: ForkKnife },
  "Outdoors & Parks": { color: "#22C55E", Icon: TreeIcon },
  "Shops & Errands": { color: "#3B82F6", Icon: BagIcon },
  "Arts & Culture": { color: "#A855F7", Icon: MasksIcon },
  "Activities & Fun": { color: "#EAB308", Icon: DiceIcon },
  "Coffee & WFH": { color: "#B45309", Icon: MugIcon },
  "All": { color: "#475569", Icon: BagIcon },
};

export const CAT_LIST = Object.keys(CATEGORY_MAP);
export const ALL_TYPES: string[] = Array.from(
  new Set(Object.entries(CATEGORY_MAP).flatMap(([k, v]) => (k === "All" ? [] : v)))
);

export function getPrimaryCategory(types: string[] | undefined): string {
  if (!types || types.length === 0) return "All";
  for (const [name, list] of Object.entries(CATEGORY_MAP)) {
    if (name === "All") continue;
    if (types.some(t => list.includes(t))) return name;
  }
  return "All";
}
