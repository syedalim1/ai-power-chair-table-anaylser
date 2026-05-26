"use client";

import React, { useState } from "react";
import { Sliders, Sparkles, Image, Package, Hammer, Coins, FileText, Printer, ShieldCheck } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

// Layout components
import SummaryPanel from "./SummaryPanel.jsx";
import InlineCodeInput from "../forms/InlineCodeInput.jsx";
import DragDropUploader from "../upload/DragDropUploader.jsx";
import AIAnalysisSummary from "../ai/AIAnalysisSummary.jsx";
import InputField from "../forms/InputField.jsx";

// Previews
import CustomerQuotationPDF from "../pdf/CustomerQuotationPDF.jsx";
import InternalFactoryPDF from "../pdf/InternalFactoryPDF.jsx";

export default function QuotationForm() {
  const { formState, companyInfo, liveSummary, updateField, updateRootField } = useQuotation();
  
  // Tab control: "estimator" or "pdf-preview"
  const [viewMode, setViewMode] = useState("estimator");
  const [previewType, setPreviewType] = useState("customer"); // "customer" or "factory"

  const isEstimator = viewMode === "estimator";

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      
      {/* Tighter top mode switcher for worksheet / live vector print rendering */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-900/40 dark:border-slate-850/80 shadow-sm shrink-0">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("estimator")}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isEstimator
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>FABRICATION ESTIMATOR CONSOLE</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode("pdf-preview");
              setPreviewType("customer");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              !isEstimator && previewType === "customer"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CUSTOMER QUOTE LAYOUT</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode("pdf-preview");
              setPreviewType("factory");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              !isEstimator && previewType === "factory"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>FACTORY WORK ORDER</span>
          </button>
        </div>

        <div className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest hidden md:block">
          STATUS: <span className="text-amber-500 font-black">ESTIMATION READY</span>
        </div>
      </div>

      {/* Main Double Panel Workstation Layout */}
      {isEstimator ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start animate-fadeIn">
          
          {/* LEFT PANEL: High Density Inputs (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* SECTION 1 & 2: Upload Area & AI Extraction */}
            <div className="p-4 rounded-xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-850">
                <Image className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                  SECTION 1 — Reference Drawings Upload & AI Extraction
                </span>
              </div>
              
              <DragDropUploader />
              <AIAnalysisSummary />
            </div>

            {/* SECTION 3: Sizing Specifications & Shorthand Autocomplete Terminal */}
            <div className="p-4 rounded-xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-3">
              
              {/* Header with shorthand console directly integrated */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                    SECTION 2 — Skeletal Dimensions & Materials
                  </span>
                </div>
                
                {/* Console line wrapper */}
                <div className="w-full md:w-72">
                  <InlineCodeInput />
                </div>
              </div>

              {/* Tighter 4-column inputs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                
                <InputField
                  label="Client Name"
                  value={formState.clientName}
                  onChange={(val) => updateRootField("clientName", val)}
                  className="col-span-2"
                />

                <InputField
                  label="Product Name"
                  value={formState.productName}
                  onChange={(val) => updateRootField("productName", val)}
                  className="col-span-2"
                />

                {/* Sizing block */}
                <InputField
                  label="Height (inches)"
                  type="number"
                  value={formState.dimensions.height}
                  onChange={(val) => updateField("dimensions", "height", parseFloat(val) || 0)}
                />

                <InputField
                  label="Width (inches)"
                  type="number"
                  value={formState.dimensions.width}
                  onChange={(val) => updateField("dimensions", "width", parseFloat(val) || 0)}
                />

                <InputField
                  label="Depth (inches)"
                  type="number"
                  value={formState.dimensions.depth}
                  onChange={(val) => updateField("dimensions", "depth", parseFloat(val) || 0)}
                />

                <InputField
                  label="Seat Height (inches)"
                  type="number"
                  value={formState.dimensions.seatHeight}
                  onChange={(val) => updateField("dimensions", "seatHeight", parseFloat(val) || 0)}
                />

                {/* Pipe details block */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pipe Material</label>
                  <select
                    value={formState.pipe.type}
                    onChange={(e) => {
                      const t = e.target.value;
                      updateField("pipe", "type", t);
                      updateField("pipe", "rate", t === "SS" ? 320 : 85);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                  >
                    <option value="SS">Stainless Steel (SS)</option>
                    <option value="MS">Mild Steel (MS)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Tube Shape</label>
                  <select
                    value={formState.pipe.shape}
                    onChange={(e) => updateField("pipe", "shape", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                  >
                    <option value="Round">Round Tubing</option>
                    <option value="Square">Square Section</option>
                    <option value="Rectangle">Rectangular Section</option>
                  </select>
                </div>

                <InputField
                  label="Pipe Size (inches)"
                  value={formState.pipe.width}
                  onChange={(val) => updateField("pipe", "width", parseFloat(val) || 1.0)}
                />

                <InputField
                  label="Gauge Thickness (mm)"
                  type="number"
                  step="0.1"
                  value={formState.pipe.thickness}
                  onChange={(val) => updateField("pipe", "thickness", parseFloat(val) || 1.5)}
                />

                {/* Sheet details block */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Plate Type</label>
                  <select
                    value={formState.sheet.type}
                    onChange={(e) => {
                      const t = e.target.value;
                      updateField("sheet", "type", t);
                      updateField("sheet", "rate", t === "SS Sheet" ? 3800 : 2800);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                  >
                    <option value="None">No Sheet metal plate</option>
                    <option value="SS Sheet">SS Plate</option>
                    <option value="MS Sheet">MS Plate</option>
                  </select>
                </div>

                <InputField
                  label="Plate Thickness (mm)"
                  type="number"
                  step="0.5"
                  value={formState.sheet.thickness}
                  disabled={formState.sheet.type === "None"}
                  onChange={(val) => updateField("sheet", "thickness", parseFloat(val) || 1.5)}
                />

                <InputField
                  label="Plate Area (Qty)"
                  type="number"
                  step="0.1"
                  value={formState.sheet.qty}
                  disabled={formState.sheet.type === "None"}
                  onChange={(val) => updateField("sheet", "qty", parseFloat(val) || 0)}
                />

                <InputField
                  label="Batch Quantity"
                  type="number"
                  value={formState.quantity}
                  onChange={(val) => updateRootField("quantity", Math.max(1, parseInt(val) || 1))}
                />

              </div>

            </div>

            {/* SECTION 4: Costing */}
            <div className="p-4 rounded-xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-850">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                  SECTION 3 — Workshop Labour & Transit Charges
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                
                <InputField
                  label="Bending/Welding"
                  type="number"
                  value={formState.costing.labour}
                  onChange={(val) => updateField("costing", "labour", parseFloat(val) || 0)}
                />

                <InputField
                  label="Mirror Polish"
                  type="number"
                  value={formState.costing.polish}
                  onChange={(val) => updateField("costing", "polish", parseFloat(val) || 0)}
                />

                <InputField
                  label="Transport Flat"
                  type="number"
                  value={formState.costing.transport}
                  onChange={(val) => updateField("costing", "transport", parseFloat(val) || 0)}
                />

                <InputField
                  label="Packing/Wrapping"
                  type="number"
                  value={formState.costing.packing}
                  onChange={(val) => updateField("costing", "packing", parseFloat(val) || 0)}
                />

                <div className="col-span-2 sm:col-span-1 space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Wastage (%)</label>
                  <input
                    type="number"
                    value={formState.pipe.wastage}
                    onChange={(e) => updateField("pipe", "wastage", Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

              </div>

              {/* Tighter remark textbox for technician work orders */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-850">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                  Technician Work Order remarks (e.g. miter cuts, anti-rust undercoat)
                </label>
                <textarea
                  rows="2"
                  value={formState.notes}
                  onChange={(e) => updateRootField("notes", e.target.value)}
                  placeholder="Specify welding angles, structural stiffeners, or primer directives..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border font-bold leading-relaxed transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                />
              </div>

            </div>

          </div>

          {/* RIGHT PANEL: Live Sticky Estimation Panel */}
          <div className="lg:col-span-1">
            <SummaryPanel />
          </div>

        </div>
      ) : (
        /* Live A4 print viewports rendering */
        <div className="w-full flex justify-center items-start py-4 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-850 shadow-inner overflow-x-auto p-4 animate-fadeIn">
          {previewType === "customer" ? (
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
