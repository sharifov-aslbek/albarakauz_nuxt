// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
// import AutoImport from 'unplugin-auto-import/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({ 
  ssr: true,
    app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  nitro: {
    preset: 'iis_node',
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BACKEND_URL: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api'
    }
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    "@bg-dev/nuxt-naiveui",
    '@nuxtjs/leaflet',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  image: {
  domains: ['api.albaraka.uz']
},
      colorMode: {
      preference: 'light',
      fallback: 'light',
      classSuffix: '',
      storageKey: 'color-mode' // bu default key, o‘zgartirish shart emas
    },
    i18n: {
    locales: [
      { code: 'uz', name: 'Oʻzbekcha', file: 'uz.js' },
      { code: 'ru', name: 'Русский', file: 'ru.js' }
    ],
    defaultLocale: 'uz',
    lazy: true,
    langDir: 'locales/'
  },
   plugins: [
    '~/plugins/i18n.js'
  ],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
})