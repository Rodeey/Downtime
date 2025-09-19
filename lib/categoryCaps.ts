// lib/categoryCaps.ts
import type { SelectionConfig, BucketRule } from "./selectTopK";
export type MinimalPlace = { types?: string[]; };
export const DEFAULT_CAPS: Record<string, BucketRule> = {
  "Outdoors & Parks": { cap: 40 },
  "Shops & Errands":  { cap: 35 },
  "Arts & Culture":   { cap: 25 },
  "Activities & Fun": { cap: 30 },
  "Coffee & WFH":     { cap: 20 },
};
export const DEFAULT_FNB_CAP = 50;
export function makeSelectionConfig<T extends MinimalPlace>(options: {
  total?: number;
  fnbCap?: number;
  caps?: Record<string, BucketRule>;
  getCategory: (p: T) => string;
  getTypes?: (p: T) => string[];
  isFastFood?: (p: T) => boolean;
}): SelectionConfig<T> {
  return {
    total: options.total ?? 200,
    getCategory: options.getCategory,
    getTypes: options.getTypes,
    caps: options.caps ?? DEFAULT_CAPS,
    foodAndDrink: { cap: options.fnbCap ?? DEFAULT_FNB_CAP, includeFastFoodOnlyToFill: true, isFastFood: options.isFastFood },
  };
}
