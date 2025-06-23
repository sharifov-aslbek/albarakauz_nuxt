// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
      colorMode: {
      preference: 'light',
      fallback: 'light',
      classSuffix: '',
      storageKey: 'color-mode' // bu default key, o‘zgartirish shart emas
    },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})