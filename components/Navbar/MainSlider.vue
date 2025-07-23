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
    <div class="container">
        <UCarousel v-slot="{ item }" dots arrows autoplay prev-icon="i-lucide-chevron-left"
    next-icon="i-lucide-chevron-right" :items="items" class="w-full max-w-full mx-auto">
          <img :src="item" width="100%" class="rounded-lg">
        </UCarousel>
    </div>
</template>

