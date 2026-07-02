export type Language = "en" | "nl";

export interface NavDictionary {
  links: {
    features: string;
    howItWorks: string;
    story: string;
    faq: string;
  };
  cta: string;
  logoAlt: string;
}

export interface LanguageSwitcherDictionary {
  current: string;
  options: {
    en: string;
    nl: string;
  };
}

export interface HeroDictionary {
  headlineLine1: string;
  headlineLine2: string;
  headlineEmphasis: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  imageAlt: string;
}

export interface TrustBarDictionary {
  tagline: string;
  heading: string;
  logos: string[];
}

export interface CategoryStripDictionary {
  label: string;
  items: string[];
}

export interface CoreUspItem {
  title: string;
  description: string;
  badge?: string;
}

export interface CoreUspsDictionary {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: {
    multiCarrier: CoreUspItem;
    returns: CoreUspItem;
    international: CoreUspItem;
  };
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeatureGridDictionary {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: {
    tracking: FeatureItem;
    checkoutEstimates: FeatureItem;
    peakSeason: FeatureItem;
    insuredDelivery: FeatureItem;
    integrations: FeatureItem;
    analytics: FeatureItem;
  };
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface HowItWorksDictionary {
  heading: string;
  subheading: string;
  steps: HowItWorksStep[];
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyQuote {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudyDictionary {
  eyebrow: string;
  heading: string;
  subheading: string;
  playLabel: string;
  videoTitle: string;
  stats: CaseStudyStat[];
  quotes: CaseStudyQuote[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqDictionary {
  heading: string;
  subheading: string;
  items: FaqItem[];
}

export interface CtaBandDictionary {
  heading: string;
  subheading: string;
  primaryCta: string;
}

export interface ContactFormDictionary {
  heading: string;
  subheading: string;
  fields: {
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    volume: string;
    volumeOptions: {
      placeholder: string;
      low: string;
      mid: string;
      high: string;
      enterprise: string;
    };
    message: string;
    messagePlaceholder: string;
  };
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
}

export interface FooterDictionary {
  description: string;
  productsHeading: string;
  productLinks: string[];
  companyHeading: string;
  companyLinks: string[];
  copyright: string;
  madeLine: string;
}

export interface Dictionary {
  nav: NavDictionary;
  languageSwitcher: LanguageSwitcherDictionary;
  hero: HeroDictionary;
  categoryStrip: CategoryStripDictionary;
  trustBar: TrustBarDictionary;
  coreUsps: CoreUspsDictionary;
  featureGrid: FeatureGridDictionary;
  howItWorks: HowItWorksDictionary;
  caseStudy: CaseStudyDictionary;
  faq: FaqDictionary;
  ctaBand: CtaBandDictionary;
  contactForm: ContactFormDictionary;
  footer: FooterDictionary;
}
