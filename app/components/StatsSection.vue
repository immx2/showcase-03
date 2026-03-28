<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, ScrollTrigger, add } = useSectionAnimations(sectionRef)
const hasAppeared = ref(false)

const stats = [
  { value: 10000, suffix: '+', label: 'Creators worldwide',  format: (v: number) => `${(v / 1000).toFixed(0)}K` },
  { value: 52000, suffix: '+', label: 'Projects shipped',    format: (v: number) => `${(v / 1000).toFixed(0)}K` },
  { value: 99.9,  suffix: '%', label: 'Uptime guarantee',    format: (v: number) => v.toFixed(1) },
  { value: 2,     suffix: 'x', label: 'Faster workflows',    format: (v: number) => v.toFixed(0) },
]

const counters = stats.map(() => ref(0)) as Ref<number>[]

onMounted(() => {
  add(() => {
    gsap.from('.stats-heading', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    })

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        hasAppeared.value = true
        stats.forEach((stat, i) => {
          gsap.to(counters[i]!, {
            value: stat.value,
            duration: 1.8,
            ease: 'power2.out',
            delay: i * 0.12,
          })
        })
      },
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="stats-section">
    <h2 class="stats-heading">Trusted by creators<br >who demand the best.</h2>

    <div class="stats-grid">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="stat-item"
        :style="{ transitionDelay: `${i * 80}ms` }"
        :class="{ visible: hasAppeared }"
      >
        <span class="stat-value">
          {{ stat.format(counters[i]?.value ?? 0) }}<span class="stat-suffix">{{ stat.suffix }}</span>
        </span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: var(--section-gap) var(--space-8);
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.stats-heading {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: var(--space-16);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid transparent;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-out),
    transform 0.6s var(--ease-out),
    border-color var(--duration-base) var(--ease-out);
}

.stat-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-item:hover {
  border-color: var(--color-border-subtle);
  background: var(--color-surface);
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5.5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-end));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-suffix {
  font-size: 0.6em;
  vertical-align: super;
}

.stat-label {
  font-size: 13px;
  color: var(--color-text-muted);
  letter-spacing: -0.01em;
}

@media (width <= 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }

}

@media (width <= 480px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
