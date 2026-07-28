import Hero from "@/components/sections/Hero"
import TodaysWisdom from "@/components/sections/TodaysWisdom"
import About from "@/components/sections/About"
import Teachings from "@/components/sections/Teachings"
import LatestEvents from "@/components/sections/LatestEvents"
import Ashrams from "@/components/sections/Ashrams"

const SITE_URL = "https://nakurwalebabaji.com"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nakur Wale Baba Ji",
      inLanguage: "en-IN",
    },
    {
      "@type": "ReligiousOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Nakur Wale Baba Ji",
      alternateName: ["Guruji Nakur Wale Baba Ji", "Nakur Wale Babaji"],
      url: SITE_URL,
      image: `${SITE_URL}/images/Nakud%20wale%20baba%20ji/photo1.jpg`,
      logo: `${SITE_URL}/images/logo.png`,
      description:
        "Shri Nakur Wale Baba Ji — spreading divine wisdom, seva, love, and spiritual awakening from Nakur, Saharanpur.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pant Vihar",
        addressLocality: "Saharanpur",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      email: "nakurwalebabaji@gmail.com",
      sameAs: [
        "https://www.instagram.com/nakur_wale_baba_ji/",
        "https://www.youtube.com/@bawavideo",
        "https://www.facebook.com/bawajinakurwale",
      ],
    },
  ],
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <TodaysWisdom />
      <About />
      <Teachings />
      <LatestEvents />
      <Ashrams />
    </main>
  )
}
