"use client";

import React from "react";
import { Clock, Hammer, Save, RefreshCw, FileText, Check } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

export default function ActivityTimeline() {
  const { quotations } = useQuotation();

  // Create real activity updates from quotations list combined with system mocks
  const activities = React.useMemo(() => {
    const list = [];

    // Map quotations into logs
    quotations.slice(0, 3).forEach((q, idx) => {
      list.push({
        id: `act-q-${idx}`,
        icon: FileText,
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        title: `Quotation Compiled`,
        desc: `Compiled estimate ${q.quoteNo} for M/s. ${q.clientName || "Valued Client"} - value ₹${Math.round(q.grandTotal).toLocaleString("en-IN")}`,
        time: `${idx + 1}h ago`
      });
    });

    // Append static baseline items to round out timeline
    list.push(
      {
        id: "act-sync",
        icon: RefreshCw,
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        title: "Cloud Sync Active",
        desc: "Coimbatore SIDCO database archive synced successfully with Google Cloud Storage.",
        time: "5h ago"
      },
      {
        id: "act-jigs",
        icon: Hammer,
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        title: "Template Registered",
        desc: "Preset 'Standard School Chair' applied to the active editor workspace.",
        time: "1d ago"
      }
    );

    return list.slice(0, 5); // top 5
  }, [quotations]);

  return (
    <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-2xl relative overflow-hidden flex flex-col min-h-[300px]">
      
      {/* Visual background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pb-3 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest block">
            Factory Activity Timeline
          </span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-widest">
          Live Log
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {activities.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative flex gap-3 group">
              {/* Stepper Vertical Connector line */}
              {idx !== activities.length - 1 && (
                <div className="absolute left-[15px] top-[30px] bottom-[-20px] w-0.5 bg-slate-100 dark:bg-slate-850" />
              )}
              
              {/* Event Icon Badge */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${act.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Event Details */}
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider truncate">
                    {act.title}
                  </h4>
                  <span className="text-[9px] text-slate-450 font-bold font-mono shrink-0">
                    {act.time}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  {act.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
