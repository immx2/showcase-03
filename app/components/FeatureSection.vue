<script setup lang="ts">
const props = withDefaults(defineProps<{
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
    gsap.from('.feature-visual', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power3.out',
    })

    gsap.from('.feature-badge', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.feature-title', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.1,
    })

    gsap.from('.feature-desc', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 65%',
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2,
    })
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
        <div class="visual-grid" aria-hidden="true">
          <div v-for="n in 9" :key="n" class="grid-cell" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
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

.feature-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-accent);
}

.feature-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.feature-desc {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 44ch;
}

.feature-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.visual-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 24px;
  width: 70%;
}

.grid-cell {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 0.2);
  backdrop-filter: blur(4px);
}

@media (max-width: 768px) {
  .feature {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .feature.reversed {
    direction: ltr;
  }

  .visual-card {
    max-width: 360px;
  }
}
</style>
