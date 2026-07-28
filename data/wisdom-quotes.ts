// "Today's Wisdom" quote bank — a Ramayana verse rotates daily (by day-of-year,
// wrapping around this list), shown on the homepage. The verse itself is
// Devanagari scripture text and stays the same in both languages; only the
// explanation and source citation are translated.
export interface WisdomQuote {
  verse: string
  explanation: { hi: string; en: string }
  source: { hi: string; en: string }
}

export const wisdomQuotes: WisdomQuote[] = [
  {
    verse: "होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥",
    explanation: {
      hi: "जो राम ने रचा है वही होकर रहेगा — इसके विरुद्ध तर्क-वितर्क बढ़ाने से कोई लाभ नहीं।",
      en: "Whatever Ram has willed will surely come to pass — there is little use arguing and building endless branches of debate against it.",
    },
    source: { hi: "रामचरितमानस, अयोध्या कांड", en: "Ramcharitmanas, Ayodhya Kand" },
  },
  {
    verse: "काम क्रोध मद लोभ सब नाथ नरक के पंथ।",
    explanation: {
      hi: "काम, क्रोध, मद और लोभ — ये सभी विनाश के मार्ग हैं; इन्हें त्यागकर भक्ति की ओर मुड़ें।",
      en: "Lust, anger, pride and greed are all paths that lead to ruin — give them up and turn instead toward devotion.",
    },
    source: { hi: "रामचरितमानस, उत्तर कांड", en: "Ramcharitmanas, Uttar Kand" },
  },
  {
    verse: "परहित सरिस धर्म नहिं भाई। पर पीड़ा सम नहिं अधमाई॥",
    explanation: {
      hi: "दूसरों की भलाई से बड़ा कोई धर्म नहीं, और दूसरों को कष्ट देने से बड़ा कोई पाप नहीं।",
      en: "There is no virtue greater than working for others' good, and no wrongdoing worse than causing others pain.",
    },
    source: { hi: "रामचरितमानस, उत्तर कांड", en: "Ramcharitmanas, Uttar Kand" },
  },
  {
    verse: "सिया राममय सब जग जानी। करउं प्रणाम जोरि जुग पानी॥",
    explanation: {
      hi: "इस समस्त जगत को सिया-राममय जानकर, मैं दोनों हाथ जोड़कर प्रणाम करता हूं।",
      en: "Knowing this whole world to be filled with Sita-Ram (the Divine), I bow to it with folded hands.",
    },
    source: { hi: "रामचरितमानस, बाल कांड", en: "Ramcharitmanas, Bala Kand" },
  },
  {
    verse: "मंगल भवन अमंगल हारी। द्रवउ सो दसरथ अजिर बिहारी॥",
    explanation: {
      hi: "हे राम, आप समस्त मंगल के धाम और अमंगल को हरने वाले हैं — हम पर कृपा करें।",
      en: "O Ram, abode of all that is auspicious, remover of all misfortune — be gracious to us.",
    },
    source: { hi: "रामचरितमानस, बाल कांड", en: "Ramcharitmanas, Bala Kand" },
  },
  {
    verse: "धीरज धर्म मित्र अरु नारी। आपद काल परखिअहिं चारी॥",
    explanation: {
      hi: "धैर्य, धर्म, सच्चा मित्र और पत्नी — इन चारों की सच्ची परख विपत्ति के समय ही होती है।",
      en: "Patience, righteousness, a true friend, and one's spouse — these four are truly tested only in times of hardship.",
    },
    source: { hi: "रामचरितमानस, किष्किंधा कांड", en: "Ramcharitmanas, Kishkindha Kand" },
  },
  {
    verse: "रघुकुल रीति सदा चलि आई। प्राण जाहिं बरु बचनु न जाई॥",
    explanation: {
      hi: "रघुकुल की यह रीति सदा से चली आई है — प्राण भले चले जाएं, वचन नहीं टूटना चाहिए।",
      en: "It has always been the tradition of Lord Ram's family — one may lose one's life, but never break one's word.",
    },
    source: { hi: "रामचरितमानस, अयोध्या कांड", en: "Ramcharitmanas, Ayodhya Kand" },
  },
  {
    verse: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।",
    explanation: {
      hi: "माता और मातृभूमि स्वर्ग से भी बढ़कर हैं।",
      en: "One's mother and one's motherland are greater even than heaven itself.",
    },
    source: {
      hi: "वाल्मीकि रामायण, युद्ध कांड (श्री राम के वचन)",
      en: "Valmiki Ramayana, Yuddha Kand (words of Shri Ram)",
    },
  },
]
