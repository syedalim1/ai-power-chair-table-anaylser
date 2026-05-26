"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function DashboardLayout({ children }) {
  const { darkMode, alertMsg } = useQuotation();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl border text-sm font-medium ${
              alertMsg.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400 backdrop-blur-md"
                : alertMsg.type === "error"
                ? "bg-rose-950/80 border-rose-500/30 text-rose-400 backdrop-blur-md"
                : "bg-slate-900/90 border-slate-700/50 text-slate-300 backdrop-blur-md"
            }`}
          >
            {alertMsg.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
            ) : (
              <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
            )}
            <span>{alertMsg.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar panel */}
        <Sidebar />

        {/* Workspace Body */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top header navbar */}
          <Header />

          {/* Main workspace slot */}
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

    </div>
  );
}
