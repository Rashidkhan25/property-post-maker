import type { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxLength?: number;
}

export function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  maxLength,
}: FormFieldProps) {
  const describedBy = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink-800"
      >
        <span>
          {label}
          {required && (
            <span className="ml-1 text-gold-600" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {typeof maxLength === "number" && (
          <span className="whitespace-nowrap text-xs font-normal tabular-nums text-ink-400">
            {value.length}/{maxLength}
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        onBlur={onBlur}
        className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 shadow-sm outline-none transition-colors duration-150 placeholder:text-ink-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
      />

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-ink-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
