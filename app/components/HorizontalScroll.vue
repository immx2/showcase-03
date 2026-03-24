<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()
const { gsap, ScrollTrigger, add } = useSectionAnimations(sectionRef)

const cards = [
  { title: 'Infinite Canvas', desc: 'Zoom, pan, and organize without boundaries. Your workspace grows with your vision.' },
  { title: 'Smart Components', desc: 'Reusable, responsive building blocks that adapt to context and stay in sync.' },
  { title: 'Version History', desc: 'Every change is tracked. Branch, compare, and restore with a single click.' },
  { title: 'Design Tokens', desc: 'Centralized variables for color, type, and spacing. Update once, reflect everywhere.' },
]

onMounted(() => {
  add(() => {
    if (!trackRef.value || !sectionRef.value) return

    const totalScroll = trackRef.value.scrollWidth - trackRef.value.clientWidth

    gsap.to(trackRef.value, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="hscroll-section">
    <div class="hscroll-header">
      <span class="section-badge">Features</span>
      <h2 class="section-title">Everything you need,<br />nothing you don't.</h2>
    </div>

    <div class="hscroll-viewport">
      <div ref="trackRef" class="hscroll-track">
        <article v-for="(card, i) in cards" :key="i" class="hscroll-card">
          <span class="card-number">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-desc">{{ card.desc }}</p>
          <div
            class="card-visual"
            :style="{ background: `linear-gradient(135deg, var(--color-accent), var(--color-accent-end))`, opacity: 0.12 + i * 0.06 }"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hscroll-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: var(--space-16) 0;
}

.hscroll-header {
  padding: 0 var(--space-8);
  margin-bottom: var(--space-12);
}

.section-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hscroll-viewport {
  overflow: visible;
}

.hscroll-track {
  display: flex;
  gap: var(--space-6);
  padding: 0 var(--space-8);
  will-change: transform;
}

.hscroll-card {
  flex-shrink: 0;
  width: clamp(300px, 30vw, 400px);
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
  transition: border-color var(--duration-base);
}

.hscroll-card:hover {
  border-color: var(--color-border);
}

.card-number {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  font-variant-numeric: tabular-nums;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.card-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.card-visual {
  position: absolute;
  bottom: -20%;
  right: -20%;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

@media (max-width: 640px) {
  .section-title br { display: none; }
}
</style>
