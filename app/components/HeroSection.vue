<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

onMounted(() => {
  add(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero-title', { opacity: 0, y: 80, duration: 1.2 })
      .from('.hero-tagline', { opacity: 0, y: 40, duration: 1 }, '-=0.6')
      .from('.hero-cta', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.3')
  })
})
</script>

<template>
  <section ref="sectionRef" class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="gradient-text">Aurora</span>
      </h1>
      <p class="hero-tagline">
        The creative workspace where ideas<br />become extraordinary experiences.
      </p>
      <div class="hero-cta">
        <span class="cta-badge">Now in public beta</span>
      </div>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-label">Scroll to explore</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" stroke-width="1.5"/>
        <circle class="scroll-dot" cx="8" cy="7" r="2" fill="currentColor"/>
      </svg>
    </div>

    <div class="hero-glow" aria-hidden="true" />
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
  padding: var(--nav-height) var(--space-8) var(--space-16);
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 1;
}

.hero-title {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  margin-top: var(--space-6);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 36ch;
  margin-inline: auto;
}

.hero-cta {
  margin-top: var(--space-8);
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

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
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.scroll-dot {
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { cy: 7; }
  50% { cy: 15; opacity: 0.3; }
}

.hero-glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vw;
  max-width: 600px;
  max-height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  opacity: 0.08;
  filter: blur(80px);
  pointer-events: none;
}

@media (max-width: 640px) {
  .hero-tagline br { display: none; }
}
</style>
