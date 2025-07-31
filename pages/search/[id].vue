<template>
  <div class="container">
    <h2 class="text-xl sm:text-3xl font-medium my-8">
      Topilgan mahsulotlar soni: {{ store.searchProductsData.totalCount }}
    </h2>

    <!-- Loading Skeleton -->
    <div v-if="store.productLoader" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div v-for="i in 10" :key="i" class="flex flex-col bg-neutral-300 animate-pulse rounded-lg p-4 gap-4">
        <div class="bg-neutral-400/50 w-full h-32 rounded-md"></div>
        <div class="flex flex-col gap-2">
          <div class="bg-neutral-400/50 w-full h-4 rounded-md"></div>
          <div class="bg-neutral-400/50 w-4/5 h-4 rounded-md"></div>
        </div>
      </div>
    </div>

    <!-- Cardlar -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      <Card :data="store.searchProductsData.items" />
    </div>

    <LazySharedLoaderSmall />
    <!-- Trigger div -->
    <div ref="infiniteTrigger" class="h-10"></div>

    <not-found-search v-if="store.searchProductsData.totalCount === 0" />
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductSeoStore } from '#imports'
import { useInfiniteScroll } from '@vueuse/core'
import Card from '~/components/Card.vue'

const store = useProductSeoStore()
const route = useRoute()
const page = ref(1)

const infiniteTrigger = ref(null)

definePageMeta({
  ssr: false
})

// Har doim yana data bormi tekshiradi
const hasMore = computed(() => {
  return store.searchProductsData.items.length < store.searchProductsData.totalCount
})

// Birinchi yuklash
onMounted(() => {
  store.searchProducts(route.params.id)
})

// Route o‘zgarsa reset
watch(() => route.params.id, (newId) => {
  page.value = 1
  store.searchProducts(newId)
})

// Infinite scroll ishlatish
useInfiniteScroll(
  infiniteTrigger,
  async () => {
    if (store.productLoader || !hasMore.value) return
    page.value++
    await store.searchProducts(route.params.id, page.value, true)
  },
  {
    distance: 100,
  }
)
</script>

