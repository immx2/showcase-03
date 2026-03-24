export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  devServer: {
    port: 3003,
  },
  modules: ['@nuxt/fonts', '@nuxtjs/color-mode', '@vueuse/nuxt'],
  colorMode: {
    dataValue: 'color-mode',
    storageKey: 'showcase-color-mode',
    classSuffix: '',
  },
  app: {
    head: {
      script: [{
        key: 'color-pref-init',
        innerHTML: `(function(){try{var p=localStorage.getItem('showcase-color-mode')||'system';document.documentElement.setAttribute('data-color-pref',p)}catch(e){}})()`,
      }],
    },
  },
  css: ['~/assets/styles/main.css'],
  fonts: {
    families: [{ name: 'Inter', provider: 'google' }],
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger'],
    },
  },
})
