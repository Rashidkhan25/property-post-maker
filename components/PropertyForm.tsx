"use client";

import type { ChangeEvent, FormEvent } from "react";
import { FormField } from "./FormField";
import type { PropertyFormData, PropertyFormField } from "@/lib/types";

interface PropertyFormProps {
  data: PropertyFormData;
  errors: Partial<Record<PropertyFormField, string>>;
  onFieldChange: (field: PropertyFormField, value: string) => void;
  onFieldBlur: (field: PropertyFormField) => void;
  onUseSampleData: () => void;
  onReset: () => void;
  onPropertyImageChange: (file: File | null) => void;
}

export function PropertyForm({
  data,
  errors,
  onFieldChange,
  onFieldBlur,
  onUseSampleData,
  onReset,
  onPropertyImageChange,
}: PropertyFormProps) {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPropertyImageChange(event.target.files?.[0] ?? null);
  };
  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
          Property Post Maker
        </p>
        <h1 className="font-display text-3xl leading-tight text-ink-950 sm:text-4xl">
          Craft a listing creative in seconds
        </h1>
        <p className="text-sm leading-relaxed text-ink-500">
          Fill in the four details below — your social-ready post updates
          live on the right, no design tools required.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="property-image" className="text-sm font-medium text-ink-800">
            Property Image <span className="text-ink-400">(optional)</span>
          </label>
          <div className="rounded-xl border border-dashed border-ink-300 bg-white px-4 py-3 transition-colors focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-500/15">
            <input
              key={data.propertyImage ?? "demo"}
              id="property-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="block w-full cursor-pointer text-sm text-ink-500 file:mr-4 file:rounded-full file:border-0 file:bg-gold-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-ink-900 hover:file:bg-gold-200"
            />
          </div>
          <p className="text-xs leading-relaxed text-ink-400">JPG, PNG or WebP. A curated villa image is used when no image is selected.</p>
        </div>
        <FormField
          id="property"
          label="Property & Type"
          placeholder="4 BHK Luxury Villa, Ansal Golf City"
          value={data.property}
          onChange={(value) => onFieldChange("property", value)}
          onBlur={() => onFieldBlur("property")}
          error={errors.property}
          required
          maxLength={80}
        />
        <FormField
          id="location"
          label="Location"
          placeholder="Sushant Golf City, Lucknow"
          value={data.location}
          onChange={(value) => onFieldChange("location", value)}
          onBlur={() => onFieldBlur("location")}
          error={errors.location}
          required
          maxLength={70}
        />
        <FormField
          id="price"
          label="Price"
          placeholder="₹2.5 Cr onwards"
          value={data.price}
          onChange={(value) => onFieldChange("price", value)}
          onBlur={() => onFieldBlur("price")}
          error={errors.price}
          required
          maxLength={40}
        />
        <FormField
          id="highlights"
          label="Highlights"
          placeholder="3000 sq.ft · Corner plot · Ready to move"
          value={data.highlights}
          onChange={(value) => onFieldChange("highlights", value)}
          onBlur={() => onFieldBlur("highlights")}
          error={errors.highlights}
          helperText="Separate highlights with · or a comma."
          maxLength={90}
        />
      </div>

      <div className="flex flex-wrap gap-3 border-t border-ink-100 pt-6">
        <button
          type="button"
          onClick={onUseSampleData}
          className="rounded-full border border-ink-950 bg-ink-950 px-5 py-2.5 text-sm font-medium text-paper-50 transition-colors duration-150 hover:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2"
        >
          Use Sample Data
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors duration-150 hover:border-ink-400 hover:text-ink-950 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>

      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-400">
        <span className="text-gold-600" aria-hidden="true">
          *
        </span>
        <span>
          Property, location and price are required to enable the download.
          Branding and contact details are added automatically.
        </span>
      </p>
    </form>
  );
}
