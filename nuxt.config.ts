// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
// import AutoImport from 'unplugin-auto-import/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({ 
  ssr: true,
  modules: ['@nuxt/ui', '@pinia/nuxt' , "@bg-dev/nuxt-naiveui"],
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
      tailwindcss()
    ],
  },
})