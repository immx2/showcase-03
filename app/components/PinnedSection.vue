<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const { gsap, ScrollTrigger, add } = useSectionAnimations(sectionRef)
const activeIndex = ref(0)

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
    steps.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: sectionRef.value,
        start: () => `top+=${i * (window.innerHeight * 0.6)} top`,
        end: () => `top+=${(i + 1) * (window.innerHeight * 0.6)} top`,
        onEnter: () => { activeIndex.value = i },
        onEnterBack: () => { activeIndex.value = i },
      })
    })

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top top',
      end: () => `+=${steps.length * window.innerHeight * 0.6}`,
      pin: '.pinned-content',
      scrub: false,
    })
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="pinned-section"
    :style="{ minHeight: `${(steps.length + 1) * 60}vh` }"
  >
    <div class="pinned-content">
      <div class="pinned-layout">
        <div class="step-indicators">
          <button
            v-for="(step, i) in steps"
            :key="i"
            class="step-indicator"
            :class="{ active: activeIndex === i }"
            @click="activeIndex = i"
          >
            <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="step-name">{{ step.title }}</span>
          </button>
        </div>

        <div class="step-content">
          <TransitionGroup name="fade-up">
            <div v-for="(step, i) in steps" v-show="activeIndex === i" :key="i" class="step-panel">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </div>
          </TransitionGroup>
        </div>

        <div class="step-visual">
          <div
            class="visual-block"
            :style="{
              background: `linear-gradient(${135 + activeIndex * 45}deg, var(--color-accent), var(--color-accent-end))`,
              borderRadius: `${16 + activeIndex * 8}px`,
            }"
          >
            <div class="visual-inner" :class="`step-${activeIndex}`">
              <div v-for="n in 4" :key="n" class="visual-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pinned-section {
  position: relative;
}

.pinned-content {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-8);
}

.pinned-layout {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: var(--space-10);
  align-items: center;
  max-width: 1100px;
  width: 100%;
}

.step-indicators {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 13px;
  transition: all var(--duration-base) var(--ease-out);
  cursor: pointer;
}

.step-indicator.active {
  background: var(--color-surface);
  color: var(--color-text);
}

.step-indicator:hover:not(.active) {
  color: var(--color-text);
}

.step-num {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-size: 11px;
  opacity: 0.5;
}

.step-name {
  font-weight: 500;
}

.step-content {
  position: relative;
  min-height: 120px;
}

.step-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.step-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.step-desc {
  font-size: 15px;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 40ch;
}

.step-visual {
  display: flex;
  justify-content: center;
}

.visual-block {
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-radius 0.6s var(--ease-out), background 0.6s var(--ease-out);
}

.visual-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  transition: transform 0.6s var(--ease-out);
}

.visual-inner.step-0 { transform: rotate(0deg); }
.visual-inner.step-1 { transform: rotate(3deg) scale(1.05); }
.visual-inner.step-2 { transform: rotate(-2deg) scale(0.95); }

.visual-line {
  height: 10px;
  border-radius: 5px;
  background: rgb(255 255 255 / 0.25);
}

.visual-line:nth-child(1) { width: 100%; }
.visual-line:nth-child(2) { width: 75%; }
.visual-line:nth-child(3) { width: 88%; }
.visual-line:nth-child(4) { width: 55%; }

/* Transition classes */
.fade-up-enter-active { transition: all 0.5s var(--ease-out); }
.fade-up-leave-active { transition: all 0.3s ease-in; position: absolute; }
.fade-up-enter-from { opacity: 0; transform: translateY(20px); }
.fade-up-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 900px) {
  .pinned-layout {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .step-indicators {
    flex-direction: row;
    overflow-x: auto;
  }

  .step-visual {
    display: none;
  }
}
</style>
