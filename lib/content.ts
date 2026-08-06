export const siteContent = {
  brand: "patara",
  tagline: "Simple, stylish watches for every day.",
  hero: {
    title: "Find your next watch",
    text: "Discover clean designs, solid quality, and styles that fit any look — from daily wear to special moments.",
    ctaLabel: "Browse watches",
    ctaHref: "#products",
    imageSrc:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Close-up of a classic wristwatch",
  },
  collections: {
    eyebrow: "Collections",
    title: "Watch styles",
    text: "Explore classic, sport, and premium watches — pick the style that fits you.",
    empty: "Collections will appear here once they are added.",
  },
  products: {
    eyebrow: "Watches",
    title: "Our watches",
    text: "Browse the full selection. Each watch shows the look, price, and a short description.",
    empty: "No watches yet. Add your first watch from the admin dashboard.",
  },
  footer: {
    blurb:
      "patara offers a simple selection of stylish timepieces. Browse the collection and contact us if you find something you like.",
    company: "PATARA LLC",
    links: [
      { label: "Collections", href: "#collections" },
      { label: "Watches", href: "#products" },
      { label: "Contact", href: "mailto:contact@rm-watches.shop" },
    ],
    contact: {
      email: "contact@rm-watches.shop",
      phone: "+8617815651713",
      addressLines: [
        "7110 W JEFFERSON AVE STE 250",
        "LAKEWOOD CO 80235",
        "US",
      ],
    },
  },
} as const;
