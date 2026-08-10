export const siteContent = {
  brand: "patara",
  tagline: "Simple, stylish watches for every day.",
  hero: {
    title: "Find your next watch",
    text: "Discover clean designs, solid quality, and styles that fit any look — from daily wear to special moments.",
    ctaLabel: "Browse watches",
    ctaHref: "#products",
    imageSrc: "/hero.jpg",
    imageAlt: "Close-up of a wristwatch on a wrist",
  },
  collections: {
    eyebrow: "Collections",
    title: "Watch styles",
    text: "Explore classic, sport, and premium watches — pick the style that fits you.",
    empty: "Collections will appear here once they are added.",
    images: {
      classic: "/collections/classic.jpg",
      sport: "/collections/sport.jpg",
      premium: "/collections/premium.jpg",
    },
  },
  products: {
    eyebrow: "Watches",
    title: "Our watches",
    text: "Browse the full selection. Each watch shows the look, price, and a short description.",
    empty: "No watches yet. Add your first watch from the admin dashboard.",
  },
  trust: [
    {
      id: "shipping",
      title: "Free shipping",
      text: "Complimentary delivery on every order, with tracking from checkout to your door.",
    },
    {
      id: "payment",
      title: "Secure payment",
      text: "Your card details stay protected with encrypted checkout every time you buy.",
    },
    {
      id: "returns",
      title: "Easy returns",
      text: "Changed your mind? Send it back within the return window for a simple refund.",
    },
  ],
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
