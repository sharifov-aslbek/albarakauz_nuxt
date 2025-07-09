<template>
  <div>
    <NotFoundSearch v-if="!seoStore.product" />

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
      <ProductSkeleton v-else />

      <!-- <SimilarProducts :data="seoStore.oneCategoryProducts" /> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { useHead } from '#imports'

const route = useRoute()
const seoStore = useProductSeoStore()

// SSR oldidan SEO maʼlumotni chaqirish
await seoStore.getProductSeo(route.params.slugAndId as string)

// useHead bilan SEO set qilish
useHead({
  title: seoStore.product?.name || 'Mahsulot',
  meta: [
    { name: 'description', content: seoStore.description || '' },
    { property: 'og:title', content: seoStore.product?.name || '' },
    { property: 'og:description', content: seoStore.description || '' },
    { property: 'og:image', content: seoStore.image || '' }
  ],
  link: [
    { rel: 'canonical', href: `https://albaraka.uz/product/${route.params.slugAndId}` }
  ]
})
</script>
