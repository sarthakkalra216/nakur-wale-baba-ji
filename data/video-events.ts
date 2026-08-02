// Custom bilingual titles + display order for video event folders.
//
// The videos page groups clips by folder under public/videos/ — every
// subfolder becomes its own event section, same convention as
// data/gallery-events.ts for photos. The flat video*.ext files directly in
// public/videos/ form the default "main" section.
export interface VideoEventTitle {
  hi: string
  en: string
}

export const videoEventTitles: Record<string, VideoEventTitle> = {
  main: { hi: "पावन वीडियो", en: "Sacred Videos" },
  "Guru Purnima 2026": { hi: "गुरु पूर्णिमा 2026", en: "Guru Purnima 2026" },
}

export const videoEventOrder: string[] = ["Guru Purnima 2026", "main"]
