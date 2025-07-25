<script setup lang="ts">
const items = [
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png',
  '/slider-img.png'
]
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
  </div>
</template>

<!-- <style scoped>
/* Arrow buttonlarga style */
::v-deep(.custom-carousel .n-carousel__arrow) {
  @apply bg-white/30 backdrop-blur-sm p-2 rounded-full text-black transition duration-300 transform;
}

/* Hover animatsiya */
::v-deep(.custom-carousel .n-carousel__arrow:hover) {
  @apply scale-110 bg-white/50;
}
</style> -->


