"use client";

import React from "react";
import { Hammer, Sparkles } from "lucide-react";
import CustomerDetailsForm from "./CustomerDetailsForm.jsx";
import ProductDetailsForm from "./ProductDetailsForm.jsx";
import DimensionsForm from "./DimensionsForm.jsx";
import PipeDetailsForm from "./PipeDetailsForm.jsx";
import SheetDetailsForm from "./SheetDetailsForm.jsx";
import CostingForm from "./CostingForm.jsx";
import SummaryPanel from "./SummaryPanel.jsx";
import InlineCodeInput from "../forms/InlineCodeInput.jsx";
import DragDropUploader from "../upload/DragDropUploader.jsx";
import FormSection from "../forms/FormSection.jsx";
import AIAnalysisSummary from "../ai/AIAnalysisSummary.jsx";

export default function QuotationForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      {/* Scrollable Form Columns (Left 70% width) */}
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

        {/* Customer Details Form */}
        <CustomerDetailsForm />

        {/* Product Details Form */}
        <ProductDetailsForm />

        {/* Blueprint Sketch Uploader Panel */}
        <FormSection title="Visual reference drawings & blueprints" icon={Sparkles}>
          <DragDropUploader />
          <div className="mt-4 border-t border-slate-100 dark:border-slate-850 pt-4">
            <AIAnalysisSummary />
          </div>
        </FormSection>

        {/* Dimensions Form */}
        <DimensionsForm />

        {/* Pipe Details Form */}
        <PipeDetailsForm />

        {/* Sheet Details Form */}
        <SheetDetailsForm />

        {/* Costing Form */}
        <CostingForm />

      </div>

      {/* Sticky Estimation Panel (Right 30% width) */}
      <div className="lg:col-span-1">
        <SummaryPanel />
      </div>

    </div>
  );
}
