import React from "react";

export default function PDFSummarySection({
  totalBeforeMarkup,
  markupAmount,
  taxableAmount,
  gstAmount,
  grandTotal,
  discountAmount,
  gstEnabled = true,
  costing = {},
  outputControls = {},
  isInternal = false
}) {
  const showTransport = isInternal || outputControls.showTransport;
  const showPacking = isInternal || outputControls.showPacking;
  const showGst = isInternal || outputControls.showGst;
  const showProfit = isInternal || outputControls.showProfit;

  return (
    <div className="py-3 border-b border-slate-200 flex justify-end text-[10px] font-medium text-slate-600 leading-normal">
      <div className="w-1/2 space-y-1.5 font-semibold text-slate-700">
        
        {/* Costing Breakdowns */}
        {showPacking && costing.packing > 0 && (
          <div className="flex justify-between">
            <span>Special Packing Fee:</span>
            <span className="font-mono text-slate-900">₹ {costing.packing}</span>
          </div>
        )}

        {showTransport && costing.transport > 0 && (
          <div className="flex justify-between">
            <span>Logistics Freight Fee:</span>
            <span className="font-mono text-slate-900">₹ {costing.transport}</span>
          </div>
        )}

        {/* Profit Markup (Hiding on Customer Quote if disabled) */}
        {showProfit && markupAmount !== 0 && (
          <div className="flex justify-between">
            <span>Gross Production Profit Margin:</span>
            <span className="font-mono text-slate-900">
              {markupAmount > 0 ? "+" : ""} ₹ {Math.round(markupAmount).toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Discounts */}
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-extrabold">
            <span>Special Pricing Discount Credits:</span>
            <span className="font-mono">- ₹ {Math.round(discountAmount).toLocaleString("en-IN")}</span>
          </div>
        )}

        {/* Net Taxable amount */}
        <div className="flex justify-between border-t border-slate-100 pt-1.5 font-extrabold text-slate-800">
          <span>Net Taxable Subtotal:</span>
          <span className="font-mono text-slate-950">₹ {Math.round(taxableAmount).toLocaleString("en-IN")}</span>
        </div>

        {/* Commercial Tax */}
        {showGst && gstEnabled && (
          <div className="flex justify-between">
            <span>Commercial Tax (GST):</span>
            <span className="font-mono text-slate-900">₹ {Math.round(gstAmount).toLocaleString("en-IN")}</span>
          </div>
        )}

        {/* Grand Total */}
        <div className="flex justify-between border-t-2 border-slate-900 pt-2 font-black text-slate-950 text-xs">
          <span>Grand Total Billing (INR):</span>
          <span className="font-mono text-slate-950">₹ {Math.round(grandTotal).toLocaleString("en-IN")}</span>
        </div>

      </div>
    </div>
  );
}
