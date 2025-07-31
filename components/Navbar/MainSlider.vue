<script setup lang="ts">
import { ref, onMounted } from 'vue'

const items = [
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png'
]

const showSkeleton = ref(true)

// Rasm yuklanishini kuzatish
function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      src =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
          img.onerror = () => resolve() // xatolik bo‘lsa ham davom etadi
        })
    )
  )
}

onMounted(async () => {
  await preloadImages(items)
  showSkeleton.value = false
})
</script>



<template>
  <div class="container relative">
    <UCarousel
      v-slot="{ item }"
      arrows
      autoplay
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="items"
      class="w-full max-w-full mx-auto custom-carousel"
    >
      <img :src="item" width="100%" class="rounded-lg" />
    </UCarousel>

    <!-- Skeleton rasmlar yuklanmaguncha ko‘rinadi -->
    <n-skeleton
      v-if="showSkeleton"
      class="rounded-lg absolute top-0 left-0 w-full h-[200px] z-10"
    />
  </div>
</template>




