"use client";

import React, { useMemo } from "react";
import { BarChart3 } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";

export default function RevenueOverview() {
  const { quotations } = useQuotation();

  const chartData = useMemo(() => {
    let chairVal = 0;
    let tableVal = 0;
    let rackVal = 0;
    let otherVal = 0;

    let steelCostSum = 0;
    let labourCostSum = 0;
    let taxCostSum = 0;

    quotations.forEach((q) => {
      const val = Number(q.grandTotal) || 0;
      if (q.category === "Chair") chairVal += val;
      else if (q.category === "Table") tableVal += val;
      else if (q.category === "Rack") rackVal += val;
      else otherVal += val;

      steelCostSum += (Number(q.pipeCost) || 0) + (Number(q.sheetCost) || 0);
      labourCostSum += (Number(q.labourCostSum) || 0) * (Number(q.quantity) || 1);
      taxCostSum += Number(q.gstAmount) || 0;
    });

    const totalRevenue = chairVal + tableVal + rackVal + otherVal;
    
    return {
      totalRevenue,
      categories: [
        { name: "Chairs Framing", value: chairVal, pct: totalRevenue > 0 ? (chairVal / totalRevenue) * 100 : 0, color: "bg-amber-500" },
        { name: "Heavy Work Tables", value: tableVal, pct: totalRevenue > 0 ? (tableVal / totalRevenue) * 100 : 0, color: "bg-blue-500" },
        { name: "Display Racks", value: rackVal, pct: totalRevenue > 0 ? (rackVal / totalRevenue) * 100 : 0, color: "bg-indigo-500" },
        { name: "Other Fabrication", value: otherVal, pct: totalRevenue > 0 ? (otherVal / totalRevenue) * 100 : 0, color: "bg-slate-500" }
      ],
      breakdowns: [
        { name: "Raw Steel Stocks", value: steelCostSum, color: "bg-amber-600" },
        { name: "Welding & Grinding", value: labourCostSum, color: "bg-emerald-500" },
        { name: "Commercial Taxes", value: taxCostSum, color: "bg-slate-400" }
      ]
    };
  }, [quotations]);

  return (
    <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/35 dark:border-slate-900/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Category Sales Distribution */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <BarChart3 className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-sm uppercase tracking-wide">
            Pipeline Distribution
          </h3>
        </div>

        <div className="space-y-3 pt-1">
          {chartData.categories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>{cat.name}</span>
                <span className="text-slate-800 dark:text-slate-200">
                  ₹ {Math.round(cat.value).toLocaleString("en-IN")} ({Math.round(cat.pct)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* cost center distributions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <BarChart3 className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-sm uppercase tracking-wide">
            Material Cost Overhead
          </h3>
        </div>

        <div className="space-y-3 pt-1">
          {chartData.breakdowns.map((cost, idx) => {
            const sumCost = chartData.breakdowns.reduce((acc, c) => acc + c.value, 0);
            const costPct = sumCost > 0 ? (cost.value / sumCost) * 100 : 0;
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{cost.name}</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    ₹ {Math.round(cost.value).toLocaleString("en-IN")} ({Math.round(costPct)}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cost.color} rounded-full transition-all duration-500`}
                    style={{ width: `${costPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
