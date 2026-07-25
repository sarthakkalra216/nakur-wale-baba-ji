// Custom bilingual titles for gallery event folders.
//
// The gallery groups photos by folder under public/images/ — every subfolder
// becomes its own event section (the "Guruji" section is the flat photo*.ext
// files already sitting directly in public/images/, and always comes first).
//
// A folder with no entry here still works: its name is auto-formatted into a
// title (e.g. "holi-2026" -> "Holi 2026") shown the same in both languages.
// Add an entry below to give a folder a proper Hindi + English title.
//
// Folders sort naturally by name, so prefix them with numbers or dates to
// control the order events appear in (e.g. "01-langar-seva", "2026-08-holi").
export interface GalleryEventTitle {
  hi: string
  en: string
}

export const galleryEventTitles: Record<string, GalleryEventTitle> = {
  // "holi-2026": { hi: "होली उत्सव २०२६", en: "Holi Celebration 2026" },
}
