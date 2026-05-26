"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Lightbulb } from "lucide-react";
import SmartSuggestionDropdown from "./SmartSuggestionDropdown.jsx";
import useQuotation from "../../hooks/useQuotation.js";

const MOCK_SHORTHAND_CODES = [
  { code: "B-2", name: "SS Cafeteria Chair Blueprint", desc: "Sets 32\"H x 18\"W x 18\"D SS 1\" Round pipe framing & ₹320/kg rate.", category: "Chair" },
  { code: "B-3", name: "Standard 6-Seater Dining Frame", desc: "Sets 30\"H x 72\"W x 36\"D SS 3\" Square pipe framing.", category: "Dining Set" },
  { code: "M-2", name: "MS Heavy Work Table Setup", desc: "Sets 30\"H x 60\"W x 30\"D MS 2\" Square pipe framing.", category: "Table" },
  { code: "M-3", name: "5-Tier MS Display Rack Specs", desc: "Sets 72\"H x 36\"W x 18\"D MS 2\"x1\" Rectangular pipe framing.", category: "Rack" }
];

export default function InlineCodeInput() {
  const [codeVal, setCodeVal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const filteredSuggestions = MOCK_SHORTHAND_CODES.filter((item) =>
    item.code.toLowerCase().includes(codeVal.toLowerCase()) ||
    item.name.toLowerCase().includes(codeVal.toLowerCase())
  );

  const handleApplySuggestion = (item) => {
    // Map to default templates we have in the state
    let templateId = "temp-1"; // B-2 / SS Chair
    if (item.code === "M-2") templateId = "temp-2"; // MS Work Table
    if (item.code === "M-3") templateId = "temp-3"; // MS Display Rack
    
    // Find preset in system default
    const standardTemplates = {
      "temp-1": {
        name: "Premium SS Cafeteria Chair",
        category: "Chair",
        quantity: 10,
        notes: "Stainless steel frame with premium mirror polish. Applied via factory code " + item.code,
        dimensions: { height: 32, width: 18, depth: 18, seatHeight: 18, seatWidth: 18, seatDepth: 16, unit: "inch" },
        pipe: { type: "SS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.5, rate: 320, wastage: 10 },
        sheet: { type: "SS Sheet", thickness: 1.2, rate: 3500, qty: 0.15, wastage: 10 },
        costing: { labour: 250, welding: 150, grinding: 100, polish: 250, packing: 50, transport: 500 },
        markup: 25,
        gst: 18
      },
      "temp-2": {
        name: "Heavy Duty MS Work Table",
        category: "Table",
        quantity: 5,
        notes: "Robust workshop table. Applied via factory code " + item.code,
        dimensions: { height: 30, width: 60, depth: 30, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
        pipe: { type: "MS", shape: "Square", sizeUnit: "inch", width: 2, height: 0, thickness: 2.0, rate: 85, wastage: 8 },
        sheet: { type: "MS Sheet", thickness: 2.0, rate: 2800, qty: 0.6, wastage: 5 },
        costing: { labour: 600, welding: 450, grinding: 200, polish: 0, packing: 100, transport: 1200 },
        markup: 20,
        gst: 18
      },
      "temp-3": {
        name: "5-Tier Industrial Display Rack",
        category: "Rack",
        quantity: 3,
        notes: "Elegant MS display rack. Applied via factory code " + item.code,
        dimensions: { height: 72, width: 36, depth: 18, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
        pipe: { type: "MS", shape: "Rectangle", sizeUnit: "inch", width: 2, height: 1, thickness: 1.6, rate: 80, wastage: 12 },
        sheet: { type: "MS Sheet", thickness: 1.6, rate: 2600, qty: 1.25, wastage: 8 },
        costing: { labour: 1200, welding: 600, grinding: 350, polish: 0, packing: 150, transport: 500 },
        markup: 15,
        gst: 18
      }
    };

    const targetTemplate = standardTemplates[templateId] || standardTemplates["temp-1"];
    applyTemplate(targetTemplate);
    setCodeVal("");
    setShowSuggestions(false);
    triggerAlert("success", `Applied Factory Code [${item.code}]: ${item.name}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const match = MOCK_SHORTHAND_CODES.find(
        (item) => item.code.toLowerCase() === codeVal.trim().toLowerCase()
      );
      if (match) {
        handleApplySuggestion(match);
      } else {
        triggerAlert("error", `Factory code "${codeVal}" not recognized. Try B-2 or M-2.`);
      }
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="space-y-1.5 w-full">
        <label className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-widest flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          <span>Factory Shorthand Console (AI Ready)</span>
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={codeVal}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setCodeVal(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type code (e.g. B-2, M-2) and press Enter..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl font-mono tracking-wider transition-all focus:outline-none focus:border-amber-500 bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
          />
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 absolute left-3.5 top-1/2 transform -translate-y-1/2 animate-pulse" />
        </div>
      </div>

      {showSuggestions && codeVal.length >= 0 && (
        <SmartSuggestionDropdown
          suggestions={filteredSuggestions}
          onSelect={handleApplySuggestion}
        />
      )}
    </div>
  );
}
