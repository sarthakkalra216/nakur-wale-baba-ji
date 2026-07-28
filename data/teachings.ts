// "In His Own Words" — teaching cards shown in an infinite horizontal scroll.
export interface Teaching {
  title: { hi: string; en: string }
  quote: { hi: string; en: string }
}

export const teachings: Teaching[] = [
  {
    title: { hi: "सबसे ऊपर मानवता", en: "Humanity Above All" },
    quote: {
      hi: "इंसानियत से बड़ा कोई धर्म नहीं।",
      en: "There is no religion greater than humanity itself.",
    },
  },
  {
    title: { hi: "निःस्वार्थ सेवा ही सबसे बड़ी पूजा है", en: "Selfless Service is the Highest Worship" },
    quote: {
      hi: "सेवा से बड़ी कोई पूजा नहीं।",
      en: "There is no greater worship than seva.",
    },
  },
  {
    title: { hi: "ईश्वर सबमें बसते हैं", en: "God Dwells in Everyone" },
    quote: {
      hi: "सब में ईश्वर है — हर सेवा में सेवा, हर कदम में भक्ति।",
      en: "God is in everyone; every act of service is worship, every step is devotion.",
    },
  },
  {
    title: { hi: "बिना अपेक्षा की सेवा ही ईश्वर की सेवा है", en: "Seva Without Expectation is Serving God" },
    quote: {
      hi: "जब आप बिना किसी प्रतिफल की आशा के दूसरों की सेवा करते हैं, तब आप स्वयं ईश्वर की सेवा करते हैं।",
      en: "When you serve others expecting nothing in return, you serve the Divine itself.",
    },
  },
  {
    title: { hi: "दूसरों का कल्याण, अपना कल्याण", en: "Others' Welfare Brings Your Own" },
    quote: {
      hi: "औरों के कल्याण में रहता जिनका ध्यान, उनका अपने आप हो जाता कल्याण।",
      en: "Whoever keeps others' welfare in mind, their own welfare follows on its own.",
    },
  },
]
