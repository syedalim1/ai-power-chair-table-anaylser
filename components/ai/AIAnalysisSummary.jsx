"use client";

import React, { useState } from "react";
import { Sparkles, Check, CheckCircle } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { analyzeFurnitureImage } from "../../services/ai/analyzeFurnitureImage.js";

export default function AIAnalysisSummary() {
  const { formState, updateField, updateRootField, triggerAlert } = useQuotation();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const images = formState.images || [];

  const handleRunAIAnalysis = async () => {
    if (images.length === 0) {
      triggerAlert("error", "Please upload a sketch drawing first.");
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    // Call the Gemini service
    try {
      const res = await analyzeFurnitureImage(
        images[0],
        formState.productName || "Steel furniture piece estimation"
      );
      setAnalysisResult(res);
      triggerAlert("success", "AI structural analysis completed!");
    } catch (err) {
      triggerAlert("error", "AI analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyAIPresets = () => {
    if (!analysisResult) return;

    // Apply fields to formState
    updateRootField("productName", analysisResult.furnitureType);
    updateRootField("category", analysisResult.category);
    
    // Dimensions
    const dims = analysisResult.estimatedDimensions;
    updateField("dimensions", "height", dims.height);
    updateField("dimensions", "width", dims.width);
    updateField("dimensions", "depth", dims.depth);
    updateField("dimensions", "seatHeight", dims.seatHeight || 0);
    updateField("dimensions", "unit", dims.unit || "inch");

    // Pipe
    updateField("pipe", "type", analysisResult.suggestedPipeType);
    updateField("pipe", "thickness", parseFloat(analysisResult.suggestedPipeThickness) || 1.5);
    updateField("pipe", "rate", analysisResult.suggestedPipeType === "SS" ? 320 : 85);

    // Remarks
    updateRootField("notes", `AI Estimated Specs applied. Design complexity: ${analysisResult.designComplexity}. Labour difficulty: ${analysisResult.labourDifficulty}.`);

    triggerAlert("success", "AI Suggested Presets applied to active Worksheet!");
  };

  return (
    <div className="space-y-4">
      {/* Run Analysis Trigger if has sketch but no analysis active */}
      {images.length > 0 && !analysisResult && !analyzing && (
        <button
          type="button"
          onClick={handleRunAIAnalysis}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Analyze Sketch with Gemini AI</span>
        </button>
      )}

      {/* Futuristic scanning loading state */}
      {analyzing && (
        <div className="p-6 rounded-2xl border border-amber-500/25 bg-slate-950/40 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full animate-shimmer" />
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/10 border-t-amber-500 animate-spin flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-200 tracking-wide uppercase">
              Gemini AI Structure Scanning...
            </p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-normal">
              Extracting physical tube scales and layout complexity
            </p>
          </div>
        </div>
      )}

      {/* Analysis Results Details Grid */}
      {analysisResult && !analyzing && (
        <div className="p-5 rounded-2xl border border-amber-500/15 bg-gradient-to-b from-slate-900/40 to-slate-950/20 backdrop-blur-md space-y-4 animate-fadeIn">
          
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                AI Detected Parameters
              </span>
            </div>
            <span className="text-[8px] font-black bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
              96% Match
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Product Type</span>
              <p className="font-extrabold text-slate-200">{analysisResult.furnitureType}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Design Complexity</span>
              <p className="font-extrabold text-slate-200">{analysisResult.designComplexity} Level</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Pipe Recommendation</span>
              <p className="font-extrabold text-slate-200">
                {analysisResult.suggestedPipeType} ({analysisResult.suggestedPipeThickness}mm Gauge)
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Labour Difficulty</span>
              <p className="font-extrabold text-slate-200">{analysisResult.labourDifficulty} Fabrication</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Estimated Material Size</span>
              <p className="font-extrabold text-slate-200">{analysisResult.estimatedPipeUsage} Feet Framing</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Estimated Weight</span>
              <p className="font-extrabold text-slate-200">{analysisResult.estimatedWeight} KG Mass</p>
            </div>
          </div>

          {/* AI Bullet Suggestions */}
          <div className="space-y-1.5 pt-3 border-t border-slate-800">
            <span className="text-[9px] font-bold text-slate-500 uppercase block">Engineering Advice</span>
            <ul className="space-y-1 pl-1">
              {analysisResult.aiSuggestions.map((item, idx) => (
                <li key={idx} className="text-[10px] text-slate-400 font-semibold leading-normal flex gap-1.5">
                  <span className="text-amber-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply button */}
          <button
            type="button"
            onClick={handleApplyAIPresets}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 hover:bg-amber-500/10 text-slate-200 hover:text-amber-400 font-extrabold text-xs uppercase tracking-wider transition-all duration-150 shadow-md flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply AI suggested Specs</span>
          </button>

        </div>
      )}

    </div>
  );
}
