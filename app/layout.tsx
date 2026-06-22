import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Noto_Serif_Devanagari } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
})

const SITE_URL = "https://nakurwalebabaji.vercel.app"
const TITLE = "Nakur Wale Baba Ji | Guruji of Nakur, Saharanpur"
const DESCRIPTION =
  "Official website of Shri Guruji Nakur Wale Baba Ji — spreading divine wisdom, seva, love, and spiritual awakening from Nakur, Saharanpur. Darshan, gallery, videos, and seva."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Nakur Wale Baba Ji",
  },
  description: DESCRIPTION,
  applicationName: "Nakur Wale Baba Ji",
  keywords: [
    "Nakur Wale Baba Ji",
    "Nakur Wale Babaji",
    "Guruji Nakur Wale",
    "Guruji",
    "Baba Ji Nakur",
    "Spiritual Guru Saharanpur",
    "Satsang",
    "Seva",
    "Spiritual Wisdom",
    "Nakur",
    "Saharanpur",
    "Uttar Pradesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Nakur Wale Baba Ji",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/photo1.jpg",
        width: 1200,
        height: 630,
        alt: "Shri Guruji Nakur Wale Baba Ji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/photo1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "SgBHMgAA7SiaO7ebWqvptQ6SDj2jbAyIP1t11PTeE2k",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable} ${notoSerifDevanagari.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#04000c] text-amber-50 overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
