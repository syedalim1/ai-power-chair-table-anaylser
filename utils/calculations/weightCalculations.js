/**
 * Calculates the unit weight of a steel pipe in kg/meter.
 *
 * @param {object} pipe - { type, shape, sizeUnit, width, height, thickness }
 * @returns {number} Weight in kg per meter
 */
export function calculateKgPerMeter(pipe) {
  const { type, shape, sizeUnit, width, height = 0, thickness } = pipe;

  // Convert outer dimensions to mm
  const wMm = sizeUnit === "inch" ? Number(width) * 25.4 : Number(width);
  const hMm = sizeUnit === "inch" ? Number(height) * 25.4 : Number(height);
  const tMm = Number(thickness) || 0;
  
  // Steel density in g/cm³ (SS: 7.93, MS: 7.85)
  const density = type === "SS" ? 7.93 : 7.85;
  
  let kgPerMeter = 0;

  if (shape === "Round") {
    // Area = PI * (D - T) * T
    // Weight (kg/m) = Area(mm²) * density(g/cm³) * 0.001
    kgPerMeter = Math.PI * (wMm - tMm) * tMm * density * 0.001;
  } else if (shape === "Square") {
    // Area = 4 * (Side - T) * T
    kgPerMeter = 4 * (wMm - tMm) * tMm * density * 0.001;
  } else if (shape === "Rectangle") {
    // Area = 2 * (W + H - 2*T) * T
    kgPerMeter = 2 * (wMm + hMm - 2 * tMm) * tMm * density * 0.001;
  }

  return Number(kgPerMeter.toFixed(4));
}

/**
 * Calculates total pipe weight in kg.
 *
 * @param {number} lengthFeet - Total pipe length in feet
 * @param {number} kgPerMeter - Weight per meter
 * @param {number} wastagePercent - Wastage allowance in percent (e.g. 10)
 * @returns {number} Total weight in kg (rounded to 2 decimal places)
 */
export function calculateTotalPipeWeight(lengthFeet, kgPerMeter, wastagePercent = 0) {
  // Convert length from feet to meters (1 foot = 0.3048 meters)
  const lengthMeters = Number(lengthFeet) * 0.3048;
  const rawWeight = kgPerMeter * lengthMeters;
  const totalWeight = rawWeight * (1 + Number(wastagePercent) / 100);
  
  return Number(totalWeight.toFixed(2));
}
