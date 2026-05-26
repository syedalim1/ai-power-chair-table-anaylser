/**
 * Decodes factory-floor shorthand codes into explicit structural configurations.
 * Allows quick shorthand typing for rapid profile loads.
 *
 * @param {string} code - Factory shorthand code (e.g. B-2, M-2)
 * @returns {object|null} Decoded specs config
 */
export function decodeFactoryShorthand(code) {
  const normalized = code.trim().toUpperCase();

  const mappings = {
    "B-2": {
      size: '1" Round Tubing',
      thickness: "1.5 mm",
      weightCategory: "Lightweight SS (Grade 304)",
      dimensionsPreset: { height: 32, width: 18, depth: 18 },
      costBaseRate: 320
    },
    "B-3": {
      size: '3" Square Tubing',
      thickness: "2.0 mm",
      weightCategory: "Medium-duty SS (Grade 304)",
      dimensionsPreset: { height: 30, width: 72, depth: 36 },
      costBaseRate: 340
    },
    "M-2": {
      size: '2" Square Tubing',
      thickness: "2.0 mm",
      weightCategory: "Heavy-duty MS (Structural Grade)",
      dimensionsPreset: { height: 30, width: 60, depth: 30 },
      costBaseRate: 85
    },
    "M-3": {
      size: '2"x1" Rectangular Tubing',
      thickness: "1.6 mm",
      weightCategory: "Heavy-duty MS (Structural Grade)",
      dimensionsPreset: { height: 72, width: 36, depth: 18 },
      costBaseRate: 80
    }
  };

  return mappings[normalized] || null;
}
