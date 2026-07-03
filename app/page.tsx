import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { LanguageFadeWrapper } from "@/components/fashion/motion/LanguageFadeWrapper";
import { ScrollProgress } from "@/components/fashion/motion/ScrollProgress";
import { Nav } from "@/components/fashion/Nav";
import { Hero } from "@/components/fashion/Hero";
import { TrustBar } from "@/components/fashion/TrustBar";
import { CoreUSPs } from "@/components/fashion/CoreUSPs";
import { FeatureGrid } from "@/components/fashion/FeatureGrid";
import { HowItWorks } from "@/components/fashion/HowItWorks";
import { CaseStudy } from "@/components/fashion/CaseStudy";
import { CategoryMarquee } from "@/components/fashion/CategoryMarquee";
import { FAQ } from "@/components/fashion/FAQ";
import { CTABand } from "@/components/fashion/CTABand";
import { Footer } from "@/components/fashion/Footer";

const PAGE_URL = "https://www.zineps.com/fashion";
const TITLE = "Shipping & Returns Software for Fashion & Apparel Brands | Zineps";
const DESCRIPTION =
  "Multi-carrier shipping software built for DTC fashion, footwear, and accessories brands. Optimize carrier rates, turn high return rates into a branded returns experience, and ship fast across the EU and beyond.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fashion ecommerce shipping",
    "apparel returns software",
    "branded returns portal",
    "multi-carrier shipping platform",
    "DTC fashion logistics",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Zineps",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630/1A1A1A/70CAB9.png?text=Zineps+for+Fashion+Brands",
        width: 1200,
        height: 630,
        alt: "Zineps multi-carrier shipping and branded returns platform for fashion, footwear, and accessories brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://placehold.co/1200x630/1A1A1A/70CAB9.png?text=Zineps+for+Fashion+Brands"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zineps.com/#organization",
      name: "Zineps",
      url: "https://www.zineps.com",
      description: "Multi-carrier shipping and rate-management platform for e-commerce businesses.",
    },
    {
      "@type": "Service",
      name: "Zineps for Fashion Brands",
      serviceType: "Multi-carrier shipping, rate optimization, and branded returns management for fashion e-commerce",
      provider: {
        "@id": "https://www.zineps.com/#organization",
      },
      areaServed: "Worldwide",
      audience: {
        "@type": "Audience",
        audienceType: "DTC and mid-market fashion, footwear, and accessories e-commerce brands",
      },
      url: PAGE_URL,
    },
  ],
};

export default function FashionLandingPage() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <LanguageFadeWrapper>
        <Nav />
        <main className="snap-scroller">
          <Hero />
          <TrustBar />
          <CoreUSPs />
          <FeatureGrid />
          <HowItWorks />
          <CaseStudy />
          <CategoryMarquee />
          <FAQ />
          <CTABand />
        </main>
        <Footer />
      </LanguageFadeWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </LanguageProvider>
  );
}
