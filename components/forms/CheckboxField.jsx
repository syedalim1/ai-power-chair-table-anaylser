import React from "react";

export default function CheckboxField({
  label,
  checked,
  onChange,
  className = "",
  disabled = false
}) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer select-none ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded text-amber-500 border-slate-300 dark:border-slate-800 dark:bg-slate-950 focus:ring-amber-500 focus:ring-offset-slate-950"
      />
      {label && (
        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </span>
      )}
    </label>
  );
}
