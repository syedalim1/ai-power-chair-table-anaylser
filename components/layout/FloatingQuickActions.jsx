"use client";

import React, { useState } from "react";
import { Plus, Zap, FileText, Printer, Save, RefreshCw, ChevronUp, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useQuotation from "../../hooks/useQuotation.js";
import { generateQuotationPDF } from "../../utils/pdfGenerator.js";

export default function FloatingQuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState,
    companyInfo,
    liveSummary,
    saveQuotation,
    resetForm,
    setActiveTab,
    factoryMode,
    setFactoryMode,
    triggerAlert
  } = useQuotation();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    triggerAlert("info", "Scrolled smoothly to top.");
  };

  const handlePdfExport = async (isInternal = false) => {
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

  const handleFactoryToggle = () => {
    const nextVal = !factoryMode;
    setFactoryMode(nextVal);
    triggerAlert("info", nextVal ? "⚡ Factory High-Contrast Mode activated." : "Standard Workspace loaded.");
  };

  const actions = [
    {
      icon: ChevronUp,
      label: "Scroll to Top",
      onClick: handleScrollTop,
      color: "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
    },
    {
      icon: Zap,
      label: "Toggle Factory Mode",
      onClick: handleFactoryToggle,
      color: factoryMode
        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
    },
    {
      icon: Printer,
      label: "Export Factory Work Order",
      onClick: () => handlePdfExport(true),
      color: "bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-500/30"
    },
    {
      icon: FileText,
      label: "Export Customer Quote PDF",
      onClick: () => handlePdfExport(false),
      color: "bg-amber-500 hover:bg-amber-600 text-white border-amber-400/30"
    },
    {
      icon: Save,
      label: "Quick Save Quotation",
      onClick: saveQuotation,
      color: "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500/30"
    },
    {
      icon: Plus,
      label: "Draft Fresh Quote",
      onClick: () => {
        resetForm();
        setActiveTab("new-quotation");
        triggerAlert("success", "Active worksheet cleared for fresh inputs.");
      },
      color: "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/50"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Quick actions stack */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="flex flex-col gap-2 mb-2 items-end"
          >
            {actions.map((act, idx) => {
              const Icon = act.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => {
                    act.onClick();
                    setIsOpen(false);
                  }}
                >
                  {/* Tooltip Label */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1 rounded bg-slate-950/95 border border-slate-850 text-[9px] font-black uppercase text-slate-300 tracking-widest pointer-events-none shadow-2xl backdrop-blur-md">
                    {act.label}
                  </span>
                  
                  {/* Action Icon Button */}
                  <button className={`p-3 rounded-full border shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${act.color}`}>
                    <Icon className="w-4 h-4 shrink-0" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button Core trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl border text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden group ${
          isOpen
            ? "bg-rose-600 border-rose-500 shadow-rose-600/20"
            : "bg-gradient-to-r from-amber-500 to-yellow-600 border-amber-400/50 shadow-amber-500/20"
        }`}
        title="Quick Actions Menu"
      >
        {/* Subtle radial shine inside FAB */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Plus className="w-5 h-5" />
        </motion.div>
      </button>

    </div>
  );
}
