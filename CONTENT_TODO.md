# Content TODO: zineps.com/fashion

Every string, image, stat, testimonial, and logo below is a well-written **placeholder** *unless explicitly
marked ✅ VERIFIED / REAL*. Organized top-to-bottom in page order so a reviewer can work through it once.

> ## ⚠️ Section 5 (Burker case study) is REAL, VERIFIED customer content
> **Do not treat the Burker case study like the other placeholder testimonials, and do not swap it out
> during a routine placeholder-content pass.** Burker is a real, named reference customer (jewelry & watch
> retailer, ships worldwide from a Zaandam warehouse). The quotes, speaker names/titles, stats, and video
> footage in `components/fashion/CaseStudy.tsx` / `CaseStudyVideo.tsx` and the `caseStudy` dictionary key in
> `dictionaries/{en,nl}.ts` are sourced from actual on-camera interviews with Erkan Dulkadir (co-owner) and
> Burak (co-founder, logistics) plus real warehouse b-roll; see the "Case study" section below for exactly
> what is and isn't safe to touch.

> **Important (i18n):** All copy lives in [`lib/i18n/dictionaries/en.ts`](lib/i18n/dictionaries/en.ts) and
> [`lib/i18n/dictionaries/nl.ts`](lib/i18n/dictionaries/nl.ts), both implementing the shared `Dictionary`
> type in [`lib/i18n/dictionaries/types.ts`](lib/i18n/dictionaries/types.ts). **Update both files together
> when replacing copy.** TypeScript will fail the build if a key goes missing from either dictionary, but
> it cannot catch one language being updated with new copy while the other keeps stale placeholder text.
> Always ship EN and NL changes in the same PR. This applies to the Burker case study too: if EN copy is
> ever revised (e.g. a corrected stat), update the NL translation in the same change.

## Global / brand tokens

- [ ] Replace placeholder brand colors in [`tailwind.config.ts`](tailwind.config.ts) (`brand.*`, `ink.*`,
      `backgroundImage.brand-gradient*`, `backgroundImage.hero-gradient`) with real Zineps brand tokens;
      this is a one-file change by design.
- [ ] `clay.*` (50-800) is a fashion-specific secondary accent (warm terracotta/blush) used sparingly for
      the "returns" badge, the fashion-eyebrow pill, and a chart/stat accent inside the hero mock UI.
      `ink.750` (`#424242`) is a "charcoal" token used for all headline text. Both are placeholder values;
      confirm against real Zineps brand guidelines, or drop the clay accent entirely if the merged site
      doesn't want a second accent color.
- [ ] Replace placeholder fonts in [`app/layout.tsx`](app/layout.tsx) (`Inter` body / `Fraunces` display)
      with the real Zineps type system if it differs. Headline text renders in sans-serif (`font-sans
      font-bold`) to match the live site's typography; `Fraunces` (serif) is used only for numeric
      treatments (stat counters, step/FAQ index numbers) as a small editorial accent. Drop the
      `font-display` usages and the `Fraunces` import if that accent isn't wanted.
- ✅ **Done:** the real Zineps logo now renders in [`components/fashion/Nav.tsx`](components/fashion/Nav.tsx)
      and [`components/fashion/Footer.tsx`](components/fashion/Footer.tsx) via `next/image`, sourced from
      `public/images/logo.png` (copied from the provided `public/logo/logo.png`). `app/icon.png` and
      `app/apple-icon.png` (the site favicon/apple-touch-icon, auto-detected by Next.js) are cropped from
      the same source's circular mark. If the logo file is ever replaced, regenerate the two icon crops
      from the new file's mark (see README) rather than hand-editing the PNGs.
- [ ] The navbar is now fully transparent (`components/fashion/Nav.tsx`, no background/blur/border) and
      `fixed` so it overlays the hero directly. This was tuned against the current light/white-and-mint
      design system. If the merged site's real header ever needs to sit over a dark hero image or video,
      add a scrim to *that specific section* (not the nav) rather than giving the nav a background again.
- [ ] Custom SVG line-art icons for fashion motifs (hanger, garment tag, shoe, bag, watch) live in
      `components/fashion/icons/`, all hand-drawn to match lucide-react's 24×24 / 2px-stroke convention so
      they sit consistently alongside the lucide icons used elsewhere. Used in the category marquee, the
      Core USPs eyebrow/returns badge, the case-study eyebrow, the stitch divider, and a subtle footer
      row; swap or extend this set if the real brand has its own icon illustrations.
- [ ] Motion is powered by `framer-motion` (scroll-reveal, hero entrance/stagger, animated counters, FAQ
      accordion, mouse-tilt cards, language cross-fade). No action needed unless the merged site
      standardizes on a different animation library; every motion file lives under
      `components/fashion/motion/`.

## 1. Hero (`components/fashion/Hero.tsx`, copy in `dictionaries/{en,nl}.ts` → `hero`)

- [ ] `hero.eyebrow` is now a short, non-competing category label ("Shipping & returns platform"). The
      previous "Built for fashion & accessories brands" tagline was relocated to the trust bar (see section
      2) to declutter the hero entry point. `hero.headline` is exactly 3 short lines (`\n`-separated in the
      dictionary string, rendered as a line-by-line stagger-in at up to ~90px), **each line was deliberately
      kept short so it doesn't wrap at that size; if you edit the headline, re-check in a live browser at
      1440px+ that no line wraps or ends on an orphaned single word**, since the layout won't auto-shrink
      text to fit. `hero.subhead` is placeholder copy tuned for fashion-ad message-match; confirm this
      positioning before running paid traffic against it.
- [ ] `hero.primaryCta` / `hero.secondaryCta`: confirm final CTA labels and destinations.
- [ ] The hero is now a centered, stacked layout (eyebrow → headline → subhead → CTAs → stats, all centered,
      full-width mockup below) rather than a side-by-side split. This intentionally mirrors zineps.com's
      real hero structure.
- [ ] The hero visual is a hand-built fake dashboard illustration (`components/fashion/motion/HeroMockUI.tsx`,
      divs + one inline SVG chart, no image asset at all), tilted in 3D with mouse-parallax. Replace it with
      a real product screenshot (or a professionally designed mockup) inside a similar tilted frame before
      launch. The illustration content ("Shipping overview", "Avg. cost €4.12", etc.) is placeholder, not
      real product data. `hero.imageAlt` describes the intended real screenshot and is applied as an
      `aria-label` on the illustration in the meantime.
- [ ] `hero.stats` (200+ countries / 99.9% uptime / 30+ carriers): verify these figures before publishing.
      They animate as a count-up on scroll via `components/fashion/motion/AnimatedCounter.tsx`.

## 2. Category strip + trust bar (`components/fashion/CategoryMarquee.tsx`, `TrustBar.tsx`,
   `dictionaries/{en,nl}.ts` → `categoryStrip`, `trustBar`)

- [ ] An animated marquee of fashion category tags (Apparel, Footwear, Accessories, Streetwear, Luxury,
      Activewear / Dutch equivalents) runs directly under the hero, each tag paired with one of the custom
      fashion icons. Confirm this is the right category list.
- [ ] `trustBar.tagline` ("Built for fashion & accessories brands") is the tagline relocated from the hero
      eyebrow; it now sits above the "Trusted by..." heading. Update both together if either changes, since
      they read as one intro block.
- [ ] All 6 trust-bar logo slots (`MAISON NOIR`, `LUNAR APPAREL`, `FIELDWORN`, `ARC & AISLE`, `PALOMA
      STUDIO`, `NORTHSHORE`) are fictional placeholder wordmarks; replace with real customer logos (with
      permission), **or consider whether Burker's real logo belongs here now that it's a named customer
      elsewhere on the page.** They're currently colored text (not image logos) so the grayscale→color
      hover effect has something to animate; once real logo images are used, apply the same
      `grayscale hover:grayscale-0` treatment directly to the `<Image>` elements.

## 3. Core USPs (`components/fashion/CoreUSPs.tsx`, `dictionaries/{en,nl}.ts` → `coreUsps`)

- [ ] Copy for all three USPs (multi-carrier routing, returns & exchanges, international/EU shipping) is
      illustrative; validate claims (e.g. "20-40% return rates", new-market-in-days framing) against real
      data/sources before launch.
- [ ] A fashion-motif eyebrow pill (`coreUsps.eyebrow`, "Made for fashion operations") uses a custom hanger
      icon (`components/fashion/motion/HangerIcon.tsx`; lucide-react has no hanger glyph), and the
      "returns" badge uses the `clay` accent color with a `Gift` icon.

## 4. Feature grid (`components/fashion/FeatureGrid.tsx`, `dictionaries/{en,nl}.ts` → `featureGrid`)

- [ ] All 6 feature descriptions (branded tracking, checkout estimates, peak-season SLAs, **insured &
      signature delivery for high-value pieces**, integrations, analytics) are placeholder copy; confirm
      which are actually shipped today vs. roadmap.
- [ ] The former "carbon-neutral shipping" bullet was swapped for **insured & signature delivery for
      high-value pieces** (`featureGrid.items.insuredDelivery`, `ShieldCheck` icon), directly relevant given
      Burker's jewelry/watch category. If sustainability messaging is still wanted, consider adding it back
      as a 7th item rather than re-removing the insured-delivery one, since it's now load-bearing for the
      fashion/accessories ad-readiness positioning.

## 5. Case study (Burker) ✅ VERIFIED / REAL (`components/fashion/CaseStudy.tsx`,
   `components/fashion/CaseStudyVideo.tsx`, `dictionaries/{en,nl}.ts` → `caseStudy`)

**This entire section is real, named customer content; treat it differently from the rest of this file.**

- ✅ **Real, do not replace:** company name (Burker, jewelry & watch retailer, ships worldwide from a
  Zaandam warehouse), speaker names/titles (Erkan Dulkadir, co-owner; Burak, co-founder responsible for
  logistics), the three stats (367,000+ shipments last year, 180% YoY growth, 5,000+ international
  shipments/day), and both pull-quotes.
- ⚠️ **Lightly cleaned up, verify before hard-locking:** the quotes were transcribed from spoken word and
  tidied for grammar/readability while preserving meaning. If Burker or their marketing team reviews and
  wants exact wording changes, treat that as a correction to real content, not a placeholder swap. Update
  both `en.ts` and `nl.ts`, and the matching `.vtt` caption cues, together.
- [ ] **Action needed (video file):** the component is built against `public/videos/burker-case-study.mp4`.
      The original 4K master (~490MB) was compressed for the web (H.264, scaled to 720p, `crf 28`,
      `+faststart`, ~7.7MB) and a matching WebM (VP9, `crf 38`, ~8MB) was generated alongside it; both are
      already in `public/videos/`. If a different or updated source video is provided later, re-run the
      same compression pipeline (see README) and regenerate the poster frame and caption timings from the
      new cut.
- [ ] **Caption timing is approximate, not frame-accurate.** `burker-case-study.en.vtt` /
      `burker-case-study.nl.vtt` cue timings (0:00–0:09, 0:14–0:32, 0:50–1:16) were estimated from sampled
      frames of the actual footage, not a full transcript pass. If precise timing matters for
      accessibility/compliance, re-time the cues against the final edited video.
- [ ] **Production upgrade path:** the video is self-hosted from `public/videos/` via Next.js static
      assets, which is a fine start at current file sizes (~8MB) and traffic levels. If this page starts
      getting meaningful paid-traffic volume, or the video is swapped for a longer/higher-res cut, move to a
      dedicated video CDN (Cloudflare Stream, Mux, or Bunny Stream) for adaptive bitrate streaming and to
      stop serving video bytes off the Next.js server directly.
- [ ] Confirm whether Burker's logo/wordmark should also appear in the trust-bar strip (see section 2) now
      that they're a named, verified customer elsewhere on the page.

## 6. How it works (`components/fashion/HowItWorks.tsx`, `dictionaries/{en,nl}.ts` → `howItWorks`)

- [ ] Confirm the 4-step onboarding flow (connect store → configure carriers → auto-route → branded
      tracking/returns) matches the real onboarding process. Steps now have a mouse-driven 3D tilt-on-hover
      in addition to the existing lift/shadow; purely presentational, no content to update.

A small decorative "stitch line" divider (`components/fashion/motion/StitchDivider.tsx`, a dashed SVG line,
not literal clipart) sits between How it works and Social proof as a tasteful nod to garment stitching.
Remove it if it doesn't fit the merged site's visual language; it carries no content to update.

## 7. Social proof (`components/fashion/Testimonials.tsx`, `dictionaries/{en,nl}.ts` → `testimonials`)

- [ ] All 3 testimonials (Elena Marsh / Maison Noir, Tomas Reyes / Fieldworn, Priya Anand / Paloma Studio)
      are **fictional placeholder** quotes, names, roles, and companies; do not confuse these with the real
      Burker case study in section 5. Replace with real, permissioned customer testimonials, or consider
      trimming this section to 1-2 supplementary quotes now that Burker's real case study is the page's
      primary proof point, to avoid the page feeling repetitive.
- [ ] Testimonial avatars are placeholder images from `placehold.co`; replace with real customer photos
      (with permission) or a consistent illustrated avatar system.
- [ ] Stat callouts are explicitly marked `[PLACEHOLDER STAT]` in the UI and dictionaries: "30% lower
      shipping costs", "2x faster returns processing", "98% on-time delivery" all need real figures or
      case-study sourcing before the placeholder note can be removed. (Contrast with Burker's stats in
      section 5, which are real and already sourced.)

## 8. FAQ (`components/fashion/FAQ.tsx`, `dictionaries/{en,nl}.ts` → `faq`)

- [ ] All 6 Q&As (returns handling, carrier/country coverage, integration effort, pricing model, contract
      length, bringing existing carriers) are plausible-but-illustrative answers; confirm against actual
      product/commercial policy, especially pricing and contract terms.

## 9. Final CTA band + contact form (`components/fashion/CTABand.tsx`, `ContactForm.tsx`,
   `dictionaries/{en,nl}.ts` → `ctaBand`, `contactForm`)

- [ ] `ctaBand.heading` / `ctaBand.subheading`: confirm final closing-CTA copy.
- [ ] Form endpoint: [`app/api/contact/route.ts`](app/api/contact/route.ts) currently only logs the
      submission and returns success. **It must be wired to a real CRM/email endpoint before launch** (see
      `// TODO: wire to real CRM/email endpoint` in that file).
- [ ] `contactForm.fields.volumeOptions` bucket ranges (under 1,000 / 1,000-10,000 / 10,000-50,000 /
      50,000+): confirm these match how sales actually segments leads.

## 10. Footer (`components/fashion/Footer.tsx`, `dictionaries/{en,nl}.ts` → `footer`)

- [ ] `footer.description`: placeholder company boilerplate.
- [ ] `footer.productLinks` / `footer.companyLinks`: placeholder link labels with no real `href`s yet;
      this footer is intentionally minimal and is expected to be replaced by the main site's real footer
      component when this page is merged in (see README "Integration notes").
- [ ] `footer.contactEmail` / `footer.contactPhone`: placeholder contact details.

## SEO / metadata (`app/fashion/page.tsx`)

- [ ] Title, meta description, Open Graph copy, and Twitter card copy are placeholder marketing copy;
      review against final SEO guidance. Copy was tuned this pass to explicitly mention "fashion, footwear,
      and accessories" for ad message-match; confirm this still matches the target keyword set.
- [ ] OG/Twitter image (`placehold.co/1200x630`): replace with a real social share image.
- [ ] JSON-LD `Organization`/`Service` block: verify `url`, `description`, and `areaServed` against the
      real Zineps organization data once this is live on zineps.com.

## Miscellaneous

- [ ] `app/page.tsx` redirects `/` → `/fashion` for local dev convenience only: remove this when merging
      into the main site, since the main site already owns the root route.
