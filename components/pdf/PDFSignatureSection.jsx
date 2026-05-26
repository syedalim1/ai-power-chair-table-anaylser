import React from "react";

export default function PDFSignatureSection({ isInternal = false }) {
  return (
    <div className="pt-8 pb-4 flex justify-between items-end text-[10px] font-medium text-slate-600">
      <div>
        <p className="italic text-[9px] text-slate-400">
          * This is an digitally compiled {isInternal ? "work order" : "commercial estimate"} page.
        </p>
      </div>

      <div className="text-right space-y-12">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
          {isInternal ? "WORKSHOP SUPERVISOR" : "FOR INDIAN MAKE STEEL INDUSTRIES"}
        </span>
        <div className="border-t border-slate-900 w-44 pt-1 font-bold text-center text-slate-950 uppercase tracking-wider text-[9px]">
          AUTHORIZED SIGNATORY
        </div>
      </div>
    </div>
  );
}
