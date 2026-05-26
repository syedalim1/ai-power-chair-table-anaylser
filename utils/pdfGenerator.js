/**
 * Generates a professional Vector PDF document using client-side jsPDF drawing.
 * Supports dual customer and factory-internal formats.
 *
 * @param {object} source - The quotation data object
 * @param {object} companyInfo - Company profile and tax details
 * @param {function} triggerAlert - Callback to dispatch user messages
 * @param {boolean} isInternal - Toggle to generate the internal work order blueprint
 */
export async function generateQuotationPDF(source, companyInfo, triggerAlert, isInternal = false) {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Primary styling constants
    const primaryColor = isInternal ? [30, 41, 59] : [15, 23, 42]; // Industrial Slate vs Premium Slate
    const accentColor = isInternal ? [79, 70, 229] : [217, 119, 6]; // Indigo vs Amber
    const lightBg = [248, 250, 252]; // Slate 50
    const borderLine = [226, 232, 240]; // Slate 200
    
    const marginX = 15;
    let currentY = 15;

    // 1. TOP HEADER BANNER
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 42, "F");

    // Company Brand Name & Industry Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(companyInfo.name, marginX, 16);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225); // Slate 300
    doc.text(isInternal 
      ? "INTERNAL WORK ORDER & FABRICATION SCHEDULE SHEET" 
      : "PREMIUM CUSTOM FURNITURE & CONTRACT METAL ESTIMATION", marginX, 22);

    // Official Supplier details box (Right-aligned)
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`GSTIN: ${companyInfo.gstin}`, 130, 14);
    doc.text(`Ph: ${companyInfo.phone1} / ${companyInfo.phone2}`, 130, 19);
    doc.text(`Email: ${companyInfo.email}`, 130, 24);
    doc.text(`Kurichi SIDCO, Coimbatore`, 130, 29);

    currentY = 50;

    // 2. CLIENT & QUOTATION DETAILS CARD
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(isInternal ? "PRODUCTION ORDER TO:" : "QUOTED TO:", marginX, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`M/s. ${source.clientName || "Valued Customer"}`, marginX, currentY + 5);
    doc.text(`Contact: ${source.clientContact || "N/A"}`, marginX, currentY + 10);
    
    const addressLines = doc.splitTextToSize(source.clientAddress || "N/A", 80);
    doc.text(addressLines, marginX, currentY + 15);

    // Right: Quote Meta Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...accentColor);
    doc.text(isInternal ? "INTERNAL FACTORY BLUEPRINT" : "COMMERCIAL PRO-FORMA", 130, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Order Ref No: ${source.quoteNo}`, 130, currentY + 6);
    doc.text(`Date Compiled: ${source.date || new Date().toISOString().split("T")[0]}`, 130, currentY + 11);
    doc.text(`Pricing Tier: ${isInternal ? "Factory Cost Grid" : (source.pricingMode || "Retail").toUpperCase()}`, 130, currentY + 16);

    // Section Divider Line
    currentY += 32;
    doc.setDrawColor(...borderLine);
    doc.setLineWidth(0.5);
    doc.line(marginX, currentY, 210 - marginX, currentY);
    
    currentY += 6;

    // 3. PRODUCT BANNER HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...primaryColor);
    doc.text(`Product Name: ${source.productName} (${source.category})`, marginX, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Batch Quantity: ${source.quantity} Unit(s)`, 150, currentY);

    currentY += 8;

    // 4. TECHNICAL DETAILS CARD
    doc.setFillColor(...lightBg);
    doc.rect(marginX, currentY, 180, 48, "F");
    doc.setDrawColor(203, 213, 225);
    doc.rect(marginX, currentY, 180, 48, "S");

    // Horizontal line
    doc.line(marginX + 90, currentY, marginX + 90, currentY + 48);

    let textY = currentY + 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text("Skeletal Dimensions", marginX + 5, textY);
    doc.text(isInternal ? "Raw Metal Specification (Internal)" : "General Specifications (Customer)", marginX + 95, textY);

    textY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`- Overall Height: ${source.dimensions.height} ${source.dimensions.unit}`, marginX + 5, textY);
    doc.text(`- Steel Profile: ${source.pipe.type} (${source.pipe.shape})`, marginX + 95, textY);

    textY += 5;
    doc.text(`- Structure Width: ${source.dimensions.width} ${source.dimensions.unit}`, marginX + 5, textY);
    const pipeSpecSize = source.pipe.shape === "Rectangle" 
      ? `${source.pipe.width}" x ${source.pipe.height}"` 
      : `${source.pipe.width}"`;
    doc.text(`- Tubing Sizing: ${pipeSpecSize} (${source.pipe.thickness}mm)`, marginX + 95, textY);

    textY += 5;
    doc.text(`- Structure Depth: ${source.dimensions.depth} ${source.dimensions.unit}`, marginX + 5, textY);
    
    // Hide raw material weights for customers unless output check is active
    const showWeight = isInternal || source.outputControls?.showWeight;
    doc.text(showWeight 
      ? `- Net Steel Weight: ${source.pipeWeight} KG` 
      : `- Structural framing: High tensile steel`, marginX + 95, textY);

    textY += 5;
    if (source.dimensions.seatHeight > 0) {
      doc.text(`- Seat Levels: ${source.dimensions.seatHeight}H x ${source.dimensions.seatWidth}W ${source.dimensions.unit}`, marginX + 5, textY);
    } else {
      doc.text(`- Structural layout: Fixed Weld Frame`, marginX + 5, textY);
    }
    
    doc.text(`- Top Panel sheet: ${source.sheet.type !== "None" ? `${source.sheet.type}` : "Frame Only (No Sheet Top)"}`, marginX + 95, textY);

    textY += 5;
    const showPipeCalc = isInternal || source.outputControls?.showPipeCalc;
    doc.text(showPipeCalc 
      ? `- Active Cut feet: ${source.pipeLength} Ft` 
      : `- Miter Joint cuts: Clean buffed finishing`, marginX + 5, textY);
    doc.text(`- Jointing Weld style: Mitered joint buffing`, marginX + 95, textY);

    currentY += 56;

    // 5. BILLING & COMMERCE SUMMARY TABLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text(isInternal ? "PRODUCTION ORDER MATERIAL & LABOUR LIST" : "QUOTED ITEMS OUTLINE", marginX, currentY);

    currentY += 4;

    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 180, 7, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    
    if (isInternal) {
      doc.text("Production Process / Operations", marginX + 4, currentY + 5);
      doc.text("Metric Rate", marginX + 75, currentY + 5);
      doc.text("Material Allocation", marginX + 110, currentY + 5);
      doc.text("Manual Labour", marginX + 145, currentY + 5);

      // Internal row 1: Piping Cost
      currentY += 7;
      doc.setFillColor(255, 255, 255);
      doc.rect(marginX, currentY, 180, 8, "F");
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(`Framing Steel (${source.pipe.type} Pipe)`, marginX + 4, currentY + 5.5);
      doc.text(`₹ ${source.pipe.rate} / KG`, marginX + 75, currentY + 5.5);
      doc.text(`₹ ${source.pipeCost}`, marginX + 110, currentY + 5.5);
      doc.text("-", marginX + 145, currentY + 5.5);

      // Internal row 2: Sheet Cost
      currentY += 8;
      doc.setFillColor(...lightBg);
      doc.rect(marginX, currentY, 180, 8, "F");
      doc.text(`${source.sheet.type !== "None" ? `${source.sheet.type}` : "No Sheet Panel required"}`, marginX + 4, currentY + 5.5);
      doc.text(source.sheet.type !== "None" ? `₹ ${source.sheet.rate} / sheet` : "-", marginX + 75, currentY + 5.5);
      doc.text(source.sheet.type !== "None" ? `₹ ${source.sheetCost}` : "-", marginX + 110, currentY + 5.5);
      doc.text("-", marginX + 145, currentY + 5.5);

      // Internal row 3: Fabrication Labor breakdown
      currentY += 8;
      doc.setFillColor(255, 255, 255);
      doc.rect(marginX, currentY, 180, 8, "F");
      doc.text(`Fabrication labor (Welding: ₹${source.costing.welding}, Polish: ₹${source.costing.polish})`, marginX + 4, currentY + 5.5);
      doc.text("-", marginX + 75, currentY + 5.5);
      doc.text("-", marginX + 110, currentY + 5.5);
      doc.text(`₹ ${source.labourCostSum}`, marginX + 145, currentY + 5.5);
    } else {
      // Customer Safe Table: Hide internal details, show simple commercial block!
      doc.text("Commercial Item Description", marginX + 4, currentY + 5);
      doc.text("Quantities", marginX + 85, currentY + 5);
      doc.text("Billing rate (Excl Tax)", marginX + 145, currentY + 5);

      currentY += 7;
      doc.setFillColor(255, 255, 255);
      doc.rect(marginX, currentY, 180, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(source.productName, marginX + 4, currentY + 6);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Custom structural framing built with premium ${source.pipe.type} alloy`, marginX + 4, currentY + 10);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 65, 85);
      doc.text(`${source.quantity} Units`, marginX + 85, currentY + 7);
      
      const customerUnitRate = Math.round(source.taxableAmount / source.quantity);
      doc.text(`₹ ${customerUnitRate.toLocaleString("en-IN")}`, marginX + 145, currentY + 7);
      
      currentY += 4; // adjustment
    }

    currentY += 12;
    doc.setDrawColor(...borderLine);
    doc.line(marginX, currentY, 210 - marginX, currentY);

    // 6. TOTALS COLUMN
    currentY += 5;
    const finX1 = 120;
    const finX2 = 175;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    if (isInternal) {
      doc.text(`Internal Material + Labour Base:`, finX1, currentY);
      doc.text(`₹ ${source.subtotal * source.quantity}`, finX2, currentY, { align: "right" });

      currentY += 5;
      doc.text(`Logistics Flat:`, finX1, currentY);
      doc.text(`₹ ${source.costing.transport}`, finX2, currentY, { align: "right" });

      currentY += 5;
      doc.text(`Net Internal Markups (${source.markup}%):`, finX1, currentY);
      doc.text(`₹ ${source.markupAmount}`, finX2, currentY, { align: "right" });
    } else {
      // Customer Safe billing
      doc.text(`Net Taxable Commercial Base:`, finX1, currentY);
      doc.text(`₹ ${Math.round(source.taxableAmount).toLocaleString("en-IN")}`, finX2, currentY, { align: "right" });
    }

    if (source.gstEnabled) {
      currentY += 5;
      doc.text(`Integrated SGST & CGST (${source.gst}%):`, finX1, currentY);
      doc.text(`₹ ${Math.round(source.gstAmount).toLocaleString("en-IN")}`, finX2, currentY, { align: "right" });
    }

    // Grand total highlight card
    currentY += 6;
    doc.setFillColor(...accentColor);
    doc.rect(finX1 - 5, currentY - 4, 85, 9, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(isInternal ? "TOTAL FABRICATION VALUE:" : "GRAND BILLING SUM (INR):", finX1, currentY + 2);
    doc.text(`₹ ${Math.round(source.grandTotal).toLocaleString("en-IN")}/-`, finX2 + 5, currentY + 2, { align: "right" });

    // Left aligned remarks or worker notes
    const noteY = currentY - 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);

    if (isInternal) {
      doc.text("Workshop Production Remarks:", marginX, noteY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      
      const wrapNotes = doc.splitTextToSize(source.workerNotes || "Clean weld joints. Avoid scraping the steel frames.", 90);
      doc.text(wrapNotes, marginX, noteY + 4);

      doc.setFont("helvetica", "bold");
      doc.text("Assembly instructions:", marginX, noteY + 16);
      doc.setFont("helvetica", "normal");
      const wrapInstructions = doc.splitTextToSize(source.fabricationInstructions || "Miter and polish TIG joints beautifully.", 90);
      doc.text(wrapInstructions, marginX, noteY + 20);
    } else {
      // Customer details visual remarks
      doc.text("Special Instructions / Client Notes:", marginX, noteY);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const wrapNotes = doc.splitTextToSize(source.notes || "No special requests. Product built standard Coimbatore SIDCO standards.", 90);
      doc.text(wrapNotes, marginX, noteY + 4);
    }

    currentY += 15;

    // 7. CONTRACT TERMS
    if (!isInternal) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...primaryColor);
      doc.text("TERMS AND CONDITIONS", marginX, currentY);

      currentY += 4.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const termsLines = doc.splitTextToSize(companyInfo.terms, 180);
      doc.text(termsLines, marginX, currentY);
    } else {
      currentY += 10;
    }

    // 8. SIGNATURE BOXES
    currentY += 34;
    doc.setDrawColor(203, 213, 225);
    
    // IMSI Signature
    doc.line(marginX, currentY, marginX + 50, currentY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(isInternal ? "WORKSHOP SUPERVISOR" : "For INDIAN MAKE STEEL INDUSTRIES", marginX, currentY + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(isInternal ? "Factory Production Desk" : "Authorized Signatory", marginX, currentY + 8);

    if (!isInternal) {
      // Customer acceptance
      doc.line(140, currentY, 190, currentY);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("Customer Acceptance Acceptance", 140, currentY + 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Sign & Seal", 140, currentY + 8);
    }

    // Save compiled file
    const docName = isInternal ? "Factory_WorkOrder" : "Customer_Quotation";
    doc.save(`IMSI_${source.quoteNo}_${docName}.pdf`);
    triggerAlert("success", `${isInternal ? "Internal Work Order" : "Customer PDF"} exported successfully!`);
  } catch (err) {
    console.error(err);
    triggerAlert("error", "Error generating vector PDF layout.");
  }
}
