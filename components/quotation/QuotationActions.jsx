"use client";

import React, { useState } from "react";
import { Save, FileDown, RotateCcw, Printer, Share2, ClipboardCopy } from "lucide-react";
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
  const [internalPdfGenerating, setInternalPdfGenerating] = useState(false);

  const handlePdfTrigger = async (isInternal = false) => {
    if (!formState.productName.trim()) {
      triggerAlert("error", "Provide a Product Name before exporting.");
      return;
    }
    if (!formState.clientName.trim()) {
      triggerAlert("error", "Provide a Client Name before exporting.");
      return;
    }

    if (isInternal) {
      setInternalPdfGenerating(true);
    } else {
      setPdfGenerating(true);
    }
    
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

    await generateQuotationPDF(source, companyInfo, triggerAlert, isInternal);
    
    if (isInternal) {
      setInternalPdfGenerating(false);
    } else {
      setPdfGenerating(false);
    }
  };

  const handleQuickCopy = () => {
    const shareText = `*INDIAN MAKE STEEL INDUSTRIES*\nQuote No: ${formState.quoteNo}\nProduct: ${formState.productName}\nQty: ${formState.quantity} Unit(s)\nEst. Amount: ₹ ${Math.round(liveSummary.grandTotal).toLocaleString("en-IN")}\nContact: +91 9585745303`;
    navigator.clipboard.writeText(shareText);
    triggerAlert("success", "Quick quotation outline copied to clipboard!");
  };

  return (
    <div className="space-y-3">
      {/* Primary Actions Row */}
      <div className="flex gap-2">
        {/* Save Quote */}
        <button
          type="button"
          onClick={saveQuotation}
          className="flex-1 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4 shrink-0" />
          <span>Save Quote</span>
        </button>

        {/* Share Quick quote outline */}
        <button
          type="button"
          onClick={handleQuickCopy}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 transition-colors"
          title="Copy short text summary"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Reset Form */}
        <button
          type="button"
          onClick={resetForm}
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-850 dark:bg-slate-900 text-slate-400 hover:text-slate-205 transition-colors"
          title="Reset worksheet"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* PDF Generation Row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Export Customer PDF */}
        <button
          type="button"
          disabled={pdfGenerating || internalPdfGenerating}
          onClick={() => handlePdfTrigger(false)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 active:scale-95 text-slate-200 font-extrabold text-[10px] uppercase tracking-wider shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <FileDown className="w-3.5 h-3.5 shrink-0 text-amber-500" />
          <span>{pdfGenerating ? "Compiling..." : "Customer PDF"}</span>
        </button>

        {/* Export Internal Factory PDF */}
        <button
          type="button"
          disabled={pdfGenerating || internalPdfGenerating}
          onClick={() => handlePdfTrigger(true)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 active:scale-95 text-slate-200 font-extrabold text-[10px] uppercase tracking-wider shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <Printer className="w-3.5 h-3.5 shrink-0 text-amber-500" />
          <span>{internalPdfGenerating ? "Compiling..." : "Factory PDF"}</span>
        </button>
      </div>
    </div>
  );
}
