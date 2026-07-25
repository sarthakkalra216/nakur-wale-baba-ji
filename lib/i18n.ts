// ─────────────────────────────────────────────────────────────────────────────
// i18n dictionary — Hindi (hi) + English (en)
// Every user-facing string lives here. Components read the active-language slice
// via `useSite().t`. `en` is typed as `typeof hi` so the two stay in lock-step.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "hi" | "en"

const hi = {
  nav: {
    home: "होम",
    journey: "जीवन यात्रा",
    gallery: "गैलरी",
    videos: "वीडियो",
    seva: "सेवा",
    contact: "संपर्क",
    cta: "संपर्क करें",
    navHeading: "नेविगेशन",
  },

  hero: {
    badge: "जय गुरुजी — नकुड़ वाले बाबा जी",
    eyebrow: "परम श्रद्धेय",
    name1: "श्री श्री १०८ स्वामी रामानन्द",
    name2: "सरस्वती जी महाराज",
    name3: "(नकुड़ वाले बाबा जी)",
    tagline: "दिव्य ज्ञान, सेवा, प्रेम और आध्यात्मिक जागृति का प्रसार",
    ctaPrimary: "गुरुजी को जानें",
    ctaSecondary: "संपर्क करें",
    scrollCue: "दर्शन",
    stats: [
      { value: "५०+", label: "वर्षों की सेवा" },
      { value: "१ लाख+", label: "श्रद्धालु" },
      { value: "∞", label: "दिव्य प्रेम" },
    ],
  },

  journey: {
    eyebrow: "संक्षिप्त जीवन परिचय",
    titleLead: "जीवन",
    titleEm: "यात्रा",
    subtitle: "श्री श्री 108 स्वामी रामानन्द सरस्वती जी महाराज — नकुड़ वाले बाबा जी",
    quoteLine1: "॥ औरों के कल्याण में रहता जिनका ध्यान,",
    quoteLine2: "उनका अपने आप ही हो जाता कल्याण ॥",
    closingGlyph: "॥ परोपकाराय सतां विभूतयः ॥",
    closingSub: "— संतों की विभूतियाँ परोपकार के लिए ही होती हैं",
    chapters: [
      { era: "परिचय", title: "समाज के पथ-प्रदर्शक", text: "नकुड़ वाले बाबा जी का नाम बड़े आदर से लिया जाता है। जो भी उनकी वाणी एक बार सुन लेता, वह उन्हीं का होकर रह जाता था।" },
      { era: "अवतरण", title: "बामनौली में जन्म", text: "जिला बागपत के ग्राम बामनौली में, चैत्र शुक्ल अष्टमी सन् 1912 को जन्म। माता भारती देवी के हृदय में बसी राम-भक्ति बालक में भी उतरी।" },
      { era: "बचपन", title: "जहान सिंह — दुखियों के सेवक", text: "बचपन का नाम जहान सिंह था। इनका हृदय दुखियों पर सदा तरस खाता और सेवा में लगा रहता था।" },
      { era: "गृहस्थ", title: "विवाह व पुत्र-जन्म", text: "सन् 1934 में भागीरथी देवी के साथ विवाह हुआ। सन् 1936 में पुत्र जगपाल सिंह का जन्म हुआ।" },
      { era: "सेवा", title: "पुलिस विभाग में नौकरी", text: "18 जनवरी 1936 को पुलिस में नौकरी मिली। 1940 में पत्नी का देहांत हुआ, फिर भी कर्तव्य-पथ अडिग रहा। ड्यूटी पर गांधी जी, नेहरू जी, राजेन्द्र प्रसाद व शास्त्री जी के साथ भी रहे।" },
      { era: "जागरण", title: "पथ-प्रदर्शकों से भेंट", text: "कानपुर में श्री गंभीरानन्द जी व श्री रामशंकर पाठक जी से भेंट हुई। माता के दिए राम-भक्ति के संस्कार जाग उठे।" },
      { era: "ख्याति", title: "रामायण-प्रवचन व 'बाबा' खिताब", text: "सहारनपुर पुलिस लाइन में रामायण पर प्रवचन शुरू किए। अधिकारी तक प्रभावित हुए — और 'बाबा' का खिताब पुलिस विभाग से ही मिला।" },
      { era: "भक्ति", title: "राम-नाम में लीन, निःस्वार्थ सेवा", text: "धूप हो या रात की वर्षा, बिना रुके निःस्वार्थ प्रवचन करते रहे और किसी से एक पाई न ली। जनवरी 1960 में पुलिस सेवा से निवृत्त हुए।" },
      { era: "संन्यास", title: "श्री रामानन्द सरस्वती नामकरण", text: "5 सितम्बर 1981 को हरिद्वार में श्री नारायण मुनि जी से संन्यास-दीक्षा ली। उनकी राम-भक्ति देख गुरु ने नाम रखा — 'श्री रामानन्द सरस्वती'।" },
      { era: "महासमाधि", title: "प्रभु श्री राम में लीन", text: "15 जनवरी 2003 की संध्या, सायं 5.55 बजे महाराज श्री राम के ध्यान में ही प्रभु में लीन हो गए। अगले दिन पन्तविहार के सत्संग भवन में भू-समाधि दी गई।" },
      { era: "अमर विरासत", title: "नाम व रूप-माधुरी अमिट", text: "आज भी उनका नाम भक्तों के हृदय में अंकित है। धन्य हैं ऐसे सन्त — 'परोपकाराय सतां विभूतयः।'" },
      { era: "उत्तराधिकार", title: "सन्त देवी सुदीक्षा सरस्वती जी", text: "उनकी सद् शिष्या व उत्तराधिकारिणी श्री श्री 108 सन्त देवी सुदीक्षा सरस्वती जी, गुरुदेव के चरण-चिह्नों पर चलते हुए सेवा, त्याग व भक्ति से जन-कल्याण कर रही हैं।" },
    ],
  },

  successor: {
    eyebrow: "गुरु परम्परा",
    titleLead: "पूज्य",
    titleEm: "उत्तराधिकारिणी",
    samarpan: "समर्पण",
    name: "सुश्री देवी सुदीक्षा सरस्वती जी",
    award: "राष्ट्रपति पदक से सम्मानित",
    imgAlt1: "सुश्री देवी सुदीक्षा सरस्वती जी — पूज्य गुरुदेव के साथ",
    imgAlt2: "हमारे हैं श्री गुरुवर — सुश्री देवी सुदीक्षा सरस्वती जी एवं पूज्य गुरुदेव",
    paras: [
      "परम पूज्य, प्रातः स्मरणीय, वन्दनीय श्री महाराज जी के पावन चरणों में इस तुच्छ शिष्या की भावांजलि सादर समर्पित है। शिष्या का जीवन ही अपने आप में एक संस्मरण है। सन् 1969 से आपने मुझे अपने पावन चरणों में स्थान दिया; मुझ अकिंचन को मोह-ममता के जाल से निकालकर अपने स्नेह के सागर में सराबोर करना — यह आप जैसी निःस्वार्थ, तपोमय व अनुपम विभूति-स्वरूप फ़रिश्ते ही कर सकते थे।",
      "सन् 1970 में आपने पवित्र नगरी हरिद्वार से पावन ग्रन्थ श्री रामचरितमानस प्रसाद रूप में दिया तथा मनन व चिन्तन की प्रेरणा दी। सन् 1971 ई० में प्रशिक्षित करवाकर शिक्षा विभाग में सेवा का अवसर आशीर्वाद-स्वरूप मेरी झोली में डाला, जो अब तक भी पल्लवित है।",
      "सन् 1969 से 15 जनवरी 2003, सायं 5.55 तक आपकी महिमा, मर्यादा, नियम, संयम, शालीनता और प्रेम की जो अमिट छाप है — वह इस शिष्या तो क्या, सम्पूर्ण समाज के मन पर अंकित है। उसका गुणगान प्रकृति भी अपने चमचमाते सूर्य के माध्यम से कर चुकी है।",
      "जिस प्रकार भगवान श्री राम के जन्म पर सूर्यदेव एक मास तक आकाश में स्थिर रहे, उसी प्रकार सूर्यवंश में अवतरित प्रभु राम के सच्चे संत-भक्त के दर्शन हेतु सूर्य प्रातःकाल आकाश में आकर टिक गये। इससे अधिक और क्या प्रभाव चाहिए।",
    ],
    couplets: ["राम ते अधिक राम कर दासा।", "तुम ते अधिक गुरुहि जिय जानी॥"],
    closing:
      "इसी भाव के साथ — शक्ति देना, भक्ति देना, आशीर्वाद देना — ताकि आपके पुनः आगमन तक मैं आपकी प्रतीक्षा कर सकूँ; क्योंकि यह निश्चित है। आपके सभी प्रेमी भक्तजनों एवं समाज के लिए मंगल-कामना।",
  },

  seva: {
    eyebrow: "निःस्वार्थ सेवा",
    titleLead: "सेवा में",
    titleEm: "सहभागी बनें",
    intro:
      "'सेवा से बड़ी कोई पूजा नहीं।' — गुरुजी। सेवा के मार्ग खोजें और निःस्वार्थ दान के परिवर्तनकारी आनंद का अनुभव करें।",
    joinCta: "इस सेवा में जुड़ें",
    bottomQuote:
      "जब आप बिना किसी प्रतिफल की आशा के दूसरों की सेवा करते हैं, तब आप स्वयं प्रभु की सेवा करते हैं।",
    bottomAttrib: "— गुरुजी नकुड़ वाले बाबा जी",
    items: [
      { title: "लंगर सेवा", description: "आश्रम की सामुदायिक रसोई में प्रतिदिन निःशुल्क भोजन परोसें। हज़ारों श्रद्धालुओं और आगंतुकों को रोज़ भोजन कराया जाता है — कोई भूखा नहीं जाता।", impact: "५००+ भोजन / प्रतिदिन" },
      { title: "शिक्षा सेवा", description: "वंचित बच्चों को पुस्तकें, स्टेशनरी और छात्रवृत्ति से सहयोग दें। अगली पीढ़ी को गुणवत्तापूर्ण शिक्षा तक पहुँचने में मदद करें।", impact: "२००+ विद्यार्थियों को सहायता" },
      { title: "चिकित्सा सेवा", description: "निःशुल्क चिकित्सा शिविरों में सहभागी बनें, जहाँ ग्रामीण समुदायों को स्वास्थ्य जाँच, औषधियाँ और विशेषज्ञ परामर्श दिया जाता है।", impact: "४ शिविर / वर्ष" },
      { title: "मंदिर सेवा", description: "आश्रम परिसर की देखभाल में सहयोग दें — सत्संग, कीर्तन और विशेष आयोजनों के लिए सफाई, सजावट और तैयारी।", impact: "प्रतिदिन अवसर" },
      { title: "पर्यावरण सेवा", description: "आश्रम संगत द्वारा संचालित वृक्षारोपण अभियानों, नदी-स्वच्छता यात्राओं और पर्यावरण-हितैषी पर्व-पहलों में सम्मिलित हों।", impact: "१०००+ वृक्ष लगाए" },
      { title: "दान सेवा", description: "सभी सेवा गतिविधियों को बनाए रखने हेतु आर्थिक सहयोग दें। दान का प्रत्येक रुपया सीधे भोजन, उपचार और शिक्षा पर लगता है।", impact: "१००% पारदर्शी" },
    ],
  },

  gallery: {
    eyebrow: "पावन क्षण",
    titleLead: "दिव्य",
    titleEm: "गैलरी",
    subtitle: "आध्यात्मिक कृपा, सेवा और दिव्य आशीर्वाद के क्षण",
    empty: "अभी कोई चित्र नहीं। तस्वीरें",
    guruji: "गुरुजी",
  },

  videos: {
    eyebrow: "आश्रम रिकॉर्डिंग",
    titleLead: "पावन",
    titleEm: "वीडियो",
    subtitle: "गुरुजी के आश्रम के दिव्य वातावरण में डूब जाएँ। प्ले दबाएँ — ध्वनि चालू है।",
    empty: "अभी कोई वीडियो नहीं। फ़ाइलें",
  },

  contact: {
    eyebrow: "संपर्क करें",
    titleLead: "हमसे",
    titleEm: "जुड़ें",
    subtitle:
      "सत्संग कार्यक्रम, सेवा के अवसर, दान, या किसी भी प्रश्न के लिए संपर्क करें। हम सेवा हेतु तत्पर हैं।",
    nameLabel: "पूरा नाम *",
    namePlaceholder: "आपका नाम",
    emailLabel: "ईमेल",
    emailPlaceholder: "your@email.com",
    phoneLabel: "फ़ोन",
    phonePlaceholder: "+91 XXXXX XXXXX",
    messageLabel: "संदेश *",
    messagePlaceholder: "अपना प्रश्न, सेवा हेतु अनुरोध, या गुरुजी के लिए संदेश लिखें…",
    send: "संदेश भेजें",
    sending: "भेजा जा रहा है…",
    sendAnother: "एक और संदेश भेजें",
    successTitle: "संदेश प्राप्त हुआ!",
    successBody:
      "जय गुरुजी! संपर्क करने के लिए धन्यवाद। हम शीघ्र ही आपसे संपर्क करेंगे। गुरुजी का आशीर्वाद आप पर बना रहे। 🙏",
    errorGeneric: "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।",
    errorNetwork: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जाँचें और पुनः प्रयास करें।",
    ashramContact: "आश्रम संपर्क",
    addressLabel: "पता",
    emailInfoLabel: "ईमेल",
    findAshram: "आश्रम तक पहुँचें",
    directions: "दिशा-निर्देश",
    address: "पन्त विहार, सहारनपुर, उत्तर प्रदेश",
  },

  footer: {
    brand: "गुरुजी नकुड़ वाले बाबा जी",
    location: "नकुड़, सहारनपुर, उत्तर प्रदेश",
    blurb:
      "सत्संग, कीर्तन, सेवा और भक्ति का एक पावन स्थल — दिव्य प्रेम और आंतरिक शांति के सभी साधकों के लिए खुला।",
    quickLinks: "त्वरित लिंक",
    contactHeading: "संपर्क",
    address: "पन्त विहार, सहारनपुर, उत्तर प्रदेश",
    quote: "सब में ईश्वर है — हर सेवा में सेवा, हर कदम में भक्ति।",
    rights: "श्री गुरुजी नकुड़ वाले बाबा जी। सर्वाधिकार सुरक्षित। श्रद्धा से निर्मित।",
  },
}

const en: typeof hi = {
  nav: {
    home: "Home",
    journey: "Life Journey",
    gallery: "Gallery",
    videos: "Videos",
    seva: "Seva",
    contact: "Contact",
    cta: "Get in Touch",
    navHeading: "Navigation",
  },

  hero: {
    badge: "Jai Guruji — Nakur Wale Baba Ji",
    eyebrow: "The Most Revered",
    name1: "Shri Shri 108 Swami Ramanand",
    name2: "Saraswati Ji Maharaj",
    name3: "(Nakur Wale Baba Ji)",
    tagline: "Spreading divine wisdom, seva, love, and spiritual awakening",
    ctaPrimary: "Know Guruji",
    ctaSecondary: "Contact Us",
    scrollCue: "Darshan",
    stats: [
      { value: "50+", label: "Years of Seva" },
      { value: "100k+", label: "Devotees" },
      { value: "∞", label: "Divine Love" },
    ],
  },

  journey: {
    eyebrow: "A Brief Life Introduction",
    titleLead: "Life",
    titleEm: "Journey",
    subtitle: "Shri Shri 108 Swami Ramanand Saraswati Ji Maharaj — Nakur Wale Baba Ji",
    quoteLine1: "॥ औरों के कल्याण में रहता जिनका ध्यान,",
    quoteLine2: "उनका अपने आप ही हो जाता कल्याण ॥",
    closingGlyph: "॥ परोपकाराय सतां विभूतयः ॥",
    closingSub: "— The glories of saints exist solely for the good of others",
    chapters: [
      { era: "Introduction", title: "A Guide to Society", text: "The name of Nakur Wale Baba Ji is taken with great reverence. Whoever heard his words even once became his own forever." },
      { era: "Birth", title: "Born in Bamnauli", text: "Born in the village of Bamnauli, district Baghpat, on Chaitra Shukla Ashtami, 1912. The devotion to Ram in mother Bharti Devi's heart passed into the child as well." },
      { era: "Childhood", title: "Jahan Singh — Servant of the Suffering", text: "His childhood name was Jahan Singh. His heart always melted for the suffering and remained engaged in their service." },
      { era: "Household", title: "Marriage & the Birth of a Son", text: "In 1934 he married Bhagirathi Devi. In 1936 his son Jagpal Singh was born." },
      { era: "Service", title: "Joining the Police", text: "On 18 January 1936 he joined the police. In 1940 his wife passed away, yet he stood firm on the path of duty. On duty he also served near Gandhi Ji, Nehru Ji, Rajendra Prasad, and Shastri Ji." },
      { era: "Awakening", title: "Meeting His Guides", text: "At Kanpur he met Shri Gambhiranand Ji and Shri Ramshankar Pathak Ji. The samskaras of Ram-devotion given by his mother awakened within him." },
      { era: "Renown", title: "Ramayana Discourses & the Title 'Baba'", text: "He began discourses on the Ramayana in the Saharanpur police lines. Even officers were moved — and the title 'Baba' came from the police department itself." },
      { era: "Devotion", title: "Absorbed in Ram's Name, Selfless Service", text: "In sun or in the rain of night, he gave selfless discourses without pause and never took a single coin. In January 1960 he retired from police service." },
      { era: "Sannyas", title: "Named Shri Ramanand Saraswati", text: "On 5 September 1981 he took sannyas initiation at Haridwar from Shri Narayan Muni Ji. Seeing his devotion to Ram, the guru named him 'Shri Ramanand Saraswati'." },
      { era: "Mahasamadhi", title: "Merged in Lord Shri Ram", text: "On the evening of 15 January 2003 at 5:55 pm, Maharaj Ji, absorbed in meditation on Ram, merged into the Lord. The next day he was laid to rest at the Satsang Bhavan in Pant Vihar." },
      { era: "Eternal Legacy", title: "A Name & Form That Never Fade", text: "Even today his name is etched in the hearts of devotees. Blessed are such saints — 'Paropakaraya Satam Vibhutayah'." },
      { era: "Succession", title: "Sant Devi Sudiksha Saraswati Ji", text: "His worthy disciple and successor, Shri Shri 108 Sant Devi Sudiksha Saraswati Ji, walking in the footsteps of the Gurudev, serves humanity through seva, sacrifice, and devotion." },
    ],
  },

  successor: {
    eyebrow: "Guru Lineage",
    titleLead: "The Revered",
    titleEm: "Successor",
    samarpan: "Dedication",
    name: "Sushri Devi Sudiksha Saraswati Ji",
    award: "Honoured with the President's Medal",
    imgAlt1: "Sushri Devi Sudiksha Saraswati Ji — with the revered Gurudev",
    imgAlt2: "Our Gurudev — Sushri Devi Sudiksha Saraswati Ji with the revered Gurudev",
    paras: [
      "At the holy feet of the most revered, ever-remembered, and venerable Shri Maharaj Ji, this humble disciple offers her heartfelt tribute. The disciple's very life is a memoir in itself. From 1969 you gave me a place at your sacred feet; to lift this insignificant one out of the snares of attachment and immerse her in the ocean of your affection — only a selfless, austere, and matchless angel like you could do this.",
      "In 1970, from the holy city of Haridwar, you gave me the sacred scripture Shri Ramcharitmanas as prasad and inspired me to reflect and contemplate upon it. In 1971, having me trained, you placed in my lap — as a blessing — the opportunity to serve in the education department, which flourishes to this day.",
      "From 1969 until 15 January 2003, 5:55 pm, the indelible imprint of your glory, dignity, discipline, restraint, grace, and love is etched not only upon this disciple but upon the heart of all of society. Even Nature has sung its praise through its own radiant sun.",
      "Just as the Sun-god stayed still in the sky for a whole month at the birth of Lord Shri Ram, so too, to behold a true saint-devotee of Lord Ram born in the solar dynasty, the sun rose at dawn and lingered in the sky. What greater testament could there be?",
    ],
    couplets: ["राम ते अधिक राम कर दासा।", "तुम ते अधिक गुरुहि जिय जानी॥"],
    closing:
      "With this very feeling — grant me strength, grant me devotion, grant me your blessing — so that I may await your return; for it is certain. Blessings and well-wishes upon all your loving devotees and upon society.",
  },

  seva: {
    eyebrow: "Selfless Service",
    titleLead: "Join",
    titleEm: "Seva",
    intro:
      "“Seva se badi koi pooja nahi.” — Guruji. Discover ways to serve and experience the transformative joy of selfless giving.",
    joinCta: "Join this Seva",
    bottomQuote:
      "When you serve others without expectation of reward, you serve God Himself.",
    bottomAttrib: "— Guruji Nakur Wale Baba Ji",
    items: [
      { title: "Langar Seva", description: "Serve free meals daily at the ashram's community kitchen. Thousands of devotees and visitors are fed every day — no one leaves hungry.", impact: "500+ meals / day" },
      { title: "Education Seva", description: "Support underprivileged children with books, stationery, and scholarships. Help the next generation access quality education.", impact: "200+ students helped" },
      { title: "Medical Seva", description: "Participate in free medical camps providing health check-ups, medicines, and specialist consultations to rural communities.", impact: "4 camps / year" },
      { title: "Temple Seva", description: "Help maintain the ashram premises — cleaning, decorating, and preparing for satsangs, kirtans, and special events.", impact: "Daily opportunity" },
      { title: "Environment Seva", description: "Join tree-plantation drives, river-cleaning yatras, and eco-friendly festival initiatives led by the ashram sangat.", impact: "1000+ trees planted" },
      { title: "Donation Seva", description: "Contribute financially to sustain all seva activities. Every rupee donated goes directly toward feeding, healing, and educating.", impact: "100% transparent" },
    ],
  },

  gallery: {
    eyebrow: "Sacred Moments",
    titleLead: "Divine",
    titleEm: "Gallery",
    subtitle: "Moments of Spiritual Grace, Seva, and Divine Blessings",
    empty: "No images yet. Add photos to",
    guruji: "Guruji",
  },

  videos: {
    eyebrow: "Ashram Recordings",
    titleLead: "Sacred",
    titleEm: "Videos",
    subtitle: "Immerse yourself in the divine atmosphere of Guruji's ashram. Click play — sound is on.",
    empty: "No videos yet. Add files to",
  },

  contact: {
    eyebrow: "Get in Touch",
    titleLead: "Connect with",
    titleEm: "Us",
    subtitle:
      "Reach out for satsang schedules, seva opportunities, donations, or any question. We are here to serve.",
    nameLabel: "Full Name *",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+91 XXXXX XXXXX",
    messageLabel: "Message *",
    messagePlaceholder: "Share your query, request for seva, or message for Guruji…",
    send: "Send Message",
    sending: "Sending…",
    sendAnother: "Send Another Message",
    successTitle: "Message Received!",
    successBody:
      "Jai Guruji! Thank you for reaching out. We will get back to you very soon. May Guruji's blessings be with you. 🙏",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error. Please check your connection and try again.",
    ashramContact: "Ashram Contact",
    addressLabel: "Address",
    emailInfoLabel: "Email",
    findAshram: "Find the Ashram",
    directions: "Directions",
    address: "Pant Vihar, Saharanpur, Uttar Pradesh",
  },

  footer: {
    brand: "Guruji Nakur Wale Baba Ji",
    location: "Nakur, Saharanpur, Uttar Pradesh",
    blurb:
      "A sacred space for satsang, kirtan, seva, and devotion — open to all seekers of divine love and inner peace.",
    quickLinks: "Quick Links",
    contactHeading: "Contact",
    address: "Pant Vihar, Saharanpur, Uttar Pradesh",
    quote: "Sab mein Ishwar hai — har sehal mein Seva, har qadam mein Bhakti.",
    rights: "Shri Guruji Nakur Wale Baba Ji. All Rights Reserved. Built with devotion.",
  },
}

export const dict = { hi, en }
export type Dictionary = typeof hi
