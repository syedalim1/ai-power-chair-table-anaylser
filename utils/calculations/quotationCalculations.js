import { estimatePipeFeet } from "./pipeCalculations.js";
import { calculateKgPerMeter, calculateTotalPipeWeight } from "./weightCalculations.js";
import { calculateSheetDetails } from "./sheetCalculations.js";
import { calculateLabourSumPerUnit } from "./labourCalculations.js";

/**
 * Orchestrates all estimation algorithms and calculates the comprehensive commercial details.
 * Supports Retail, Wholesale, Dealer and Custom pricing modes, and GST toggles.
 *
 * @param {object} inputs - Complete quotation form inputs
 * @returns {object} All computed pricing and weight metrics
 */
export function runQuotationCalculations(inputs) {
  const {
    category = "Chair",
    quantity = 1,
    dimensions = {},
    pipe = {},
    sheet = {},
    costing = {},
    markup = 25,
    gst = 18,
    isPipeLengthOverridden = false,
    manualPipeLength = 0,
    pricingMode = "retail",
    gstEnabled = true
  } = inputs;

  const qty = Math.max(1, Number(quantity) || 1);

  // 1. Calculate skeletal pipe feet
  const calculatedPipeLengthFeet = estimatePipeFeet(category, dimensions);
  const activePipeLength = isPipeLengthOverridden
    ? Number(manualPipeLength) || 0
    : calculatedPipeLengthFeet;

  // 2. Calculate pipe unit weight & total weight
  const kgPerMeter = calculateKgPerMeter(pipe);
  const totalPipeWeight = calculateTotalPipeWeight(activePipeLength, kgPerMeter, pipe.wastage);

  // 3. Calculate sheet details
  const sheetDetails = calculateSheetDetails(sheet);

  // 4. Summarize weights
  const totalWeight = Number((totalPipeWeight + sheetDetails.weight).toFixed(2));

  // 5. Material costings
  const pipeCost = Math.round(totalPipeWeight * (Number(pipe.rate) || 0));
  const sheetCost = sheetDetails.cost;
  const materialCost = pipeCost + sheetCost;

  // 6. Fabrication labour
  const labourCostSum = calculateLabourSumPerUnit(costing);

  // 7. Overall unit totals
  const subtotalPerItem = materialCost + labourCostSum;
  const subtotalOverall = subtotalPerItem * qty;

  // 8. Overall with Flat Transport/Logistics
  const transportCost = Number(costing.transport) || 0;
  const totalBeforeMarkup = subtotalOverall + transportCost;

  // 9. Profit Margin / Markups based on Pricing Mode
  let markupPercent = Number(markup) || 0;
  let pricingDiscountPercent = 0;

  if (pricingMode === "wholesale") {
    pricingDiscountPercent = 10; // 10% wholesale discount
  } else if (pricingMode === "dealer") {
    pricingDiscountPercent = 15; // 15% dealer discount
  }

  const baseMarkupAmount = Math.round(totalBeforeMarkup * (markupPercent / 100));
  let taxableAmountBeforeDiscount = totalBeforeMarkup + baseMarkupAmount;
  
  // Apply discount if active
  const discountAmount = Math.round(taxableAmountBeforeDiscount * (pricingDiscountPercent / 100));
  const taxableAmount = taxableAmountBeforeDiscount - discountAmount;
  const markupAmount = baseMarkupAmount - discountAmount; // adjusted net profit

  // 10. Tax / GST (Enabled vs Disabled check)
  const gstPercent = gstEnabled ? (Number(gst) || 0) : 0;
  const gstAmount = Math.round(taxableAmount * (gstPercent / 100));

  // 11. Grand Total
  const grandTotal = taxableAmount + gstAmount;

  // Calculated tier pricings for side-by-side previews
  const retailTotal = Math.round((totalBeforeMarkup + baseMarkupAmount) * 1.18);
  const wholesaleTotal = Math.round((totalBeforeMarkup + baseMarkupAmount) * 0.90 * 1.18);
  const dealerTotal = Math.round((totalBeforeMarkup + baseMarkupAmount) * 0.85 * 1.18);

  return {
    calculatedPipeLengthFeet,
    activePipeLength,
    kgPerMeter: kgPerMeter.toFixed(3),
    totalPipeWeight: totalPipeWeight.toFixed(2),
    sheetWeight: sheetDetails.weight.toFixed(2),
    totalWeight: totalWeight.toFixed(2),
    pipeCost,
    sheetCost,
    materialCost,
    labourCostSum,
    subtotalPerItem,
    subtotalOverall,
    totalBeforeMarkup,
    markupAmount,
    taxableAmount,
    gstAmount,
    grandTotal,
    discountAmount,
    retailTotal,
    wholesaleTotal,
    dealerTotal
  };
}
