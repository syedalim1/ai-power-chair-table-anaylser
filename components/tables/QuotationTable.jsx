"use client";

import React, { useState } from "react";
import { Edit2, Trash2, FileDown, Search, Filter } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { generateQuotationPDF } from "../../utils/pdfGenerator.js";

export default function QuotationTable({ limit = null, showFilters = true }) {
  const {
    quotations,
    editQuotation,
    deleteQuotation,
    companyInfo,
    triggerAlert
  } = useQuotation();

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = quotations.filter((q) => {
    const matchesSearch =
      q.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      q.productName?.toLowerCase().includes(search.toLowerCase()) ||
      q.quoteNo?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCat = catFilter === "All" || q.category === catFilter;
    
    return matchesSearch && matchesCat;
  });

  const visibleList = limit ? filtered.slice(0, limit) : filtered;

  const handlePdfExport = async (q) => {
    await generateQuotationPDF(q, companyInfo, triggerAlert);
  };

  return (
    <div className="space-y-4">
      {/* Search & filters controls */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-2">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by client, item, or quote no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Chair">Steel Chair</option>
              <option value="Table">Steel Table</option>
              <option value="Dining Set">Dining Sets</option>
              <option value="Rack">Display Rack</option>
              <option value="Office Furniture">Office Furniture</option>
              <option value="Custom Product">Custom Fabrication</option>
            </select>
          </div>
        </div>
      )}

      {/* Responsive Table Frame */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/10">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-850 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-3.5 font-bold">Quote No</th>
              <th className="p-3.5 font-bold">Client / Company</th>
              <th className="p-3.5 font-bold">Product Description</th>
              <th className="p-3.5 font-bold text-center">Qty</th>
              <th className="p-3.5 font-bold text-right">Est. Weight</th>
              <th className="p-3.5 font-bold text-right">Grand Total</th>
              <th className="p-3.5 font-bold text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-semibold">
            {visibleList.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                {/* Quote Number */}
                <td className="p-3.5 font-mono text-amber-500 font-black">{q.quoteNo}</td>
                
                {/* Client info */}
                <td className="p-3.5">
                  <div className="space-y-0.5">
                    <p className="text-slate-800 dark:text-slate-100 font-extrabold text-[12px]">{q.clientName}</p>
                    <p className="text-[10px] text-slate-400">{q.clientContact || "No contact"}</p>
                  </div>
                </td>

                {/* Product desc */}
                <td className="p-3.5">
                  <div className="space-y-0.5">
                    <p className="text-slate-800 dark:text-slate-100 font-extrabold">{q.productName}</p>
                    <p className="text-[9px] text-amber-500 uppercase font-black tracking-widest">{q.category}</p>
                  </div>
                </td>

                {/* Quantity */}
                <td className="p-3.5 text-center text-slate-700 dark:text-slate-300 font-black">{q.quantity}</td>

                {/* Weights */}
                <td className="p-3.5 text-right text-slate-700 dark:text-slate-350 font-mono">
                  {q.pipeWeight ? `${q.pipeWeight} kg` : "N/A"}
                </td>

                {/* Pricing totals */}
                <td className="p-3.5 text-right font-mono font-black text-slate-900 dark:text-slate-100">
                  ₹ {Math.round(q.grandTotal).toLocaleString("en-IN")}
                </td>

                {/* Action Buttons */}
                <td className="p-3.5 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => editQuotation(q)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Load in Worksheet editor"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={() => handlePdfExport(q)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Download PDF"
                    >
                      <FileDown className="w-3.5 h-3.5 text-amber-500" />
                    </button>

                    <button
                      onClick={() => deleteQuotation(q.id, q.quoteNo)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {visibleList.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400 font-bold uppercase tracking-wider">
                  No quotation records found matching search filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
