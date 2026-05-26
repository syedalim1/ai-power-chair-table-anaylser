/**
 * Estimates the required pipe length in feet based on furniture category and overall dimensions.
 *
 * @param {string} category - e.g. "Chair", "Table", "Dining Set", "Rack", "Office Furniture", "Custom Product"
 * @param {object} dimensions - { height, width, depth, seatHeight, unit }
 * @returns {number} Estimated pipe length in feet (rounded to 2 decimal places)
 */
export function estimatePipeFeet(category, dimensions) {
  const { height, width, depth, seatHeight = 0, unit = "inch" } = dimensions;

  // Convert inputs to numbers
  const h = Number(height) || 0;
  const w = Number(width) || 0;
  const d = Number(depth) || 0;
  const sh = Number(seatHeight) || 0;

  // Convert all dimensions to inches first
  const heightInches = unit === "inch" ? h : h / 25.4;
  const widthInches = unit === "inch" ? w : w / 25.4;
  const depthInches = unit === "inch" ? d : d / 25.4;
  const seatHeightInches = unit === "inch" ? sh : sh / 25.4;

  // Convert to feet (1 foot = 12 inches)
  const heightFt = heightInches / 12;
  const widthFt = widthInches / 12;
  const depthFt = depthInches / 12;
  const seatHeightFt = seatHeightInches / 12;

  let estFeet = 0;

  switch (category) {
    case "Chair":
      // 4 vertical frame legs + cross support at seat + seat perimeter support + backing
      estFeet = (heightFt * 2 + seatHeightFt * 2 + widthFt * 4 + depthFt * 4) * 1.15;
      break;
    case "Table":
      // 4 legs + top perimeter support + bottom cross braces
      estFeet = (heightFt * 4 + widthFt * 4 + depthFt * 4) * 1.1;
      break;
    case "Dining Set":
      // 1 standard table + 4 standard chairs pro-rata
      const tableFeet = (heightFt * 4 + widthFt * 4 + depthFt * 4) * 1.1;
      const singleChairFeet = (heightFt * 2 + seatHeightFt * 2 + widthFt * 4 + depthFt * 4) * 1.15;
      estFeet = tableFeet + 4 * singleChairFeet;
      break;
    case "Rack":
      // 4 upright supports + shelf cross bars (assumes standard 5 shelves)
      estFeet = (heightFt * 4 + widthFt * 10 + depthFt * 10) * 1.05;
      break;
    case "Office Furniture":
      // Executive desk support frames
      estFeet = (heightFt * 4 + widthFt * 3 + depthFt * 3) * 1.15;
      break;
    default:
      // Custom basic skeleton
      estFeet = (heightFt * 4 + widthFt * 4 + depthFt * 4) * 1.1;
      break;
  }

  return Number(estFeet.toFixed(2));
}
