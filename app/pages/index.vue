<script setup lang="ts">
useHead({
  title: 'Aurora — Create Without Constraints',
  meta: [
    { name: 'description', content: 'Aurora is the creative workspace where ideas become extraordinary experiences.' },
  ],
})

const colorMode = useColorMode()

function setMode(pref: 'system' | 'light' | 'dark') {
  colorMode.preference = pref
  document.documentElement.setAttribute('data-color-pref', pref)
}
</script>

<template>
  <div class="page">
    <div id="color-mode-pill" class="mode-pill" role="group" aria-label="Color mode">
      <button title="Auto (device)" aria-label="Auto (device)" @click="setMode('system')">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 1.5 A5.5 5.5 0 0 1 7 12.5 Z" fill="currentColor"/>
        </svg>
      </button>
      <button title="Light" aria-label="Light" @click="setMode('light')">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.4"/>
          <line x1="7" y1="1" x2="7" y2="2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="7" y1="11.5" x2="7" y2="13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="1" y1="7" x2="2.5" y2="7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="11.5" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="2.93" y1="2.93" x2="4" y2="4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="10" y1="10" x2="11.07" y2="11.07" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="11.07" y1="2.93" x2="10" y2="4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="4" y1="10" x2="2.93" y2="11.07" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
      </button>
      <button title="Dark" aria-label="Dark" @click="setMode('dark')">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 2 a3.5 3.5 0 0 0 5 5 A5 5 0 1 1 7 2Z" fill="currentColor" stroke="none"/>
        </svg>
      </button>
    </div>

    <ClientOnly>
      <HeroSection />

      <div class="sections">
        <FeatureSection
          badge="Design"
          title="Design without limits"
          description="An infinite canvas that scales with your ambition. Drag, compose, and iterate with tools that feel like extensions of your mind. Pixel-perfect precision meets creative freedom."
          gradient-from="#6366f1"
          gradient-to="#818cf8"
        />

        <FeatureSection
          badge="Collaborate"
          title="Built for teams"
          description="Real-time multiplayer editing, threaded comments, and shared libraries. Work together seamlessly whether you're across the desk or across the world."
          gradient-from="#a855f7"
          gradient-to="#c084fc"
          reversed
        />

        <BentoSection />

        <StatsSection />

        <PinnedSection />

        <FeatureSection
          badge="Performance"
          title="Every millisecond matters"
          description="Hardware-accelerated rendering, lazy-loaded assets, and intelligent caching. Aurora stays fast at any scale — 10 artboards or 10,000."
          gradient-from="#06b6d4"
          gradient-to="#818cf8"
        />

        <CtaSection />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
}

.mode-pill {
  position: fixed;
  top: calc(var(--portfolio-nav-height, 28px) + var(--space-4));
  right: var(--space-8);
  z-index: 100;
  display: flex;
  align-items: center;
  height: 26px;
  border: 1px solid var(--color-border);
  border-radius: 99px;
  overflow: hidden;
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  backdrop-filter: blur(12px);
}

.mode-pill button {
  width: 28px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  padding: 0;
  flex-shrink: 0;
  transition: background var(--duration-fast), color var(--duration-fast);
}

.mode-pill button + button {
  border-left: 1px solid var(--color-border);
}

.mode-pill button:not(.active):hover {
  background: var(--color-surface-2);
  color: var(--color-text);
}
</style>
