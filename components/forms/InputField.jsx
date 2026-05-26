import React from "react";

export default function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
  disabled = false,
  error = null
}) {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm rounded-xl border font-semibold tracking-tight transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 disabled:opacity-50 ${
          error ? "border-rose-500 dark:border-rose-500" : ""
        }`}
      />
      {error && <p className="text-[10px] text-rose-500 font-semibold">{error}</p>}
    </div>
  );
}
