import type { Metadata } from "next"
import VideoGallery from "@/components/sections/VideoGallery"
import { getVideos } from "@/lib/media"

export const metadata: Metadata = {
  title: "Videos | Guruji Nakur Wale Baba Ji",
  description:
    "Watch satsang pravachan videos of Shri Guruji Nakur Wale Baba Ji.",
}

export default function VideosPage() {
  const videos = getVideos()
  return (
    <main className="pt-16">
      <VideoGallery videos={videos} />
    </main>
  )
}
