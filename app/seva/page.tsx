import type { Metadata } from "next"
import Seva from "@/components/sections/Seva"

export const metadata: Metadata = {
  title: "Seva | Nakur Wale Baba Ji",
  description:
    "Join the selfless service (seva) initiatives — langar, education, medical camps, and more — in Nakur Wale Baba Ji's name.",
}

export default function SevaPage() {
  return (
    <main className="pt-16">
      <Seva />
    </main>
  )
}
