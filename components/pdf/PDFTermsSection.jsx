import React from "react";

export default function PDFTermsSection({
  terms,
  notes,
  workerNotes,
  fabricationInstructions,
  isInternal = false
}) {
  if (isInternal) {
    return (
      <div className="py-3 border-b border-slate-200 grid grid-cols-2 gap-4 text-[10px] text-slate-600 leading-normal font-medium">
        {/* Worker notes */}
        <div className="space-y-1">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
            WORKER PREPARATION NOTES
          </span>
          <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 italic font-mono text-[9px] text-slate-700 leading-relaxed min-h-[60px]">
            {workerNotes || "No specific preparation remarks specified. General MS/SS guidelines apply."}
          </p>
        </div>

        {/* Fabrication instructions */}
        <div className="space-y-1 border-l border-slate-100 pl-4">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
            WELDING & ASSEMBLY INSTRUCTIONS
          </span>
          <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 italic font-mono text-[9px] text-slate-700 leading-relaxed min-h-[60px]">
            {fabricationInstructions || "Clean all miter joints prior to TIG/CO2 welding. Ensure mirror buffing standard if SS."}
          </p>
        </div>
      </div>
    );
  }

  // Customer Terms render
  const termsList = (terms || "").split("\n").filter((t) => t.trim().length > 0);

  return (
    <div className="py-3 border-b border-slate-200 text-[9px] text-slate-500 leading-normal font-medium space-y-1.5">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
        QUOTATION TERMS & CONDITIONS
      </span>
      <ul className="space-y-0.5 list-disc pl-3 leading-relaxed font-semibold">
        {termsList.map((term, idx) => (
          <li key={idx}>{term}</li>
        ))}
        {termsList.length === 0 && (
          <li>Prices are inclusive of standard local custom fabrication policies.</li>
        )}
      </ul>
    </div>
  );
}
