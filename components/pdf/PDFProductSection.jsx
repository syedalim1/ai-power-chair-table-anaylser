import React from "react";

export default function PDFProductSection({
  productName,
  category,
  quantity,
  dimensions,
  notes
}) {
  const { height, width, depth, seatHeight, seatWidth, seatDepth, unit } = dimensions;

  return (
    <div className="py-3 border-b border-slate-200 space-y-2 text-[10px] leading-normal font-medium text-slate-600">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
        PRODUCT SPECIFICATIONS OVERVIEW
      </span>

      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="col-span-2 space-y-1">
          <h4 className="font-extrabold text-slate-800 uppercase text-xs">
            {productName}
          </h4>
          <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-extrabold text-[8px] uppercase tracking-wider">
            Category: {category}
          </span>
          {notes && (
            <p className="text-[9px] text-slate-500 font-semibold italic mt-1.5 leading-relaxed">
              * Notes: {notes}
            </p>
          )}
        </div>

        <div className="space-y-1 border-l border-slate-100 pl-4">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
            DIMENSIONS PRESENTS
          </span>
          <p>Height: <span className="font-mono font-bold text-slate-800">{height} {unit}</span></p>
          <p>Width: <span className="font-mono font-bold text-slate-800">{width} {unit}</span></p>
          <p>Depth: <span className="font-mono font-bold text-slate-800">{depth} {unit}</span></p>
          {seatHeight > 0 && (
            <p>Seat Level: <span className="font-mono font-bold text-slate-800">{seatHeight} {unit}</span></p>
          )}
          <p className="font-bold text-slate-800 mt-2">
            Quantity: <span className="font-mono text-slate-900 font-black">{quantity} Units</span>
          </p>
        </div>
      </div>
    </div>
  );
}
