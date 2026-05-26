import React from "react";

export default function PDFLabourTable({
  costing = {},
  outputControls = {},
  isInternal = false
}) {
  const showLabourCost = isInternal || outputControls.showLabourCost;

  if (!showLabourCost) return null;

  return (
    <div className="py-3 border-b border-slate-200 space-y-2 text-[10px] font-medium text-slate-600 leading-normal">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
        FABRICATION LABOUR OVERHEADS
      </span>

      <table className="w-full text-left border-collapse text-[10px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-[8px] text-slate-500">
            <th className="p-2">Operation Description</th>
            <th className="p-2 text-right">Labour Unit Cost</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-800 font-mono">
          {costing.labour > 0 && (
            <tr>
              <td className="p-2 uppercase font-semibold text-slate-700 font-sans">Basic Bending & Cutting Jigs</td>
              <td className="p-2 text-right">₹ {costing.labour}</td>
            </tr>
          )}
          {costing.welding > 0 && (
            <tr>
              <td className="p-2 uppercase font-semibold text-slate-700 font-sans">Welding & Assembly</td>
              <td className="p-2 text-right">₹ {costing.welding}</td>
            </tr>
          )}
          {costing.grinding > 0 && (
            <tr>
              <td className="p-2 uppercase font-semibold text-slate-700 font-sans">Grinding & Joint Dressing</td>
              <td className="p-2 text-right">₹ {costing.grinding}</td>
            </tr>
          )}
          {costing.polish > 0 && (
            <tr>
              <td className="p-2 uppercase font-semibold text-slate-700 font-sans">Polishing & Buffet Finish</td>
              <td className="p-2 text-right">₹ {costing.polish}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
