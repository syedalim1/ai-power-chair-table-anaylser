import React from "react";

export default function PDFCustomerSection({ clientName, clientContact, clientAddress }) {
  return (
    <div className="text-[10px] text-slate-600 leading-normal border-b border-slate-200 py-3 font-medium">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mb-1">
        QUOTATION ISSUED TO
      </span>
      <p className="font-black text-slate-800 uppercase text-xs">
        {clientName || "VALUED CLIENT"}
      </p>
      <p className="mt-0.5">{clientAddress || "Delivery Address Not Specified"}</p>
      <p className="font-bold font-mono mt-1">
        Contact Mobile: <span className="text-slate-900">{clientContact || "N/A"}</span>
      </p>
    </div>
  );
}
