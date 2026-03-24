<script setup lang="ts">
useHead({
  title: 'Aurora — Create Without Constraints',
  meta: [
    { name: 'description', content: 'Aurora is the creative workspace where ideas become extraordinary experiences.' },
  ],
})
</script>

<template>
  <div class="page">
    <AppNav />

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

        <HorizontalScroll />

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
</style>
