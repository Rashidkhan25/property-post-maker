"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { PostPreview } from "./PostPreview";
import type { PropertyFormData } from "@/lib/types";
import { CREATIVE_HEIGHT, CREATIVE_WIDTH } from "@/lib/export-image";

interface PreviewStageProps {
  data: PropertyFormData;
  creativeRef: RefObject<HTMLDivElement | null>;
}

/**
 * Renders the 1080x1350 creative at its true size, then visually scales it
 * down with a CSS transform to fit the available width. The underlying node
 * (attached via `creativeRef`) always keeps its real pixel dimensions, so
 * exporting it produces a crisp, full-resolution PNG regardless of the
 * on-screen scale factor.
 */
export function PreviewStage({ data, creativeRef }: PreviewStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const updateScale = () => {
      const availableWidth = containerEl.offsetWidth;
      if (availableWidth > 0) {
        setScale(availableWidth / CREATIVE_WIDTH);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerEl);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[520px]"
    >
      <div
        className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-ink-950/10 transition-shadow duration-300"
        style={{
          width: CREATIVE_WIDTH * scale,
          height: CREATIVE_HEIGHT * scale,
        }}
      >
        <div
          style={{
            width: CREATIVE_WIDTH,
            height: CREATIVE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <PostPreview ref={creativeRef} data={data} />
        </div>
      </div>
    </div>
  );
}
