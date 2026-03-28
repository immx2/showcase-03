<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  badge: string
  reversed?: boolean
  gradientFrom?: string
  gradientTo?: string
}>(), {
  reversed: false,
  gradientFrom: 'var(--color-accent)',
  gradientTo: 'var(--color-accent-end)',
})

const sectionRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

onMounted(() => {
  add(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 72%',
      },
    })

    tl.from('.feature-badge', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })
      .from('.feature-title', { opacity: 0, y: 32, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .from('.feature-desc',  { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.feature-visual', { opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out' }, '-=0.7')
  })
})
</script>

<template>
  <section ref="sectionRef" class="feature" :class="{ reversed }">
    <div class="feature-text">
      <span class="feature-badge">{{ badge }}</span>
      <h2 class="feature-title">{{ title }}</h2>
      <p class="feature-desc">{{ description }}</p>
    </div>

    <div class="feature-visual">
      <div
        class="visual-card"
        :style="{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }"
      >
        <div class="visual-inner" aria-hidden="true">
          <div class="visual-ui">
            <div class="ui-bar ui-bar-header" />
            <div class="ui-row">
              <div class="ui-sidebar" />
              <div class="ui-canvas">
                <div v-for="n in 4" :key="n" class="ui-block" />
              </div>
            </div>
          </div>
        </div>
        <div class="card-shine" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Layout ──────────────────────────────────────── */
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  padding: 0 var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
}

.feature.reversed {
  direction: rtl;
}

.feature.reversed > * {
  direction: ltr;
}

/* ─── Text ────────────────────────────────────────── */
.feature-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.feature-badge {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.feature-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.feature-desc {
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  color: var(--color-text-muted);
  line-height: 1.75;
  max-width: 44ch;
}

/* ─── Visual card ─────────────────────────────────── */
.feature-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 20px 60px rgb(0 0 0 / 12%),
    0 4px 16px rgb(0 0 0 / 8%),
    inset 0 1px 0 rgb(255 255 255 / 15%);
}

/* Faux UI mockup inside each card */
.visual-inner {
  width: 72%;
  aspect-ratio: 4/3;
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(8px);
  border: 1px solid rgb(255 255 255 / 20%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ui-bar {
  height: 10px;
  border-radius: 0;
  flex-shrink: 0;
}

.ui-bar-header {
  background: rgb(255 255 255 / 15%);
  display: flex;
  align-items: center;
  padding: 0 6px;
  gap: 3px;
}

.ui-bar-header::before,
.ui-bar-header::after {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgb(255 255 255 / 40%);
}

.ui-row {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.ui-sidebar {
  width: 22%;
  background: rgb(255 255 255 / 8%);
  border-right: 1px solid rgb(255 255 255 / 10%);
}

.ui-canvas {
  flex: 1;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  align-content: start;
}

.ui-block {
  background: rgb(255 255 255 / 15%);
  border-radius: 2px;
  height: 12px;
}

.ui-block:nth-child(3) {
  grid-column: 1 / -1;
  height: 8px;
  opacity: 0.6;
}

/* Subtle shine sweep */
.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgb(255 255 255 / 8%) 50%,
    transparent 70%
  );
  pointer-events: none;
}

/* ─── Responsive ──────────────────────────────────── */
@media (width <= 900px) {
  .feature {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .feature.reversed {
    direction: ltr;
  }

  .visual-card {
    max-width: 420px;
  }
}
</style>
