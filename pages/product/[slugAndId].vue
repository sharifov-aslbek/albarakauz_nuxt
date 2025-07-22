<template>
    <ProductSkeleton v-if="!seoStore.product" />
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
    

    <SimilarProducts v-if="seoStore.product.marketResultmodel.url.includes('uzum.uz')" :data="seoStore.oneCategoryProducts" />
  </template>

</template>

<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { useHead } from '#imports'

const route = useRoute()
const seoStore = useProductSeoStore()

// SSR oldidan SEO-ni yuklab olish
await seoStore.getProductSeo(route.params.slugAndId as string)

watch(
  () => seoStore.product,
  (newVal) => {
    if (newVal && newVal.categoryResultModel?.id) {
      seoStore.getOneCategoryProducts(newVal.categoryResultModel.id as number)
    }
  },
  { immediate: true }
)


// Head ni yuklash
useHead(() => {
  const url = `https://api.albaraka.uz/product/${route.params.slugAndId}`

  return {
    title: seoStore.title,
    meta: [
      { name: 'description', content: seoStore.description },
      { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: seoStore.title },
      { property: 'og:description', content: seoStore.description },
      { property: 'og:image', content: seoStore.image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoStore.title },
      { name: 'twitter:description', content: seoStore.description },
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

// Router param o'zgarsa
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slugAndId !== from.params.slugAndId) {
    await seoStore.getProductSeo(to.params.slugAndId as string)

    useHead(() => {
      const url = `https://api.albaraka.uz/product/${to.params.slugAndId}`
      return {
        title: seoStore.title,
        meta: [
          { name: 'description', content: seoStore.description },
          { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
          { name: 'author', content: 'albaraka.uz' },
          { name: 'robots', content: 'index, follow' },

          // Open Graph
          { property: 'og:title', content: seoStore.title },
          { property: 'og:description', content: seoStore.description },
          { property: 'og:image', content: seoStore.image },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'product' },
          { property: 'og:site_name', content: 'albaraka.uz' },

          // Twitter
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: seoStore.title },
          { name: 'twitter:description', content: seoStore.description },
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


