<template>
  <div v-if="seoStore.checkError" class="flex flex-col items-center justify-center pb-12"
>
          <img class="w-96" src="/search.png" alt="Image for not found product">

          <h3 class="font-bold text-2xl mb-4">Mahsulotlar topilmadi</h3>

          <p class="">Bu marketda hali mahsulotlar bo'lmasligi mumkin ! </p>
        </div>

    <ItemProductSkeleton v-if="!seoStore.product && !seoStore.checkError" />
  <template v-else-if="seoStore.product && seoStore.product.marketResultmodel">
    <UzumItem 
      v-if="seoStore.product.marketResultmodel.url.includes('uzum.uz')"
    />
    <OlchaItem
      v-else-if="seoStore.product.marketResultmodel.url.includes('olcha.uz')"
    />

    <TexnomartItem
    v-else-if="seoStore.product.marketResultmodel.url.includes('texnomart.uz')"
    />

    <IdeaItem v-else-if="seoStore.product.marketResultmodel.url.includes('idea.uz')" />

    <ElmakonItem v-else-if="seoStore.product.marketResultmodel.url.includes('elmakon.uz')" />

    <AllGoodItem v-else-if="seoStore.product.marketResultmodel.url.includes('allgood.uz')" />

    <SimilarProducts v-if="seoStore.product.marketResultmodel.url.includes('uzum.uz')" :data="seoStore.oneCategoryProducts" />
  </template>

</template>

<script setup lang="ts">
import { onMounted } from '#imports'
import { useCategoryAllStore } from '#imports'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { useHead } from '#imports'

const route = useRoute()
const router = useRouter()
const store = useCategoryAllStore();
const seoStore = useProductSeoStore()

// SSR oldidan SEO-ni yuklab olish
await seoStore.getProductSeo(route.params.slugAndId as string)

watch(
  () => seoStore.product,
  (newVal) => {
    if (newVal && newVal.categoryResultModel?.id && newVal.categoryResultModel.id !== 1788) {
      seoStore.getOneCategoryProducts(newVal.categoryResultModel.id as number)
    }
  },
  { immediate: true }
)


// Head ni yuklash
useHead(() => {
  const url = `https://albaraka.uz/product/${route.params.slugAndId}`

  const keywordsArray = seoStore.title.toLowerCase().replace(/[^a-zA-Z0-9а-яёА-ЯЁўқғҳʼ\s]/g, " ").split(/\s+/)
  const keywords = keywordsArray.join(", ")
  const description = seoStore.description.length > 150 ? seoStore.description.slice(0, 150 - 3) + "..." : seoStore.description


  return {
    title: `${seoStore.title} | albaraka.uz`,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: seoStore.title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: seoStore.image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoStore.title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: seoStore.image },

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

onMounted(() => {
  if(!store.categoryData) {
    store.getAllCategory()
  }
})

// Router param o'zgarsa
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slugAndId !== from.params.slugAndId) {
    await seoStore.getProductSeo(to.params.slugAndId as string)

    useHead(() => {
      const url = `https://albaraka.uz/product/${to.params.slugAndId}`
      
      const keywordsArray = seoStore.title.toLowerCase().replace(/[^a-zA-Z0-9а-яёА-ЯЁўқғҳʼ\s]/g, " ").split(/\s+/)
      const keywords = keywordsArray.join(", ")
      const description = seoStore.description.length > 150 ? seoStore.description.slice(0, 150 - 3) + "..." : seoStore.description

      return {
        title: `${seoStore.title} | albaraka.uz`,
        meta: [
          { name: 'description', content: description },
          { name: 'keywords', content: keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
          { name: 'author', content: 'albaraka.uz' },
          { name: 'robots', content: 'index, follow' },

          // Open Graph
          { property: 'og:title', content: seoStore.title },
          { property: 'og:description', content: description },
          { property: 'og:image', content: seoStore.image },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'product' },
          { property: 'og:site_name', content: 'albaraka.uz' },

          // Twitter
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: seoStore.title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: seoStore.image },

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
  }
})
</script>


