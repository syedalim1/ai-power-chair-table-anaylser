import React from "react";
import { AlertTriangle, TrendingDown, Scale, RefreshCw } from "lucide-react";

export default function AIWarningCard({
  type = "warning", // warning, danger, success, info
  title,
  text,
  impact
}) {
  const isDanger = type === "danger";
  const isWarning = type === "warning";
  const isSuccess = type === "success";

  let bgClass = "bg-amber-950/20 border-amber-500/20 text-amber-400";
  let icon = AlertTriangle;

  if (isDanger) {
    bgClass = "bg-rose-950/20 border-rose-500/25 text-rose-400 shadow-[0_4px_24px_rgba(244,63,94,0.05)]";
    icon = TrendingDown;
  } else if (isSuccess) {
    bgClass = "bg-emerald-950/20 border-emerald-500/20 text-emerald-400";
    icon = Scale;
  } else if (type === "info") {
    bgClass = "bg-blue-950/20 border-blue-500/20 text-blue-400";
    icon = RefreshCw;
  }

  const Icon = icon;

  return (
    <div className={`p-4 rounded-2xl border backdrop-blur-md flex gap-3 transition-all ${bgClass}`}>
      <div className="p-1.5 rounded-lg bg-current/5 border border-current/15 flex items-center justify-center shrink-0 h-fit mt-0.5">
        <Icon className="w-4 h-4 text-current" />
      </div>
      <div className="space-y-1">
        <h5 className="font-extrabold text-[11px] uppercase tracking-wider text-current">
          {title}
        </h5>
        <p className="text-[10px] text-slate-400 leading-normal font-semibold">
          {text}
        </p>
        {impact && (
          <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-current/5 text-[9px] font-black uppercase tracking-wider text-current">
            {impact}
          </span>
        )}
      </div>
    </div>
  );
}
