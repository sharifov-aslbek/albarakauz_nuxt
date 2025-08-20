<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NCarousel } from 'naive-ui'

const route = useRoute();
const router = useRouter();

definePageMeta({
  ssr: false
})

const marketplaces = [
  {
    id: 1,
    name: 'Uzum market',
    icon: '/uzum-icon.png',
    productCount: '290K',
    bgClass: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800',
    shadowClass: 'shadow-purple-500/30',
    hoverShadowClass: 'hover:shadow-purple-500/50',
    imgClass: 'drop-shadow-lg'
  },
  {
    id: 6,
    name: 'Idea.uz',
    icon: '/idea.png',
    productCount: '10K',
    bgClass: 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-800',
    shadowClass: 'shadow-pink-500/30',
    hoverShadowClass: 'hover:shadow-pink-500/50',
    imgClass: 'rounded-lg drop-shadow-lg',
  },
  {
    id: 2,
    name: 'Olcha.uz',
    icon: '/olcha-icon.png',
    productCount: '32K',
    bgClass: 'bg-gradient-to-br from-red-400 via-red-500 to-red-700',
    shadowClass: 'shadow-red-500/30',
    hoverShadowClass: 'hover:shadow-red-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 3,
    name: 'Texnomart',
    icon: '/texnomart-icon.png',
    productCount: 1450,
    bgClass: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500',
    shadowClass: 'shadow-yellow-500/30',
    hoverShadowClass: 'hover:shadow-yellow-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 4,
    name: 'Elmakon',
    icon: '/elmakon.png',
    productCount: 780,
    bgClass: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700',
    shadowClass: 'shadow-blue-500/30',
    hoverShadowClass: 'hover:shadow-blue-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 5,
    name: 'Mediapark',
    icon: '/mediapark.webp',
    productCount: 1960,
    bgClass: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700',
    shadowClass: 'shadow-blue-500/30',
    hoverShadowClass: 'hover:shadow-blue-500/50',
    imgClass: 'bg-white rounded-xl p-2 drop-shadow-lg'
  },
  {
    id: 7,
    name: 'AllGood',
    icon: '/allgood.png',
    productCount: 540,
    bgClass: 'bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-600',
    shadowClass: 'shadow-orange-500/30',
    hoverShadowClass: 'hover:shadow-orange-500/50',
    imgClass: 'drop-shadow-lg rounded-xl'
  }
]

const navigateMarket = (id) => {
  router.push(`market/${id}`)
}
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="text-center mb-8">
      <h2 class="text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
        Ulangan marketlar
      </h2>

      <div class="flex items-center justify-center w-[20%] mx-auto my-4 text-black px-3 md:px-4 py-2 rounded-full border border-yellow-200">
        <div class="w-2 h-2 bg-[#feee00] rounded-full mr-2 animate-pulse"></div>
        <span class="text-xs md:text-sm font-medium">Bizda 7 ta market mavjud</span>
      </div>

      <p class="text-gray-600 w-[50%] mx-auto text-lg">
        Mahsulotlaringizni Oʻzbekistonning eng yirik onlayn savdo platformalarida bir vaqtning oʻzida kuzatish, solishtirish va sotib olish
      </p>
    </div>

    <!-- Desktop carousel -->
    <NCarousel autoplay loop draggable show-arrow :interval="2000" :space-between="20" :slides-per-view="4"
      class="mb-8 hidden md:block">
      <div v-for="item in marketplaces" :key="item.id" class="p-3">
        <div @click="navigateMarket(item.id)" :class="[
          item.bgClass,
          item.shadowClass,
          item.hoverShadowClass,
          'marketplace-card'
        ]"
          class="cursor-pointer rounded-3xl p-8 flex flex-col items-center justify-center h-[220px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group">

          <NuxtImg :class="[
            'w-20 h-20 object-contain mb-4',
            item.imgClass
          ]" :src="item.icon" :alt="item.name" />

          <!-- Market nomi -->
          <h3 class="text-xl flex items-center text-white gap-2 font-bold tracking-wide drop-shadow-lg">
            {{ item.name }}
            <UIcon name="material-symbols:verified" />
          </h3>

          <!-- Mahsulot soni -->
          <p class="text-sm mt-1 text-gray-200">
            {{ item.productCount }} ta mahsulot
          </p>
        </div>
      </div>
    </NCarousel>

    <!-- Mobile carousel -->
    <NCarousel autoplay loop draggable show-arrow :interval="2000" :space-between="20"
      :slides-per-view="1" :slides-per-view-sm="2" :slides-per-view-md="3" :slides-per-view-lg="4"
      class="mb-8 block md:hidden">
      <div v-for="item in marketplaces" :key="item.id" class="p-3">
        <div @click="navigateMarket(item.id)" :class="[
          item.bgClass,
          item.shadowClass,
          item.hoverShadowClass,
          'marketplace-card'
        ]"
          class="cursor-pointer rounded-3xl p-8 flex flex-col items-center justify-center h-[220px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group">

          <NuxtImg :class="[
            'w-20 h-20 object-contain mb-4',
            item.imgClass
          ]" :src="item.icon" :alt="item.name" />

          <h3 class="text-xl flex items-center gap-2 font-bold tracking-wide drop-shadow-lg">
            {{ item.name }}
            <UIcon name="material-symbols:verified" />
          </h3>

          <!-- Mahsulot soni -->
          <p class="text-sm mt-1 text-gray-200">
            {{ item.productCount }} ta mahsulot
          </p>
        </div>
      </div>
    </NCarousel>
  </div>
</template>

<style scoped>
@keyframes pulseScale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.marketplace-card {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
