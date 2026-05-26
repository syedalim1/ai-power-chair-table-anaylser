"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Lightbulb, CornerDownLeft } from "lucide-react";
import SmartSuggestionDropdown from "./SmartSuggestionDropdown.jsx";
import useQuotation from "../../hooks/useQuotation.js";

const SHORTHAND_DESCRIPTIONS = [
  { code: "B-2", name: "Premium SS Cafeteria Chair Blueprint", desc: "Skeletal SS 304 Round 1\" tubing. Ideal for commercial cafe dining setups.", category: "Chair" },
  { code: "B-3", name: "Standard 6-Seater Bistro Dining Table", desc: "SS Square 3\" tube framing. Mirror joints with high durability.", category: "Table" },
  { code: "M-2", name: "Heavy Duty MS Work Table Blueprint", desc: "MS Square 2\" tube layout. Robust frame for heavy industrial bays.", category: "Table" },
  { code: "M-3", name: "5-Tier Heavy Warehouse Display Rack", desc: "MS Rectangle 2\"x1\" tube skeletal framing. SIDCO standards.", category: "Rack" }
];

export default function InlineCodeInput() {
  const [codeVal, setCodeVal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const { applyTemplate, triggerAlert } = useQuotation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = SHORTHAND_DESCRIPTIONS.filter((item) =>
    item.code.toLowerCase().includes(codeVal.toLowerCase()) ||
    item.name.toLowerCase().includes(codeVal.toLowerCase())
  );

  const handleApplySuggestion = (item) => {
    let templateId = "temp-1"; // default B-2 Standard School Chair
    
    if (item.code === "B-2") templateId = "temp-2"; // SS Bistro Dining Chair
    if (item.code === "B-3") templateId = "temp-4"; // 6-Seater Table
    if (item.code === "M-2") templateId = "temp-1"; // Standard MS School Chair
    if (item.code === "M-3") templateId = "temp-5"; // MS Warehouse Rack

    const systemTemplates = {
      "temp-1": {
        name: "Standard School Chair",
        category: "Chair",
        quantity: 30,
        notes: "Classroom desk-chair framing. Double-frame crossbars preset.",
        dimensions: { height: 30, width: 16, depth: 16, seatHeight: 16, seatWidth: 16, seatDepth: 14, unit: "inch" },
        pipe: { type: "MS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.6, rate: 85, wastage: 8 },
        sheet: { type: "MS Sheet", thickness: 1.2, rate: 2500, qty: 0.12, wastage: 5 },
        costing: { labour: 150, welding: 100, grinding: 50, polish: 0, packing: 30, transport: 600 },
        markup: 20,
        gst: 18
      },
      "temp-2": {
        name: "SS Bistro Dining Chair",
        category: "Chair",
        quantity: 12,
        notes: "Stainless steel bistro chair. Applied standard cafeteria blueprints.",
        dimensions: { height: 34, width: 18, depth: 18, seatHeight: 18, seatWidth: 18, seatDepth: 16, unit: "inch" },
        pipe: { type: "SS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.5, rate: 320, wastage: 10 },
        sheet: { type: "SS Sheet", thickness: 1.2, rate: 3500, qty: 0.15, wastage: 10 },
        costing: { labour: 250, welding: 150, grinding: 100, polish: 250, packing: 50, transport: 400 },
        markup: 25,
        gst: 18
      },
      "temp-4": {
        name: "Standard 6-Seater Dining Table",
        category: "Table",
        quantity: 2,
        notes: "SS Cross-brace leg structure cafe table. Applied via code " + item.code,
        dimensions: { height: 30, width: 72, depth: 36, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
        pipe: { type: "SS", shape: "Square", sizeUnit: "inch", width: 3, height: 0, thickness: 2.0, rate: 340, wastage: 8 },
        sheet: { type: "SS Sheet", thickness: 1.5, rate: 3800, qty: 1.5, wastage: 5 },
        costing: { labour: 800, welding: 600, grinding: 300, polish: 600, packing: 150, transport: 1200 },
        markup: 30,
        gst: 18
      },
      "temp-5": {
        name: "Heavy Warehouse Storage Rack",
        category: "Rack",
        quantity: 4,
        notes: "5-Tier storage shelves. Applied warehouse presets.",
        dimensions: { height: 84, width: 48, depth: 24, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
        pipe: { type: "MS", shape: "Rectangle", sizeUnit: "inch", width: 2, height: 1, thickness: 2.0, rate: 82, wastage: 12 },
        sheet: { type: "MS Sheet", thickness: 2.0, rate: 2800, qty: 2.5, wastage: 5 },
        costing: { labour: 1500, welding: 800, grinding: 400, polish: 0, packing: 200, transport: 1500 },
        markup: 15,
        gst: 18
      }
    };

    const targetTemplate = systemTemplates[templateId] || systemTemplates["temp-1"];
    applyTemplate(targetTemplate);
    setCodeVal("");
    setShowSuggestions(false);
    setActiveIdx(0);
    triggerAlert("success", `Injected Shorthand Presets [${item.code}]: ${item.name}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => Math.min(filteredSuggestions.length - 1, prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions[activeIdx]) {
        handleApplySuggestion(filteredSuggestions[activeIdx]);
      } else {
        const match = SHORTHAND_DESCRIPTIONS.find(
          (item) => item.code.toLowerCase() === codeVal.trim().toLowerCase()
        );
        if (match) {
          handleApplySuggestion(match);
        } else {
          triggerAlert("error", `Factory code "${codeVal}" not recognized. Try B-2, B-3, M-2, or M-3.`);
        }
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="space-y-1.5 w-full">
        <label className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-widest flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          <span>Factory Shorthand Console (Arrow-keys support)</span>
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={codeVal}
            onFocus={() => {
              setShowSuggestions(true);
              setActiveIdx(0);
            }}
            onChange={(e) => {
              setCodeVal(e.target.value);
              setShowSuggestions(true);
              setActiveIdx(0);
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type code (e.g. B-2, M-2) and use Arrow Keys..."
            className="w-full pl-10 pr-12 py-2.5 text-xs rounded-xl font-mono tracking-wider transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
          />
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 absolute left-3.5 top-1/2 transform -translate-y-1/2 animate-pulse" />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[9px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded">
            <CornerDownLeft className="w-2.5 h-2.5" />
            <span>Enter</span>
          </div>
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-950 border border-slate-850 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-900 animate-fadeIn">
          {filteredSuggestions.map((item, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={item.code}
                onClick={() => handleApplySuggestion(item)}
                onMouseEnter={() => setActiveIdx(index)}
                className={`p-3 text-left transition-colors cursor-pointer flex items-start gap-3 select-none ${
                  isActive ? "bg-amber-500/10 border-l-4 border-amber-500" : "bg-transparent"
                }`}
              >
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase ${
                  isActive ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-amber-500"
                }`}>
                  {item.code}
                </span>
                <div className="space-y-0.5">
                  <p className={`text-[11px] font-extrabold ${isActive ? "text-amber-400" : "text-slate-200"}`}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-450 font-medium leading-normal pr-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
