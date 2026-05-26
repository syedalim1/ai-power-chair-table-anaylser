import React from "react";
import { Terminal, ChevronRight } from "lucide-react";

export default function SmartSuggestionDropdown({ suggestions = [], onSelect }) {
  if (suggestions.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1.5 p-3 rounded-xl border text-[11px] font-bold tracking-tight text-center bg-slate-900 border-slate-800 text-slate-400 z-30 shadow-2xl backdrop-blur-md">
        No factory presets match your input. Try "B-2", "M-2", or "M-3".
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border overflow-hidden z-30 shadow-2xl bg-slate-900 border-slate-800 backdrop-blur-md divide-y divide-slate-850">
      <div className="px-3 py-1.5 bg-slate-950/60 flex items-center justify-between text-[9px] font-bold text-slate-500 tracking-wider uppercase">
        <span>Suggested Blueprints ({suggestions.length})</span>
        <span>Tap item to auto-fill</span>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {suggestions.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => onSelect(item)}
            className="w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-slate-850 transition-colors group"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/25 font-mono text-[9px] font-black group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  {item.code}
                </span>
                <span className="font-extrabold text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal font-medium pl-0.5">
                {item.desc}
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-slate-500 group-hover:text-amber-500 transition-colors shrink-0 pl-2">
              <span className="text-[9px] font-bold uppercase tracking-wider hidden sm:inline">Apply</span>
              <ChevronRight className="w-4.5 h-4.5 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
