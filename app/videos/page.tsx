import type { Metadata } from "next"
import VideoGallery from "@/components/sections/VideoGallery"
import { getVideoSections } from "@/lib/media"

export const metadata: Metadata = {
  title: "Videos | Nakur Wale Baba Ji",
  description:
    "Watch satsang pravachan videos of Shri Nakur Wale Baba Ji.",
}

export default function VideosPage() {
  const sections = getVideoSections()
  return (
    <main className="pt-16">
      <VideoGallery sections={sections} />
    </main>
  )
}
