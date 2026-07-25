// Server-side media scanner.
// Reads the public/images and public/videos folders at build/request time so the
// Gallery and Videos sections are fully dynamic — drop a file in following the
// naming convention and it appears automatically, with no code changes.
//
//   public/images/photo*.{jpg,jpeg,png,webp,avif}         → Gallery "Nakur Wale Baba Ji" section
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
import {
  galleryEventOrder,
  galleryEventTitles,
  galleryImageCaptions,
  galleryImagePinLast,
} from "@/data/gallery-events"

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
  /** optional name/label shown on the photo — always Hindi, independent of the site's language toggle */
  caption?: string
}

// urlBase and each filename are percent-encoded independently so folder/file
// names containing spaces (e.g. "Devi ji/devi-ji.png") resolve correctly;
// plain names like "photo1.jpg" pass through encodeURIComponent unchanged.
//
// keyPrefix identifies this folder in data/gallery-events.ts's caption/pin
// maps ("<folder>/<filename>", or just "<filename>" when omitted for the
// flat Nakur Wale Baba Ji photos directly in public/images/).
function scan(folder: string, urlBase: string, pattern: RegExp, keyPrefix = ""): MediaFile[] {
  let files: string[] = []
  try {
    files = readdirSync(join(PUBLIC_DIR, folder))
  } catch {
    return [] // folder may not exist yet
  }
  const key = (f: string) => (keyPrefix ? `${keyPrefix}/${f}` : f)

  let matched = files.filter((f) => pattern.test(f)).sort(naturalSort)

  // Move any pinned filenames to the end, in the order listed, overriding
  // natural sort (e.g. to close a section with specific named portraits).
  const pinnedKeys = galleryImagePinLast.filter((k) => matched.some((f) => key(f) === k))
  if (pinnedKeys.length) {
    matched = matched.filter((f) => !pinnedKeys.includes(key(f)))
    for (const k of pinnedKeys) {
      const pinned = files.find((f) => key(f) === k && pattern.test(f))
      if (pinned) matched.push(pinned)
    }
  }

  return matched.map((f) => {
    const caption = galleryImageCaptions[key(f)]
    return {
      src: `${urlBase}/${encodeURIComponent(f)}`,
      name: f,
      ...(caption ? { caption } : {}),
    }
  })
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
 * form the "Nakur Wale Baba Ji" section; every subfolder is a separate event section.
 * Order: galleryEventOrder (from data/gallery-events.ts) first, in the
 * order listed there, then any remaining folders in natural name order.
 */
export function getGalleryEvents(): GallerySection[] {
  const bySlug = new Map<string, GallerySection>()

  const guruji = scan("images", "/images", IMAGE_RE)
  if (guruji.length) {
    const title = galleryEventTitles["guruji"] ?? {
      hi: "नकुड़ वाले बाबा जी",
      en: "Nakur Wale Baba Ji",
    }
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
    const images = scan(
      `images/${folder}`,
      `/images/${encodeURIComponent(folder)}`,
      IMAGE_EXT_RE,
      folder
    )
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
