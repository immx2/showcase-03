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
  const strength = Math.max(0, 1 - dist / maxDist) * 14

  btnTransform.x = (dx / dist) * strength || 0
  btnTransform.y = (dy / dist) * strength || 0
}

function onBtnMouseLeave() {
  btnTransform.x = 0
  btnTransform.y = 0
}

onMounted(() => {
  add(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
    })

    tl.from('.cta-eyebrow', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' })
      .from('.cta-title',   { opacity: 0, y: 50, duration: 1.1, ease: 'power4.out' }, '-=0.4')
      .from('.cta-desc',    { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .from('.cta-btn-wrap',{ opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' }, '-=0.5')
  })
})
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <div class="cta-inner">
      <span class="cta-eyebrow">Get started today</span>

      <h2 class="cta-title">Start creating<br >today.</h2>

      <p class="cta-desc">
        Join thousands of creators who've already made the switch.<br >
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
    </div>

    <footer class="page-footer">
      <p>&copy; 2026 Immanuel</p>
    </footer>

    <div class="cta-glow" aria-hidden="true" />
    <div class="cta-glow cta-glow-2" aria-hidden="true" />
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  padding: var(--section-gap) var(--space-8) var(--space-16);
  text-align: center;
  overflow: hidden;
}

.cta-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.cta-eyebrow {
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

.cta-eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-end);
  opacity: 0.8;
}

.cta-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0;
}

.cta-desc {
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  color: var(--color-text-muted);
  line-height: 1.7;
}

.cta-btn-wrap {
  display: inline-block;
  padding: var(--space-6);
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
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    transform 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out);
  will-change: transform;
}

.cta-btn:hover {
  box-shadow:
    0 8px 32px rgb(99 102 241 / 40%),
    0 2px 8px rgb(99 102 241 / 20%);
}

/* ─── Footer ──────────────────────────────────────── */
.page-footer {
  position: relative;
  z-index: 1;
  margin-top: var(--space-24);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-subtle);
}

.page-footer p {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* ─── Glows ───────────────────────────────────────── */
.cta-glow {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 60vw;
  height: 60vw;
  max-width: 600px;
  max-height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-accent-end) 0%, transparent 70%);
  opacity: 0.06;
  filter: blur(80px);
  pointer-events: none;
}

.cta-glow-2 {
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  width: 40vw;
  height: 40vw;
  bottom: 20%;
  opacity: 0.05;
}

@media (width <= 640px) {
  .cta-title br,
  .cta-desc br { display: none; }
}
</style>
