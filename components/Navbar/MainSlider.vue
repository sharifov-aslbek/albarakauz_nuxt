<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryAllStore } from '#imports'

const items = [
  '/wildberries-slider.webp',
  '/slider-img.png',
  '/wildberries-slider.webp',
  '/slider-img.png',
  '/wildberries-slider.webp',
  '/slider-img.png'
]

const mobileItem = [
  'mobile-slider-img.png',
  'slider-img-mobile2.png',
  'mobile-slider-img.png',
  'slider-img-mobile2.png',
  'mobile-slider-img.png',
  'slider-img-mobile2.png',
]

const showCarousel = ref(false) // carouselni ko‘rsatish flagi
const categoryStore = useCategoryAllStore()

onMounted(() => {
  setTimeout(() => {
    showCarousel.value = true
  }, 1000) // 1 sekunddan keyin ko‘rinadi
})
</script>

<template>
  <div class="container relative">
    <UCarousel
      v-if="showCarousel"
      v-slot="{ item }"
      autoplay
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="items"
      class="w-full max-w-full mx-auto custom-carousel sm:block hidden"
    >
      <img :src="item" width="100%" class="rounded-lg" />
    </UCarousel>

    <UCarousel
      v-if="showCarousel"
      v-slot="{ item }"
      autoplay
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="mobileItem"
      class="w-full max-w-full mx-auto custom-carousel sm:hidden block"
    >
      <img :src="item" width="100%" class="rounded-lg" />
    </UCarousel>

    <USkeleton
      v-else
      class="bg-[#D9D9D9] w-full h-[190px]"
    />
  </div>
</template>
