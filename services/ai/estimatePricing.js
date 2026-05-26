/**
 * Evaluates manufacturing totals and suggests optimal commercial selling margins.
 *
 * @param {number} totalBeforeMarkup - Raw cost including freight
 * @param {string} difficulty - Easy, Medium, Hard labour difficulty
 * @returns {object} Pricing suggestions and MSRP target ranges
 */
export function estimatePricing(totalBeforeMarkup, difficulty = "Medium") {
  const base = Number(totalBeforeMarkup) || 0;
  
  // Recommend markup margin based on fabrication difficulty
  let recommendedMarkup = 20;
  if (difficulty === "Medium") recommendedMarkup = 25;
  if (difficulty === "Hard") recommendedMarkup = 30;

  const msrpLow = Math.round(base * (1 + recommendedMarkup / 100) * 1.18); // incl typical GST
  const msrpHigh = Math.round(base * (1 + (recommendedMarkup + 5) / 100) * 1.18);

  return {
    recommendedMarkup,
    msrpRange: `₹ ${msrpLow.toLocaleString("en-IN")} - ₹ ${msrpHigh.toLocaleString("en-IN")}`,
    advice: `Labour difficulty is ${difficulty}. Standard fabrication markup is ${recommendedMarkup}%, producing a healthy gross MSRP profit margin.`
  };
}
