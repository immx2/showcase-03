<script setup lang="ts">
import { PortfolioNav } from '@immx2/portfolio-nav'
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <PortfolioNav current="showcase-03" />
    <NuxtPage />
  </div>
</template>
