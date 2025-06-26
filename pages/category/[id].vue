<template>
    <div class="container" v-if="store.oneCategoryProducts">
        <div class="grid grid-cols-5 gap-4 justify-between">
            <Card :data="store.oneCategoryProducts" />
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useHead } from '#imports'
import { useProductSeoStore, useCategoryStore } from '#imports'

const store = useProductSeoStore()
const categoryStore = useCategoryStore()
const route = useRoute()

// ❗ Birinchi yuklanishda ma'lumotlarni olish
await store.getOneCategoryProducts(route.params.id, 'uz')
await categoryStore.getOneCategory(route.params.id)

// SEO HEAD
useHead(() => {
  const data = categoryStore.onecategoryData
  const url = `https://albaraka.uz/category/${route.params.id}`

  if (!data || !data.name) {
    return {
      title: 'Kategoriya yuklanmoqda...',
      meta: []
    }
  }

  return {
    title: data.name,
    meta: [
      { name: 'description', content: `Eng yaxshi mahsulotlar ${data.name} dagi` },
      { name: 'keywords', content: 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'Albaraka.uz' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: data.name },
      { property: 'og:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'category' },
      { property: 'og:site_name', content: 'Albaraka.uz' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.name },
      { name: 'twitter:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'utf-8' }
    ],
    link: [{ rel: 'canonical', href: url }]
  }
})

// ❗ Route o‘zgarganda
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await store.getOneCategoryProducts(to.params.id, 'uz')
    await categoryStore.getOneCategory(to.params.id)

    const url = `https://albaraka.uz/category/${to.params.id}`

    useHead(() => {
      const data = categoryStore.onecategoryData

      if (!data || !data.name) {
        return {
          title: 'Kategoriya yuklanmoqda...',
          meta: []
        }
      }

      return {
        title: data.name,
        meta: [
          { name: 'description', content: `Eng yaxshi mahsulotlar ${data.name} dagi` },
          { name: 'keywords', content: 'Mahsulot, online do‘kon, albaraka, texnika' },
          { name: 'author', content: 'Albaraka.uz' },
          { name: 'robots', content: 'index, follow' },
          { property: 'og:title', content: data.name },
          { property: 'og:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'category' },
          { property: 'og:site_name', content: 'Albaraka.uz' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: data.name },
          { name: 'twitter:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
          { charset: 'utf-8' }
        ],
        link: [{ rel: 'canonical', href: url }]
      }
    })
  }
})
</script>



