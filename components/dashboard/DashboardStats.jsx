"use client";

import React, { useMemo } from "react";
import { FileText, IndianRupee, Scale, Layers } from "lucide-react";
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

    return {
      totalCount,
      revenuePipeline: Math.round(sumGrand),
      steelWeightSum: Math.round(sumWeight),
      averageVal,
      totalItems
    };
  }, [quotations]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total pipeline quotes */}
      <StatsCard
        label="Total Active Pipeline"
        value={`₹ ${metrics.revenuePipeline.toLocaleString("en-IN")}`}
        description={`Across ${metrics.totalCount} commercial quotations`}
        icon={IndianRupee}
        colorClass="from-emerald-600 to-emerald-500"
      />

      {/* Counts */}
      <StatsCard
        label="Active Quotations"
        value={metrics.totalCount.toString()}
        description="Quotes generated this financial quarter"
        icon={FileText}
        colorClass="from-amber-600 to-amber-500"
      />

      {/* Total Steel mass */}
      <StatsCard
        label="Est. Steel Throughput"
        value={`${metrics.steelWeightSum.toLocaleString("en-IN")} KG`}
        description={`Across ${metrics.totalItems} furniture fabrications`}
        icon={Scale}
        colorClass="from-slate-700 to-slate-600"
      />

      {/* Average value */}
      <StatsCard
        label="Average Quote Value"
        value={`₹ ${metrics.averageVal.toLocaleString("en-IN")}`}
        description="Average billing margin per quotation"
        icon={Layers}
        colorClass="from-blue-600 to-blue-500"
      />
    </div>
  );
}
