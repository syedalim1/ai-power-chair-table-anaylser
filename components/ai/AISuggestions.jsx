"use client";

import React from "react";
import { Sparkles, Check } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

const DUMMY_AI_PRESETS = [
  { id: "opt-1", text: "Optimal MS Welding", desc: "Reduces labor by 10% through Sidco clustering.", impact: "Est: -₹150" },
  { id: "opt-2", text: "Group Logistics", desc: "Saves transport cost by grouping sideline freight.", impact: "Est: -₹500" },
  { id: "opt-3", text: "Bulk Gauge discount", desc: "SS rate discount from ₹320 to ₹310.", impact: "Est: ₹310/kg" }
];

export default function AISuggestions() {
  const { formState, updateField, triggerAlert } = useQuotation();

  const handleApplyAIPreset = (preset) => {
    if (preset.id === "opt-1") {
      updateField("costing", "welding", Math.max(0, formState.costing.welding - 100));
      triggerAlert("success", "AI Presets Applied: Optimized MS Welding!");
    } else if (preset.id === "opt-2") {
      updateField("costing", "transport", Math.max(0, formState.costing.transport - 500));
      triggerAlert("success", "AI Presets Applied: Grouped Logistics Consolidation!");
    } else if (preset.id === "opt-3") {
      updateField("pipe", "rate", 310);
      triggerAlert("success", "AI Presets Applied: Bulk Gauge Steel Rate Discount!");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
          Dynamic AI Tuning presets
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {DUMMY_AI_PRESETS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleApplyAIPreset(item)}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-900/40 transition-colors flex items-center justify-between text-left group"
          >
            <div>
              <p className="font-extrabold text-[11px] text-slate-700 dark:text-slate-200 group-hover:text-amber-500 transition-colors">
                {item.text}
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">
                {item.desc}
              </p>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black text-[9px] uppercase tracking-wider">
              {item.impact}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
