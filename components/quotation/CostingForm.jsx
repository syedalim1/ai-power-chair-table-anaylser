"use client";

import React from "react";
import { Hammer } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function CostingForm() {
  const { formState, updateField } = useQuotation();
  const { labour, welding, grinding, polish, packing, transport } = formState.costing;

  const handleCostChange = (key, val) => {
    updateField("costing", key, Math.max(0, parseInt(val) || 0));
  };

  return (
    <FormSection title="Section 6 — Fabrication & Labour Costing" icon={Hammer}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        
        <InputField
          label="Labour Cost / Unit (₹)"
          type="number"
          value={labour}
          onChange={(val) => handleCostChange("labour", val)}
        />

        <InputField
          label="Welding Cost / Unit (₹)"
          type="number"
          value={welding}
          onChange={(val) => handleCostChange("welding", val)}
        />

        <InputField
          label="Grinding Cost / Unit (₹)"
          type="number"
          value={grinding}
          onChange={(val) => handleCostChange("grinding", val)}
        />

        <InputField
          label="Polish Cost / Unit (₹)"
          type="number"
          value={polish}
          onChange={(val) => handleCostChange("polish", val)}
        />

        <InputField
          label="Packing Cost / Unit (₹)"
          type="number"
          value={packing}
          onChange={(val) => handleCostChange("packing", val)}
        />

        <InputField
          label="Flat Transport Cost (₹)"
          type="number"
          value={transport}
          onChange={(val) => handleCostChange("transport", val)}
          description="Added once at grand total"
        />

      </div>
    </FormSection>
  );
}
