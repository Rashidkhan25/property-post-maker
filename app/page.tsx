"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { PropertyForm } from "@/components/PropertyForm";
import { PreviewStage } from "@/components/PreviewStage";
import { emptyFormData } from "@/lib/types";
import type { PropertyFormData, PropertyFormField } from "@/lib/types";
import { sampleData } from "@/lib/sample-data";
import { downloadPostAsPng, slugifyFileName } from "@/lib/export-image";

type FieldErrors = Partial<Record<PropertyFormField, string>>;

const REQUIRED_FIELDS: PropertyFormField[] = ["property", "location", "price"];

function validate(data: PropertyFormData): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of REQUIRED_FIELDS) {
    if (!data[field].trim()) {
      errors[field] = "This field is required.";
    }
  }
  return errors;
}

export default function Home() {
  const [formData, setFormData] = useState<PropertyFormData>(emptyFormData);
  const [touched, setTouched] = useState<
    Partial<Record<PropertyFormField, boolean>>
  >({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const creativeRef = useRef<HTMLDivElement>(null);

  const errors = useMemo(() => validate(formData), [formData]);

  const visibleErrors = useMemo<FieldErrors>(() => {
    const next: FieldErrors = {};
    (Object.keys(errors) as PropertyFormField[]).forEach((field) => {
      if (touched[field]) {
        next[field] = errors[field];
      }
    });
    return next;
  }, [errors, touched]);

  const isReadyToDownload = useMemo(
    () => REQUIRED_FIELDS.every((field) => formData[field].trim().length > 0),
    [formData]
  );

  const handleFieldChange = useCallback(
    (field: PropertyFormField, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleFieldBlur = useCallback((field: PropertyFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleUseSampleData = useCallback(() => {
    setFormData(sampleData);
    setTouched({});
    setStatusMessage("Sample data loaded.");
  }, []);

  const handlePropertyImageChange = useCallback((file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, propertyImage: null }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, propertyImage: String(reader.result) }));
      setStatusMessage("Property image added to your creative.");
    };
    reader.onerror = () => setStatusMessage("That image could not be loaded. Please try another file.");
    reader.readAsDataURL(file);
  }, []);

  const handleReset = useCallback(() => {
    setFormData(emptyFormData);
    setTouched({});
    setStatusMessage("Form cleared.");
  }, []);

  const handleDownload = useCallback(async () => {
    if (!isReadyToDownload || !creativeRef.current) {
      setTouched({
        property: true,
        location: true,
        price: true,
        highlights: true,
      });
      setStatusMessage("Please complete the required fields before downloading.");
      return;
    }

    setIsDownloading(true);
    setStatusMessage(null);

    try {
      const fileName = `${slugifyFileName(formData.property)}.png`;
      await downloadPostAsPng(creativeRef.current, fileName);
      setStatusMessage("Your creative has been downloaded.");
    } catch (error) {
      console.error("Failed to export property post", error);
      setStatusMessage("Something went wrong while exporting. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [formData.property, isReadyToDownload]);

  return (
    <>
      <header className="border-b border-ink-100 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-wide text-ink-950">
              VEDLABS
            </span>
            <span className="text-ink-300">/</span>
            <span className="text-sm text-ink-500">Property Post Maker</span>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-ink-400 sm:inline">
            Instant social creatives
          </span>
          <span className="hidden text-sm font-medium text-ink-500 md:inline">
            Made by Vedant Dhavan
          </span>
        </div>
      </header>

      <main className="min-h-screen bg-paper-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 lg:flex-row lg:items-start lg:gap-14 lg:py-16">
          <section className="w-full lg:sticky lg:top-10 lg:w-[420px] lg:shrink-0">
            <PropertyForm
              data={formData}
              errors={visibleErrors}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleFieldBlur}
              onUseSampleData={handleUseSampleData}
              onReset={handleReset}
              onPropertyImageChange={handlePropertyImageChange}
            />
          </section>

          <section className="flex w-full flex-col items-center gap-6">
            <PreviewStage data={formData} creativeRef={creativeRef} />

            <div className="flex w-full max-w-[520px] flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!isReadyToDownload || isDownloading}
                aria-disabled={!isReadyToDownload || isDownloading}
                className="w-full rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink-950 transition-all duration-150 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400"
              >
                {isDownloading ? "Preparing PNG…" : "Download PNG"}
              </button>
              <p
                aria-live="polite"
                className="min-h-[1.25rem] text-center text-xs text-ink-500"
              >
                {statusMessage}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
