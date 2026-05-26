import React from "react";
import PDFHeader from "./PDFHeader.jsx";
import PDFCompanyDetails from "./PDFCompanyDetails.jsx";
import PDFCustomerSection from "./PDFCustomerSection.jsx";
import PDFProductSection from "./PDFProductSection.jsx";
import PDFPricingTable from "./PDFPricingTable.jsx";
import PDFSummarySection from "./PDFSummarySection.jsx";
import PDFTermsSection from "./PDFTermsSection.jsx";
import PDFSignatureSection from "./PDFSignatureSection.jsx";
import PDFFooter from "./PDFFooter.jsx";

export default function CustomerQuotationPDF({
  formState,
  companyInfo,
  liveSummary
}) {
  const dateStr = formState.date || new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white border border-slate-300 p-8 text-slate-800 space-y-4 shadow-xl select-none font-sans leading-normal print:shadow-none print:border-none">
      
      {/* Header */}
      <PDFHeader
        quoteNo={formState.quoteNo}
        date={dateStr}
        isInternal={false}
      />

      {/* Supplier & Payment instructions */}
      <PDFCompanyDetails info={companyInfo} />

      {/* Client target */}
      <PDFCustomerSection
        clientName={formState.clientName}
        clientContact={formState.clientContact}
        clientAddress={formState.clientAddress}
      />

      {/* Product Spec */}
      <PDFProductSection
        productName={formState.productName}
        category={formState.category}
        quantity={formState.quantity}
        dimensions={formState.dimensions}
        notes={formState.notes}
      />

      {/* Pricing Matrix (Customer Filters applied) */}
      <PDFPricingTable
        pricingMode={formState.pricingMode}
        quantity={formState.quantity}
        subtotalPerItem={liveSummary.subtotalPerItem}
        subtotalOverall={liveSummary.subtotalOverall}
        markupAmount={liveSummary.markupAmount}
        taxableAmount={liveSummary.taxableAmount}
        gstAmount={liveSummary.gstAmount}
        grandTotal={liveSummary.grandTotal}
        retailTotal={liveSummary.retailTotal}
        wholesaleTotal={liveSummary.wholesaleTotal}
        dealerTotal={liveSummary.dealerTotal}
        outputControls={formState.outputControls}
        isInternal={false}
      />

      {/* Summary bill calculations */}
      <PDFSummarySection
        totalBeforeMarkup={liveSummary.totalBeforeMarkup}
        markupAmount={liveSummary.markupAmount}
        taxableAmount={liveSummary.taxableAmount}
        gstAmount={liveSummary.gstAmount}
        grandTotal={liveSummary.grandTotal}
        discountAmount={liveSummary.discountAmount}
        gstEnabled={formState.gstEnabled}
        costing={formState.costing}
        outputControls={formState.outputControls}
        isInternal={false}
      />

      {/* T&Cs details */}
      <PDFTermsSection
        terms={companyInfo.terms}
        isInternal={false}
      />

      {/* Closing signatures */}
      <PDFSignatureSection isInternal={false} />

      {/* Footer */}
      <PDFFooter />

    </div>
  );
}
