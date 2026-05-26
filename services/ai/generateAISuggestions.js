/**
 * Generates dynamic, structural and commercial cost optimization suggestions in real-time.
 * Analyzes active form fields to identify cost imbalances or inefficient configurations.
 *
 * @param {object} inputs - Active quotation inputs
 * @param {object} summary - Computed calculations summary
 * @returns {Array<object>} List of smart suggestions with impact ratings
 */
export function generateAISuggestions(inputs, summary) {
  const list = [];
  const { category = "Chair", quantity = 1, pipe = {}, costing = {} } = inputs;

  const totalQty = Number(quantity) || 1;
  const pipeRate = Number(pipe.rate) || 0;
  const transport = Number(costing.transport) || 0;
  const pipeWeight = Number(summary.totalPipeWeight) || 0;
  const wallThickness = Number(pipe.thickness) || 0;
  const markupPercent = Number(inputs.markup) || 0;

  // 1. Durability/Thickness warnings
  if (category === "Table" && wallThickness < 1.6) {
    list.push({
      type: "warning",
      title: "Wall Thickness Concern",
      text: `Industrial Work Tables should ideally use 1.6mm or 2.0mm wall thickness. Your ${wallThickness}mm tube may lead to frame flexing under load.`,
      impact: "Est. Durability Risk: High"
    });
  }

  // 2. Batch quantity optimization
  if (totalQty >= 20 && costing.labour > 150) {
    const potentialSaving = Math.round(costing.labour * 0.15 * totalQty);
    list.push({
      type: "optimization",
      title: "Batch Fabrication Benefit",
      text: `With a quantity of ${totalQty} units, batch bending jigs can reduce your individual fabrication labor by 15%.`,
      impact: `Save ~₹ ${potentialSaving} overall`
    });
  }

  // 3. Freight cost ratio alerts
  const grandTotal = Number(summary.grandTotal) || 0;
  if (grandTotal > 0 && transport / grandTotal > 0.15) {
    list.push({
      type: "danger",
      title: "Inefficient Logistics Overhead",
      text: "Logistics charges represent over 15% of your grand total. Consider grouping this shipping run with other Coimbatore SIDCO deliveries to reduce freight costs.",
      impact: "Logistics Overhead: High"
    });
  }

  // 4. Rate alignment checks
  if (pipe.type === "SS" && pipeRate < 280) {
    list.push({
      type: "warning",
      title: "SS Material Rate Alert",
      text: `Your SS rate (₹ ${pipeRate}/kg) is significantly below the current SIDCO market average of ₹ 310 - ₹ 330/kg. Verify alloy grade (SS304 vs SS202).`,
      impact: "Material Cost Risk"
    });
  }

  // 5. Margin advice
  if (markupPercent < 15) {
    list.push({
      type: "info",
      title: "Conservative Profit Margin",
      text: `A profit markup of ${markupPercent}% is lower than the typical Coimbatore standard (20%-25%) for custom steel fabrications.`,
      impact: "Margin Increase Potential"
    });
  }

  // If no warnings, return default clean advice
  if (list.length === 0) {
    list.push({
      type: "success",
      title: "Optimal Fabrication Config",
      text: "All structural ratios, thickness standardizations, and pricing markups are aligned with standard SIDCO industrial sheets profiles.",
      impact: "100% Calibrated"
    });
  }

  return list;
}
