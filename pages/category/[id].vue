<template>
    <div class="container" v-if="store.oneCategoryProducts">
      <h3 class="text-2xl font-bold mt-5">{{ categoryStore.onecategoryData.name }}</h3>
      <p class="text-lg font-bold mt-4 mb-10">{{ store.oneCategoryProducts.length }} ta mahsulot topildi.</p>
      <CategoryPath />
      <CategoryTagSlide />
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <Card :data="store.oneCategoryProducts" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useHead } from '#imports'
import { useProductSeoStore, useCategoryStore } from '#imports'

// Storelar
const store = useProductSeoStore()
const categoryStore = useCategoryStore()
const route = useRoute()

// ✅ Param id ni number ga konvertatsiya qilish (TypeScript xatosini oldini oladi)
const idParam = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const categoryId = Number(idParam)

// ❗ SSR bosqichida ma'lumotlarni olish
await store.getOneCategoryProducts(categoryId, 'uz')
await categoryStore.getOneCategory(categoryId)

// ✅ Default rasm manzili
const defaultImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZmgn7KZfbDj1g4BFUtYI4a015CYrIu-HRA&s'

// ✅ SEO HEAD
useHead(() => {
  const data = categoryStore.onecategoryData
  const url = `https://api.albaraka.uz/category/${categoryId}`

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
      { name: 'author', content: 'albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: data.name },
      { property: 'og:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'category' },
      { property: 'og:site_name', content: 'albaraka.uz' },
      { property: 'og:image', content: defaultImage },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.name },
      { name: 'twitter:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
      { name: 'twitter:image', content: defaultImage },

      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'utf-8' }
    ],
    link: [{ rel: 'canonical', href: url }]
  }
})

// ✅ Route o‘zgarganda ma’lumotni qayta olish va HEAD yangilash
onBeforeRouteUpdate(async (to) => {
  const id = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id
  const newCategoryId = Number(id)

  await store.getOneCategoryProducts(newCategoryId, 'uz')
  await categoryStore.getOneCategory(newCategoryId)

  const url = `https://api.albaraka.uz/category/${newCategoryId}`
  const data = categoryStore.onecategoryData

  useHead(() => {
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
        { name: 'author', content: 'albaraka.uz' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:title', content: data.name },
        { property: 'og:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'category' },
        { property: 'og:site_name', content: 'albaraka.uz' },
        { property: 'og:image', content: defaultImage },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: data.name },
        { name: 'twitter:description', content: `Eng yaxshi mahsulotlar ${data.name}` },
        { name: 'twitter:image', content: defaultImage },

        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { charset: 'utf-8' }
      ],
      link: [{ rel: 'canonical', href: url }]
    }
  })
})
</script>




