"use client";

import React, { useState, useEffect } from "react";
import { Menu, Calendar, Bell, User, Zap } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function Header() {
  const {
    sidebarOpen,
    setSidebarOpen,
    companyInfo,
    darkMode,
    dbSettings,
    factoryMode,
    setFactoryMode,
    triggerAlert
  } = useQuotation();

  const [timeStr, setTimeStr] = useState("");

  const handleFactoryToggle = () => {
    const nextVal = !factoryMode;
    setFactoryMode(nextVal);
    triggerAlert("info", nextVal ? "⚡ Factory High-Contrast Workspace activated." : "Standard Workspace loaded.");
  };

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleDateString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        }) +
          " | " +
          d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const timer = setInterval(tick, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={`h-16 border-b shrink-0 flex items-center justify-between px-6 z-10 sticky top-0 backdrop-blur-md ${
      darkMode ? "bg-slate-950/80 border-slate-900" : "bg-slate-50/80 border-slate-200"
    }`}>
      {/* Menu & Brand */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-800/30 text-slate-400 hover:text-slate-200"
          title="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-extrabold text-xs md:text-sm tracking-widest uppercase hidden sm:block text-slate-400">
          Manufacturing Estimator — <span className="text-slate-100 font-black">{companyInfo.name}</span>
        </h1>
      </div>

      {/* Widgets & Controls */}
      <div className="flex items-center gap-4">
        {/* Real-time Clock */}
        <div className="text-[11px] font-bold text-slate-400 bg-slate-900/50 dark:bg-slate-900 border dark:border-slate-800 rounded-full px-3 py-1.5 hidden md:flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>{timeStr}</span>
        </div>

        {/* Factory Mode Switch */}
        <button
          onClick={handleFactoryToggle}
          className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 relative overflow-hidden group ${
            factoryMode
              ? "bg-amber-500 text-slate-950 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle Factory High-Contrast Mode"
        >
          <Zap className={`w-3.5 h-3.5 ${factoryMode ? "fill-slate-950 animate-bounce" : ""}`} />
          <span className="hidden sm:inline">Factory Mode</span>
        </button>

        {/* Theme Switch */}
        <ThemeSwitcher />

        {/* Notifications mock */}
        <button className="p-2 rounded-full border border-slate-200 dark:border-slate-850 dark:bg-slate-900 text-slate-400 hover:text-amber-500 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
        </button>

        {/* DB Sync Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${dbSettings.isSyncEnabled && dbSettings.isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
          <span className="text-[10px] font-bold text-slate-400 uppercase hidden lg:inline tracking-wider">
            {dbSettings.isSyncEnabled && dbSettings.isConnected ? "Cloud Sync active" : "Local Archive"}
          </span>
        </div>

        {/* Profile Mock */}
        <div className="w-8 h-8 rounded-full bg-slate-800 border dark:border-slate-800 flex items-center justify-center text-slate-300 shadow cursor-pointer">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
