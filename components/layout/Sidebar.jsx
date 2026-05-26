"use client";

import React from "react";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Layers,
  Settings as SettingsIcon,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import useQuotation from "../../hooks/useQuotation.js";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "new-quotation", label: "New Quotation", icon: Plus },
  { id: "saved-quotations", label: "Saved Quotations", icon: FileText },
  { id: "templates", label: "Templates", icon: Layers },
  { id: "settings", label: "Settings", icon: SettingsIcon }
];

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    darkMode
  } = useQuotation();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`shrink-0 border-r transition-all duration-300 relative z-20 flex flex-col ${
        darkMode 
          ? "bg-slate-900/40 border-slate-900/80" 
          : "bg-white border-slate-200"
      }`}
    >
      {/* Brand Box */}
      <div className={`h-16 flex items-center border-b ${
        darkMode ? "border-slate-900/80" : "border-slate-200"
      } px-4 justify-between overflow-hidden`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
            I
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">IMSI</span>
              <span className="text-[10px] font-bold text-slate-400 leading-none">STEEL ESTIMATOR</span>
            </div>
          )}
        </div>
        
        {sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800/30 text-slate-400 hover:text-slate-200 hidden md:block"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 relative ${
                isActive
                  ? darkMode
                    ? "bg-slate-800 text-amber-500 shadow-inner"
                    : "bg-slate-100 text-amber-600"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
              {sidebarOpen && <span>{item.label}</span>}
              {isActive && sidebarOpen && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute right-2 w-1.5 h-6 rounded-full bg-amber-500"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {sidebarOpen && (
        <div className={`p-4 border-t ${
          darkMode ? "border-slate-900/80 bg-slate-900/20" : "border-slate-200 bg-slate-50"
        } text-center`}>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SIDCO Coimbatore</p>
          <p className="text-[9px] text-slate-500 mt-1 font-bold">Factory Edition v2.0</p>
        </div>
      )}
    </motion.aside>
  );
}
