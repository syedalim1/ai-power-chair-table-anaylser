import { callGeminiAPI, FURNITURE_ANALYSIS_PROMPT } from "./geminiClient.js";

/**
 * Analyzes uploaded reference graphics/blueprints to detect structural parameters.
 *
 * @param {string} base64Image - Base64 data string representing the blueprint/image
 * @param {string} productName - Optional name descriptor to guide the model
 * @param {string} customApiKey - User-supplied override key
 * @returns {object} Structured estimation data
 */
export async function analyzeFurnitureImage(base64Image, productName = "", customApiKey = null) {
  const prompt = `${FURNITURE_ANALYSIS_PROMPT}
  
  Additional context:
  User's stated description: "${productName || "Steel furniture drawing reference"}"
  `;

  return await callGeminiAPI(prompt, base64Image, customApiKey);
}
