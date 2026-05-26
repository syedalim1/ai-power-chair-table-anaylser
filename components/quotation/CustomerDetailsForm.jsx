"use client";

import React from "react";
import { User } from "lucide-react";
import FormSection from "../forms/FormSection.jsx";
import InputField from "../forms/InputField.jsx";
import useQuotation from "../../hooks/useQuotation.js";

export default function CustomerDetailsForm() {
  const { formState, updateRootField } = useQuotation();

  return (
    <FormSection title="Client & Customer Information" icon={User}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Client / Business Name"
          value={formState.clientName}
          onChange={(val) => updateRootField("clientName", val)}
          placeholder="M/s. Royal Cafe, Apex Tech, etc."
          required
        />
        <InputField
          label="Contact Phone / Email"
          value={formState.clientContact}
          onChange={(val) => updateRootField("clientContact", val)}
          placeholder="+91 98765 43210"
        />
        <InputField
          label="Client Delivery Location"
          value={formState.clientAddress}
          onChange={(val) => updateRootField("clientAddress", val)}
          placeholder="Full delivery location details"
          className="sm:col-span-2"
        />
      </div>
    </FormSection>
  );
}
