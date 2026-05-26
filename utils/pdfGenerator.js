/**
 * Generates a professional Vector PDF Quotation document using client-side jsPDF drawing.
 *
 * @param {object} source - The quotation data object
 * @param {object} companyInfo - Company profile and tax details
 * @param {function} triggerAlert - Callback to dispatch user messages
 */
export async function generateQuotationPDF(source, companyInfo, triggerAlert) {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Primary styling constants
    const primaryColor = [15, 23, 42]; // Slate 900
    const accentColor = [217, 119, 6]; // Amber 600
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
    doc.setFontSize(22);
    doc.text(companyInfo.name, marginX, 16);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225); // Slate 300
    doc.text("PREMIUM STEEL FURNITURE & HEAVY INDUSTRIAL FABRICATION", marginX, 22);

    // Official Supplier details box (Right-aligned)
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`GSTIN: ${companyInfo.gstin}`, 130, 14);
    doc.text(`Ph: ${companyInfo.phone1} / ${companyInfo.phone2}`, 130, 19);
    doc.text(`Email: ${companyInfo.email}`, 130, 24);
    doc.text(`SIDCO Industrial Estate, Coimbatore`, 130, 29);

    currentY = 50;

    // 2. CLIENT & QUOTATION DETAILS CARD
    // Left: Client Name & Coordinates
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text("QUOTED TO:", marginX, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`M/s. ${source.clientName || "Valued Customer"}`, marginX, currentY + 5);
    doc.text(`Contact: ${source.clientContact || "N/A"}`, marginX, currentY + 10);
    
    const addressLines = doc.splitTextToSize(source.clientAddress || "N/A", 80);
    doc.text(addressLines, marginX, currentY + 15);

    // Right: Quote Meta Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...accentColor);
    doc.text("ESTIMATED QUOTATION", 130, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Quotation No: ${source.quoteNo}`, 130, currentY + 6);
    doc.text(`Date: ${source.date || new Date().toISOString().split("T")[0]}`, 130, currentY + 11);
    doc.text(`Sales Executive: Factory Desk`, 130, currentY + 16);

    // Section Divider Line
    currentY += 32;
    doc.setDrawColor(...borderLine);
    doc.setLineWidth(0.5);
    doc.line(marginX, currentY, 210 - marginX, currentY);
    
    currentY += 6;

    // 3. PRODUCT BANNER HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(`Product Name: ${source.productName} (${source.category})`, marginX, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Quantity Required: ${source.quantity} Unit(s)`, 150, currentY);

    currentY += 8;

    // 4. TECH SPECS TABLE CARD (Two columns)
    doc.setFillColor(...lightBg);
    doc.rect(marginX, currentY, 180, 52, "F");
    doc.setDrawColor(203, 213, 225);
    doc.rect(marginX, currentY, 180, 52, "S");

    // Horizontal line
    doc.line(marginX + 90, currentY, marginX + 90, currentY + 52);

    let textY = currentY + 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text("Skeletal Framing / Dimensions", marginX + 5, textY);
    doc.text("Material Specifications & Costing", marginX + 95, textY);

    textY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`- Overall Height: ${source.dimensions.height} ${source.dimensions.unit}`, marginX + 5, textY);
    doc.text(`- Pipe Material: ${source.pipe.type} (${source.pipe.shape} Profile)`, marginX + 95, textY);

    textY += 5;
    doc.text(`- Structure Width: ${source.dimensions.width} ${source.dimensions.unit}`, marginX + 5, textY);
    const pipeSpecSize = source.pipe.shape === "Rectangle" 
      ? `${source.pipe.width}" x ${source.pipe.height}"` 
      : `${source.pipe.width}"`;
    doc.text(`- Pipe Size & Gauge: ${pipeSpecSize} (${source.pipe.thickness}mm Thickness)`, marginX + 95, textY);

    textY += 5;
    doc.text(`- Structure Depth: ${source.dimensions.depth} ${source.dimensions.unit}`, marginX + 5, textY);
    doc.text(`- Pipe Steel Weight: ${source.pipeWeight} kg (incl. ${source.pipe.wastage}% waste)`, marginX + 95, textY);

    textY += 5;
    if (source.category === "Chair" || source.category === "Dining Set") {
      doc.text(`- Seat Dimensions: ${source.dimensions.seatHeight}H x ${source.dimensions.seatWidth}W x ${source.dimensions.seatDepth}D ${source.dimensions.unit}`, marginX + 5, textY);
    } else {
      doc.text(`- Application Type: Standard Industrial Frame`, marginX + 5, textY);
    }
    doc.text(`- Sheet Panel: ${source.sheet.type !== "None" ? `${source.sheet.type} (${source.sheet.thickness}mm)` : "None (Custom Panel/Plywood)"}`, marginX + 95, textY);

    textY += 5;
    doc.text(`- Estimated Steel Pipe Feet: ${source.pipeLength} Feet`, marginX + 5, textY);
    doc.text(`- Sheet Qty per unit: ${source.sheet.type !== "None" ? `${source.sheet.qty} of 8x4 Sheet` : "N/A"}`, marginX + 95, textY);

    textY += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Structural Unit Weight: ${source.pipeWeight} KG`, marginX + 5, textY);
    doc.text(`Material Base Rate: ₹${source.pipe.rate}/kg (Steel), ₹${source.sheet.rate}/sheet (Panel)`, marginX + 95, textY);

    currentY += 60;

    // 5. BILLING & COMMERCE SUMMARY TABLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryColor);
    doc.text("COST & COMMERCIAL SUMMARY", marginX, currentY);

    currentY += 4;

    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 180, 7, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("Cost Item Description", marginX + 4, currentY + 5);
    doc.text("Unit Base Rate", marginX + 75, currentY + 5);
    doc.text("Total Material Cost", marginX + 110, currentY + 5);
    doc.text("Total Fabrication & Labour", marginX + 145, currentY + 5);

    // Row 1: Pipe Steel
    currentY += 7;
    doc.setFillColor(255, 255, 255);
    doc.rect(marginX, currentY, 180, 8, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(`Skeletal Steel Piping (${source.pipe.type} Pipe)`, marginX + 4, currentY + 5.5);
    doc.text(`₹ ${source.pipe.rate} / KG`, marginX + 75, currentY + 5.5);
    doc.text(`₹ ${source.pipeCost}`, marginX + 110, currentY + 5.5);
    doc.text("-", marginX + 145, currentY + 5.5);

    // Row 2: Sheet Metals
    currentY += 8;
    doc.setFillColor(...lightBg);
    doc.rect(marginX, currentY, 180, 8, "F");
    doc.text(`${source.sheet.type !== "None" ? `${source.sheet.type} Panel` : "No Sheet Top"}`, marginX + 4, currentY + 5.5);
    doc.text(source.sheet.type !== "None" ? `₹ ${source.sheet.rate} / Sheet` : "-", marginX + 75, currentY + 5.5);
    doc.text(source.sheet.type !== "None" ? `₹ ${source.sheetCost}` : "-", marginX + 110, currentY + 5.5);
    doc.text("-", marginX + 145, currentY + 5.5);

    // Row 3: Fabrication steps
    currentY += 8;
    doc.setFillColor(255, 255, 255);
    doc.rect(marginX, currentY, 180, 8, "F");
    doc.text("Manufacturing Labour (Welding, Grinding, Polish, Packing)", marginX + 4, currentY + 5.5);
    doc.text("-", marginX + 75, currentY + 5.5);
    doc.text("-", marginX + 110, currentY + 5.5);
    doc.text(`₹ ${source.labourCostSum}`, marginX + 145, currentY + 5.5);

    currentY += 8;
    doc.setDrawColor(...borderLine);
    doc.line(marginX, currentY, 210 - marginX, currentY);

    // 6. TOTALS COLUMN (Right Aligned)
    currentY += 4;
    const finX1 = 120;
    const finX2 = 165;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    
    doc.text(`Cost Per Unit (Material + Labour):`, finX1, currentY);
    doc.text(`₹ ${source.subtotal}`, finX2, currentY, { align: "right" });

    currentY += 5;
    doc.text(`Subtotal Overall (${source.quantity} Units):`, finX1, currentY);
    doc.text(`₹ ${source.subtotal * source.quantity}`, finX2, currentY, { align: "right" });

    currentY += 5;
    doc.text(`Flat Logistic/Transport Cost:`, finX1, currentY);
    doc.text(`₹ ${source.costing.transport}`, finX2, currentY, { align: "right" });

    currentY += 5;
    doc.text(`Margin markup profit (${source.markup}%):`, finX1, currentY);
    doc.text(`₹ ${source.markupAmount}`, finX2, currentY, { align: "right" });

    currentY += 5.5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(`Taxable Subtotal:`, finX1, currentY);
    doc.text(`₹ ${source.taxableAmount}`, finX2, currentY, { align: "right" });

    currentY += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`Standard SGST & CGST (${source.gst}%):`, finX1, currentY);
    doc.text(`₹ ${source.gstAmount}`, finX2, currentY, { align: "right" });

    // Grand total highlight card
    currentY += 6;
    doc.setFillColor(...accentColor);
    doc.rect(finX1 - 5, currentY - 4, 85, 9, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`GRAND TOTAL (INR):`, finX1, currentY + 2);
    doc.text(`Rs. ${source.grandTotal.toLocaleString("en-IN")}/-`, finX2 + 10, currentY + 2, { align: "right" });

    // Left aligned Notes & Photos
    const noteY = currentY - 32;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text("Special Instructions / Client Notes:", marginX, noteY);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    
    const wrappedNotes = doc.splitTextToSize(source.notes || "No special requests. Item built to standard production gauges.", 90);
    doc.text(wrappedNotes, marginX, noteY + 4.5);

    // Embed sketch photo if active
    if (source.images && source.images.length > 0) {
      try {
        const imgBase64 = source.images[0];
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text("Product Visual Reference:", marginX, noteY + 20);
        
        doc.rect(marginX, noteY + 23, 40, 26);
        doc.addImage(imgBase64, "JPEG", marginX + 1, noteY + 24, 38, 24);
      } catch (imgErr) {}
    }

    currentY += 15;

    // 7. CONTRACT TERMS
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

    // 8. SIGNATURE BOXES
    currentY += 34;
    doc.setDrawColor(203, 213, 225);
    
    // IMSI Signature
    doc.line(marginX, currentY, marginX + 50, currentY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text("For INDIAN MAKE STEEL INDUSTRIES", marginX, currentY + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Authorized Fabricator", marginX, currentY + 8);

    // Customer acceptance
    doc.line(140, currentY, 190, currentY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Customer Acceptance", 140, currentY + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Sign & Seal", 140, currentY + 8);

    doc.save(`IMSI_${source.quoteNo}_${(source.clientName || "Customer").replace(/\s+/g, "_")}.pdf`);
    triggerAlert("success", `PDF Quotation "${source.quoteNo}" generated successfully!`);
  } catch (err) {
    console.error(err);
    triggerAlert("error", "Error creating PDF quotation. Please try again.");
  }
}
