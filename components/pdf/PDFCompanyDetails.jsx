import React from "react";

export default function PDFCompanyDetails({ info }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-600 leading-normal border-b border-slate-200 py-3 font-medium">
      <div className="space-y-0.5">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
          SUPPLIER DETAILS
        </span>
        <p className="font-extrabold text-slate-800 uppercase">{info.name}</p>
        <p className="pr-4">{info.address}</p>
        <p className="font-bold font-mono">GSTIN: <span className="text-slate-900">{info.gstin}</span></p>
      </div>

      <div className="space-y-0.5 border-l border-slate-100 pl-4">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
          PAYMENT DETAILS (NEFT/RTGS)
        </span>
        <p className="font-bold">Bank Name: <span className="text-slate-800 font-extrabold">{info.bankName}</span></p>
        <p className="font-mono">Account No: <span className="text-slate-800 font-extrabold">{info.accNo}</span></p>
        <p className="font-mono">IFSC Code: <span className="text-slate-800 font-extrabold">{info.ifsc}</span></p>
        <p className="font-mono">Mobiles: <span className="text-slate-800 font-extrabold">{info.phone1} / {info.phone2}</span></p>
      </div>
    </div>
  );
}
