// lib/selectTopK.ts
export type BucketRule = { cap: number; floor?: number; };
export type FoodAndDrinkRule<T> = {
  cap: number;
  includeFastFoodOnlyToFill?: boolean;
  isFastFood?: (p: T) => boolean;
};
export type SelectionConfig<T> = {
  total: number;
  getCategory: (p: T) => string;
  getTypes?: (p: T) => string[];
  caps: Record<string, BucketRule>;
  foodAndDrink?: FoodAndDrinkRule<T>;
};
function defaultIsFastFood<T>(p: T, getTypes?: (p:T)=>string[]): boolean {
  const types = (getTypes ? getTypes(p) : [])?.map((s) => s.toLowerCase());
  return !!types && (types.includes("meal_takeaway") || types.includes("meal_delivery"));
}
export function selectTopK<T>(placesSortedByDistance: T[], cfg: SelectionConfig<T>): T[] {
  const out: T[] = [];
  const remainingCaps = new Map<string, number>();
  for (const [cat, rule] of Object.entries(cfg.caps)) remainingCaps.set(cat, rule.cap);
  const fnbCap = cfg.foodAndDrink?.cap ?? 0;
  const includeFastFoodOnlyToFill = cfg.foodAndDrink?.includeFastFoodOnlyToFill ?? true;
  const isFastFood = cfg.foodAndDrink?.isFastFood ?? ((p: T) => defaultIsFastFood(p, cfg.getTypes));
  let fnbCount = 0;
  for (const p of placesSortedByDistance) {
    if (out.length >= cfg.total) break;
    const cat = cfg.getCategory(p);
    if (!cat) continue;
    if (cat === "Food & Drink" && fnbCap > 0) {
      if (fnbCount >= fnbCap) continue;
      out.push(p); fnbCount++;
      continue;
    }
    const left = remainingCaps.get(cat);
    if (left === undefined) { out.push(p); }
    else if (left > 0) { out.push(p); remainingCaps.set(cat, left - 1); }
  }
  if (out.length < cfg.total) {
    const seen = new Set(out as any as T[]);
    for (const p of placesSortedByDistance) {
      if (out.length >= cfg.total) break;
      if (seen.has(p)) continue;
      out.push(p);
    }
  }
  return out.slice(0, cfg.total);
}
