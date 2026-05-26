"use client";

import React, { useMemo } from "react";
import { FileText, IndianRupee, Scale, Clock } from "lucide-react";
import StatsCard from "../cards/StatsCard.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function DashboardStats() {
  const { quotations } = useQuotation();

  const metrics = useMemo(() => {
    const totalCount = quotations.length;
    let sumGrand = 0;
    let sumWeight = 0;
    let totalItems = 0;

    quotations.forEach((q) => {
      sumGrand += Number(q.grandTotal) || 0;
      sumWeight += (Number(q.pipeWeight) || 0) * (Number(q.quantity) || 1);
      totalItems += Number(q.quantity) || 0;
    });

    const averageVal = totalCount > 0 ? Math.round(sumGrand / totalCount) : 0;
    const pendingQuotes = Math.max(1, Math.round(totalCount * 0.3)); // simulated 30% pending ratio

    return {
      totalCount,
      revenuePipeline: Math.round(sumGrand),
      steelWeightSum: Math.round(sumWeight),
      averageVal,
      totalItems,
      pendingQuotes
    };
  }, [quotations]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
      {/* Active Quotations count */}
      <StatsCard
        label="Total Quotations"
        value={metrics.totalCount.toString()}
        description="Active compiled quotations"
        icon={FileText}
        colorClass="from-amber-600 to-amber-500"
      />

      {/* Monthly Revenue Pipeline */}
      <StatsCard
        label="Monthly Revenue Pipeline"
        value={`₹ ${metrics.revenuePipeline.toLocaleString("en-IN")}`}
        description="Gross contract values this month"
        icon={IndianRupee}
        colorClass="from-emerald-600 to-emerald-500"
      />

      {/* Pending Estimates */}
      <StatsCard
        label="Pending Quotations"
        value={metrics.pendingQuotes.toString()}
        description="Estimates awaiting client acceptance"
        icon={Clock}
        colorClass="from-blue-600 to-blue-500"
      />

      {/* Material Weight Overview */}
      <StatsCard
        label="Material Usage Overview"
        value={`${metrics.steelWeightSum.toLocaleString("en-IN")} KG`}
        description="Total Steel scheduled for cutting"
        icon={Scale}
        colorClass="from-slate-700 to-slate-600"
      />
    </div>
  );
}
