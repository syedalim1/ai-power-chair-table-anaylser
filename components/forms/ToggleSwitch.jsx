import React from "react";

export default function ToggleSwitch({
  label,
  checked,
  onChange,
  className = "",
  disabled = false
}) {
  return (
    <div className={`flex items-center justify-between ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {label && (
        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
          {label}
        </span>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none relative ${
          checked ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-800"
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full bg-white shadow-sm block transition-transform duration-150 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
