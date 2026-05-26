"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { runQuotationCalculations } from "../utils/calculations/quotationCalculations.js";

// Pre-populated default records
const INITIAL_QUOTATIONS = [
  {
    id: "q-101",
    quoteNo: "QTN-2026-001",
    clientName: "Royal Cafe & Bistro",
    clientContact: "9876543210",
    clientAddress: "12, DB Road, RS Puram, Coimbatore",
    productName: "Premium SS Cafeteria Chair",
    category: "Chair",
    quantity: 24,
    date: "2026-05-20",
    notes: "Mirror polish, high grade SS304. Client requested premium packaging.",
    dimensions: { height: 32, width: 18, depth: 18, seatHeight: 18, seatWidth: 18, seatDepth: 16, unit: "inch" },
    pipe: { type: "SS", shape: "Round", sizeUnit: "inch", width: 1, height: 0, thickness: 1.5, rate: 320, wastage: 10 },
    sheet: { type: "SS Sheet", thickness: 1.2, rate: 3500, qty: 0.15, wastage: 10 },
    costing: { labour: 250, welding: 150, grinding: 100, polish: 250, packing: 50, transport: 500 },
    markup: 25,
    gst: 18,
    pipeLength: 21.6,
    pipeWeight: 5.86,
    pipeCost: 2062.72,
    sheetCost: 577.5,
    materialCost: 2640.22,
    labourCostSum: 800,
    subtotal: 3440.22,
    totalBeforeMarkup: 83065.28,
    markupAmount: 20766.32,
    taxableAmount: 103831.6,
    gstAmount: 18689.69,
    grandTotal: 122521.29,
    images: []
  },
  {
    id: "q-102",
    quoteNo: "QTN-2026-002",
    clientName: "Apex Tech Labs",
    clientContact: "9443210987",
    clientAddress: "Tidel Park, Avinashi Road, Coimbatore",
    productName: "Heavy Duty MS Work Table",
    category: "Table",
    quantity: 8,
    date: "2026-05-24",
    notes: "Matte grey powder coated finish. Heavy duty frame structure.",
    dimensions: { height: 30, width: 60, depth: 30, seatHeight: 0, seatWidth: 0, seatDepth: 0, unit: "inch" },
    pipe: { type: "MS", shape: "Square", sizeUnit: "inch", width: 2, height: 0, thickness: 2.0, rate: 85, wastage: 8 },
    sheet: { type: "MS Sheet", thickness: 2.0, rate: 2800, qty: 0.6, wastage: 5 },
    costing: { labour: 600, welding: 450, grinding: 200, polish: 0, packing: 100, transport: 1200 },
    markup: 20,
    gst: 18,
    pipeLength: 44,
    pipeWeight: 36.5,
    pipeCost: 3350.7,
    sheetCost: 1764,
    materialCost: 5114.7,
    labourCostSum: 1350,
    subtotal: 6464.7,
    totalBeforeMarkup: 52917.6,
    markupAmount: 10583.52,
    taxableAmount: 63501.12,
    gstAmount: 11430.2,
    grandTotal: 74931.32,
    images: []
  }
];

const INITIAL_FORM_STATE = {
  quoteId: "",
  quoteNo: "",
  clientName: "",
  clientContact: "",
  clientAddress: "",
  productName: "",
  category: "Chair",
  quantity: 1,
  notes: "",
  images: [],
  dimensions: {
    height: 32,
    width: 18,
    depth: 18,
    seatHeight: 18,
    seatWidth: 18,
    seatDepth: 16,
    unit: "inch"
  },
  pipe: {
    type: "SS",
    shape: "Round",
    sizeUnit: "inch",
    width: 1,
    height: 0,
    thickness: 1.5,
    rate: 320,
    wastage: 10
  },
  sheet: {
    type: "SS Sheet",
    thickness: 1.2,
    rate: 3500,
    qty: 0.15,
    wastage: 10
  },
  costing: {
    labour: 250,
    welding: 150,
    grinding: 100,
    polish: 250,
    packing: 50,
    transport: 500
  },
  markup: 25,
  gst: 18,
  isPipeLengthOverridden: false,
  manualPipeLength: 20,
  pricingMode: "retail",
  gstEnabled: true,
  workerNotes: "",
  fabricationInstructions: "",
  outputControls: {
    showWholesale: true,
    showRetail: true,
    showDealer: true,
    showProfit: true,
    showPipeCalc: true,
    showLabourCost: true,
    showWeight: true,
    showGst: true,
    showTransport: true,
    showPacking: true,
    showCutList: true
  }
};

const QuotationContext = createContext(null);

export function QuotationProvider({ children }) {
  // Global View Settings
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertMsg, setAlertMsg] = useState(null);
  const [factoryMode, setFactoryMode] = useState(false);

  // Data Collections
  const [quotations, setQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Company Profile Settings
  const [companyInfo, setCompanyInfo] = useState({
    name: "INDIAN MAKE STEEL INDUSTRIES",
    address: "NO.K-6, SIDCO, Kurichi, SIDCO Industrial Estate, Coimbatore, Tamil Nadu 641021, India",
    gstin: "33FAXPM0581G1ZC",
    phone1: "9585745303",
    phone2: "8300904920",
    email: "contact@indianmakesteel.com",
    bankName: "State Bank of India",
    accNo: "33445566778",
    ifsc: "SBIN0001234",
    terms: "1. Price Validity: 15 days from the date of quotation.\n2. Payment: 50% advance along with purchase order, balance 50% upon dispatch.\n3. Delivery: Within 2 to 3 weeks from the date of advance received.\n4. Transport charges extra at actuals unless specified otherwise.\n5. Standard GST 18% is applicable on all items."
  });

  // DB Sync Settings
  const [dbSettings, setDbSettings] = useState({
    supabaseUrl: "",
    supabaseAnonKey: "",
    isSyncEnabled: false,
    isConnected: false,
    isTesting: false
  });

  // Core Form Input State
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  // 1. Initial hydration and mounts
  useEffect(() => {
    const stored = localStorage.getItem("imsi_quotations");
    if (stored) {
      try {
        setQuotations(JSON.parse(stored));
      } catch (e) {
        setQuotations(INITIAL_QUOTATIONS);
      }
    } else {
      setQuotations(INITIAL_QUOTATIONS);
      localStorage.setItem("imsi_quotations", JSON.stringify(INITIAL_QUOTATIONS));
    }

    const storedSettings = localStorage.getItem("imsi_supabase_settings");
    if (storedSettings) {
      try {
        setDbSettings(JSON.parse(storedSettings));
      } catch (e) {}
    }

    const storedCompany = localStorage.getItem("imsi_company_info");
    if (storedCompany) {
      try {
        setCompanyInfo(JSON.parse(storedCompany));
      } catch (e) {}
    }
  }, []);

  // Update root stylesheet dark theme classes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Utility toast dispatcher
  const triggerAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // 2. Computed Live Totals memoization
  const liveSummary = useMemo(() => {
    return runQuotationCalculations(formState);
  }, [formState]);

  // Set manual pipe length override defaults
  useEffect(() => {
    if (!formState.isPipeLengthOverridden) {
      setFormState((prev) => ({
        ...prev,
        manualPipeLength: liveSummary.calculatedPipeLengthFeet
      }));
    }
  }, [liveSummary.calculatedPipeLengthFeet, formState.isPipeLengthOverridden]);

  // 3. Central Event Actions
  const updateField = (section, key, value) => {
    setFormState((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key]: value
          }
        };
      } else {
        return {
          ...prev,
          [key]: value
        };
      }
    });
  };

  const updateRootField = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const applyTemplate = (tpl) => {
    const freshQuoteNo = `QTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormState({
      quoteId: "",
      quoteNo: freshQuoteNo,
      clientName: "",
      clientContact: "",
      clientAddress: "",
      productName: tpl.name,
      category: tpl.category,
      quantity: tpl.quantity,
      notes: tpl.notes,
      images: [],
      dimensions: { ...tpl.dimensions },
      pipe: { ...tpl.pipe },
      sheet: { ...tpl.sheet },
      costing: { ...tpl.costing },
      markup: tpl.markup,
      gst: tpl.gst,
      isPipeLengthOverridden: false,
      manualPipeLength: 0,
      pricingMode: "retail",
      gstEnabled: true,
      workerNotes: "",
      fabricationInstructions: "",
      outputControls: {
        showWholesale: true,
        showRetail: true,
        showDealer: true,
        showProfit: true,
        showPipeCalc: true,
        showLabourCost: true,
        showWeight: true,
        showGst: true,
        showTransport: true,
        showPacking: true,
        showCutList: true
      }
    });
    setActiveTab("new-quotation");
    triggerAlert("success", `Template "${tpl.name}" loaded successfully.`);
  };

  const resetForm = () => {
    const freshQuoteNo = `QTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormState({
      ...INITIAL_FORM_STATE,
      quoteNo: freshQuoteNo
    });
    triggerAlert("info", "Form has been reset.");
  };

  const editQuotation = (q) => {
    setFormState({
      quoteId: q.id,
      quoteNo: q.quoteNo,
      clientName: q.clientName || "",
      clientContact: q.clientContact || "",
      clientAddress: q.clientAddress || "",
      productName: q.productName,
      category: q.category,
      quantity: q.quantity,
      notes: q.notes || "",
      images: q.images || [],
      dimensions: {
        height: q.dimensions.height,
        width: q.dimensions.width,
        depth: q.dimensions.depth,
        seatHeight: q.dimensions.seatHeight || 0,
        seatWidth: q.dimensions.seatWidth || 0,
        seatDepth: q.dimensions.seatDepth || 0,
        unit: q.dimensions.unit || "inch"
      },
      pipe: {
        type: q.pipe.type,
        shape: q.pipe.shape,
        sizeUnit: q.pipe.sizeUnit || "inch",
        width: q.pipe.width,
        height: q.pipe.height || 0,
        thickness: q.pipe.thickness,
        rate: q.pipe.rate,
        wastage: q.pipe.wastage
      },
      sheet: {
        type: q.sheet.type || "None",
        thickness: q.sheet.thickness || 0,
        rate: q.sheet.rate || 0,
        qty: q.sheet.qty || 0,
        wastage: q.sheet.wastage || 0
      },
      costing: {
        labour: q.costing.labour || 0,
        welding: q.costing.welding || 0,
        grinding: q.costing.grinding || 0,
        polish: q.costing.polish || 0,
        packing: q.costing.packing || 0,
        transport: q.costing.transport || 0
      },
      markup: q.markup,
      gst: q.gst,
      isPipeLengthOverridden: q.pipeLength !== undefined,
      manualPipeLength: q.pipeLength || 0,
      pricingMode: q.pricingMode || "retail",
      gstEnabled: q.gstEnabled !== undefined ? q.gstEnabled : true,
      workerNotes: q.workerNotes || "",
      fabricationInstructions: q.fabricationInstructions || "",
      outputControls: q.outputControls || {
        showWholesale: true,
        showRetail: true,
        showDealer: true,
        showProfit: true,
        showPipeCalc: true,
        showLabourCost: true,
        showWeight: true,
        showGst: true,
        showTransport: true,
        showPacking: true,
        showCutList: true
      }
    });
    setActiveTab("new-quotation");
    triggerAlert("success", `Quotation "${q.quoteNo}" loaded in editor.`);
  };

  const saveQuotation = () => {
    if (!formState.productName.trim()) {
      triggerAlert("error", "Please provide a Product Name.");
      return;
    }
    if (!formState.clientName.trim()) {
      triggerAlert("error", "Please enter the Client Name.");
      return;
    }

    const finalId = formState.quoteId || "q-" + Date.now();
    const finalNo = formState.quoteNo || `QTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      ...formState,
      id: finalId,
      quoteNo: finalNo,
      date: new Date().toISOString().split("T")[0],
      // Inject compiled calculations to preserve historical snapshots
      pipeLength: liveSummary.activePipeLength,
      pipeWeight: Number(liveSummary.totalPipeWeight),
      pipeCost: liveSummary.pipeCost,
      sheetCost: liveSummary.sheetCost,
      materialCost: liveSummary.materialCost,
      labourCostSum: liveSummary.labourCostSum,
      subtotal: liveSummary.subtotalPerItem,
      totalBeforeMarkup: liveSummary.totalBeforeMarkup,
      markupAmount: liveSummary.markupAmount,
      taxableAmount: liveSummary.taxableAmount,
      gstAmount: liveSummary.gstAmount,
      grandTotal: liveSummary.grandTotal
    };

    let updatedList;
    if (formState.quoteId) {
      updatedList = quotations.map((q) => (q.id === formState.quoteId ? payload : q));
      triggerAlert("success", `Quotation "${finalNo}" updated successfully.`);
    } else {
      updatedList = [payload, ...quotations];
      triggerAlert("success", `Quotation "${finalNo}" saved successfully.`);
    }

    setQuotations(updatedList);
    localStorage.setItem("imsi_quotations", JSON.stringify(updatedList));
    setFormState((prev) => ({ ...prev, quoteId: finalId, quoteNo: finalNo }));
  };

  const deleteQuotation = (id, qNo) => {
    if (confirm(`Are you sure you want to delete quotation ${qNo}?`)) {
      const updated = quotations.filter((q) => q.id !== id);
      setQuotations(updated);
      localStorage.setItem("imsi_quotations", JSON.stringify(updated));
      triggerAlert("info", `Quotation ${qNo} removed.`);
      if (formState.quoteId === id) {
        resetForm();
      }
    }
  };

  // Company Profile Actions
  const updateCompanyInfo = (newInfo) => {
    setCompanyInfo(newInfo);
    localStorage.setItem("imsi_company_info", JSON.stringify(newInfo));
    triggerAlert("success", "Company settings saved locally.");
  };

  // Supabase Sync Mock Actions
  const testDbConnection = () => {
    if (!dbSettings.supabaseUrl || !dbSettings.supabaseAnonKey) {
      triggerAlert("error", "Please provide both Supabase URL and API Key.");
      return;
    }
    setDbSettings((prev) => ({ ...prev, isTesting: true }));
    setTimeout(() => {
      setDbSettings((prev) => {
        const next = { ...prev, isTesting: false, isConnected: true };
        localStorage.setItem("imsi_supabase_settings", JSON.stringify(next));
        return next;
      });
      triggerAlert("success", "Supabase credentials verified! Ready for Phase 2 cloud sync.");
    }, 1200);
  };

  const toggleDbSync = () => {
    setDbSettings((prev) => {
      const next = { ...prev, isSyncEnabled: !prev.isSyncEnabled };
      localStorage.setItem("imsi_supabase_settings", JSON.stringify(next));
      triggerAlert("info", next.isSyncEnabled ? "Cloud Auto-Sync activated." : "Cloud Auto-Sync deactivated.");
      return next;
    });
  };

  const updateDbSettingsFields = (key, value) => {
    setDbSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <QuotationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        darkMode,
        setDarkMode,
        sidebarOpen,
        setSidebarOpen,
        alertMsg,
        triggerAlert,
        factoryMode,
        setFactoryMode,
        quotations,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        companyInfo,
        updateCompanyInfo,
        dbSettings,
        updateDbSettingsFields,
        testDbConnection,
        toggleDbSync,
        formState,
        updateField,
        updateRootField,
        applyTemplate,
        resetForm,
        editQuotation,
        saveQuotation,
        deleteQuotation,
        liveSummary
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error("useQuotation must be used within a QuotationProvider");
  }
  return context;
}
