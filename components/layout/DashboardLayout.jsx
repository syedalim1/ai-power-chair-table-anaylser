"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import FloatingQuickActions from "./FloatingQuickActions.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function DashboardLayout({ children }) {
  const {
    darkMode,
    alertMsg,
    factoryMode,
    setFactoryMode,
    triggerAlert,
    resetForm,
    setActiveTab,
    saveQuotation
  } = useQuotation();

  // Keyboard shortcut registers for industrial ease of use
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Shift + F: Factory mode
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setFactoryMode((prev) => {
          const next = !prev;
          triggerAlert("info", next ? "⚡ Factory High-Contrast Mode activated." : "Standard Workspace loaded.");
          return next;
        });
      }

      // Ctrl + Shift + N: Fresh Quote
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        resetForm();
        setActiveTab("new-quotation");
        triggerAlert("success", "Active worksheet cleared for a fresh quote.");
      }

      // Ctrl + Shift + S: Quick Save
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveQuotation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setFactoryMode, triggerAlert, resetForm, setActiveTab, saveQuotation]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
    } ${factoryMode ? "factory-mode-active" : ""}`}>

      {/* Scoped Factory Mode stylesheet injection */}
      {factoryMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          .factory-mode-active input, 
          .factory-mode-active select, 
          .factory-mode-active textarea {
            font-size: 13px !important;
            padding-top: 12px !important;
            padding-bottom: 12px !important;
            border-width: 2px !important;
            border-color: #f59e0b !important;
            background-color: rgba(245, 158, 11, 0.05) !important;
            color: #ffffff !important;
            font-weight: 800 !important;
          }
          .factory-mode-active button {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
            font-size: 11px !important;
            font-weight: 900 !important;
            border-width: 2px !important;
            border-color: #d97706 !important;
          }
          .factory-mode-active label {
            font-size: 10px !important;
            color: #fbbf24 !important;
            font-weight: 900 !important;
            letter-spacing: 0.1em !important;
          }
        `}} />
      )}
      
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

      {/* Floating actions FAB */}
      <FloatingQuickActions />

    </div>
  );
}
