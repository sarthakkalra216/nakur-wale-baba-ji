// Server-side media scanner.
// Reads the public/images and public/videos folders at build/request time so the
// Gallery and Videos sections are fully dynamic — drop a file in following the
// naming convention and it appears automatically, with no code changes.
//
//   public/images/photo*.{jpg,jpeg,png,webp,avif}   → Gallery "Guruji" section
//   public/images/<event-slug>/*.{jpg,jpeg,png,webp,avif} → Gallery event section
//   public/videos/video*.{mp4,webm,mov,ogg}         → Videos
//
// Event folders under public/images/ sort naturally by folder name — prefix
// them with numbers or dates (e.g. "01-langar-seva") to control page order.
// Give a folder a proper bilingual title in data/gallery-events.ts; otherwise
// its name is auto-formatted into a title.
//
// NOTE: This module uses the Node `fs` API and must only be imported from
// server components (e.g. the route `page.tsx` files), never from client code.

import { readdirSync } from "fs"
import { join } from "path"
import { galleryEventTitles } from "@/data/gallery-events"

const PUBLIC_DIR = join(process.cwd(), "public")

const IMAGE_RE = /^photo.*\.(jpe?g|png|webp|avif)$/i
const IMAGE_EXT_RE = /\.(jpe?g|png|webp|avif)$/i
const VIDEO_RE = /^video.*\.(mp4|webm|mov|ogg)$/i

// "photo2" sorts before "photo10" (natural/numeric ordering)
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
}

export interface MediaFile {
  /** public URL, e.g. "/images/photo1.jpeg" */
  src: string
  /** raw file name, e.g. "photo1.jpeg" */
  name: string
}

function scan(folder: string, urlBase: string, pattern: RegExp): MediaFile[] {
  let files: string[] = []
  try {
    files = readdirSync(join(PUBLIC_DIR, folder))
  } catch {
    return [] // folder may not exist yet
  }
  return files
    .filter((f) => pattern.test(f))
    .sort(naturalSort)
    .map((f) => ({ src: `${urlBase}/${f}`, name: f }))
}

export interface GallerySection {
  /** folder name under public/images/, or "guruji" for the flat photo*.ext files */
  slug: string
  /** bilingual title — from data/gallery-events.ts, or auto-formatted from the slug */
  title: { hi: string; en: string }
  images: MediaFile[]
}

// "holi-2026" / "01-langar-seva" -> "Holi 2026" / "Langar Seva"
function humanizeSlug(slug: string): string {
  return slug
    .replace(/^[0-9]+[-_.]*/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Event-based gallery: the flat photo*.ext files directly in public/images/
 * form the permanent "Guruji" section (always first); every subfolder is a
 * separate event section, in natural folder-name order.
 */
export function getGalleryEvents(): GallerySection[] {
  const sections: GallerySection[] = []

  const guruji = scan("images", "/images", IMAGE_RE)
  if (guruji.length) {
    sections.push({ slug: "guruji", title: { hi: "गुरुजी", en: "Guruji" }, images: guruji })
  }

  const imagesDir = join(PUBLIC_DIR, "images")
  let entries: import("fs").Dirent[] = []
  try {
    entries = readdirSync(imagesDir, { withFileTypes: true })
  } catch {
    entries = []
  }

  const folders = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort(naturalSort)

  for (const folder of folders) {
    const images = scan(`images/${folder}`, `/images/${folder}`, IMAGE_EXT_RE)
    if (!images.length) continue
    const title = galleryEventTitles[folder] ?? {
      hi: humanizeSlug(folder),
      en: humanizeSlug(folder),
    }
    sections.push({ slug: folder, title, images })
  }

  return sections
}

/** All videos (video*). */
export function getVideos(): MediaFile[] {
  return scan("videos", "/videos", VIDEO_RE)
}
