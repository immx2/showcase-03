<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const btnRef = ref<HTMLElement>()
const { gsap, add } = useSectionAnimations(sectionRef)

const btnTransform = reactive({ x: 0, y: 0 })

function onBtnMouseMove(e: MouseEvent) {
  if (!btnRef.value) return
  const rect = btnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const maxDist = 120
  const strength = Math.max(0, 1 - dist / maxDist) * 12

  btnTransform.x = (dx / dist) * strength || 0
  btnTransform.y = (dy / dist) * strength || 0
}

function onBtnMouseLeave() {
  btnTransform.x = 0
  btnTransform.y = 0
}

onMounted(() => {
  add(() => {
    gsap.from('.cta-title', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
    })

    gsap.from('.cta-desc', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15,
    })

    gsap.from('.cta-btn-wrap', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 65%',
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <h2 class="cta-title">Start creating<br />today.</h2>
    <p class="cta-desc">
      Join thousands of creators who've already made the switch.<br />
      Free to start. No credit card required.
    </p>

    <div
      class="cta-btn-wrap"
      @mousemove="onBtnMouseMove"
      @mouseleave="onBtnMouseLeave"
    >
      <button
        ref="btnRef"
        class="cta-btn"
        :style="{
          transform: `translate(${btnTransform.x}px, ${btnTransform.y}px)`,
        }"
      >
        Get Started
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <footer class="page-footer">
      <p>&copy; 2026 Aurora — A showcase-03 demo project</p>
    </footer>

    <div class="cta-glow" aria-hidden="true" />
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  padding: var(--section-gap) var(--space-8) var(--space-16);
  text-align: center;
  overflow: hidden;
}

.cta-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: var(--space-6);
}

.cta-desc {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

.cta-btn-wrap {
  display: inline-block;
  padding: var(--space-8);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  border: none;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-end));
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
  will-change: transform;
}

.cta-btn:hover {
  box-shadow: 0 8px 30px rgb(99 102 241 / 0.35);
}

.page-footer {
  margin-top: var(--space-24);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-subtle);
}

.page-footer p {
  font-size: 12px;
  color: var(--color-text-muted);
}

.cta-glow {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 50vw;
  height: 50vw;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-accent-end) 0%, transparent 70%);
  opacity: 0.06;
  filter: blur(80px);
  pointer-events: none;
}

@media (max-width: 640px) {
  .cta-title br,
  .cta-desc br { display: none; }
}
</style>
