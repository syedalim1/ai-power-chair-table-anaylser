"use client";

import React, { useState } from "react";
import { Save, FileDown, RotateCcw } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { generateQuotationPDF } from "../../utils/pdfGenerator.js";

export default function QuotationActions() {
  const {
    formState,
    companyInfo,
    triggerAlert,
    saveQuotation,
    resetForm,
    liveSummary
  } = useQuotation();

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handlePdfTrigger = async () => {
    if (!formState.productName.trim()) {
      triggerAlert("error", "Provide a Product Name before exporting.");
      return;
    }
    if (!formState.clientName.trim()) {
      triggerAlert("error", "Provide a Client Name before exporting.");
      return;
    }

    setPdfGenerating(true);
    
    // Inject dynamic summary calculations into local snapshot
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

    await generateQuotationPDF(source, companyInfo, triggerAlert);
    setPdfGenerating(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Save Quote */}
      <button
        type="button"
        onClick={saveQuotation}
        className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4 shrink-0" />
        <span>Save Quote</span>
      </button>

      {/* Export PDF */}
      <button
        type="button"
        disabled={pdfGenerating}
        onClick={handlePdfTrigger}
        className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-slate-200 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FileDown className="w-4 h-4 shrink-0 text-amber-500" />
        <span>{pdfGenerating ? "Generating..." : "Export PDF"}</span>
      </button>

      {/* Reset Form */}
      <button
        type="button"
        onClick={resetForm}
        className="p-3 rounded-xl border border-slate-200 dark:border-slate-850 dark:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
        title="Reset estimation inputs"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
