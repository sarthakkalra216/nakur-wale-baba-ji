// Custom bilingual titles + display order for gallery event folders.
//
// The gallery groups photos by folder under public/images/ — every subfolder
// becomes its own event section. A folder with no entry in galleryEventTitles
// still works: its name is auto-formatted into a title (e.g. "holi-2026" ->
// "Holi 2026") shown the same in both languages.
//
// Folders not listed in galleryEventOrder fall after the listed ones, sorted
// naturally by folder name (prefix with numbers/dates, e.g. "01-holi-2026",
// to control their relative order).
export interface GalleryEventTitle {
  hi: string
  en: string
}

export const galleryEventTitles: Record<string, GalleryEventTitle> = {
  "Nakud wale baba ji": { hi: "नकुड़ वाले बाबा जी", en: "Nakud Wale Baba Ji" },
  "Different events": { hi: "विभिन्न कार्यक्रम", en: "Different Events" },
  "Devi ji": { hi: "देवी जी", en: "Devi Ji" },
}

export const galleryEventOrder: string[] = [
  "Nakud wale baba ji",
  "Different events",
  "Devi ji",
]

// Named captions for specific photos, keyed by "<folder>/<filename>" (or
// just "<filename>" for the flat Nakur Wale Baba Ji photos in public/images/ directly).
// Captions always render in Hindi, regardless of the site's language toggle
// — they're names, not translatable copy.
export const galleryImageCaptions: Record<string, string> = {
  "Devi ji/photo29.jpg.jpeg": "सुश्री सौम्या सरस्वती जी",
  "Devi ji/photo30.jpg.jpeg": "सुश्री समीक्षा सरस्वती जी",
}

// Filenames listed here (same "<folder>/<filename>" keys as above) render
// at the end of their folder's grid, in the order given — overriding
// natural sort so a section can close with specific named portraits.
export const galleryImagePinLast: string[] = [
  "Devi ji/photo29.jpg.jpeg",
  "Devi ji/photo30.jpg.jpeg",
]
