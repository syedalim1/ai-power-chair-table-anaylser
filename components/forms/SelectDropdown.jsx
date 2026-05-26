import React from "react";

export default function SelectDropdown({
  label,
  value,
  onChange,
  options = [],
  className = "",
  disabled = false
}) {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
          {label}
        </label>
      )}
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 text-sm rounded-xl border font-bold tracking-tight transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 disabled:opacity-50"
      >
        {options.map((opt) => {
          const val = typeof opt === "object" ? opt.value : opt;
          const labelText = typeof opt === "object" ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {labelText}
            </option>
          );
        })}
      </select>
    </div>
  );
}
