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
      <SimilarProducts :data="seoStore.oneCategoryProducts" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useHead } from '#imports'
import { useProductSeoStore } from '@/stores/productSeo'

// Komponent importlari
import NotFoundSearch from '@/components/NotFoundSearch.vue'
import UzumItem from '@/components/UzumItem.vue'
import OlchaItem from '@/components/OlchaItem.vue'
import TexnomartItem from '@/components/TexnomartItem.vue'
import ProductSkeleton from '@/components/Item/ProductSkeleton.vue'
import SimilarProducts from '@/components/SimilarProducts.vue'

const route = useRoute()
const seoStore = useProductSeoStore()

// ❗ Productni yuklash
onMounted(() => {
  seoStore.getProductSeo(route.params.slugAndId as string)
})

// ❗ Product kelganda related productlarni olish
watch(
  () => seoStore.product,
  (newVal) => {
    if (newVal?.categoryResultModel?.id) {
      seoStore.getOneCategoryProducts(newVal.categoryResultModel.id, 'uz')
    }
  },
  { immediate: true }
)

// ❗ Router param o‘zgarganda productni yangilash
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slugAndId !== from.params.slugAndId) {
    await seoStore.getProductSeo(to.params.slugAndId as string)
  }
})

// ✅ Head uchun reactive computedlar
const canonicalUrl = computed(() => `https://albaraka.uz/product/${route.params.slugAndId}`)

const headTitle = computed(() => seoStore.product.title || 'Albaraka - Mahsulot sahifasi')
const headDescription = computed(() => seoStore.product.description || 'Mahsulot haqida batafsil maʼlumot')
const headKeywords = computed(() => seoStore.product.keywords || 'Mahsulot, online do‘kon, albaraka, texnika')
const headImage = computed(() => seoStore.product.image || 'data:image/png;base64,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')

// ✅ useHead (faqat bitta marta setup ichida chaqiriladi)
useHead({
  title: headTitle,
  meta: [
    { name: 'description', content: headDescription },
    { name: 'keywords', content: headKeywords },
    { name: 'author', content: 'Albaraka.uz' },
    { name: 'robots', content: 'index, follow' },

    // Open Graph
    { property: 'og:title', content: headTitle },
    { property: 'og:description', content: headDescription },
    { property: 'og:image', content: headImage },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'product' },
    { property: 'og:site_name', content: 'Albaraka.uz' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: headTitle },
    { name: 'twitter:description', content: headDescription },
    { name: 'twitter:image', content: headImage },

    // Viewport
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    // Charset
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})
</script>
