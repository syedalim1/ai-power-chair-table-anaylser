/**
 * Calculates sheet metal weight and cost based on type, dimensions, quantity, and rate.
 *
 * @param {object} sheet - { type, thickness, rate, qty, wastage }
 * @returns {object} { cost, weight }
 */
export function calculateSheetDetails(sheet) {
  const { type, thickness = 0, rate = 0, qty = 0, wastage = 0 } = sheet;

  const q = Number(qty) || 0;
  const r = Number(rate) || 0;
  const w = Number(wastage) || 0;
  const t = Number(thickness) || 0;

  // 1. Calculate Cost
  let sheetCost = 0;
  if (type !== "None" && q > 0) {
    sheetCost = q * r * (1 + w / 100);
  }

  // 2. Calculate Weight
  let sheetWeightKg = 0;
  if (type === "SS Sheet" || type === "MS Sheet") {
    const sheetDensity = type === "SS Sheet" ? 7.93 : 7.85;
    // An 8x4 sheet is 32 square feet = 2.973 square meters
    // Area(m²) * Thickness(mm) * Density = Weight per sheet
    const weightPerSheet = 2.973 * t * sheetDensity;
    sheetWeightKg = q * weightPerSheet * (1 + w / 100);
  } else if (type === "Plywood" && q > 0) {
    // Standard plywood density ~0.65 g/cm³
    const plywoodDensity = 0.65;
    const weightPerSheet = 2.973 * t * plywoodDensity;
    sheetWeightKg = q * weightPerSheet * (1 + w / 100);
  }

  return {
    cost: Math.round(sheetCost),
    weight: Number(sheetWeightKg.toFixed(2))
  };
}
