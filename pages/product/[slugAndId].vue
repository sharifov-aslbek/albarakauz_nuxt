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
import { onMounted, watch, computed, watchEffect } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useHead } from '#imports'
import { useProductSeoStore } from '@/stores/productSeo'

// Component imports remain the same

const route = useRoute()
const seoStore = useProductSeoStore()

// Load product data
onMounted(() => {
  seoStore.getProductSeo(route.params.slugAndId as string)
})

// Watch for product changes to load related products
watch(
  () => seoStore.product,
  (newVal) => {
    if (newVal?.categoryResultModel?.id) {
      seoStore.getOneCategoryProducts(newVal.categoryResultModel.id, 'uz')
    }
  },
  { immediate: true }
)

// Update product when route changes
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slugAndId !== from.params.slugAndId) {
    await seoStore.getProductSeo(to.params.slugAndId as string)
  }
})

// Create a ref to track when SEO data is ready
const seoReady = ref(false)

// Watch for all SEO-related data to be available
watch(
  () => ({
    product: seoStore.product,
    description: seoStore.description,
    image: seoStore.image
  }),
  (newVal) => {
    if (newVal.product && newVal.description && newVal.image) {
      seoReady.value = true
    }
  },
  { deep: true, immediate: true }
)

// Computed properties for head
const canonicalUrl = computed(() => 
  `https://albaraka.uz/product/${route.params.slugAndId}`
)

const headTitle = computed(() =>
  seoReady.value ? seoStore.product?.name || 'Mahsulot' : 'Mahsulot'
)

const headDescription = computed(() =>
  seoReady.value ? seoStore.description || 'Mahsulot haqida batafsil maʼlumot' : 'Mahsulot haqida batafsil maʼlumot'
)

const headKeywords = computed(() =>
  seoReady.value ? `${seoStore.product?.name || 'Mahsulot'}, online do‘kon, albaraka, texnika` : 'Mahsulot, online do‘kon, albaraka, texnika'
)

const headImage = computed(() => 
  seoReady.value ? seoStore.image || defaultImage : defaultImage
)

const defaultImage = 'data:image/png;base64,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'

// Use a separate watchEffect for head updates
watchEffect(() => {
  if (seoReady.value) {
    useSeoMeta({
  title: seoStore.product?.name || 'Mahsulot',
  ogTitle: seoStore.product?.name || 'Mahsulot',
  description: seoStore.description || 'Mahsulot haqida batafsil maʼlumot',
  ogDescription: seoStore.description || 'Mahsulot haqida batafsil maʼlumot',
  ogImage: seoStore.image || defaultImage,
  twitterCard: 'summary_large_image',
})
  }
})
</script>