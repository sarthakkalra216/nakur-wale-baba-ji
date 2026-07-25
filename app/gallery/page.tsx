import type { Metadata } from "next"
import Gallery from "@/components/sections/Gallery"
import { getGalleryEvents } from "@/lib/media"

export const metadata: Metadata = {
  title: "Gallery | Nakur Wale Baba Ji",
  description:
    "Sacred darshan, satsang, and seva moments of Shri Nakur Wale Baba Ji at the Nakur ashram.",
}

export default function GalleryPage() {
  const sections = getGalleryEvents()
  return (
    <main className="pt-16">
      <Gallery sections={sections} />
    </main>
  )
}
