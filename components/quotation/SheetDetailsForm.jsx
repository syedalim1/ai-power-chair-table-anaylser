"use client";

import React from "react";
import { Layers } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";
import SelectDropdown from "../forms/SelectDropdown.jsx";
import useQuotation from "../../hooks/useQuotation.js";

const SHEET_TYPES = [
  { label: "SS (Stainless Steel Sheet)", value: "SS Sheet" },
  { label: "MS (Mild Steel Plate)", value: "MS Sheet" },
  { label: "Plywood Base Top", value: "Plywood" },
  { label: "None (No Sheet Panels)", value: "None" }
];

export default function SheetDetailsForm() {
  const { formState, updateField } = useQuotation();
  const { type, thickness, rate, qty, wastage } = formState.sheet;

  const handleSheetChange = (key, val) => {
    updateField("sheet", key, val);
  };

  return (
    <FormSection title="Section 5 — Sheet Panel / Backing details" icon={Layers}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <SelectDropdown
          label="Panel Sheet Material"
          value={type}
          options={SHEET_TYPES}
          onChange={(val) => {
            handleSheetChange("type", val);
            // Default rate/thicknesses
            if (val === "SS Sheet") {
              handleSheetChange("rate", 3500);
              handleSheetChange("thickness", 1.2);
            } else if (val === "MS Sheet") {
              handleSheetChange("rate", 2600);
              handleSheetChange("thickness", 1.6);
            } else if (val === "Plywood") {
              handleSheetChange("rate", 1800);
              handleSheetChange("thickness", 12.0);
            } else {
              handleSheetChange("rate", 0);
              handleSheetChange("thickness", 0);
              handleSheetChange("qty", 0);
              handleSheetChange("wastage", 0);
            }
          }}
        />

        {type !== "None" && (
          <>
            <InputField
              label="Sheet Thickness (mm)"
              type="number"
              step="any"
              value={thickness}
              onChange={(val) => handleSheetChange("thickness", Math.max(0.1, parseFloat(val) || 0.1))}
              className="animate-fadeIn"
            />

            <InputField
              label="8x4 Sheet Base Rate (₹)"
              type="number"
              value={rate}
              onChange={(val) => handleSheetChange("rate", Math.max(0, parseInt(val) || 0))}
              className="animate-fadeIn"
            />

            <InputField
              label="Qty Per Unit (fraction of 8x4)"
              type="number"
              step="any"
              value={qty}
              onChange={(val) => handleSheetChange("qty", Math.max(0, parseFloat(val) || 0))}
              className="animate-fadeIn"
            />

            <InputField
              label="Sheet Wastage (%)"
              type="number"
              value={wastage}
              onChange={(val) => handleSheetChange("wastage", Math.max(0, parseInt(val) || 0))}
              className="animate-fadeIn"
            />
          </>
        )}

      </div>
    </FormSection>
  );
}
