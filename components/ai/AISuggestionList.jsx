"use client";

import React, { useMemo } from "react";
import { Sparkles } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import { generateAISuggestions } from "../../services/ai/generateAISuggestions.js";
import AIWarningCard from "./AIWarningCard.jsx";

export default function AISuggestionList() {
  const { formState, liveSummary } = useQuotation();

  const warningsList = useMemo(() => {
    return generateAISuggestions(formState, liveSummary);
  }, [formState, liveSummary]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/15">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        </div>
        <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest block">
          Real-time Optimization Engine
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {warningsList.map((item, idx) => (
          <AIWarningCard
            key={idx}
            type={item.type}
            title={item.title}
            text={item.text}
            impact={item.impact}
          />
        ))}
      </div>
    </div>
  );
}
