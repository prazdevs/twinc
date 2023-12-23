// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    build: {
      minify: false,
    },
  },
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'magic-regexp/nuxt',
  ],
})
