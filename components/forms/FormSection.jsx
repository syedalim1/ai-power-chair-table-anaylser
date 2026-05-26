import React from "react";

export default function FormSection({
  title,
  icon: Icon = null,
  headerAction = null,
  children,
  className = ""
}) {
  return (
    <div className={`p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-amber-500 shrink-0" />}
          <h3 className="font-extrabold text-sm uppercase tracking-wide">{title}</h3>
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
