"use client";

import React from "react";
import { Scale, Tag, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";
import useQuotation from "../../hooks/useQuotation.js";
import QuotationActions from "./QuotationActions.jsx";
import ToggleSwitch from "../forms/ToggleSwitch.jsx";
import AISuggestionList from "../ai/AISuggestionList.jsx";

export default function SummaryPanel() {
  const { formState, updateRootField, liveSummary } = useQuotation();

  return (
    <div className="space-y-6 sticky top-20">
      
      {/* Dynamic pricing card */}
      <div className="rounded-2xl border bg-slate-900 border-slate-800 p-5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden relative text-white">
        
        {/* Pulse accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Live estimation
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold tracking-wider uppercase">
              <Scale className="w-3 h-3" />
              <span>{liveSummary.totalWeight} KG total</span>
            </div>
          </div>

          {/* Grand Total Value */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
              Grand Total ({formState.quantity} unit{formState.quantity > 1 ? "s" : ""})
            </span>
            <div className="text-3xl font-black text-amber-500 tracking-tight flex items-baseline gap-1">
              <span className="text-lg">₹</span>
              <span>{Math.round(liveSummary.grandTotal).toLocaleString("en-IN")}</span>
              <span className="text-xs text-slate-500 font-bold ml-1 font-mono">
                ({formState.pipe.type}/{formState.sheet.type !== "None" ? "Sheet" : "Frame"})
              </span>
            </div>
          </div>

          {/* Row summaries */}
          <div className="space-y-2.5 text-xs border-t border-slate-800/80 pt-3.5 divide-y divide-slate-800/40">
            
            <div className="flex justify-between items-center py-1.5 first:pt-0">
              <span className="text-slate-400 font-bold">Estimated Pipe Length:</span>
              <span className="font-mono text-slate-200">{liveSummary.calculatedPipeLengthFeet} Ft</span>
            </div>

            {/* Manual length override switch */}
            <div className="py-2.5 space-y-2">
              <ToggleSwitch
                label="Override pipe length manually"
                checked={formState.isPipeLengthOverridden}
                onChange={(val) => updateRootField("isPipeLengthOverridden", val)}
              />
              
              {formState.isPipeLengthOverridden && (
                <div className="flex items-center gap-2 mt-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800 animate-fadeIn">
                  <input
                    type="number"
                    step="any"
                    value={formState.manualPipeLength}
                    onChange={(e) => updateRootField("manualPipeLength", Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-none outline-none font-mono text-xs text-amber-500 focus:ring-0 p-0"
                    placeholder="Enter manual feet..."
                  />
                  <span className="text-[9px] font-extrabold text-slate-500">FEET</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-bold">Pipe Unit weight:</span>
              <span className="font-mono text-slate-200">{liveSummary.kgPerMeter} kg/m</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-bold">Materials Total Cost:</span>
              <span className="font-mono text-slate-200">₹ {liveSummary.materialCost}</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-bold">Fabrication Labour/Unit:</span>
              <span className="font-mono text-slate-200">₹ {liveSummary.labourCostSum}</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-bold">Gross Subtotal per unit:</span>
              <span className="font-mono text-slate-200">₹ {liveSummary.subtotalPerItem}</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-bold">Logistics / Freight flat:</span>
              <span className="font-mono text-slate-200">₹ {formState.costing.transport}</span>
            </div>

            {/* Markup adjustment slider */}
            <div className="py-2.5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Profit Markup Margin:</span>
                <span className="font-mono text-amber-500 font-black">{formState.markup}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formState.markup}
                onChange={(e) => updateRootField("markup", parseInt(e.target.value) || 0)}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Tax / GST adjustment */}
            <div className="py-2.5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Commercial GST Rate:</span>
                <span className="font-mono text-amber-500 font-black">{formState.gst}%</span>
              </div>
              <div className="flex gap-2">
                {[0, 5, 12, 18].map((rateOption) => (
                  <button
                    key={rateOption}
                    type="button"
                    onClick={() => updateRootField("gst", rateOption)}
                    className={`flex-1 py-1 rounded text-[10px] font-black border transition-colors ${
                      formState.gst === rateOption
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {rateOption}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="text-slate-400 font-bold">Taxable Amount:</span>
              <span className="font-mono text-slate-200">₹ {Math.round(liveSummary.taxableAmount)}</span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="text-slate-400 font-bold">Tax Amount (GST):</span>
              <span className="font-mono text-slate-200">₹ {liveSummary.gstAmount}</span>
            </div>

          </div>

          {/* Workflow Action Buttons */}
          <div className="pt-3 border-t border-slate-800">
            <QuotationActions />
          </div>

        </div>
      </div>

      {/* Dynamic AI Warnings optimization panel */}
      <AISuggestionList />

    </div>
  );
}
