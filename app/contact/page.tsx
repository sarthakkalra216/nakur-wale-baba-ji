import type { Metadata } from "next"
import Contact from "@/components/sections/Contact"

export const metadata: Metadata = {
  title: "Contact | Nakur Wale Baba Ji",
  description:
    "Reach the Nakur ashram for satsang schedules, seva opportunities, donations, and any spiritual query.",
}

export default function ContactPage() {
  return (
    <main className="pt-16">
      <Contact />
    </main>
  )
}
