"use client";

import React from "react";
import { Scale } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function DimensionsForm() {
  const { formState, updateField } = useQuotation();
  const { height, width, depth, seatHeight, seatWidth, seatDepth, unit } = formState.dimensions;

  const toggleUnit = (newUnit) => {
    updateField("dimensions", "unit", newUnit);
  };

  const handleDimensionChange = (key, val) => {
    updateField("dimensions", key, Math.max(0, parseFloat(val) || 0));
  };

  const unitAction = (
    <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-[10px] md:text-[11px] font-bold">
      <button
        type="button"
        onClick={() => toggleUnit("inch")}
        className={`px-3 py-1 transition-all ${
          unit === "inch"
            ? "bg-amber-500 text-white"
            : "bg-slate-50 dark:bg-slate-950 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        INCH
      </button>
      <button
        type="button"
        onClick={() => toggleUnit("mm")}
        className={`px-3 py-1 transition-all ${
          unit === "mm"
            ? "bg-amber-500 text-white"
            : "bg-slate-50 dark:bg-slate-950 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        MM
      </button>
    </div>
  );

  return (
    <FormSection title="Section 3 — Frame Dimensions" icon={Scale} headerAction={unitAction}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Overall Height", val: height, key: "height" },
          { label: "Overall Width", val: width, key: "width" },
          { label: "Overall Depth", val: depth, key: "depth" },
          { label: "Seat Height (leg)", val: seatHeight, key: "seatHeight", conditional: true },
          { label: "Seat Width", val: seatWidth, key: "seatWidth", conditional: true },
          { label: "Seat Depth", val: seatDepth, key: "seatDepth", conditional: true }
        ].map((dim, idx) => {
          if (dim.conditional && formState.category !== "Chair" && formState.category !== "Dining Set") {
            return null;
          }
          return (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-850 dark:bg-slate-950/30 flex flex-col space-y-1 hover:border-slate-350 dark:hover:border-slate-800 transition-colors"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                {dim.label}
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  value={dim.val}
                  onChange={(e) => handleDimensionChange(dim.key, e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-md font-black tracking-tight focus:ring-0 p-0 text-amber-500 focus:outline-none"
                />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
