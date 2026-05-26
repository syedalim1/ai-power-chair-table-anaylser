/**
 * Estimates optimal raw pipe usage and advises on scrap reduction.
 *
 * @param {string} shape - Round, Square, Rectangle
 * @param {number} lengthFeet - Skeletal length in feet
 * @returns {object} Suggestions on tube wastage thresholds
 */
export function estimatePipeUsage(shape, lengthFeet) {
  const feet = Number(lengthFeet) || 0;
  
  let recommendedWastage = 10;
  let advice = "A standard 10% wastage allowance is recommended for round pipe bending.";

  if (shape === "Square") {
    recommendedWastage = 8;
    advice = "Square tube cuts have cleaner miter joints, allowing a tighter 8% wastage limit.";
  } else if (shape === "Rectangle") {
    recommendedWastage = 12;
    advice = "Rectangular profiles require specialized tube bending jigs; maintain a 12% scrap allowance.";
  }

  if (feet > 150) {
    recommendedWastage -= 2;
    advice += " Bulk production length reduces pro-rata off-cut waste by approximately 2%.";
  }

  return {
    recommendedWastage,
    advice
  };
}
