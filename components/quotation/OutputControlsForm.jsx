"use client";

import React from "react";
import { Eye, Settings } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import FormSection from "../forms/FormSection.jsx";
import CheckboxField from "../forms/CheckboxField.jsx";
import SelectDropdown from "../forms/SelectDropdown.jsx";
import ToggleSwitch from "../forms/ToggleSwitch.jsx";

export default function OutputControlsForm() {
  const { formState, updateRootField, updateField } = useQuotation();

  const handleControlChange = (key, val) => {
    updateField("outputControls", key, val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Smart Output Controls Selection */}
      <FormSection title="Smart PDF & Preview Output Controls" icon={Eye}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <CheckboxField
            label="Show Wholesale Equivalent Price"
            checked={formState.outputControls?.showWholesale}
            onChange={(val) => handleControlChange("showWholesale", val)}
          />
          <CheckboxField
            label="Show Retail Equivalent Price"
            checked={formState.outputControls?.showRetail}
            onChange={(val) => handleControlChange("showRetail", val)}
          />
          <CheckboxField
            label="Show Dealer Equivalent Price"
            checked={formState.outputControls?.showDealer}
            onChange={(val) => handleControlChange("showDealer", val)}
          />
          <CheckboxField
            label="Show Internal profit margins"
            checked={formState.outputControls?.showProfit}
            onChange={(val) => handleControlChange("showProfit", val)}
          />
          <CheckboxField
            label="Show pipe scheduling details"
            checked={formState.outputControls?.showPipeCalc}
            onChange={(val) => handleControlChange("showPipeCalc", val)}
          />
          <CheckboxField
            label="Show item labour sums"
            checked={formState.outputControls?.showLabourCost}
            onChange={(val) => handleControlChange("showLabourCost", val)}
          />
          <CheckboxField
            label="Show total physical weights"
            checked={formState.outputControls?.showWeight}
            onChange={(val) => handleControlChange("showWeight", val)}
          />
          <CheckboxField
            label="Show flat freight transport"
            checked={formState.outputControls?.showTransport}
            onChange={(val) => handleControlChange("showTransport", val)}
          />
          <CheckboxField
            label="Show flat box packaging"
            checked={formState.outputControls?.showPacking}
            onChange={(val) => handleControlChange("showPacking", val)}
          />
          <CheckboxField
            label="Show miter cut list"
            checked={formState.outputControls?.showCutList}
            onChange={(val) => handleControlChange("showCutList", val)}
          />
        </div>
      </FormSection>

      {/* Advanced Pricing tier & GST Systems */}
      <FormSection title="Advanced Pricing & GST Settings" icon={Settings}>
        <div className="space-y-4 pt-1">
          {/* Pricing mode selector */}
          <SelectDropdown
            label="Commercial Pricing Tier"
            value={formState.pricingMode}
            onChange={(val) => updateRootField("pricingMode", val)}
            options={[
              { value: "retail", label: "Retail Standard Price Structure" },
              { value: "wholesale", label: "Wholesale Price Structure (10% Discount)" },
              { value: "dealer", label: "Dealer Price Structure (15% Discount)" },
              { value: "custom", label: "Custom Fabrication Pricing Structure" }
            ]}
          />

          {/* GST active switcher */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-850 dark:bg-slate-950/20">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                Commercial GST Calculations
              </span>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                Toggle standard tax charges
              </p>
            </div>
            <ToggleSwitch
              checked={formState.gstEnabled}
              onChange={(val) => updateRootField("gstEnabled", val)}
            />
          </div>
        </div>
      </FormSection>

    </div>
  );
}
