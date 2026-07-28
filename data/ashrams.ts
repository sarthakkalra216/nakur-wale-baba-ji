// Ashram / centre locations. `showOnHomepage` controls which appear in the
// homepage teaser grid (Ayodhya is /ashrams-only, matching the reference site).
export interface Ashram {
  slug: string
  image: string
  tag: { hi: string; en: string }
  name: { hi: string; en: string }
  description: { hi: string; en: string }
  primary?: boolean
  directionsUrl?: string
  showOnHomepage: boolean
}

export const ashrams: Ashram[] = [
  {
    slug: "pant-vihar",
    image: "/images/Nakud%20wale%20baba%20ji/photo3.jpg",
    tag: { hi: "मुख्य आश्रम", en: "Primary Ashram" },
    name: { hi: "पंत विहार, सहारनपुर", en: "Pant Vihar, Saharanpur" },
    description: {
      hi: "मुख्य आश्रम — दैनिक आरती, सत्संग और नकुड़ वाले बाबा जी की समाधि का स्थान।",
      en: "The main ashram — daily aarti, satsang and the seat of Nakur Wale Baba Ji's samadhi.",
    },
    primary: true,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Nakur+Wale+Baba+Ji+Ka+Ashram",
    showOnHomepage: true,
  },
  {
    slug: "haridwar",
    image: "/images/Different%20events/photo55.jpg",
    tag: { hi: "आश्रम", en: "Ashram" },
    name: { hi: "हरिद्वार", en: "Haridwar" },
    description: {
      hi: "हरिद्वार की पावन नगरी में हमारा केंद्र।",
      en: "Our centre in the holy city of Haridwar.",
    },
    showOnHomepage: true,
  },
  {
    slug: "vrindavan",
    image: "/images/ashram-vrindavan.jpg",
    tag: { hi: "निर्माणाधीन", en: "Under Construction" },
    name: { hi: "वृंदावन", en: "Vrindavan" },
    description: {
      hi: "वृंदावन में एक नया केंद्र वर्तमान में निर्माणाधीन है।",
      en: "A new centre currently under construction in Vrindavan.",
    },
    showOnHomepage: true,
  },
  {
    slug: "ayodhya",
    image: "/images/ashram-ayodhya.jpg",
    tag: { hi: "निर्माणाधीन", en: "Under Construction" },
    name: { hi: "अयोध्या", en: "Ayodhya" },
    description: {
      hi: "अयोध्या में एक नया केंद्र वर्तमान में निर्माणाधीन है।",
      en: "A new centre currently under construction in Ayodhya.",
    },
    showOnHomepage: false,
  },
]
