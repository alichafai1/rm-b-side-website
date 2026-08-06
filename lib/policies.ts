export type PolicyPage = {
  slug: string;
  title: string;
  updated: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const legalLinks = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund & Return Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

export const policies: Record<string, PolicyPage> = {
  "shipping-policy": {
    slug: "shipping-policy",
    title: "Shipping Policy",
    updated: "August 6, 2026",
    sections: [
      {
        heading: "Processing time",
        paragraphs: [
          "Orders are usually prepared within 1–3 business days after confirmation.",
          "You will receive a notification when your order has been shipped.",
        ],
      },
      {
        heading: "Delivery",
        paragraphs: [
          "Delivery times depend on your location and the shipping method selected.",
          "Standard shipping typically takes 5–15 business days. Express options may be available where offered.",
        ],
      },
      {
        heading: "Shipping fees",
        paragraphs: [
          "Shipping fees, if any, are shown before you complete your order.",
          "Free shipping promotions may apply during selected periods.",
        ],
      },
      {
        heading: "Tracking",
        paragraphs: [
          "Once your package is shipped, a tracking number will be shared when available.",
          "If you need help with a shipment, contact us at contact@rm-watches.shop.",
        ],
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund & Return Policy",
    updated: "August 6, 2026",
    sections: [
      {
        heading: "Return window",
        paragraphs: [
          "You may request a return within 14 days of receiving your order.",
          "Items must be unused, in original condition, and returned with all original packaging.",
        ],
      },
      {
        heading: "How to start a return",
        paragraphs: [
          "Email contact@rm-watches.shop with your order details and reason for return.",
          "We will confirm whether the item is eligible and provide return instructions.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "Approved refunds are processed to the original payment method after we receive and inspect the returned item.",
          "Refund timing depends on your bank or payment provider and may take several business days.",
        ],
      },
      {
        heading: "Non-returnable items",
        paragraphs: [
          "Custom, damaged by misuse, or incomplete items may not be eligible for return.",
          "Sale or final-clearance items may also be excluded unless required by law.",
        ],
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "August 6, 2026",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We may collect contact details, order information, and basic website usage data to provide our services.",
          "This can include your name, email address, phone number, and shipping address when you contact us or place an order.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use your information to respond to inquiries, process orders, improve the website, and send important updates.",
          "We do not sell your personal information.",
        ],
      },
      {
        heading: "Sharing of information",
        paragraphs: [
          "We may share information with trusted service providers who help us operate the website, process payments, or deliver orders.",
          "These providers are only allowed to use your information for the services they provide to us.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "For privacy questions, contact PATARA LLC at contact@rm-watches.shop.",
          "Business address: 7110 W Jefferson Ave Ste 250, Lakewood CO 80235, US.",
        ],
      },
    ],
  },
  "terms-of-service": {
    slug: "terms-of-service",
    title: "Terms of Service",
    updated: "August 6, 2026",
    sections: [
      {
        heading: "Agreement",
        paragraphs: [
          "By using the patara website, you agree to these Terms of Service.",
          "If you do not agree, please do not use the website.",
        ],
      },
      {
        heading: "Products and content",
        paragraphs: [
          "Product details, images, and prices are shown for information and may change without notice.",
          "We aim to keep information accurate, but small differences may occur.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You agree not to misuse the website, attempt unauthorized access, or interfere with its normal operation.",
          "Content on this site belongs to PATARA LLC and may not be copied for commercial use without permission.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms can be sent to contact@rm-watches.shop.",
          "PATARA LLC, 7110 W Jefferson Ave Ste 250, Lakewood CO 80235, US.",
        ],
      },
    ],
  },
};
