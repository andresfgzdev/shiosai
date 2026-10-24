export const site = {
  name: "Shiosai",
  kanji: "潮騒",
  url: "https://shiosai.jp",
  title: "Shiosai · Tonight's dinner left the harbour at five",
  description:
    "Shiosai is a twenty two seat seafood house on the pier at Manazuru. Our own boat fishes at dawn and the nine course tide menu is written when it returns. Book a table at 17:30 or 20:00.",
  maker: {
    name: "Andres Gallego",
    profile: "https://github.com/andresfgzdev",
  },
} as const;

export const nav = [
  { id: "voyage", label: "The voyage" },
  { id: "menu", label: "Tide menu" },
  { id: "storm", label: "Storm clause" },
  { id: "visit", label: "Visit" },
] as const;

export const plates = [
  { id: "top", label: "Plate 0 · The boat" },
  { id: "voyage", label: "Plate I · The voyage" },
  { id: "menu", label: "Plate II · The tide menu" },
  { id: "storm", label: "Plate III · The storm clause" },
  { id: "guests", label: "Plate IV · Countersigned" },
  { id: "book", label: "Plate V · Book a table" },
  { id: "faq", label: "Plate VI · Questions" },
  { id: "visit", label: "Plate VII · The pier" },
] as const;

export const hero = {
  eyebrow: "Shiosai · Manazuru harbour",
  serial: "No. 276 · 2026",
  lines: ["Tonight's dinner", "left the harbour", "at five this morning."],
  sub: "A twenty two seat dining room on the pier at Manazuru. Our own boat fishes at dawn, and the nine course tide menu is written when it comes back.",
  cta: "Book a table",
  proof: "The boat has sailed 276 mornings this year",
  price: "16,500",
  priceNote: "Nine courses",
  priceAccent: "one boat",
  hint: "Move the loupe across the plate",
  uvMark: "Genuine · tide series",
  ring: "SHIOSAI TIDE SERIES · GENUINE INTAGLIO · MANAZURU · 潮騒 · SHIOSAI TIDE SERIES · GENUINE INTAGLIO ·",
} as const;

export const tideStrip = [
  { label: "Manazuru harbour", value: "Sat 24 Oct" },
  { label: "Boat out", value: "05:10" },
  { label: "Sunrise", value: "05:57" },
  { label: "High tide", value: "06:48 · 1.42 m" },
  { label: "Water", value: "19.6 °C" },
  { label: "Wind", value: "NE 9 kn" },
  { label: "Swell", value: "0.8 m" },
  { label: "Back in harbour", value: "11:20" },
] as const;

export const kitchenRule = {
  eyebrow: "The only rule in the kitchen",
  words:
    "Our boat leaves at five. Whatever the sea gives back by noon is what we cook tonight, and nothing else.".split(
      " ",
    ),
  copper: ["five.", "noon", "tonight,"],
} as const;

export type VoyageNote = {
  time: string;
  title: string;
  body: string;
  foot: string;
  kanji: string;
  chip: string;
  tint?: "teal" | "violet";
  seal?: boolean;
  media:
    | { kind: "video"; src: string; poster: string; label: string }
    | { kind: "image"; src: string; alt: string; width: number; height: number };
};

export const voyage = {
  eyebrow: "Plate I · The voyage",
  title: "One day, printed in four notes.",
  lead: "Drag through the series. Every note is a moment between the harbour wall at five and the first plate at half past five in the evening.",
  notes: [
    {
      time: "05:10",
      title: "Shiosai Maru leaves the wall",
      body: "Captain Kenta Hamada takes the boat out in the dark with two crew. From here, the sea writes the menu.",
      foot: "Departure",
      kanji: "出",
      chip: "Note I · 1,000 metres out",
      media: {
        kind: "video",
        src: "/media/voyage-departure.mp4",
        poster: "/media/voyage-departure-poster.webp",
        label: "Engraved slow motion footage of a fishing boat crossing rough water",
      },
    },
    {
      time: "07:40",
      title: "The set nets come up",
      body: "Our nets sit three kilometres offshore. We lift them once and keep only what tonight needs. The rest goes back alive.",
      foot: "Hauling",
      kanji: "網",
      chip: "Note II · net 3 of 4",
      tint: "teal",
      media: {
        kind: "image",
        src: "/media/voyage-nets.webp",
        alt: "Engraving of a small fishing boat hauling a set net with its crane",
        width: 1600,
        height: 1000,
      },
    },
    {
      time: "11:20",
      title: "Back in harbour",
      body: "Every fish is bled on the pier and on ice within four minutes of landing. The kitchen gets the list by noon.",
      foot: "Landing",
      kanji: "港",
      chip: "Note III · pier 2",
      tint: "violet",
      media: {
        kind: "video",
        src: "/media/harbour.mp4",
        poster: "/media/harbour-poster.webp",
        label: "Engraving of fishing boats moored along a narrow harbour, the water gently moving",
      },
    },
    {
      time: "17:30",
      title: "The table",
      body: "Twenty two seats face the water as the light goes. The first course is whatever came up first.",
      foot: "Service",
      kanji: "膳",
      chip: "Note IV · first seating",
      seal: true,
      media: {
        kind: "video",
        src: "/media/voyage-table.mp4",
        poster: "/media/voyage-table-poster.webp",
        label: "Engraved slow motion footage of a small boat drifting under a pink evening sky",
      },
    },
  ] satisfies VoyageNote[],
} as const;

export type Course = {
  no: string;
  name: string;
  kanji: string;
  body: string;
  when: string;
  image?: string;
};

export const menu = {
  eyebrow: "Plate II · The tide menu",
  title: "Nine courses. Each one has a catch time.",
  lead: "This is Friday's menu, written at 11:52. Hover a course to see the plate. Tomorrow it will be different, because the sea will be.",
  plateAlt:
    "Engraving after Hiroshige of sailboats crossing a wide bay below Mount Fuji, pines on the shore",
  plateCaption: "Plate II · After Hiroshige, Kuroto bay",
  price: "¥16,500",
  priceNote: ["per guest, nine courses", "sake pairing ¥7,800"],
  uvLine: "No substitutions · the sea decides",
  courses: [
    {
      no: "01",
      name: "Shirasu",
      kanji: "しらす",
      body: "Whitebait from net 1 with yuzu and cold dashi jelly.",
      when: "Net 1 · 07:42",
    },
    {
      no: "02",
      name: "Kohada",
      kanji: "小鰭",
      body: "Gizzard shad cured three days, pressed over warm rice.",
      when: "Cured · Tue",
      image: "/media/course-kohada.webp",
    },
    {
      no: "03",
      name: "Kuruma ebi",
      kanji: "車海老",
      body: "Tiger prawn poached on the pier the moment it lands.",
      when: "Pier · 11:31",
      image: "/media/course-kuruma-ebi.webp",
    },
    {
      no: "04",
      name: "Owan",
      kanji: "椀",
      body: "Clear soup made from the morning bones and kombu.",
      when: "Stock · 12:10",
    },
    {
      no: "05",
      name: "Awabi",
      kanji: "鮑",
      body: "Abalone steamed four hours in sake, liver sauce.",
      when: "Diver · 09:05",
      image: "/media/course-awabi.webp",
    },
    {
      no: "06",
      name: "Kinmedai",
      kanji: "金目鯛",
      body: "Splendid alfonsino grilled skin first over binchōtan.",
      when: "Net 3 · 07:51",
    },
    {
      no: "07",
      name: "Maguro",
      kanji: "鮪",
      body: "Bluefin from Sagami Bay, aged six days in the cabinet.",
      when: "Aged · 6 d",
      image: "/media/course-maguro.webp",
    },
    {
      no: "08",
      name: "Unagi",
      kanji: "鰻",
      body: "Eel lacquered over charcoal with a tare kept since 2011.",
      when: "Charcoal · 19:00",
      image: "/media/course-unagi.webp",
    },
    {
      no: "09",
      name: "Mizugashi",
      kanji: "水菓子",
      body: "Warabi mochi with salt from the bay and black sugar.",
      when: "Salt · Manazuru",
    },
  ] satisfies Course[],
} as const;

export const storm = {
  eyebrow: "Plate III · The storm clause",
  title: "When the sea says no, we close.",
  lead: "About twenty one mornings a year the harbour master keeps us in. On those days we cancel by 09:00 and your deposit is back on your card the same afternoon. No credit notes, no rebooking fee.",
  imageAlt: "Night engraving of storm waves breaking over a harbour wall and its lighthouse",
  stats: [
    { value: "21", label: "storm days in 2025" },
    { value: "¥0", label: "kept from cancelled guests" },
    { value: "09:00", label: "latest we will call you" },
  ],
  hold: "Hold it to the light",
  release: "Put the note down",
} as const;

export const guests = {
  eyebrow: "Plate IV · Countersigned",
  title: "Guests who came for the boat and stayed for the bones.",
  quotes: [
    {
      no: "No. 0412",
      body: "The kinmedai was caught at 07:51 and grilled at 19:20. They told us both times, and I have never paid so much attention to a fish.",
      name: "Yuki Tanabe",
      initials: "YT",
      meta: "Yokohama · 19 Sep 2026",
      rosette: "rosette",
      turn: 24,
    },
    {
      no: "No. 0588",
      body: "Our first booking was storm cancelled. The refund landed before lunch, and the second time the sea was flat and the abalone was absurd.",
      name: "Leon Vargas",
      initials: "LV",
      meta: "Medellín · 2 Aug 2026",
      rosette: "seal-ring",
      turn: 80,
    },
    {
      no: "No. 0731",
      body: "We sat by the window for the 17:30 seating and watched the boat being washed down while we ate what it brought in.",
      name: "Priya Raman",
      initials: "PR",
      meta: "Singapore · 11 Jul 2026",
      rosette: "rosette",
      turn: 150,
    },
  ],
} as const;

export const booking = {
  eyebrow: "Plate V · Book a table",
  title: "Book a table on the pier.",
  lead: "Wednesday to Sunday, two seatings. Tables open thirty days ahead at 10:00 Japan time.",
  steps: [
    {
      n: "01",
      title: "Choose a seating",
      body: "17:30 for the sunset side, 20:00 for the harbour lights.",
    },
    { n: "02", title: "Hold it with ¥5,000", body: "Per guest, taken from the bill on the night." },
    {
      n: "03",
      title: "Watch the forecast with us",
      body: "If the boat cannot sail, we call by 09:00 and refund in full.",
    },
  ],
  assureStrong: "Free cancellation up to 72 hours before.",
  assure: "Storm closures are always refunded, whatever the notice.",
  noteLabel: "Table note · Shiosai",
  swell: "Swell of 2.1 m forecast. If the boat stays in, you get a full refund by 09:00.",
  emailLabel: "Email for the table note",
  submit: "Book a table",
  loading: "Printing your table note",
  change: "Change details",
} as const;

export const faq = {
  eyebrow: "Plate VI · Questions",
  title: "Before you come to the pier.",
  lead: "Shiosai is a portfolio concept, so these answers tell its story rather than describe a place you can visit.",
  items: [
    {
      q: "How do I know if the boat sailed?",
      a: "The harbour strip at the top of this page updates at 05:30 every morning. If we close, we also call and email you by 09:00.",
    },
    {
      q: "What does the tide menu cost?",
      a: "¥16,500 per guest for nine courses. The sake pairing is ¥7,800 for six pours. Tax and service are included.",
    },
    {
      q: "Can you work around allergies?",
      a: "Tell us when you book. Shellfish and gluten allergies need 72 hours, because we change what we keep from the nets.",
    },
    {
      q: "How do I get to Manazuru?",
      a: "Ninety minutes from Tokyo on the JR Tokaido line, then an eight minute walk down to pier 2. We send a map with your table note.",
    },
    {
      q: "Can I bring children?",
      a: "Yes, from age eight at the 17:30 seating. We serve a shorter five course note for them at ¥6,600.",
    },
    {
      q: "Can I visit the boat?",
      a: "On Sundays two guests can join the crew at 05:10. Ask when you book. It depends on the weather and the captain.",
    },
  ],
} as const;

export const footer = {
  blurb: "Seafood from our own boat, cooked on the pier where it lands.",
  columns: [
    {
      title: "Hours",
      items: [
        { label: "Wed to Sun", mono: true },
        { label: "17:30 · 20:00", mono: true },
        { label: "Closed on storm days" },
      ],
    },
    {
      title: "Table",
      items: [
        { label: "Book a table", href: "#book" },
        { label: "Tide menu", href: "#menu" },
        { label: "Storm clause", href: "#storm" },
      ],
    },
    {
      title: "This project",
      items: [
        { label: "A portfolio concept" },
        { label: "Not a real business" },
        { label: "Meet the maker", href: site.maker.profile },
      ],
    },
  ],
  uvLine: "Printed by hand on the pier · every note is genuine",
  copyright: "© 2026 Shiosai · a portfolio concept",
  disclaimer:
    "Shiosai is a fictional restaurant, designed and built for fun as a portfolio project. It is not a real business: no table can be booked, no deposit is taken and no boat goes out.",
  madeWith: "Made with love",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
  credits:
    "Engravings and slow loops rendered in house from Wikimedia Commons: ship at sea off Kazusa and Kuroto bay after Hokusai and Hiroshige (public domain); harbour by ccfarmer (CC BY 3.0); set net boat by Miyuki Meinaka (CC BY SA 4.0); lighthouse by Francisco Anzola (CC BY 2.0); nigiri by Zheng Zhou (CC BY SA 4.0), takaokun (CC BY 2.0) and Alpha from Melbourne (CC BY SA 2.0); footage by Maoileann, Myousry6666 and Amada44 (CC BY SA 4.0).",
} as const;
