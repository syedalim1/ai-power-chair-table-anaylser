import React from "react";

export default function PDFPipeCalculationTable({
  pipe = {},
  liveSummary = {},
  outputControls = {},
  isInternal = false
}) {
  const showPipeCalc = isInternal || outputControls.showPipeCalc;

  if (!showPipeCalc) return null;

  return (
    <div className="py-3 border-b border-slate-200 space-y-2 text-[10px] font-medium text-slate-600 leading-normal">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
        STRUCTURAL MATERIALS CUT LIST
      </span>

      <table className="w-full text-left border-collapse text-[10px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-[8px] text-slate-500">
            <th className="p-2">Material Type</th>
            <th className="p-2">Tube Shape</th>
            <th className="p-2 text-right">Length (Ft)</th>
            <th className="p-2 text-right">Thickness</th>
            <th className="p-2 text-right">Wastage</th>
            <th className="p-2 text-right">Net Weight</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
          <tr>
            <td className="p-2 uppercase font-extrabold text-slate-900">
              {pipe.type} Premium Steel
            </td>
            <td className="p-2">{pipe.shape} Tubing</td>
            <td className="p-2 text-right font-mono">{liveSummary.activePipeLength} Ft</td>
            <td className="p-2 text-right font-mono">{pipe.thickness} mm</td>
            <td className="p-2 text-right font-mono">{pipe.wastage}%</td>
            <td className="p-2 text-right font-mono font-extrabold text-slate-900">
              {liveSummary.totalPipeWeight} KG
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
