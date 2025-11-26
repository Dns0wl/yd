import type { ReactNode } from "react";
import { cn } from "./helpers";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, required, error, children }: FormFieldProps) {
  return (
    <label className="block space-y-2" htmlFor={htmlFor}>
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-200">
        <span>{label}</span>
        {required ? <span className="text-xs text-red-400">*</span> : null}
      </div>
      {children}
      {error ? <p className={cn("text-xs text-red-400")}>{error}</p> : null}
    </label>
  );
}
