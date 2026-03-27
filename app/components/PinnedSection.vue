<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

const steps = [
  {
    title: 'Design',
    description: 'Start with an infinite canvas. Drag, draw, and compose layouts with pixel-perfect precision. Every tool is exactly where you expect it.',
  },
  {
    title: 'Prototype',
    description: 'Turn static designs into interactive experiences. Link screens, add transitions, and preview on any device — all without writing code.',
  },
  {
    title: 'Ship',
    description: 'Export production-ready code, design tokens, and assets. Hand off to engineering with full specs, or publish directly to the web.',
  },
]

onMounted(() => {
  add(() => {
    gsap.from('.process-eyebrow', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 78%',
      },
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.process-heading', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 74%',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.08,
    })

    const stepEls = sectionRef.value?.querySelectorAll('.process-step')
    stepEls?.forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
        },
      })

      tl.from(el.querySelector('.step-rule'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
      })
        .from(el.querySelector('.step-num'), {
          opacity: 0,
          x: -16,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.5')
        .from(el.querySelector('.step-name'), {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.55')
        .from(el.querySelector('.step-desc'), {
          opacity: 0,
          y: 16,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.6')
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="process-section">
    <div class="process-header">
      <span class="process-eyebrow section-badge">Process</span>
      <h2 class="process-heading">From idea<br >to production.</h2>
    </div>

    <div class="process-steps">
      <div v-for="(step, i) in steps" :key="i" class="process-step">
        <div class="step-rule" aria-hidden="true" />
        <div class="step-inner">
          <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="step-name">{{ step.title }}</h3>
          <p class="step-desc">{{ step.description }}</p>
        </div>
      </div>
      <div class="step-rule-final" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
/* ─── Section ─────────────────────────────────────── */
.process-section {
  padding: 0 var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
}

.process-header {
  margin-bottom: var(--space-16);
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

.process-heading {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* ─── Steps ───────────────────────────────────────── */
.process-steps {
  display: flex;
  flex-direction: column;
}

.process-step {
  position: relative;
}

.step-rule,
.step-rule-final {
  height: 1px;
  background: var(--color-border-subtle);
}

.step-inner {
  display: grid;
  grid-template-columns: 56px 1fr 1.2fr;
  gap: var(--space-10);
  align-items: start;
  padding: var(--space-12) 0;
}

.step-num {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
  padding-top: 10px;
}

.step-name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.4rem, 4vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1;
}

.step-desc {
  font-size: clamp(0.9rem, 1.15vw, 1rem);
  color: var(--color-text-muted);
  line-height: 1.75;
  max-width: 44ch;
  padding-top: var(--space-3);
}

/* ─── Responsive ──────────────────────────────────── */
@media (max-width: 768px) {
  .step-inner {
    grid-template-columns: 36px 1fr;
    gap: var(--space-5);
    padding: var(--space-8) 0;
  }

  .step-name {
    grid-column: 2 / 3;
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }

  .step-desc {
    grid-column: 1 / -1;
    padding-top: 0;
    max-width: none;
  }

}
</style>
