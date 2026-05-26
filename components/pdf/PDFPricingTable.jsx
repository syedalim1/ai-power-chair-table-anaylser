import React from "react";

export default function PDFPricingTable({
  pricingMode,
  quantity,
  subtotalPerItem,
  subtotalOverall,
  markupAmount,
  taxableAmount,
  gstAmount,
  grandTotal,
  retailTotal,
  wholesaleTotal,
  dealerTotal,
  outputControls = {},
  isInternal = false
}) {
  const qty = Math.max(1, quantity || 1);

  // If internal work order is rendering, we show full calculations.
  // If it's a customer quote, we dynamically filter by outputControls!
  const showWholesale = isInternal || outputControls.showWholesale;
  const showRetail = isInternal || outputControls.showRetail;
  const showDealer = isInternal || outputControls.showDealer;
  const showGst = isInternal || outputControls.showGst;

  return (
    <div className="py-3 border-b border-slate-200 space-y-2 text-[10px] font-medium text-slate-600 leading-normal">
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
        COMMERCIAL ESTIMATION SUMMARY
      </span>

      <table className="w-full text-left border-collapse text-[10px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-[8px] text-slate-500">
            <th className="p-2">Pricing Description</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-right">Unit Rate</th>
            <th className="p-2 text-right">Net Subtotal</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
          {/* Default quoted price row */}
          <tr>
            <td className="p-2 uppercase font-extrabold text-slate-900">
              Custom Customized Fabrication Estimate <span className="font-mono text-[9px] text-amber-600">({pricingMode})</span>
            </td>
            <td className="p-2 text-center font-mono">{qty}</td>
            <td className="p-2 text-right font-mono">
              ₹ {Math.round(taxableAmount / qty).toLocaleString("en-IN")}
            </td>
            <td className="p-2 text-right font-mono font-extrabold">
              ₹ {Math.round(taxableAmount).toLocaleString("en-IN")}
            </td>
          </tr>

          {/* Optional dealer/wholesale pricing matrices */}
          {showRetail && pricingMode !== "retail" && (
            <tr className="text-slate-500 font-medium">
              <td className="p-2 pl-4 italic">* Standard Retail Equivalent Value</td>
              <td className="p-2 text-center font-mono">{qty}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(retailTotal / qty / 1.18).toLocaleString("en-IN")}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(retailTotal / 1.18).toLocaleString("en-IN")}</td>
            </tr>
          )}

          {showWholesale && pricingMode !== "wholesale" && (
            <tr className="text-slate-500 font-medium">
              <td className="p-2 pl-4 italic">* Bulk Wholesale Equivalent Value</td>
              <td className="p-2 text-center font-mono">{qty}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(wholesaleTotal / qty / 1.18).toLocaleString("en-IN")}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(wholesaleTotal / 1.18).toLocaleString("en-IN")}</td>
            </tr>
          )}

          {showDealer && pricingMode !== "dealer" && (
            <tr className="text-slate-500 font-medium">
              <td className="p-2 pl-4 italic">* Authorized Dealer Equivalent Value</td>
              <td className="p-2 text-center font-mono">{qty}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(dealerTotal / qty / 1.18).toLocaleString("en-IN")}</td>
              <td className="p-2 text-right font-mono">₹ {Math.round(dealerTotal / 1.18).toLocaleString("en-IN")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
