/**
 * Splits a free-form highlights string into individual chips for the
 * generated creative. Supports the common separators people naturally
 * type: middot/bullet characters, pipes, and commas. Falls back to
 * treating the whole string as a single highlight.
 */
export function parseHighlights(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const dotOrPipe = /[•·|]/;
  if (dotOrPipe.test(trimmed)) {
    return trimmed
      .split(dotOrPipe)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (trimmed.includes(",")) {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [trimmed];
}
