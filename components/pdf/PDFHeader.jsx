import React from "react";
import { Hammer } from "lucide-react";

export default function PDFHeader({ quoteNo, date, isInternal = false }) {
  return (
    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
          <Hammer className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-black uppercase tracking-wider text-slate-950">
            INDIAN MAKE STEEL INDUSTRIES
          </h1>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Premium custom steel furniture & fabrications
          </p>
        </div>
      </div>

      <div className="text-right space-y-1">
        <div className="inline-block px-3 py-1 rounded bg-slate-950 text-white font-extrabold text-[10px] uppercase tracking-wider">
          {isInternal ? "Internal Work Order" : "Quotation Sheet"}
        </div>
        <p className="text-[10px] font-bold text-slate-600 font-mono block mt-1">
          No: <span className="text-slate-900 font-black">{quoteNo}</span>
        </p>
        <p className="text-[9px] text-slate-500 font-semibold font-mono">
          Date: {date}
        </p>
      </div>
    </div>
  );
}
