"use client";

import React from "react";
import { QuotationProvider, useQuotation } from "../store/QuotationContext.js";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import DashboardStats from "../components/dashboard/DashboardStats.jsx";
import RecentQuotations from "../components/dashboard/RecentQuotations.jsx";
import RevenueOverview from "../components/dashboard/RevenueOverview.jsx";
import AIRecommendationPanel from "../components/ai/AIRecommendationPanel.jsx";
import QuotationForm from "../components/quotation/QuotationForm.jsx";
import QuotationTable from "../components/tables/QuotationTable.jsx";
import InputField from "../components/forms/InputField.jsx";
import ToggleSwitch from "../components/forms/ToggleSwitch.jsx";
import FormSection from "../components/forms/FormSection.jsx";
import AIInsightCard from "../components/cards/AIInsightCard.jsx";
import { Layers, Database, Globe, Building2, Landmark, ShieldCheck } from "lucide-react";

// Local templates definitions
const PRESET_TEMPLATES = [
  {
    id: "temp-1",
    name: "Premium SS Cafeteria Chair",
    category: "Chair",
    quantity: 10,
    notes: "Stainless steel frame with premium mirror polish. Applied standard cafeteria blueprints.",
    dimensions: { height: 32, width: 18, depth: 18, seatHeight: 18, seatWidth: 18, seatDepth: 16, unit: "inch" },
    pipe: { type: "SS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.5, rate: 320, wastage: 10 },
    sheet: { type: "SS Sheet", thickness: 1.2, rate: 3500, qty: 0.15, wastage: 10 },
    costing: { labour: 250, welding: 150, grinding: 100, polish: 250, packing: 50, transport: 500 },
    markup: 25,
    gst: 18
  },
  {
    id: "temp-2",
    name: "Heavy Duty MS Work Table",
    category: "Table",
    quantity: 5,
    notes: "Robust workshop table with heavy steel columns and MS top. Ideal for industrial assembly lines.",
    dimensions: { height: 30, width: 60, depth: 30, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
    pipe: { type: "MS", shape: "Square", sizeUnit: "inch", width: 2, height: 0, thickness: 2.0, rate: 85, wastage: 8 },
    sheet: { type: "MS Sheet", thickness: 2.0, rate: 2800, qty: 0.6, wastage: 5 },
    costing: { labour: 600, welding: 450, grinding: 200, polish: 0, packing: 100, transport: 1200 },
    markup: 20,
    gst: 18
  },
  {
    id: "temp-3",
    name: "5-Tier Industrial Display Rack",
    category: "Rack",
    quantity: 3,
    notes: "Elegant heavy duty MS display rack. Fits warehouse storage or retail showroom bays.",
    dimensions: { height: 72, width: 36, depth: 18, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
    pipe: { type: "MS", shape: "Rectangle", sizeUnit: "inch", width: 2, height: 1, thickness: 1.6, rate: 80, wastage: 12 },
    sheet: { type: "MS Sheet", thickness: 1.6, rate: 2600, qty: 1.25, wastage: 8 },
    costing: { labour: 1200, welding: 600, grinding: 350, polish: 0, packing: 150, transport: 500 },
    markup: 15,
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
    case "dashboard":
      return (
        <div className="space-y-6 animate-fadeIn">
          {/* Dashboard Header Title */}
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Industrial Operations Dashboard</h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Sales Pipelines & Estimations Overview</p>
          </div>
          
          {/* Stats widgets */}
          <DashboardStats />

          {/* AI Optimization Insights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AIInsightCard
              title="Material scrap optimization opportunity"
              description="Standardizing cafeteria round tubes to 1.5mm thickness minimizes corner bending off-cut wastage from 10% to 8%."
              savingsValue="₹ 1,840"
            />
            <AIInsightCard
              title="Bulk jigs efficiency bonus"
              description="Batch bending jigs are recommended if total chair volume exceeds 20 units. This cuts welding manual labor time by 15%."
              savingsValue="₹ 3,200"
            />
            <AIInsightCard
              title="Logistics consolidation advice"
              description="Coimbatore SIDCO cluster routes show active transport pooling today. Consolidating delivery saves 20% flat logistics freight."
              savingsValue="₹ 1,500"
            />
          </div>

          {/* Analytics & Assistant Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueOverview />
            </div>
            <div className="lg:col-span-1">
              <AIRecommendationPanel />
            </div>
          </div>

          {/* Database summaries */}
          <RecentQuotations />
        </div>
      );

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
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Preset Blueprints</h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Pre-loaded industrial presets for rapid quotation loading</p>
          </div>

          {/* Grid of loadable cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESET_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-md flex flex-col justify-between hover:scale-[1.01] hover:border-slate-350 dark:hover:border-amber-500/25 transition-all duration-150 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">
                      {tpl.category} Blueprint
                    </span>
                    <Layers className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                      {tpl.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-relaxed">
                      {tpl.notes}
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p>📏 SIZE: {tpl.dimensions.height}"H x {tpl.dimensions.width}"W x {tpl.dimensions.depth}"D</p>
                    <p>🔧 PIPE: {tpl.pipe.type} {tpl.pipe.shape} {tpl.pipe.width}" ({tpl.pipe.thickness}mm)</p>
                    <p>🧱 PANEL: {tpl.sheet.type !== "None" ? `${tpl.sheet.type}` : "No panel sheet"}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-150 shadow-md flex items-center justify-center gap-1.5"
                >
                  Apply Blueprint Specs
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
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Configure company profiles, GST parameters, and database cloud sync portals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Col: Brand Settings */}
            <div className="lg:col-span-2 space-y-6">
              
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
              <FormSection title="Official Bank Payment instructions" icon={Landmark}>
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

            {/* Right Col: Cloud Database mock credentials */}
            <div className="lg:col-span-1 space-y-6">
              <FormSection title="Supabase Cloud Sync (Phase 2)" icon={Database}>
                
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400 leading-normal font-semibold">
                    Set up cloud database endpoints to synchronise manufacturing estimates across factory terminals.
                  </p>

                  <InputField
                    label="Supabase Endpoint URL"
                    value={dbSettings.supabaseUrl}
                    onChange={(val) => updateDbSettingsFields("supabaseUrl", val)}
                    placeholder="https://yourproject.supabase.co"
                  />

                  <InputField
                    label="Supabase Anon API Key"
                    value={dbSettings.supabaseAnonKey}
                    onChange={(val) => updateDbSettingsFields("supabaseAnonKey", val)}
                    placeholder="eyJhbGciOi..."
                    type="password"
                  />

                  <div className="pt-2">
                    <ToggleSwitch
                      label="Activate Cloud Auto-Sync"
                      checked={dbSettings.isSyncEnabled}
                      onChange={toggleDbSync}
                      disabled={!dbSettings.isConnected}
                    />
                  </div>

                  <button
                    type="button"
                    disabled={dbSettings.isTesting}
                    onClick={testDbConnection}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{dbSettings.isTesting ? "Verifying..." : "Verify & Sync Cloud"}</span>
                  </button>

                  <div className="p-3.5 rounded-xl bg-slate-950/20 border dark:border-slate-900/50 text-[10px] text-slate-400 leading-normal font-bold">
                    <p className="uppercase text-amber-500 text-[9px] tracking-wider mb-1">Architecture notice:</p>
                    Verification triggers real asynchronous connection tests, preparing schemas to bind quotations lists directly to cloud storage in Phase 2.
                  </div>
                </div>

              </FormSection>
            </div>

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
