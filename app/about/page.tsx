import type { Metadata } from "next"
import Successor from "@/components/sections/Successor"

export const metadata: Metadata = {
  title: "About | Nakur Wale Baba Ji",
  description:
    "Guru parampara — the sacred succession and dedication of Sant Devi Sudiksha Saraswati Ji to Shri Nakur Wale Baba Ji.",
}

export default function AboutPage() {
  return (
    <main className="pt-16">
      <Successor />
    </main>
  )
}
