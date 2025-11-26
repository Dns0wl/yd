"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { PurchaseChannel } from "./types";

interface ManualPaperFormValues {
  customerName: string;
  purchaseDate: string;
  purchaseChannel: PurchaseChannel | "";
}

interface ManualPaperFormProps {
  onSubmit: (values: { customerName: string; purchaseDate: string; purchaseChannel: PurchaseChannel }) => void;
  onCancel: () => void;
}

export function ManualPaperForm({ onSubmit, onCancel }: ManualPaperFormProps) {
  const [values, setValues] = useState<ManualPaperFormValues>({
    customerName: "",
    purchaseDate: "",
    purchaseChannel: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ManualPaperFormValues, string>>>({});

  const handleChange = (
    key: keyof ManualPaperFormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!values.customerName.trim()) {
      nextErrors.customerName = "Customer name is required";
    }
    if (!values.purchaseDate) {
      nextErrors.purchaseDate = "Purchase date is required";
    }
    if (!values.purchaseChannel) {
      nextErrors.purchaseChannel = "Select a channel";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      customerName: values.customerName.trim(),
      purchaseDate: values.purchaseDate,
      purchaseChannel: values.purchaseChannel as PurchaseChannel,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormField label="Customer Name" htmlFor="customerName" required error={errors.customerName}>
        <input
          id="customerName"
          name="customerName"
          type="text"
          value={values.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-neutral-500 focus:outline-none"
          placeholder="Enter customer name"
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Purchase Date" htmlFor="purchaseDate" required error={errors.purchaseDate}>
          <input
            id="purchaseDate"
            name="purchaseDate"
            type="date"
            value={values.purchaseDate}
            onChange={(e) => handleChange("purchaseDate", e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-neutral-500 focus:outline-none"
          />
        </FormField>

        <FormField label="Purchase Channel" htmlFor="purchaseChannel" required error={errors.purchaseChannel}>
          <select
            id="purchaseChannel"
            name="purchaseChannel"
            value={values.purchaseChannel}
            onChange={(e) => handleChange("purchaseChannel", e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-neutral-500 focus:outline-none"
          >
            <option value="">Select channel</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Website">Website</option>
          </select>
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save &amp; Generate
        </Button>
      </div>
    </form>
  );
}
