import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    links: {
      features: "Features",
      howItWorks: "How it works",
      story: "Customers",
      faq: "FAQ",
    },
    cta: "Book a demo",
    logoAlt: "Zineps home",
  },
  languageSwitcher: {
    current: "EN",
    options: {
      en: "English (EN)",
      nl: "Nederlands (NL)",
    },
  },
  hero: {
    headlineLine1: "Shipping that moves",
    headlineLine2: "at the speed of",
    headlineEmphasis: "fashion",
    subhead:
      "One platform to compare carriers, automate fit driven returns, and ship every drop worldwide, with tracking your customers actually want to open.",
    primaryCta: "Book a demo",
    secondaryCta: "See how it works",
    imageAlt:
      "Zineps shipping dashboard showing live carrier rates, volume trends, and shipment routing for a fashion brand",
  },
  categoryStrip: {
    label: "Every corner of the wardrobe",
    items: [
      "Apparel",
      "Footwear",
      "Accessories",
      "Streetwear",
      "Luxury",
      "Activewear",
    ],
  },
  trustBar: {
    tagline: "Built for fashion & accessories brands",
    heading: "The label behind the labels you already wear",
    logos: ["MAISON R", "ATLAS/WEAR", "lumière", "Vêrto", "KJØBEN"],
  },
  coreUsps: {
    eyebrow: "Why fashion brands switch",
    heading: "Three problems fashion knows too well",
    subheading:
      "Fashion has different economics than the rest of ecommerce: high return rates, tight size and fit expectations, and customers who judge you on unboxing. Zineps is built around that reality.",
    items: {
      multiCarrier: {
        title: "Rates that beat singlecarrier deals",
        description:
          "Compare every carrier at once and auto route each parcel to the cheapest or fastest option, no more overpaying on a contract that never fit your volume.",
      },
      returns: {
        title: "Returns built for fit, not friction",
        description:
          "Wrong size shouldn't mean a lost sale. Instant exchange labels, sizeswap flows, and selfservice portals turn returns into the next order.",
        badge: "Built for fashion's #1 pain point",
      },
      international: {
        title: "Crossborder EU, without the drama",
        description:
          "Ship to every European market with duties, labels, and delivery estimates handled, so a customer in Milan gets the same experience as one next door.",
      },
    },
  },
  featureGrid: {
    eyebrow: "Everything in one rack",
    heading: "The full wardrobe of shipping tools",
    subheading:
      "From the drop calendar to the doorstep: features that speak fashion, not freight.",
    items: {
      tracking: {
        title: "Branded tracking pages",
        description:
          "Tracking that looks like your storefront, not a courier, with upsell space built in.",
      },
      checkoutEstimates: {
        title: "Checkout delivery dates",
        description:
          'Show accurate "arrives by" dates at checkout to lift conversion and cut WISMO tickets.',
      },
      peakSeason: {
        title: "Drop & peakseason ready",
        description:
          "Scale from a quiet Tuesday to a midnight drop without your ops falling behind.",
      },
      insuredDelivery: {
        title: "Circular & lowcarbon returns",
        description:
          "Consolidated returns and greener routes your sustainability page can actually back up.",
      },
      integrations: {
        title: "Storefront integrations",
        description:
          "Shopify, WooCommerce, and custom stacks connect in minutes, not sprints.",
      },
      analytics: {
        title: "Shipping analytics",
        description:
          "See cost per parcel, carrier performance, and return reasons by SKU and season.",
      },
    },
  },
  howItWorks: {
    heading: "Live in a week, not a season",
    subheading: "From cart to closet.",
    steps: [
      {
        title: "Connect your storefront",
        description:
          "Plug in Shopify or your custom stack. Orders start flowing in automatically.",
      },
      {
        title: "Set your shipping rules",
        description:
          "Cheapest, fastest, or greenest: you set the logic once and we route every parcel.",
      },
      {
        title: "Ship & brand the journey",
        description:
          "Print labels in bulk, send branded tracking, and give customers selfserve returns.",
      },
      {
        title: "Optimise every season",
        description:
          "Analytics show where you overspend and which SKUs come back, so next drop ships smarter.",
      },
    ],
  },
  caseStudy: {
    eyebrow: "Customer story · Burker",
    heading: "How a jewelry & watch house scaled to 367,000 shipments",
    subheading:
      "Burker is a jewelry and watch retailer shipping worldwide from its Zaandam warehouse. Here's how they scaled international volume with Zineps, in their own words.",
    playLabel: "Play the Burker customer film",
    videoTitle: "Burker × Zineps: scaling to 367,000 shipments a year",
    stats: [
      { value: "367,000+", label: "shipments last year" },
      { value: "180%", label: "shipment growth YoY" },
      { value: "5,000+", label: "parcels shipped per day" },
    ],
    quotes: [
      {
        quote:
          "At 5,000 parcels a day, guessing on carriers isn't an option. Zineps picks the right one every single time.",
        name: "Erkan Dulkadir",
        role: "Coowner, Burker",
      },
      {
        quote:
          "We doubled volume without doubling the ops team. That's the difference.",
        name: "Burak",
        role: "Cofounder, Burker",
      },
    ],
  },
  faq: {
    heading: "Questions, answered",
    subheading: "The fine print, folded neatly.",
    items: [
      {
        question: "How does Zineps handle fashion returns and size swaps?",
        answer:
          'Returns are the heart of fashion, so we treat them as a sales moment. Customers get a self service portal with instant exchange labels and one tap size swaps, turning a "wrong fit" into a kept order instead of a refund.',
      },
      {
        question: "Can it handle a midnight drop or peakseason spike?",
        answer:
          "Yes. The platform scales elastically, so whether you ship 50 or 50,000 parcels in an hour, label generation, carrier routing, and tracking stay fast.",
      },
      {
        question: "Which carriers and storefronts do you support?",
        answer:
          "All major EU carriers including PostNL, DPD, DHL, GLS and more, with Shopify, WooCommerce and custom integrations connecting in minutes.",
      },
      {
        question: "How much can we actually save on shipping?",
        answer:
          "Because we compare every carrier per parcel instead of locking you to one contract, most brands cut cost per shipment meaningfully in the first month. We show real savings on your own routes in the demo.",
      },
      {
        question: "Is the tracking experience really branded?",
        answer:
          "Fully. Tracking pages carry your logo, colors and tone, and give you upsell space, so the post purchase moment feels like your store, not a courier.",
      },
    ],
  },
  ctaBand: {
    heading: "Ship your next drop the smart way",
    subheading:
      "See a live rate comparison on your own routes. No contracts, no carrier lock in, just a 20 minute walkthrough.",
    primaryCta: "Book a demo",
  },
  contactForm: {
    heading: "Get a personalized demo",
    subheading:
      "Tell us a bit about your brand and we'll follow up within one business day.",
    fields: {
      name: "Full name",
      namePlaceholder: "Jordan Blake",
      company: "Company",
      companyPlaceholder: "Your brand name",
      email: "Work email",
      emailPlaceholder: "jordan@yourbrand.com",
      volume: "Monthly order volume",
      volumeOptions: {
        placeholder: "Select a range",
        low: "Under 1,000 orders",
        mid: "1,000-10,000 orders",
        high: "10,000-50,000 orders",
        enterprise: "50,000+ orders",
      },
      message: "What are you hoping to solve?",
      messagePlaceholder:
        "e.g. our return rate is high and refunds take too long",
    },
    submit: "Request a demo",
    submitting: "Sending...",
    successTitle: "Thanks, we've got it.",
    successBody: "A member of our team will reach out within one business day.",
    errorTitle: "Something went wrong",
    errorBody: "Please try again, or email us directly at info@zineps.com.",
  },
  footer: {
    description:
      "Multicarrier shipping and returns, tailored to how fashion brands actually sell.",
    productsHeading: "Product",
    productLinks: ["Features", "How it works", "FAQ"],
    companyHeading: "Company",
    companyLinks: ["Customers", "Book a demo"],
    copyright: "Zineps · zineps.com/fashion",
    madeLine: "Made for fashion, in the Netherlands",
  },
};
