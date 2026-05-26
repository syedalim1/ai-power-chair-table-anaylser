"use client";

import React from "react";
import { Hammer } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";

export default function FactoryWorkflowForm() {
  const { formState, updateRootField } = useQuotation();

  return (
    <FormSection title="Internal Factory Fabrication Workflow Notes" icon={Hammer}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Worker prep notes */}
        <div className="space-y-1.5">
          <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Worker preparation & cutting notes
          </label>
          <textarea
            rows="3"
            placeholder="e.g. Ensure all square tube off-cuts are checked for size before cutting new stocks..."
            value={formState.workerNotes || ""}
            onChange={(e) => updateRootField("workerNotes", e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border font-bold leading-relaxed transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Welding / Grinding instructions */}
        <div className="space-y-1.5">
          <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Welding & grinding assembly instructions
          </label>
          <textarea
            rows="3"
            placeholder="e.g. TIG weld frame using SS 304 filler rods. Buffer mirror polish joints to match drawing spec..."
            value={formState.fabricationInstructions || ""}
            onChange={(e) => updateRootField("fabricationInstructions", e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border font-bold leading-relaxed transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
          />
        </div>
      </div>
    </FormSection>
  );
}
