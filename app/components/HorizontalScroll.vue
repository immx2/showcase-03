<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

const cards = [
  {
    num: '01',
    title: 'Infinite Canvas',
    desc: 'Zoom, pan, and organize without limits. Your workspace expands with your vision — never running out of room.',
    visual: 'canvas',
  },
  {
    num: '02',
    title: 'Smart Components',
    desc: 'Reusable, context-aware building blocks that stay in sync across your entire project.',
    visual: 'components',
  },
  {
    num: '03',
    title: 'Version History',
    desc: 'Every change tracked. Branch, compare, and restore with a single click.',
    visual: 'history',
  },
  {
    num: '04',
    title: 'Design Tokens',
    desc: 'Centralized variables for color, type, and spacing. Update once, reflect everywhere — across all platforms and codebases.',
    visual: 'tokens',
  },
]

onMounted(() => {
  add(() => {
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 72%',
      },
      opacity: 0,
      y: 52,
      duration: 1,
      ease: 'power4.out',
      stagger: { amount: 0.35, from: 'start' },
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="bento-section">
    <div class="bento-header">
      <span class="section-badge">Features</span>
      <h2 class="bento-title">Everything you need,<br />nothing you don't.</h2>
    </div>

    <div class="bento-grid">
      <!-- Card 1: Infinite Canvas — wide (2/3) -->
      <article class="bento-card card--canvas">
        <div class="card-meta">
          <span class="card-num">{{ cards[0].num }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ cards[0].title }}</h3>
          <p class="card-desc">{{ cards[0].desc }}</p>
        </div>
        <div class="card-visual" aria-hidden="true">
          <div class="canvas-dots" />
          <div class="canvas-crosshair">
            <span /><span />
          </div>
          <div class="canvas-glow" />
        </div>
      </article>

      <!-- Card 2: Smart Components — narrow (1/3) -->
      <article class="bento-card card--components">
        <div class="card-meta">
          <span class="card-num">{{ cards[1].num }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ cards[1].title }}</h3>
          <p class="card-desc">{{ cards[1].desc }}</p>
        </div>
        <div class="card-visual" aria-hidden="true">
          <div class="comp-layers">
            <div class="comp-layer comp-l3" />
            <div class="comp-layer comp-l2" />
            <div class="comp-layer comp-l1" />
          </div>
        </div>
      </article>

      <!-- Card 3: Version History — narrow (1/3) -->
      <article class="bento-card card--history">
        <div class="card-meta">
          <span class="card-num">{{ cards[2].num }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ cards[2].title }}</h3>
          <p class="card-desc">{{ cards[2].desc }}</p>
        </div>
        <div class="card-visual" aria-hidden="true">
          <div class="history-track">
            <div v-for="n in 5" :key="n" class="history-node" :class="{ active: n <= 3 }" />
          </div>
        </div>
      </article>

      <!-- Card 4: Design Tokens — wide (2/3) -->
      <article class="bento-card card--tokens">
        <div class="card-meta">
          <span class="card-num">{{ cards[3].num }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ cards[3].title }}</h3>
          <p class="card-desc">{{ cards[3].desc }}</p>
        </div>
        <div class="card-visual" aria-hidden="true">
          <div class="token-palette">
            <div v-for="n in 7" :key="n" class="token-chip" :style="{ '--pos': n }" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* ─── Section ─────────────────────────────────────── */
.bento-section {
  padding: 0 var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
}

.bento-header {
  margin-bottom: var(--space-12);
}

.section-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.bento-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* ─── Grid ────────────────────────────────────────── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.card--canvas     { grid-column: 1 / 3; }
.card--components { grid-column: 3 / 4; }
.card--history    { grid-column: 1 / 2; }
.card--tokens     { grid-column: 2 / 4; }

/* ─── Card base ───────────────────────────────────── */
.bento-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: relative;
  overflow: hidden;
  min-height: 240px;
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

.bento-card:hover {
  border-color: var(--color-border);
  box-shadow: 0 8px 48px rgb(0 0 0 / 0.07);
  transform: translateY(-2px);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-num {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.card-desc {
  font-size: 13.5px;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 38ch;
}

.card-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* ─── Canvas visual ───────────────────────────────── */
.canvas-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.6;
}

.canvas-crosshair {
  position: absolute;
  bottom: 30%;
  right: 12%;
  width: 24px;
  height: 24px;
}

.canvas-crosshair span {
  position: absolute;
  background: var(--color-accent);
  opacity: 0.4;
  border-radius: 1px;
}

.canvas-crosshair span:first-child {
  width: 1px;
  height: 100%;
  left: 50%;
  top: 0;
}

.canvas-crosshair span:last-child {
  width: 100%;
  height: 1px;
  top: 50%;
  left: 0;
}

.canvas-glow {
  position: absolute;
  bottom: -20%;
  right: -5%;
  width: 50%;
  height: 70%;
  background: radial-gradient(ellipse, var(--color-accent) 0%, transparent 70%);
  opacity: 0.07;
  filter: blur(20px);
}

/* ─── Components visual ───────────────────────────── */
.comp-layers {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--space-6);
}

.comp-layer {
  position: absolute;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
}

.comp-l3 {
  width: 72%;
  height: 52%;
  bottom: var(--space-4);
  opacity: 0.35;
}

.comp-l2 {
  width: 58%;
  height: 40%;
  bottom: calc(var(--space-4) + 14px);
  opacity: 0.6;
  background: var(--color-surface);
}

.comp-l1 {
  width: 44%;
  height: 30%;
  bottom: calc(var(--space-4) + 26px);
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-end));
  opacity: 0.18;
  border-color: transparent;
}

/* ─── History visual ──────────────────────────────── */
.history-track {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-8);
  right: var(--space-8);
  display: flex;
  align-items: center;
  gap: 0;
}

.history-node {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  flex-shrink: 0;
  position: relative;
  transition: border-color var(--duration-base);
}

.history-node.active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  opacity: 0.7;
}

.history-node + .history-node::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  height: 1px;
  width: calc((100vw / 3 - 2 * var(--space-8) - 10px) / 4);
  background: var(--color-border);
  transform: translateY(-50%);
}

/* ─── Tokens visual ───────────────────────────────── */
.token-palette {
  position: absolute;
  bottom: var(--space-8);
  right: var(--space-8);
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.token-chip {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    hsl(calc(230 + var(--pos) * 22), 75%, 62%),
    hsl(calc(260 + var(--pos) * 18), 80%, 68%)
  );
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.12);
  transition: transform var(--duration-base) var(--ease-out);
}

.bento-card:hover .token-chip {
  transform: translateY(-3px);
  transition-delay: calc(var(--pos) * 30ms);
}

/* ─── Responsive ──────────────────────────────────── */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .card--canvas,
  .card--components,
  .card--history,
  .card--tokens {
    grid-column: 1 / -1;
  }

}
</style>
