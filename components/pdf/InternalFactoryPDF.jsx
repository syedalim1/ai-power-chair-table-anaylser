import React from "react";
import PDFHeader from "./PDFHeader.jsx";
import PDFCompanyDetails from "./PDFCompanyDetails.jsx";
import PDFCustomerSection from "./PDFCustomerSection.jsx";
import PDFProductSection from "./PDFProductSection.jsx";
import PDFPipeCalculationTable from "./PDFPipeCalculationTable.jsx";
import PDFLabourTable from "./PDFLabourTable.jsx";
import PDFSummarySection from "./PDFSummarySection.jsx";
import PDFTermsSection from "./PDFTermsSection.jsx";
import PDFSignatureSection from "./PDFSignatureSection.jsx";
import PDFFooter from "./PDFFooter.jsx";

export default function InternalFactoryPDF({
  formState,
  companyInfo,
  liveSummary
}) {
  const dateStr = formState.date || new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white border border-slate-300 p-8 text-slate-800 space-y-4 shadow-xl select-none font-sans leading-normal print:shadow-none print:border-none">
      
      {/* Header (Internal Tag true) */}
      <PDFHeader
        quoteNo={formState.quoteNo}
        date={dateStr}
        isInternal={true}
      />

      {/* Supplier info */}
      <PDFCompanyDetails info={companyInfo} />

      {/* Customer delivery details */}
      <PDFCustomerSection
        clientName={formState.clientName}
        clientContact={formState.clientContact}
        clientAddress={formState.clientAddress}
      />

      {/* Product general outline */}
      <PDFProductSection
        productName={formState.productName}
        category={formState.category}
        quantity={formState.quantity}
        dimensions={formState.dimensions}
        notes={formState.notes}
      />

      {/* Physical cut lists & scheduling (Enforced for workshop) */}
      <PDFPipeCalculationTable
        pipe={formState.pipe}
        liveSummary={liveSummary}
        isInternal={true}
      />

      {/* Labor breakdowns (Enforced for workshop) */}
      <PDFLabourTable
        costing={formState.costing}
        isInternal={true}
      />

      {/* Cost overhead summaries, markups & profit margins */}
      <PDFSummarySection
        totalBeforeMarkup={liveSummary.totalBeforeMarkup}
        markupAmount={liveSummary.markupAmount}
        taxableAmount={liveSummary.taxableAmount}
        gstAmount={liveSummary.gstAmount}
        grandTotal={liveSummary.grandTotal}
        discountAmount={liveSummary.discountAmount}
        gstEnabled={formState.gstEnabled}
        costing={formState.costing}
        isInternal={true}
      />

      {/* Worker preps & fabrication steps */}
      <PDFTermsSection
        workerNotes={formState.workerNotes}
        fabricationInstructions={formState.fabricationInstructions}
        isInternal={true}
      />

      {/* Supervisor signature */}
      <PDFSignatureSection isInternal={true} />

      {/* Footer */}
      <PDFFooter />

    </div>
  );
}
