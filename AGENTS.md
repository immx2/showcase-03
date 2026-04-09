# showcase-03 — Project Instructions

> Update this file in the same commit as the code change it describes.

## Intent
A scroll-driven storytelling page for a fictional product ("Aurora") built as a standalone Nuxt 4 app. The design system is purpose-built for this project — CSS gradients and shapes do the visual work; no heavy image assets.

Dev server runs on port 3003 (`npm run dev`).

## Linting & Typecheck
- Fix all errors before committing.
- **CSS/style-only changes** (only `.css` files or only `<style>` blocks in `.vue` files): run `npm run lint:css` (Stylelint only).
- **Code-only changes** (any `.ts` files, or `<script>` blocks in `.vue` files): run `npm run lint && npm run typecheck` (ESLint + typecheck, skip CSS).
- **Mixed changes** (both code and CSS): run `npm run lint:all && npm run typecheck`.
- `npm run lint` — ESLint only (JS/TS/Vue `<script>`)
- `npm run lint:css` — Stylelint only (CSS/Vue `<style>`)
- `npm run lint:all` — ESLint + Stylelint

## Conventions

### State
Minimal global state — each section component is self-contained with its own GSAP animation context. No central composable needed; sections manage their own lifecycle.
Shared utility composables should prefer Nuxt auto-imports, including VueUse utilities provided through `@vueuse/nuxt`.

### CSS
- Token-first: always reach for `--space-*`, `--radius-*`, `--duration-*` before hardcoding values
- Colors live in `_global.css` — 3-tier color mode (auto/light/dark) via `data-color-mode` on `<html>`
- Color mode handled by `@nuxtjs/color-mode` (configured in `nuxt.config.ts` with `dataValue: 'color-mode'`)
- All component styles in `<style scoped>`, no Tailwind, no CSS-in-JS
- Accent gradient via `--color-accent` → `--color-accent-end`

### GSAP / ScrollTrigger
- `useGsap()` composable handles one-time plugin registration
- `useSectionAnimations(ref)` provides a scoped GSAP context + helper for each section
- Each section creates animations inside `onMounted` → `add(() => { ... })`
- Context is automatically reverted on unmount (no memory leaks)
- All animated components are wrapped in `ClientOnly` (GSAP requires DOM)
- `prefers-reduced-motion: reduce` is respected — animations are skipped and CSS fallback applies

## Patterns

### Adding a section
1. Create a new component in `app/components/`
2. Use `useSectionAnimations(sectionRef)` for scoped GSAP lifecycle
3. Create animations inside `add(() => { ... })` callback
4. Add the component inside the `sections` div in `index.vue`

### Pinned section
Multiple ScrollTrigger instances track scroll progress through a tall section. Each triggers a state change (`activeIndex`) that swaps visible content via Vue's `TransitionGroup`.

## Boundaries
- This app is standalone — no shared code or styles from other repos
- No Tailwind
- Avoid heavy images — use CSS gradients and shapes for visual blocks (keeps load fast and shows CSS skill)
