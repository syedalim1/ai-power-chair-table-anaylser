"use client";

import React from "react";
import { Layers } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";
import SelectDropdown from "../forms/SelectDropdown.jsx";
import useQuotation from "../../hooks/useQuotation.js";

const CATEGORIES = [
  { label: "Steel Chair", value: "Chair" },
  { label: "Steel Table", value: "Table" },
  { label: "Dining Sets", value: "Dining Set" },
  { label: "Display Rack", value: "Rack" },
  { label: "Office Furniture", value: "Office Furniture" },
  { label: "Custom Fabrication", value: "Custom Product" }
];

export default function ProductDetailsForm() {
  const { formState, updateRootField } = useQuotation();

  return (
    <FormSection title="Section 2 — Product details" icon={Layers}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField
          label="Product / Job Description"
          value={formState.productName}
          onChange={(val) => updateRootField("productName", val)}
          placeholder="e.g. Cafeteria Chair Mirror SS"
          required
          className="sm:col-span-2"
        />

        <SelectDropdown
          label="Product Category"
          value={formState.category}
          onChange={(val) => updateRootField("category", val)}
          options={CATEGORIES}
        />

        <InputField
          label="Quantity Required"
          type="number"
          value={formState.quantity}
          onChange={(val) => updateRootField("quantity", Math.max(1, parseInt(val) || 1))}
        />

        <InputField
          label="Production Remarks / Notes"
          value={formState.notes}
          onChange={(val) => updateRootField("notes", val)}
          placeholder="Plating requirements, powder coating codes, special packing"
          className="sm:col-span-2"
        />
      </div>
    </FormSection>
  );
}
