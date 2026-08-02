// "Guru Purnima 2026" -> "guru-purnima-2026" — a URL/anchor-safe id for
// deep-linking to a specific gallery or video section (e.g. /gallery#guru-purnima-2026).
// Split out from lib/media.ts (which imports Node's `fs`) so client
// components can use it without pulling server-only code into the bundle.
export function slugifyId(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
