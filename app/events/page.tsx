import type { Metadata } from "next"
import EventsFull from "@/components/sections/EventsFull"

export const metadata: Metadata = {
  title: "Latest Events | Nakur Wale Baba Ji",
  description:
    "Satsang, discourses and celebrations at the Pant Vihar ashram — including the daily aarti and satsang schedule.",
}

export default function EventsPage() {
  return (
    <main className="pt-16">
      <EventsFull />
    </main>
  )
}
