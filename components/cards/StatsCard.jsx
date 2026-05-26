import React from "react";
import { motion } from "framer-motion";

export default function StatsCard({
  label,
  value,
  description,
  icon: Icon,
  colorClass = "from-amber-600 to-amber-500",
  darkMode = true
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`p-5 rounded-2xl border relative overflow-hidden backdrop-blur-md ${
        darkMode
          ? "bg-slate-900/35 border-slate-900/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-white border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
            {label}
          </p>
          <p className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        
        {Icon && (
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${colorClass} flex items-center justify-center text-white shadow-md shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-[10px] md:text-[11px] text-slate-400 mt-3 font-semibold">
          {description}
        </p>
      )}
    </motion.div>
  );
}
