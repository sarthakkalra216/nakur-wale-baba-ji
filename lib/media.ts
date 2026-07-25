// Server-side media scanner.
// Reads the public/images and public/videos folders at build/request time so the
// Gallery and Videos sections are fully dynamic — drop a file in following the
// naming convention and it appears automatically, with no code changes.
//
//   public/images/photo*.{jpg,jpeg,png,webp,avif}         → Gallery "Guruji" section
//   public/images/<event folder>/*.{jpg,jpeg,png,webp,avif} → Gallery event section
//   public/videos/video*.{mp4,webm,mov,ogg}                → Videos
//
// Event folders sort naturally by folder name by default (prefix them with
// numbers or dates, e.g. "01-langar-seva", to control that order) — or list
// folders explicitly in data/gallery-events.ts's galleryEventOrder to pin an
// exact order regardless of name. Give a folder a proper bilingual title
// there too; otherwise its name is auto-formatted into one.
//
// NOTE: This module uses the Node `fs` API and must only be imported from
// server components (e.g. the route `page.tsx` files), never from client code.

import { readdirSync } from "fs"
import { join } from "path"
import { galleryEventOrder, galleryEventTitles } from "@/data/gallery-events"

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

// urlBase and each filename are percent-encoded independently so folder/file
// names containing spaces (e.g. "Devi ji/devi-ji.png") resolve correctly;
// plain names like "photo1.jpg" pass through encodeURIComponent unchanged.
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
    .map((f) => ({ src: `${urlBase}/${encodeURIComponent(f)}`, name: f }))
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
 * form the "Guruji" section; every subfolder is a separate event section.
 * Order: galleryEventOrder (from data/gallery-events.ts) first, in the
 * order listed there, then any remaining folders in natural name order.
 */
export function getGalleryEvents(): GallerySection[] {
  const bySlug = new Map<string, GallerySection>()

  const guruji = scan("images", "/images", IMAGE_RE)
  if (guruji.length) {
    const title = galleryEventTitles["guruji"] ?? { hi: "गुरुजी", en: "Guruji" }
    bySlug.set("guruji", { slug: "guruji", title, images: guruji })
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
    const images = scan(`images/${folder}`, `/images/${encodeURIComponent(folder)}`, IMAGE_EXT_RE)
    if (!images.length) continue
    const title = galleryEventTitles[folder] ?? {
      hi: humanizeSlug(folder),
      en: humanizeSlug(folder),
    }
    bySlug.set(folder, { slug: folder, title, images })
  }

  const ordered: GallerySection[] = []
  for (const slug of galleryEventOrder) {
    const section = bySlug.get(slug)
    if (section) {
      ordered.push(section)
      bySlug.delete(slug)
    }
  }
  // Anything not explicitly ordered falls after, in natural slug order.
  const remaining = [...bySlug.values()].sort((a, b) => naturalSort(a.slug, b.slug))
  return [...ordered, ...remaining]
}

/** All videos (video*). */
export function getVideos(): MediaFile[] {
  return scan("videos", "/videos", VIDEO_RE)
}
