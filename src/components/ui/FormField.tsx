import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-coral">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
      {error && <p className="text-xs text-coral">{error}</p>}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15";

export function TextInput({
  id,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      id={id}
      className={`${inputClassName} ${error ? "border-coral focus:border-coral focus:ring-coral/15" : ""}`}
      {...props}
    />
  );
}

export function SelectInput({
  id,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      id={id}
      className={`${inputClassName} ${error ? "border-coral focus:border-coral focus:ring-coral/15" : ""}`}
      {...props}
    >
      {children}
    </select>
  );
}
