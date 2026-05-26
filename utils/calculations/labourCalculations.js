/**
 * Calculates the total manufacturing and fabrication labour cost per unit.
 *
 * @param {object} costing - { labour, welding, grinding, polish, packing }
 * @returns {number} Sum of fabrication labour costs per unit
 */
export function calculateLabourSumPerUnit(costing) {
  const {
    labour = 0,
    welding = 0,
    grinding = 0,
    polish = 0,
    packing = 0
  } = costing;

  const totalLabour =
    Number(labour) +
    Number(welding) +
    Number(grinding) +
    Number(polish) +
    Number(packing);

  return Math.round(totalLabour);
}
