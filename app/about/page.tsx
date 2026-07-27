import type { Metadata } from "next"
import AboutTabs from "@/components/sections/AboutTabs"

export const metadata: Metadata = {
  title: "About | Nakur Wale Baba Ji",
  description:
    "Guru parampara — Nakur Wale Baba Ji's life journey and the sacred succession and dedication of Sant Devi Sudiksha Saraswati Ji.",
}

export default function AboutPage() {
  return (
    <main className="pt-16">
      <AboutTabs />
    </main>
  )
}
