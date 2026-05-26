"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import QuotationTable from "../tables/QuotationTable.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function RecentQuotations() {
  const { setActiveTab } = useQuotation();

  return (
    <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="font-extrabold text-sm uppercase tracking-wide">
            Recent Estimations
          </h3>
        </div>
        
        <button
          onClick={() => setActiveTab("saved-quotations")}
          className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
        >
          <span>View Archive</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Render table showing top 3 most recent entries without search filters */}
      <QuotationTable limit={3} showFilters={false} />
    </div>
  );
}
