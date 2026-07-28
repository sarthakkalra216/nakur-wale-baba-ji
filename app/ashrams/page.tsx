import type { Metadata } from "next"
import AshramsFull from "@/components/sections/AshramsFull"

export const metadata: Metadata = {
  title: "Ashrams | Nakur Wale Baba Ji",
  description:
    "Our centres — the primary Pant Vihar ashram in Saharanpur, plus Haridwar, Vrindavan, and Ayodhya.",
}

export default function AshramsPage() {
  return (
    <main className="pt-16">
      <AshramsFull />
    </main>
  )
}
