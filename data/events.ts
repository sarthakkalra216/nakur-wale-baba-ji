// Ashram events — shown as a teaser (first item) on the homepage and in full
// on /events, alongside the regular daily schedule.
export interface AshramEvent {
  image: string
  date: { hi: string; en: string }
  title: { hi: string; en: string }
  description: { hi: string; en: string }
  youtubeUrl: string
  /** deep-links to this event's own section on /gallery and /videos, e.g. "/gallery#guru-purnima-2026" */
  galleryUrl?: string
  videosUrl?: string
}

export const events: AshramEvent[] = [
  {
    image: "/images/Nakud%20wale%20baba%20ji/photo4.jpg",
    date: { hi: "जुलाई 2026", en: "July 2026" },
    title: { hi: "श्री गुरु पूर्णिमा महोत्सव 2026", en: "Shri Guru Purnima Mahotsav 2026" },
    description: {
      hi: "पंत विहार आश्रम में संत देवी सुदीक्षा सरस्वती जी द्वारा पांच दिवसीय राम कथा प्रवचन, जिसमें क्षेत्र भर से भक्तगण सम्मिलित हुए।",
      en: "A five-day Ram Katha discourse delivered by Sant Devi Sudiksha Saraswati Ji at Pant Vihar ashram, drawing devotees from across the region.",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=sif52bqb5RY",
    galleryUrl: "/gallery#guru-purnima-2026",
    videosUrl: "/videos#guru-purnima-2026",
  },
]
