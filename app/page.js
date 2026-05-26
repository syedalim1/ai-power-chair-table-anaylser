"use client";

import React from "react";
import { QuotationProvider, useQuotation } from "../store/QuotationContext.js";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import QuotationForm from "../components/quotation/QuotationForm.jsx";
import QuotationTable from "../components/tables/QuotationTable.jsx";
import InputField from "../components/forms/InputField.jsx";
import ToggleSwitch from "../components/forms/ToggleSwitch.jsx";
import FormSection from "../components/forms/FormSection.jsx";
import { Layers, Database, Globe, Building2, Landmark, ShieldCheck } from "lucide-react";

// Local templates definitions
// Local templates definitions
const PRESET_TEMPLATES = [
  {
    id: "temp-1",
    name: "Standard School Chair",
    category: "Chair",
    quantity: 30,
    notes: "Applied standard school classroom sizing. Double-frame crossbars for robust student usage.",
    dimensions: { height: 30, width: 16, depth: 16, seatHeight: 16, seatWidth: 16, seatDepth: 14, unit: "inch" },
    pipe: { type: "MS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.6, rate: 85, wastage: 8 },
    sheet: { type: "MS Sheet", thickness: 1.2, rate: 2500, qty: 0.12, wastage: 5 },
    costing: { labour: 150, welding: 100, grinding: 50, polish: 0, packing: 30, transport: 600 },
    markup: 20,
    gst: 18
  },
  {
    id: "temp-2",
    name: "SS Bistro Dining Chair",
    category: "Chair",
    quantity: 12,
    notes: "Stainless steel restaurant frame with mirror polish finishing. High corrosion-resistant design.",
    dimensions: { height: 34, width: 18, depth: 18, seatHeight: 18, seatWidth: 18, seatDepth: 16, unit: "inch" },
    pipe: { type: "SS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.5, rate: 320, wastage: 10 },
    sheet: { type: "SS Sheet", thickness: 1.2, rate: 3500, qty: 0.15, wastage: 10 },
    costing: { labour: 250, welding: 150, grinding: 100, polish: 250, packing: 50, transport: 400 },
    markup: 25,
    gst: 18
  },
  {
    id: "temp-3",
    name: "Ergonomic Office Chair Frame",
    category: "Chair",
    quantity: 25,
    notes: "Applied heavy MS office desk base. Pivot joint configurations preset.",
    dimensions: { height: 36, width: 20, depth: 20, seatHeight: 18, seatWidth: 20, seatDepth: 18, unit: "inch" },
    pipe: { type: "MS", shape: "Round", sizeUnit: "inch", width: 1.25, height: 0, thickness: 1.6, rate: 88, wastage: 6 },
    sheet: { type: "None", thickness: 0, rate: 0, qty: 0, wastage: 0 },
    costing: { labour: 280, welding: 120, grinding: 70, polish: 0, packing: 40, transport: 800 },
    markup: 18,
    gst: 18
  },
  {
    id: "temp-4",
    name: "Standard 6-Seater Dining Table",
    category: "Table",
    quantity: 2,
    notes: "Elegant cafe dining table. Cross-brace leg structure for premium aesthetics.",
    dimensions: { height: 30, width: 72, depth: 36, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
    pipe: { type: "SS", shape: "Square", sizeUnit: "inch", width: 3, height: 0, thickness: 2.0, rate: 340, wastage: 8 },
    sheet: { type: "SS Sheet", thickness: 1.5, rate: 3800, qty: 1.5, wastage: 5 },
    costing: { labour: 800, welding: 600, grinding: 300, polish: 600, packing: 150, transport: 1200 },
    markup: 30,
    gst: 18
  },
  {
    id: "temp-5",
    name: "Heavy Warehouse Storage Rack",
    category: "Rack",
    quantity: 4,
    notes: "5-Tier extremely heavy storage shelving. Configured for SIDCO loading limits.",
    dimensions: { height: 84, width: 48, depth: 24, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
    pipe: { type: "MS", shape: "Rectangle", sizeUnit: "inch", width: 2, height: 1, thickness: 2.0, rate: 82, wastage: 12 },
    sheet: { type: "MS Sheet", thickness: 2.0, rate: 2800, qty: 2.5, wastage: 5 },
    costing: { labour: 1500, welding: 800, grinding: 400, polish: 0, packing: 200, transport: 1500 },
    markup: 15,
    gst: 18
  },
  {
    id: "temp-6",
    name: "Heavy MS Outdoor Bench",
    category: "Custom Product",
    quantity: 8,
    notes: "MS framing for sidewalk park seating. Triple anti-rust primer undercoat recommended.",
    dimensions: { height: 32, width: 60, depth: 24, seatHeight: 16, seatWidth: 60, seatDepth: 18, unit: "inch" },
    pipe: { type: "MS", shape: "Round", sizeUnit: "inch", width: 1.5, height: 0, thickness: 2.0, rate: 85, wastage: 10 },
    sheet: { type: "MS Sheet", thickness: 2.0, rate: 2600, qty: 0.8, wastage: 8 },
    costing: { labour: 500, welding: 350, grinding: 150, polish: 0, packing: 80, transport: 1000 },
    markup: 20,
    gst: 18
  }
];

function AppContent() {
  const {
    activeTab,
    applyTemplate,
    companyInfo,
    updateCompanyInfo,
    dbSettings,
    updateDbSettingsFields,
    testDbConnection,
    toggleDbSync
  } = useQuotation();

  // Route Rendering router
  switch (activeTab) {
    case "new-quotation":
      return (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Estimation Worksheet</h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Configure dimensions, materials specs & labour costs</p>
          </div>
          
          {/* Estimation Form columns layout */}
          <QuotationForm />
        </div>
      );

    case "saved-quotations":
      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Quotation Archive</h2>
              <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Search, review, edit, or download vector invoice print sheets</p>
            </div>
            
            {/* Full database table */}
            <QuotationTable limit={null} showFilters={true} />
          </div>
        </div>
      );

    case "templates":
      return (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h2 className="text-base md:text-lg font-black uppercase tracking-wider">Quick Estimation Presets</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Select a furniture preset to immediately load skeletal parameters into your worksheet</p>
          </div>

          {/* High-density grid of quick loading preset micro-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PRESET_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="p-3.5 rounded-xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {tpl.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold font-mono">
                      {tpl.pipe.type} {tpl.pipe.shape}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 truncate">
                      {tpl.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      {tpl.notes}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1.5 border-t border-slate-100 dark:border-slate-850 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <div>📏 Size: {tpl.dimensions.height}"x{tpl.dimensions.width}"x{tpl.dimensions.depth}"</div>
                    <div>⚙️ Thickness: {tpl.pipe.thickness}mm</div>
                    <div className="col-span-2 truncate">🧱 Plate: {tpl.sheet.type !== "None" ? `${tpl.sheet.type}` : "No Sheet metal"}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    applyTemplate(tpl);
                    triggerAlert("success", `Loaded preset: ${tpl.name}`);
                  }}
                  className="mt-3 w-full py-1.5 rounded-lg bg-slate-950 hover:bg-amber-500 border border-slate-850 hover:border-amber-500 text-slate-300 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <span>⚡ Load Preset</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case "settings":
      return (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Application Settings</h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Configure company profiles, GST parameters, and default print branding</p>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Supplier Info */}
            <FormSection title="Company Brand Profile Settings" icon={Building2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Official Supplier Name"
                  value={companyInfo.name}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, name: val })}
                />
                <InputField
                  label="Registered GSTIN"
                  value={companyInfo.gstin}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, gstin: val })}
                />
                <InputField
                  label="Supplier Address"
                  value={companyInfo.address}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, address: val })}
                  className="sm:col-span-2"
                />
                <InputField
                  label="Contact Phone 1"
                  value={companyInfo.phone1}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, phone1: val })}
                />
                <InputField
                  label="Contact Phone 2"
                  value={companyInfo.phone2}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, phone2: val })}
                />
                <InputField
                  label="Official Support Email"
                  value={companyInfo.email}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, email: val })}
                  className="sm:col-span-2"
                />
              </div>
            </FormSection>

            {/* Bank accounts */}
            <FormSection title="Official Bank Payment Instructions" icon={Landmark}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Bank Name"
                  value={companyInfo.bankName}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, bankName: val })}
                />
                <InputField
                  label="Account Number"
                  value={companyInfo.accNo}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, accNo: val })}
                />
                <InputField
                  label="IFSC Code"
                  value={companyInfo.ifsc}
                  onChange={(val) => updateCompanyInfo({ ...companyInfo, ifsc: val })}
                />
              </div>
            </FormSection>

            {/* Terms and conditions */}
            <FormSection title="Standard Contract Terms & Conditions" icon={ShieldCheck}>
              <div className="space-y-1.5 w-full">
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Invoice terms (Split by new line)
                </label>
                <textarea
                  rows="6"
                  value={companyInfo.terms}
                  onChange={(e) => updateCompanyInfo({ ...companyInfo, terms: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border font-bold leading-relaxed transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                />
              </div>
            </FormSection>
          </div>
        </div>
      );

    default:
      return <div>Tab view not found.</div>;
  }
}

export default function Home() {
  return (
    <QuotationProvider>
      <DashboardLayout>
        <AppContent />
      </DashboardLayout>
    </QuotationProvider>
  );
}
