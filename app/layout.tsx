import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Geist } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Noto_Serif_Devanagari } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { SiteProvider, type Theme } from "@/components/providers/SiteProvider"
import type { Lang } from "@/lib/i18n"

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
  // The site already ships its own Hindi/English toggle, so suppress Chrome's
  // "translate this page?" prompt to avoid a redundant, conflicting UI.
  other: {
    google: "notranslate",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  // Defaults: warm light theme + Hindi. Persisted choice (if any) wins.
  const theme: Theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "light"
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "hi"

  return (
    <html
      lang={lang}
      data-theme={theme}
      data-lang={lang}
      translate="no"
      className={`${geistSans.variable} ${playfairDisplay.variable} ${notoSerifDevanagari.variable} antialiased notranslate`}
    >
      <body className="min-h-screen bg-page text-body overflow-x-hidden">
        <SiteProvider initialTheme={theme} initialLang={lang}>
          <Header />
          {children}
          <Footer />
        </SiteProvider>
      </body>
    </html>
  )
}
