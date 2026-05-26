import { estimatePipeFeet } from "./pipeCalculations.js";
import { calculateKgPerMeter, calculateTotalPipeWeight } from "./weightCalculations.js";
import { calculateSheetDetails } from "./sheetCalculations.js";
import { calculateLabourSumPerUnit } from "./labourCalculations.js";

/**
 * Orchestrates all estimation algorithms and calculates the comprehensive commercial details.
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
    manualPipeLength = 0
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

  // 9. Profit Margin / Markups
  const markupPercent = Number(markup) || 0;
  const markupAmount = Math.round(totalBeforeMarkup * (markupPercent / 100));
  const taxableAmount = totalBeforeMarkup + markupAmount;

  // 10. Tax / GST
  const gstPercent = Number(gst) || 0;
  const gstAmount = Math.round(taxableAmount * (gstPercent / 100));

  // 11. Grand Total
  const grandTotal = taxableAmount + gstAmount;

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
    grandTotal
  };
}
