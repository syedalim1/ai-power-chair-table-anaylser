"use client";

import React, { useState } from "react";
import { Hammer, Sparkles, Sliders, FileText, Printer, Zap } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

// Forms stack
import CustomerDetailsForm from "./CustomerDetailsForm.jsx";
import ProductDetailsForm from "./ProductDetailsForm.jsx";
import DimensionsForm from "./DimensionsForm.jsx";
import PipeDetailsForm from "./PipeDetailsForm.jsx";
import SheetDetailsForm from "./SheetDetailsForm.jsx";
import CostingForm from "./CostingForm.jsx";
import OutputControlsForm from "./OutputControlsForm.jsx";
import FactoryWorkflowForm from "./FactoryWorkflowForm.jsx";

// Live A4 PDF previews
import CustomerQuotationPDF from "../pdf/CustomerQuotationPDF.jsx";
import InternalFactoryPDF from "../pdf/InternalFactoryPDF.jsx";

// Sidebar summary panel
import SummaryPanel from "./SummaryPanel.jsx";
import InlineCodeInput from "../forms/InlineCodeInput.jsx";
import DragDropUploader from "../upload/DragDropUploader.jsx";
import FormSection from "../forms/FormSection.jsx";
import AIAnalysisSummary from "../ai/AIAnalysisSummary.jsx";
import ToggleSwitch from "../forms/ToggleSwitch.jsx";
import InputField from "../forms/InputField.jsx";

export default function QuotationForm() {
  const { formState, companyInfo, liveSummary, updateField, updateRootField } = useQuotation();
  
  // Local worksheet view: form, customer-pdf, internal-pdf
  const [viewMode, setViewMode] = useState("form");
  
  // Fast billing toggle
  const [isQuickMode, setIsQuickMode] = useState(false);

  const isForm = viewMode === "form";
  const isCustPdf = viewMode === "customer-pdf";
  const isFactPdf = viewMode === "internal-pdf";

  return (
    <div className="space-y-6">
      
      {/* Sleek glassmorphic tab selector at the top of the worksheet */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 rounded-2xl border bg-slate-100 border-slate-200 dark:bg-slate-900/50 dark:border-slate-850/80">
        <div className="flex flex-wrap gap-2">
          {/* Form console button */}
          <button
            type="button"
            onClick={() => setViewMode("form")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isForm
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Form entry Console</span>
          </button>

          {/* Customer PDF preview */}
          <button
            type="button"
            onClick={() => setViewMode("customer-pdf")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isCustPdf
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Customer A4 PDF Preview</span>
          </button>

          {/* Internal PDF preview */}
          <button
            type="button"
            onClick={() => setViewMode("internal-pdf")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isFactPdf
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Internal Factory work order</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest hidden md:block">
          Active Mode: <span className="text-amber-500 font-black">{viewMode.replace("-", " ")}</span>
        </div>
      </div>

      {/* Grid Dispatcher based on active View Mode */}
      {isForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fadeIn">
          
          {/* Left Columns: Forms Stack */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shorthand terminal console */}
            <div className="p-5 rounded-2xl border bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <InlineCodeInput />
                </div>
                <div className="text-[10px] text-slate-400 font-bold border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4 space-y-1">
                  <span className="text-amber-500 uppercase tracking-widest block text-[9px]">Shorthand Cheatsheet:</span>
                  <p>B-2 : SS Cafeteria Chair preset</p>
                  <p>M-2 : Heavy MS Workshop Table</p>
                  <p>M-3 : 5-Shelf Heavy MS Display Rack</p>
                </div>
              </div>
            </div>

            {/* Quick Quotation Mode toggle */}
            <div className="p-4 rounded-2xl border bg-slate-900 border-slate-800 text-white flex justify-between items-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
              <div className="space-y-0.5 relative z-10">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                  ⚡ Fast-Billing Quick Entry Mode
                </span>
                <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">
                  Simplified fast estimation mode for busy factory counters
                </p>
              </div>
              <div className="relative z-10">
                <ToggleSwitch
                  checked={isQuickMode}
                  onChange={(val) => setIsQuickMode(val)}
                />
              </div>
            </div>

            {isQuickMode ? (
              /* Simplified Quick Form */
              <div className="space-y-6 animate-fadeIn">
                <CustomerDetailsForm />
                <ProductDetailsForm />
                <DimensionsForm />
                
                {/* Fast pricing overrides */}
                <div className="p-5 rounded-2xl border bg-slate-950 border-slate-850 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-850">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest block">
                      ⚡ Quick Cost Presets
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Steel Base Rate per unit"
                      type="number"
                      value={formState.pipe.rate}
                      onChange={(val) => updateField("pipe", "rate", parseFloat(val) || 0)}
                    />
                    <InputField
                      label="Order Volume (Qty)"
                      type="number"
                      value={formState.quantity}
                      onChange={(val) => updateRootField("quantity", parseInt(val) || 1)}
                    />
                  </div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed pr-2">
                    * In Fast-Billing Mode, granular fabrication items (welding, grinding, buffing) and scrap metrics are pre-calculated using Coimbatore Sidco cluster averages.
                  </p>
                </div>
              </div>
            ) : (
              /* Full Granular workspace */
              <div className="space-y-6 animate-fadeIn">
                {/* Customer Details Form */}
                <CustomerDetailsForm />

                {/* Product Details Form */}
                <ProductDetailsForm />

                {/* Blueprint Sketch Uploader Panel */}
                <FormSection title="Visual reference drawings & blueprints" icon={Sparkles}>
                  <DragDropUploader />
                  <div className="mt-4 border-t border-slate-105 dark:border-slate-850 pt-4">
                    <AIAnalysisSummary />
                  </div>
                </FormSection>

                {/* Advanced Pricing Tiers & Output Selection Controls */}
                <OutputControlsForm />

                {/* Factory production remarks */}
                <FactoryWorkflowForm />

                {/* Dimensions Form */}
                <DimensionsForm />

                {/* Pipe Details Form */}
                <PipeDetailsForm />

                {/* Sheet Details Form */}
                <SheetDetailsForm />

                {/* Costing Form */}
                <CostingForm />
              </div>
            )}

          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="lg:col-span-1">
            <SummaryPanel />
          </div>

        </div>
      ) : (
        /* Render pixel-perfect A4 invoice layouts live on screen */
        <div className="w-full flex justify-center items-start py-6 bg-slate-100/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-inner overflow-x-auto p-4 animate-fadeIn">
          {isCustPdf ? (
            <CustomerQuotationPDF
              formState={formState}
              companyInfo={companyInfo}
              liveSummary={liveSummary}
            />
          ) : (
            <InternalFactoryPDF
              formState={formState}
              companyInfo={companyInfo}
              liveSummary={liveSummary}
            />
          )}
        </div>
      )}

    </div>
  );
}
