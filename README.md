# Showcase 03 — Scroll-Driven Marketing Page

A scroll-driven storytelling page for a fictional product ("Aurora"), built as a portfolio showcase demonstrating marketing surface design, motion craft, and CSS technique.

Built with Nuxt 4, GSAP + ScrollTrigger, and TypeScript. No heavy images — all visual work done in CSS. Intentional design system from scratch.

---

## What it demonstrates

- **Marketing surface design** — hero, feature sections, stats, horizontal scroll, and a CTA composed as a coherent narrative arc
- **Scroll-driven motion** — GSAP ScrollTrigger animations tied to scroll position, not timers; content reveals feel earned
- **CSS craft** — gradients, shapes, layering, and typography doing the visual heavy lifting; no image assets required
- **Accessibility** — `prefers-reduced-motion: reduce` is respected throughout; animations are skipped and CSS fallbacks apply
- **Composable animation architecture** — `useSectionAnimations()` provides a scoped GSAP context per section; contexts revert cleanly on unmount with no memory leaks

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4 + Vue 3 |
| Animation | GSAP + ScrollTrigger |
| Language | TypeScript |
| Color mode | `@nuxtjs/color-mode` (light / dark / system) |
| Utilities | `@vueuse/core` |

---

## Features

- **Hero section** — full-viewport opening with scroll-triggered entrance animations
- **Horizontal scroll** — ScrollTrigger pin + scrub translates a flex track; section height calculated from scroll distance
- **Pinned section** — tall scroll container with multiple ScrollTrigger instances tracking progress; drives `activeIndex` state swapping content via Vue `TransitionGroup`
- **Feature sections** — staggered reveals on scroll entry
- **Stats section** — animated counters and visual indicators
- **CTA section** — closing action with motion punctuation
- **Color mode** — light / dark / system with no flash on load

---

## Project structure

```
app/
  components/
    AppNav.vue           # Navigation + color mode toggle
    HeroSection.vue      # Full-viewport hero with entrance animation
    HorizontalScroll.vue # Pinned horizontal scroll track
    PinnedSection.vue    # Tall pinned section with indexed state transitions
    FeatureSection.vue   # Scroll-triggered feature reveals
    StatsSection.vue     # Animated stats
    CtaSection.vue       # Closing call to action
  composables/
    useGsap.ts           # One-time GSAP + ScrollTrigger plugin registration
    useSectionAnimations.ts # Scoped GSAP context per section
  pages/
    index.vue
```

---

## Running locally

```bash
npm install
npm run dev  # http://localhost:3003
```

```bash
npm run build    # production build
npm run generate # static output
npm run preview  # preview production build
```
