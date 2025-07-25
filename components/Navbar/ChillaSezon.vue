<template>
  <section class="bg-gradient-to-r from-[#FFE26E]/70 to-[#FFE26E]/90">
    <div class="container">
      <h3 class="text-[40px] py-[15px]">CHILLA SEZON</h3>

      <UCarousel
        :items="[images]"
        arrows
        class="w-full max-w-full mx-auto pb-[20px]"
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
      >
        <template #default="{ item }">
          <div class="flex gap-4 justify-between">
            <div
              v-for="img in item"
              :key="img"
              class="h-[225px] w-[190px] bg-gradient-to-b from-[#FF9C9C] to-[#FFE26E] p-2 rounded-md"
            >
              <img :src="img" alt="Error" class="w-full h-full object-cover rounded-md" />
            </div>
          </div>
        </template>
      </UCarousel>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  '/chilla-img1.png',
  '/chilla-img2.png',
  '/chilla-img3.png',
  '/chilla-img4.png',
  '/chilla-img5.png'
])
</script>
