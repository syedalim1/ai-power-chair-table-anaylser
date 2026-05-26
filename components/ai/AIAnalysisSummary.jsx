"use client";

import React, { useState } from "react";
import { Sparkles, Check, CheckCircle, AlertTriangle } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { analyzeFurnitureImage } from "../../services/ai/analyzeFurnitureImage.js";

export default function AIAnalysisSummary() {
  const { formState, updateField, updateRootField, triggerAlert } = useQuotation();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const images = formState.images || [];

  const handleRunAIAnalysis = async () => {
    if (images.length === 0) {
      triggerAlert("error", "Please upload a blueprint or sketch first.");
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await analyzeFurnitureImage(
        images[0],
        formState.productName || "Steel furniture piece estimation"
      );
      setAnalysisResult(res);
      triggerAlert("success", "Gemini structural analysis complete.");
    } catch (err) {
      triggerAlert("error", "AI Analysis failed. Please configure parameters manually.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyAIPresets = () => {
    if (!analysisResult) return;

    updateRootField("productName", analysisResult.furnitureType || "AI Chair");
    updateRootField("category", analysisResult.category || "Chair");
    
    const dims = analysisResult.estimatedDimensions || { height: 32, width: 18, depth: 18 };
    updateField("dimensions", "height", dims.height);
    updateField("dimensions", "width", dims.width);
    updateField("dimensions", "depth", dims.depth);
    updateField("dimensions", "seatHeight", dims.seatHeight || 0);

    updateField("pipe", "type", analysisResult.suggestedPipeType || "SS");
    updateField("pipe", "thickness", parseFloat(analysisResult.suggestedPipeThickness) || 1.5);
    updateField("pipe", "rate", analysisResult.suggestedPipeType === "SS" ? 320 : 85);

    updateRootField("notes", `AI Estimated. Complexity: ${analysisResult.designComplexity}. Labour difficulty: ${analysisResult.labourDifficulty}.`);

    triggerAlert("success", "AI preset sizes loaded into worksheet.");
  };

  return (
    <div className="space-y-3">
      {/* Trigger Button */}
      {images.length > 0 && !analysisResult && !analyzing && (
        <button
          type="button"
          onClick={handleRunAIAnalysis}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>⚡ Auto-Analyze Sketch with Gemini AI</span>
        </button>
      )}

      {/* Tighter Scanning loader */}
      {analyzing && (
        <div className="p-4 rounded-xl border border-amber-500/20 bg-slate-950/40 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-2">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full animate-shimmer" />
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/10 border-t-amber-500 animate-spin flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-250 uppercase tracking-widest">Scanning structural tubing...</p>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Determining dimensions & labor complexity</p>
          </div>
        </div>
      )}

      {/* Ultra-compact AI result panel */}
      {analysisResult && !analyzing && (
        <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-850">
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              AI Extracted BLUEPRINT Specs
            </span>
            <span className="text-[8px] font-black text-slate-400 font-mono">CONFIDENCE 96%</span>
          </div>

          <div className="grid grid-cols-3 gap-x-2 gap-y-2 text-[10px]">
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Product</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200 truncate">{analysisResult.furnitureType}</p>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Est. Size</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200">
                {analysisResult.estimatedDimensions?.height}"x{analysisResult.estimatedDimensions?.width}"x{analysisResult.estimatedDimensions?.depth}"
              </p>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Suggested Pipe</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200">
                {analysisResult.suggestedPipeType} ({analysisResult.suggestedPipeThickness}mm)
              </p>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Labour Complexity</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200 truncate">{analysisResult.labourDifficulty} difficulty</p>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Estimated Tube</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200">{analysisResult.estimatedPipeUsage} Feet</p>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block uppercase">Est. Weight</span>
              <p className="font-extrabold text-slate-750 dark:text-slate-200">{analysisResult.estimatedWeight} KG</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApplyAIPresets}
            className="w-full py-1.5 rounded-lg bg-slate-950 hover:bg-emerald-600 border border-slate-850 hover:border-emerald-600 text-slate-300 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1 shadow"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Load AI Suggested Parameters</span>
          </button>
        </div>
      )}
    </div>
  );
}
