// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'magic-regexp/nuxt',
  ],
  routeRules: {
    '/**': { ssr: false },
    '/api/**': { ssr: true }
  }
})
