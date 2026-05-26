"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";
import SelectDropdown from "../forms/SelectDropdown.jsx";
import useQuotation from "../../hooks/useQuotation.js";

const GRADES = [
  { label: "SS (Stainless Steel 304)", value: "SS" },
  { label: "MS (Mild Steel Black)", value: "MS" }
];

const SHAPES = [
  { label: "Round Tubing (Cylinder)", value: "Round" },
  { label: "Square Profiling", value: "Square" },
  { label: "Rectangular Tube", value: "Rectangle" }
];

const THICKNESSES = [
  { label: "1.0 mm", value: 1.0 },
  { label: "1.2 mm", value: 1.2 },
  { label: "1.5 mm", value: 1.5 },
  { label: "1.6 mm", value: 1.6 },
  { label: "2.0 mm", value: 2.0 },
  { label: "2.5 mm", value: 2.5 },
  { label: "3.0 mm", value: 3.0 }
];

export default function PipeDetailsForm() {
  const { formState, updateField } = useQuotation();
  const { type, shape, sizeUnit, width, height, thickness, rate, wastage } = formState.pipe;

  const toggleSizeUnit = (newUnit) => {
    updateField("pipe", "sizeUnit", newUnit);
  };

  const handlePipeChange = (key, val) => {
    updateField("pipe", key, val);
  };

  const sizeUnitAction = (
    <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-[10px] md:text-[11px] font-bold">
      <button
        type="button"
        onClick={() => toggleSizeUnit("inch")}
        className={`px-3 py-1 transition-all ${
          sizeUnit === "inch"
            ? "bg-amber-500 text-white"
            : "bg-slate-50 dark:bg-slate-950 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        INCH
      </button>
      <button
        type="button"
        onClick={() => toggleSizeUnit("mm")}
        className={`px-3 py-1 transition-all ${
          sizeUnit === "mm"
            ? "bg-amber-500 text-white"
            : "bg-slate-50 dark:bg-slate-950 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        MM
      </button>
    </div>
  );

  return (
    <FormSection title="Section 4 — Steel Pipe details" icon={SettingsIcon} headerAction={sizeUnitAction}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <SelectDropdown
          label="Pipe Metal Grade"
          value={type}
          options={GRADES}
          onChange={(val) => {
            handlePipeChange("type", val);
            // Auto default rate per kg
            handlePipeChange("rate", val === "SS" ? 320 : 85);
          }}
        />

        <SelectDropdown
          label="Profile Shape"
          value={shape}
          options={SHAPES}
          onChange={(val) => handlePipeChange("shape", val)}
        />

        <InputField
          label={
            shape === "Round"
              ? `Outer Diameter (${sizeUnit})`
              : shape === "Square"
              ? `Side Size (${sizeUnit})`
              : `Width Size (${sizeUnit})`
          }
          type="number"
          step="any"
          value={width}
          onChange={(val) => handlePipeChange("width", Math.max(0.1, parseFloat(val) || 0.1))}
        />

        {shape === "Rectangle" && (
          <InputField
            label={`Height Size (${sizeUnit})`}
            type="number"
            step="any"
            value={height}
            onChange={(val) => handlePipeChange("height", Math.max(0.1, parseFloat(val) || 0.1))}
            className="animate-fadeIn"
          />
        )}

        <SelectDropdown
          label="Wall Thickness"
          value={thickness}
          options={THICKNESSES}
          onChange={(val) => handlePipeChange("thickness", parseFloat(val))}
        />

        <InputField
          label="Pipe Rate (₹ per KG)"
          type="number"
          value={rate}
          onChange={(val) => handlePipeChange("rate", Math.max(0, parseInt(val) || 0))}
        />

        <InputField
          label="Wastage Allowance (%)"
          type="number"
          value={wastage}
          onChange={(val) => handlePipeChange("wastage", Math.max(0, parseInt(val) || 0))}
        />

      </div>
    </FormSection>
  );
}
