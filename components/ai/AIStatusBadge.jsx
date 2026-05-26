import React from "react";
import { Sparkles } from "lucide-react";

export default function AIStatusBadge({
  status = "Active",
  modelName = "Gemini-3.5-High"
}) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black tracking-widest border border-amber-500/20 uppercase shadow-inner">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
      </span>
      <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
      <span>{modelName} : {status}</span>
    </div>
  );
}
