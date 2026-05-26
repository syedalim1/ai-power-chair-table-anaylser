import React from "react";
import { Sun, Moon } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

export default function ThemeSwitcher() {
  const { darkMode, setDarkMode } = useQuotation();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full border transition-all ${
        darkMode
          ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-amber-400"
          : "bg-white border-slate-200 hover:bg-slate-105 text-slate-500"
      }`}
      title="Toggle visual style theme"
    >
      {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
    </button>
  );
}
