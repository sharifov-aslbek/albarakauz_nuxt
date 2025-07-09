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

const headTitle = computed(() => seoStore.title || 'Albaraka - Mahsulot sahifasi')
const headDescription = computed(() => seoStore.description || 'Mahsulot haqida batafsil maʼlumot')
const headKeywords = computed(() => seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika')
const headImage = computed(() => seoStore.image || 'https://albaraka.uz/default-image.jpg')

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
