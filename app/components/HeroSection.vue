<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

onMounted(() => {
  add(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
      .from('.hero-title', { opacity: 0, y: 60, duration: 1.2 }, '-=0.4')
      .from('.hero-tagline', { opacity: 0, y: 30, duration: 1 }, '-=0.6')
      .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.3')
  })
})
</script>

<template>
  <section ref="sectionRef" class="hero">
    <div class="hero-content">
      <span class="hero-eyebrow">Now in public beta</span>

      <h1 class="hero-title">
        <em class="hero-wordmark">Aurora</em>
      </h1>

      <p class="hero-tagline">
        The creative workspace where ideas<br >become extraordinary experiences.
      </p>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-label">Scroll to explore</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" stroke-width="1.5"/>
        <circle class="scroll-dot" cx="8" cy="7" r="2" fill="currentColor"/>
      </svg>
    </div>

    <div class="hero-glows" aria-hidden="true">
      <div class="hero-glow" />
      <div class="hero-glow hero-glow-2" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-8);
}

.hero-glows {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-content {
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  background: var(--color-surface);
}

.hero-eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.8;
}

.hero-title {
  font-size: clamp(5.5rem, 18vw, 15rem);
  line-height: 0.88;
  margin: 0;

  /* Padding gives the background-clip gradient room for italic ink overhang */
  padding: 0.15em 0.2em;
  background: linear-gradient(
    135deg,
    var(--color-text) 0%,
    var(--color-accent) 50%,
    var(--color-accent-end) 100%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-wordmark {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.03em;
}

.hero-tagline {
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  color: var(--color-text-muted);
  line-height: 1.55;
  max-width: 38ch;
  letter-spacing: -0.01em;
}

/* ─── Scroll indicator ────────────────────────────── */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
}

.scroll-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.scroll-dot {
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { cy: 7; }
  50% { cy: 15; opacity: 0.3; }
}

/* ─── Glows ───────────────────────────────────────── */
.hero-glow {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vw;
  max-width: 700px;
  max-height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 65%);
  opacity: 0.07;
  filter: blur(80px);
}

.hero-glow-2 {
  top: 55%;
  background: radial-gradient(circle, var(--color-accent-end) 0%, transparent 65%);
  opacity: 0.05;
  width: 50vw;
  height: 50vw;
}

@media (width <= 640px) {
  .hero-tagline br { display: none; }
}
</style>
