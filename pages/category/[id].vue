<template>
    <div class="container" v-if="store.oneCategoryProducts">
        <div class="grid grid-cols-5 gap-4 justify-between">
            <Card :data="store.oneCategoryProducts" />
        </div>
    </div>
</template>


<script setup>
import { watch, computed , onBeforeRouteUpdate } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '#imports';
import { useProductSeoStore, useCategoryStore } from '#imports';

const store = useProductSeoStore();
const categoryStore = useCategoryStore();
const route = useRoute();



useHead(() => {
   const url = `https://albaraka.uz/category/${route.params.id}`

  return {
    title: categoryStore.onecategoryData.name,
    meta: [
      { name: 'description', content: `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name} dagi` },
      { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'Albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: categoryStore.onecategoryData.name },
      { property: 'og:description', content: `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name}` },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'category' },
      { property: 'og:site_name', content: 'Albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: categoryStore.onecategoryData.name },
      { name: 'twitter:description', content:  `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name}` },

      // Viewport
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      // Charset
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await store.getOneCategoryProducts(id , 'uz')
    await categoryStore.getOneCategory(to.params.id)

    // route o'zgarganda headni yangilash
    useHead(() => {
   const url = `https://albaraka.uz/category/${route.params.id}`

  return {
    title: categoryStore.onecategoryData.name,
    meta: [
      { name: 'description', content: `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name} dagi` },
      { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'Albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: categoryStore.onecategoryData.name },
      { property: 'og:description', content: `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name}` },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'category' },
      { property: 'og:site_name', content: 'Albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: categoryStore.onecategoryData.name },
      { name: 'twitter:description', content:  `Eng yaxshi mahsulotlar ${categoryStore.onecategoryData.name}` },

      // Viewport
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      // Charset
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  }
})
  } // ✅ bu — if yopilishi
})

</script>

