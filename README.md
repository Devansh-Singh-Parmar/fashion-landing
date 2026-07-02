# Zineps — Fashion Vertical Landing Page

A standalone Next.js 15 (App Router) project for `zineps.com/fashion`, a vertical landing page targeting
DTC and mid-market fashion e-commerce brands evaluating Zineps as a shipping/returns partner.

This repo is intentionally self-contained (no assumptions about global providers, layouts, or import
aliases beyond the Next.js default `@/*`) so it can be dropped into the main zineps.com codebase with
minimal rework. See **Integration notes** below.

## Stack

- Next.js 15 (App Router), TypeScript (strict mode)
- Tailwind CSS
- lucide-react for icons
- Framer Motion for scroll-reveal, hero entrance, animated counters, card tilt, scroll progress, and the
  language cross-fade (`components/fashion/motion/`) — chosen over GSAP as the idiomatic React/Next.js
  motion library
- A fixed scroll-progress bar and a section dot-nav (`ScrollProgress` / `SectionScroller`) pair with a
  CSS `scroll-snap-type: y proximity` on every section for a gentle "settle into place" feel without
  trapping the scroll
- next/font (Bodoni Moda + Hanken Grotesk + Space Mono) for font optimization
- next/image for all imagery
- No CMS, no database — static marketing page with a placeholder API route for the contact form

## Running locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000/fashion](http://localhost:3000/fashion). (The root `/` route redirects to
`/fashion` for convenience during local development — see Integration notes.)

## Build

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

`npm run build` and `npm run lint` are both expected to complete with zero errors and zero warnings.

## Project structure

```
app/
  fashion/
    page.tsx        # the /fashion route — Server Component, owns metadata + JSON-LD
  api/
    contact/
      route.ts       # placeholder contact form endpoint (logs + returns success)
  layout.tsx          # root layout — fonts, <html>/<body>
  page.tsx            # redirects "/" -> "/fashion" (dev convenience only, see below)
  globals.css

components/
  fashion/
    ui/               # generic primitives: Button, Section, Card, Container, cx
    motion/           # Framer Motion helpers: Reveal, TiltCard, AnimatedCounter, HeroMockUI,
                      # ScrollProgress, SectionScroller, etc.
    icons/            # custom fashion-motif SVG icons: hanger, garment tag, shoe, bag, watch
    Nav.tsx
    LanguageSwitcher.tsx
    Hero.tsx
    TrustBar.tsx
    CoreUSPs.tsx
    FeatureGrid.tsx
    HowItWorks.tsx
    CaseStudy.tsx
    CaseStudyVideo.tsx
    CategoryMarquee.tsx
    FAQ.tsx
    CTABand.tsx
    ContactForm.tsx
    Footer.tsx

lib/
  i18n/
    LanguageProvider.tsx   # client Context provider: language state + localStorage persistence
    useLanguage.ts          # useLanguage() hook
    dictionaries/
      types.ts              # shared Dictionary type — missing keys are compile-time errors
      en.ts
      nl.ts
```

## Internationalization

This page replicates zineps.com's real i18n pattern: a client-side, code-driven dictionary switch — **not**
URL-based locale routing. There is no `/nl` path and no `?lang=` query param.

- `LanguageProvider` (`lib/i18n/LanguageProvider.tsx`) is a client component holding `language`,
  `setLanguage`, and the active `dictionary`, exposed via the `useLanguage()` hook.
- On mount, the saved language is read from `localStorage["language"]`; if absent, it falls back to `"nl"`
  when `navigator.language` starts with `nl`, otherwise `"en"`.
- On every language change, `LanguageProvider` updates context state, writes to `localStorage`, and sets
  `document.documentElement.lang` — the live site does not update `<html lang>` on switch; this
  implementation fixes that for accessibility/SEO correctness.
- `LanguageSwitcher` (`components/fashion/LanguageSwitcher.tsx`) renders the flag + language-code button
  and dropdown, matching the live site's nav convention.
- All section components read copy via `useLanguage()` — there are no hardcoded English strings in JSX.
- `en.ts` and `nl.ts` both implement the `Dictionary` type from `types.ts`, so a missing translation key
  fails `tsc`/`next build` rather than silently rendering blank or English-only copy in Dutch.

**When updating copy, always update both dictionaries in the same change** — see
[`CONTENT_TODO.md`](CONTENT_TODO.md) for the full list of placeholders that need real content, organized
by page section.

## Case study video (Burker)

The Burker customer story (`components/fashion/CaseStudy.tsx` / `CaseStudyVideo.tsx`) uses a real,
verified interview — see `CONTENT_TODO.md` for what's real vs. what still needs review. The video is
zero-byte on initial page load: only the poster image renders until the user clicks play, at which point
the `<video>` element mounts with `preload="metadata"` and both a WebM and MP4 `<source>`.

Assets live in `public/videos/`:

- `burker-case-study.mp4` — H.264, scaled to 720p, `crf 28`, `+faststart`
- `burker-case-study.webm` — VP9 alternative, `crf 38`
- `burker-case-study-poster.jpg` — poster frame, served through `next/image`
- `burker-case-study.en.vtt` / `burker-case-study.nl.vtt` — bilingual caption tracks, switched based on
  the active site language

To re-process a new source video, from `public/videos/`:

```bash
# 720p H.264 with faststart (adjust crf up if still too large; down if quality suffers)
ffmpeg -i source.mp4 -vf "scale=-2:720" -vcodec libx264 -crf 28 -preset slow \
  -acodec aac -b:a 96k -movflags +faststart burker-case-study.mp4

# WebM/VP9 alternative — bump crf if it comes out larger than the MP4
ffmpeg -i burker-case-study.mp4 -c:v libvpx-vp9 -crf 38 -b:v 0 -c:a libopus -b:a 96k burker-case-study.webm

# Poster frame
ffmpeg -i burker-case-study.mp4 -ss 00:00:02 -vframes 1 burker-case-study-poster.jpg
```

At current settings both video files are under 10MB for an ~80s clip. Self-hosting from `public/videos/`
is fine at this size and traffic level; if this page starts seeing meaningful paid-ad volume, move to a
dedicated video CDN (Cloudflare Stream, Mux, or Bunny Stream) for adaptive bitrate and to stop serving
video bytes off the Next.js server directly.

## Integration notes — merging into the main zineps.com repo

When this page is ready to move into the primary Next.js codebase:

1. **Move the fashion-namespaced folders in.** Copy `app/fashion/` and `components/fashion/` directly into
   the target repo's `app/` and `components/` directories. Everything fashion-specific is namespaced under
   `fashion/` so it should not collide with existing routes or components.
2. **Move `lib/i18n/` in**, or merge it with an existing i18n setup if the main site already has one. If the
   main site already has a `LanguageProvider`/`useLanguage` (it should, since this replicates its pattern),
   reuse the existing implementation and just add this page's dictionary keys to the existing dictionaries
   instead of keeping a second, competing provider.
3. **Merge `tailwind.config.ts`.** This project defines a placeholder `brand`/`ink` color scale and
   `brand-gradient` background images intended to be swapped for the main site's real design tokens in one
   file. If the main site's Tailwind config already defines equivalent tokens, remap the fashion components'
   class names (`bg-brand-500`, `text-ink-900`, etc.) to the existing token names instead of merging two
   parallel color systems.
4. **Wire the contact API route.** `app/api/contact/route.ts` currently only logs the payload and returns
   `{ ok: true }`. Replace the `// TODO: wire to real CRM/email endpoint` block with a call to the real
   CRM/email service used by the rest of zineps.com's marketing forms.
5. **Remove the dev-only root redirect.** `app/page.tsx` (`redirect("/fashion")`) exists only so `/` is
   useful in this standalone repo during local development. Delete it — the main site already owns `/`.
6. **Swap the footer.** `components/fashion/Footer.tsx` is intentionally minimal and marked as swappable.
   Once merged, either replace it with the main site's real shared footer component, or confirm the
   product/company links and contact details before keeping it as-is.
7. **Replace every item in [`CONTENT_TODO.md`](CONTENT_TODO.md)** — headline/subhead, testimonials, stats,
   logos, hero image, and brand tokens/fonts are all placeholders written to read like real copy, not
   Lorem Ipsum, but none of it is final.
8. **Re-run `next lint` and `next build`** in the target repo after merging, since the merged Tailwind
   config, ESLint config, and TypeScript path aliases may differ slightly from this standalone setup.
