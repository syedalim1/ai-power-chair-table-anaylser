"use client";

import React from "react";
import { Scale, FileText, Printer, Save, Check } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { generateQuotationPDF } from "../../utils/pdfGenerator.js";

export default function SummaryPanel() {
  const {
    formState,
    companyInfo,
    liveSummary,
    saveQuotation,
    updateRootField,
    triggerAlert
  } = useQuotation();

  const handleExportPDF = async (isInternal = false) => {
    if (!formState.productName.trim() || !formState.clientName.trim()) {
      triggerAlert("error", "Provide Client and Product name before compiling PDF.");
      return;
    }

    const source = {
      ...formState,
      date: new Date().toISOString().split("T")[0],
      pipeLength: liveSummary.activePipeLength,
      pipeWeight: Number(liveSummary.totalPipeWeight),
      pipeCost: liveSummary.pipeCost,
      sheetCost: liveSummary.sheetCost,
      materialCost: liveSummary.materialCost,
      labourCostSum: liveSummary.labourCostSum,
      subtotal: liveSummary.subtotalPerItem,
      totalBeforeMarkup: liveSummary.totalBeforeMarkup,
      markupAmount: liveSummary.markupAmount,
      taxableAmount: liveSummary.taxableAmount,
      gstAmount: liveSummary.gstAmount,
      grandTotal: liveSummary.grandTotal
    };

    await generateQuotationPDF(source, companyInfo, triggerAlert, isInternal);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sticky top-6">
      {/* Sticky live estimation panel */}
      <div className="rounded-xl border bg-slate-900 border-slate-800 p-4 shadow-xl overflow-hidden relative text-white">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
              Live Estimation Calculator
            </span>
            <span className="text-[8px] font-black text-slate-400 uppercase">
              IMSI SIDCO Active
            </span>
          </div>

          {/* Core outputs list */}
          <div className="space-y-2.5 text-xs">
            
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Estimated Pipe Length:</span>
              <span className="font-mono text-slate-100 font-extrabold">{liveSummary.calculatedPipeLengthFeet} Ft</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Estimated Weight:</span>
              <span className="font-mono text-slate-100 font-extrabold">{liveSummary.totalWeight} KG</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Material Cost (SS/MS):</span>
              <span className="font-mono text-slate-100 font-extrabold">₹ {liveSummary.materialCost.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Labour Cost (Welder/Polisher):</span>
              <span className="font-mono text-slate-100 font-extrabold">₹ {liveSummary.labourCostSum.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">GST Integrated Tax:</span>
              <span className="font-mono text-slate-100 font-extrabold">₹ {liveSummary.gstAmount.toLocaleString("en-IN")}</span>
            </div>

            {/* In-Panel Markup adjustment slider */}
            <div className="py-1 border-t border-slate-800/60 mt-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-450 font-black uppercase tracking-wider">Markup Profit Margin:</span>
                <span className="font-mono text-amber-500 font-black">{formState.markup}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formState.markup}
                onChange={(e) => updateRootField("markup", parseInt(e.target.value) || 0)}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-1"
              />
            </div>

            {/* In-Panel GST Selector */}
            <div className="py-1">
              <div className="flex justify-between items-center text-[10px] mb-1">
                <span className="text-slate-450 font-black uppercase tracking-wider">Active GST Rate:</span>
                <span className="font-mono text-amber-500 font-black">{formState.gst}%</span>
              </div>
              <div className="flex gap-1">
                {[0, 5, 12, 18].map((rateOption) => (
                  <button
                    key={rateOption}
                    type="button"
                    onClick={() => updateRootField("gst", rateOption)}
                    className={`flex-1 py-1 rounded text-[9px] font-black border transition-colors ${
                      formState.gst === rateOption
                        ? "bg-amber-500 border-amber-500 text-slate-950"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {rateOption}%
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Final quotation price tag */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 mt-2 text-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">
              FINAL ESTIMATED QUOTATION ({formState.quantity} Item{formState.quantity > 1 ? "s" : ""})
            </span>
            <div className="text-2xl font-black text-amber-500 tracking-tight font-mono">
              ₹ {Math.round(liveSummary.grandTotal).toLocaleString("en-IN")}
            </div>
          </div>

          {/* Action buttons stack */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => handleExportPDF(false)}
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/10"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Customer Quote PDF</span>
            </button>

            <button
              onClick={() => handleExportPDF(true)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-650 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Factory Work Order</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={saveQuotation}
                className="py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all"
              >
                <Save className="w-3 h-3" />
                <span>Save Quote</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all"
              >
                <span>Print Sheet</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
