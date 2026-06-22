import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Successor from "@/components/sections/Successor"
import LifeJourney from "@/components/sections/LifeJourney"

const SITE_URL = "https://nakurwalebabaji.vercel.app"

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
      image: `${SITE_URL}/images/photo1.jpg`,
      logo: `${SITE_URL}/images/photo1.jpg`,
      description:
        "Shri Guruji Nakur Wale Baba Ji — spreading divine wisdom, seva, love, and spiritual awakening from Nakur, Saharanpur.",
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
      <About />
      <Successor />
      <LifeJourney />
    </main>
  )
}
