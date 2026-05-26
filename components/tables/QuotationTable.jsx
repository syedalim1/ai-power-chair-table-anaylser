"use client";

import React, { useState, useMemo } from "react";
import { Edit2, Trash2, FileDown, Search, Filter, ArrowUpDown, Copy, Printer, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Filter, Sort, & Paginate state variables
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc, date-asc, amount-desc, amount-asc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Clone a quotation by clearing ID & prepending Copy to client name
  const handleDuplicate = (q) => {
    const cloneForEdit = {
      ...q,
      id: "",
      quoteNo: `QTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: `${q.clientName} (Copy)`
    };
    editQuotation(cloneForEdit);
    triggerAlert("success", `Cloned "${q.quoteNo}"! Loaded into active worksheet editor.`);
  };

  // Run dual pdf triggers directly from row action
  const handlePdfExport = async (q, isInternal = false) => {
    await generateQuotationPDF(q, companyInfo, triggerAlert, isInternal);
  };

  // Filter, sort list computations
  const processedList = useMemo(() => {
    // 1. Filtering
    let result = quotations.filter((q) => {
      const matchesSearch =
        (q.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.productName || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.quoteNo || "").toLowerCase().includes(search.toLowerCase());
      
      const matchesCat = catFilter === "All" || q.category === catFilter;
      
      return matchesSearch && matchesCat;
    });

    // 2. Sorting
    result.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === "date-asc") {
        return new Date(a.date || 0) - new Date(b.date || 0);
      }
      if (sortBy === "amount-desc") {
        return (b.grandTotal || 0) - (a.grandTotal || 0);
      }
      if (sortBy === "amount-asc") {
        return (a.grandTotal || 0) - (b.grandTotal || 0);
      }
      return 0;
    });

    return result;
  }, [quotations, search, catFilter, sortBy]);

  // Page index limits
  const paginatedList = useMemo(() => {
    if (limit) {
      return processedList.slice(0, limit);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedList.slice(startIndex, startIndex + itemsPerPage);
  }, [processedList, currentPage, limit]);

  // Total pages calculation
  const totalPages = Math.ceil(processedList.length / itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="space-y-4">
      {/* Search & filters controls */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-2">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search by client, item, or quote no..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset to page 1
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Sorters & Filters selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={catFilter}
                onChange={(e) => {
                  setCatFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-0 p-0 cursor-pointer"
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

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-880 px-2.5 py-1 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-0 p-0 cursor-pointer"
              >
                <option value="date-desc">Newest Compiled</option>
                <option value="date-asc">Oldest Compiled</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>
            </div>
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
              <th className="p-3.5 font-bold">Product Specs</th>
              <th className="p-3.5 font-bold text-center">Qty</th>
              <th className="p-3.5 font-bold text-right">Est. weight</th>
              <th className="p-3.5 font-bold text-right">Grand Total</th>
              <th className="p-3.5 font-bold text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-semibold">
            {paginatedList.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                {/* Quote Number */}
                <td className="p-3.5 font-mono text-amber-500 font-black">{q.quoteNo}</td>
                
                {/* Client info */}
                <td className="p-3.5">
                  <div className="space-y-0.5">
                    <p className="text-slate-800 dark:text-slate-100 font-extrabold text-[12px] uppercase">{q.clientName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{q.clientContact || "No contact"}</p>
                  </div>
                </td>

                {/* Product description */}
                <td className="p-3.5">
                  <div className="space-y-0.5">
                    <p className="text-slate-800 dark:text-slate-100 font-extrabold pr-2">{q.productName}</p>
                    <div className="flex gap-2">
                      <span className="text-[8px] text-amber-500 uppercase font-black tracking-widest">{q.category}</span>
                      {q.pricingMode && (
                        <span className="text-[8px] text-slate-400 font-mono">({q.pricingMode})</span>
                      )}
                    </div>
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
                    {/* Load editor */}
                    <button
                      onClick={() => editQuotation(q)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Load in Worksheet editor"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick duplicate */}
                    <button
                      onClick={() => handleDuplicate(q)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Duplicate / Clone quotation"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Export Customer PDF */}
                    <button
                      onClick={() => handlePdfExport(q, false)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Export Customer PDF"
                    >
                      <FileDown className="w-3.5 h-3.5 text-amber-500" />
                    </button>

                    {/* Export Internal PDF */}
                    <button
                      onClick={() => handlePdfExport(q, true)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Export Internal Factory PDF"
                    >
                      <Printer className="w-3.5 h-3.5 text-indigo-400" />
                    </button>

                    {/* Delete */}
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

            {paginatedList.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400 font-bold uppercase tracking-wider">
                  No quotation records found matching search filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {!limit && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-850 pt-4 text-xs font-semibold text-slate-400">
          <span>
            Page <span className="text-amber-500 font-black">{currentPage}</span> of <span className="text-slate-600 dark:text-slate-300 font-bold">{totalPages}</span>
          </span>
          <div className="inline-flex gap-1.5">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-850 text-slate-400 hover:text-amber-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    currentPage === pageNumber
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "border-slate-200 dark:border-slate-850 text-slate-400 hover:text-amber-500"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-850 text-slate-400 hover:text-amber-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
