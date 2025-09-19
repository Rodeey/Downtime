// lib/isFastFood.ts
export function isFastFoodFromTypes(types?: string[]): boolean {
  if (!types || types.length === 0) return false;
  const t = types.map(s => s.toLowerCase());
  return t.includes("meal_takeaway") || t.includes("meal_delivery");
}
