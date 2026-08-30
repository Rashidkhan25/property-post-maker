/* eslint-disable @next/next/no-img-element -- data-URL uploads must remain exportable by html-to-image. */
import { forwardRef } from "react";
import type { PropertyFormData } from "@/lib/types";
import { parseHighlights } from "@/lib/highlights";
import { CREATIVE_HEIGHT, CREATIVE_WIDTH } from "@/lib/export-image";

interface PostPreviewProps { data: PropertyFormData; }

const DEMO_IMAGE = "/images/demo-villa.png";
const PLACEHOLDER = { property: "Your property headline", location: "Add a location", price: "Add a price", highlights: "Signature features" };

export const PostPreview = forwardRef<HTMLDivElement, PostPreviewProps>(function PostPreview({ data }, ref) {
  const hasProperty = Boolean(data.property.trim());
  const hasLocation = Boolean(data.location.trim());
  const hasPrice = Boolean(data.price.trim());
  const highlights = parseHighlights(data.highlights).slice(0, 3);
  const imageSource = data.propertyImage || DEMO_IMAGE;

  return (
    <div ref={ref} id="property-creative" style={{ width: CREATIVE_WIDTH, height: CREATIVE_HEIGHT }} className="relative overflow-hidden bg-[#111310] font-sans text-paper-50">
      {/* Image field occupies 780px / 1350px = 58% of the creative. */}
      <div className="absolute inset-x-0 top-0 h-[780px] overflow-hidden bg-ink-900">
        <img src={imageSource} alt="Property" crossOrigin="anonymous" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-45% to-[#111310]" />
        <div className="absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-t from-[#111310] to-transparent" />
      </div>
      <div className="absolute inset-x-[70px] top-[58px] flex items-center justify-between">
        <span className="border border-white/35 bg-black/20 px-5 py-3 text-[17px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm">Premier Residence</span>
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-gold-300/80 bg-black/25 font-display text-[20px] font-bold text-gold-200 backdrop-blur-sm">VL</span>
      </div>
      <section className="absolute inset-x-[70px] top-[620px]">
        <p className="mb-4 text-[17px] font-semibold uppercase tracking-[0.3em] text-gold-300">For Sale</p>
        <h2 className={`max-w-[890px] font-display text-[62px] font-semibold leading-[1.04] tracking-[-0.03em] ${hasProperty ? "text-white" : "italic text-white/55"}`}>{hasProperty ? data.property : PLACEHOLDER.property}</h2>
        <div className="mt-5 flex items-center gap-3 text-[23px] text-white/80">
          <svg width="20" height="25" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gold-300" aria-hidden="true"><path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" /></svg>
          <span className={hasLocation ? "" : "italic text-white/45"}>{hasLocation ? data.location : PLACEHOLDER.location}</span>
        </div>
      </section>
      <section className="absolute inset-x-[70px] top-[965px] flex items-end justify-between border-t border-white/20 pt-7">
        <div><p className="mb-2 text-[16px] font-semibold uppercase tracking-[0.28em] text-gold-300">Starting at</p><p className={`font-display text-[62px] font-bold leading-none ${hasPrice ? "text-white" : "italic text-white/50"}`}>{hasPrice ? data.price : PLACEHOLDER.price}</p></div>
        <div className="mb-1 h-[58px] w-px bg-gold-400/60" />
        <p className="max-w-[230px] text-right text-[17px] leading-relaxed text-white/65">A refined address made for elevated everyday living.</p>
      </section>
      <section className="absolute inset-x-[70px] top-[1147px] flex gap-3 overflow-hidden">
        {highlights.length ? highlights.map((highlight, index) => <span key={`${highlight}-${index}`} className="whitespace-nowrap border border-white/15 bg-white/[0.06] px-4 py-2 text-[15px] font-medium uppercase tracking-[0.08em] text-white/85">{highlight}</span>) : <span className="border border-dashed border-white/20 px-4 py-2 text-[15px] italic text-white/45">{PLACEHOLDER.highlights}</span>}
      </section>
      <footer className="absolute inset-x-0 bottom-0 flex h-[116px] items-center justify-between border-t border-white/10 bg-[#0a0b09] px-[70px]">
        <div><p className="font-display text-[27px] font-bold tracking-[0.08em] text-white">VEDLABS</p><p className="mt-1 text-[13px] uppercase tracking-[0.16em] text-white/45">Luxury property advisory</p></div>
        <div className="text-right"><p className="text-[14px] uppercase tracking-[0.2em] text-gold-300">Private viewing</p><p className="mt-1 text-[19px] text-white/85">+91 XXXXX XXXXX</p></div>
      </footer>
    </div>
  );
});
