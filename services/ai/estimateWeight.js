/**
 * Advises on structural weight limits and material substitutions.
 *
 * @param {string} category - Chair, Table, Rack, Dining Set
 * @param {number} totalWeightKg - Est total mass in KG
 * @returns {object} Advice on ergonomic and structural weights
 */
export function estimateWeight(category, totalWeightKg) {
  const mass = Number(totalWeightKg) || 0;
  let status = "Optimal";
  let advice = "Physical structure weight is well within standard material limits.";

  if (category === "Chair" && mass > 12) {
    status = "Heavy";
    advice = "This chair design exceeds 12kg. Consider reducing wall thickness from 2.0mm to 1.5mm to improve ergonomics.";
  } else if (category === "Table" && mass > 60) {
    status = "Heavy";
    advice = "Work table weight exceeds 60kg. Ensure structural floor loading capacity is verified, or substitute steel panels with plywood top to save weight.";
  } else if (category === "Rack" && mass > 80) {
    status = "Heavy";
    advice = "Multi-tier rack is extremely robust. Lockable heavy-duty caster wheels are recommended for modular mobility.";
  }

  return {
    status,
    advice
  };
}
