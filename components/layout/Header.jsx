"use client";

import React from "react";
import { Menu, User, Zap } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function Header() {
  const {
    sidebarOpen,
    setSidebarOpen,
    companyInfo,
    darkMode,
    factoryMode,
    setFactoryMode,
    triggerAlert
  } = useQuotation();

  const handleFactoryToggle = () => {
    const nextVal = !factoryMode;
    setFactoryMode(nextVal);
    triggerAlert("info", nextVal ? "⚡ Factory High-Contrast Mode active." : "Standard Workspace active.");
  };

  return (
    <header className={`h-14 border-b shrink-0 flex items-center justify-between px-4 z-10 sticky top-0 backdrop-blur-md ${
      darkMode ? "bg-slate-950/80 border-slate-900" : "bg-slate-50/80 border-slate-200"
    }`}>
      {/* Brand Navigation Toggle */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-800/30 text-slate-455"
          title="Toggle sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
        <span className="font-extrabold text-[10px] md:text-xs tracking-widest uppercase text-slate-400">
          IMSI — <span className="text-amber-500 font-black">{companyInfo.name || "INDIAN MAKE STEEL INDUSTRIES"}</span>
        </span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Factory Mode Toggle */}
        <button
          onClick={handleFactoryToggle}
          className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 relative overflow-hidden group ${
            factoryMode
              ? "bg-amber-500 text-slate-950 border border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle High-Contrast Factory Mode"
        >
          <Zap className="w-3 h-3 fill-current shrink-0" />
          <span className="hidden sm:inline">Factory Mode</span>
        </button>

        {/* Dark/Light mode slider */}
        <ThemeSwitcher />

        {/* User profile Icon */}
        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-350 cursor-pointer">
          <User className="w-3.5 h-3.5" />
        </div>
      </div>
    </header>
  );
}
