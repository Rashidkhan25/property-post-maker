import { toPng } from "html-to-image";

export const CREATIVE_WIDTH = 1080;
export const CREATIVE_HEIGHT = 1350;

/**
 * Rasterizes the given DOM node (expected to be the fixed 1080x1350
 * creative element) to a PNG and triggers a browser download.
 *
 * The node must already be at its true, unscaled pixel dimensions —
 * any responsive preview scaling should be applied to a *wrapper*
 * element, not to the node passed here, so the exported file always
 * matches the intended 1080x1350 layout and typography exactly.
 */
export async function downloadPostAsPng(
  node: HTMLElement,
  fileName = "property-post.png"
): Promise<void> {
  // Wait for web fonts to finish loading so the raster capture reflects
  // the correct typography instead of a fallback system font.
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Non-fatal — proceed with export even if this can't be confirmed.
    }
  }

  const dataUrl = await toPng(node, {
    width: CREATIVE_WIDTH,
    height: CREATIVE_HEIGHT,
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#0b0b0c",
    style: {
      transform: "none",
      margin: "0",
    },
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Turns a property headline into a safe, readable filename slug.
 */
export function slugifyFileName(value: string, fallback = "property-post"): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");

  return slug || fallback;
}
