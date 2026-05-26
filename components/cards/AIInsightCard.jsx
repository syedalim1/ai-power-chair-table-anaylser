import React from "react";
import { Sparkles, Award } from "lucide-react";

export default function AIInsightCard({
  title = "Steel Optimization Opportunity",
  description = "Standardizing sizes reduces raw profile scraping overheads by up to 14%.",
  savingsValue = "₹ 1,250",
  type = "standard"
}) {
  return (
    <div className="p-4 rounded-2xl border bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-amber-500/10 text-white shadow-lg overflow-hidden relative group transition-all duration-300 hover:border-amber-500/20">
      
      {/* Laser glow highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />

      <div className="flex justify-between items-start gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest block">
              AI Insight
            </span>
          </div>
          <h4 className="font-extrabold text-[12px] text-slate-100 group-hover:text-amber-500 transition-colors">
            {title}
          </h4>
          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed pr-2">
            {description}
          </p>
        </div>

        {savingsValue && (
          <div className="text-right shrink-0">
            <span className="text-[8px] font-black text-slate-500 uppercase block tracking-wider">
              Est. Profit Gain
            </span>
            <span className="font-mono text-emerald-400 font-black text-sm block mt-0.5">
              +{savingsValue}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
