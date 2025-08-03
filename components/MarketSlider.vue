<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    bgClass: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800',
    shadowClass: 'shadow-purple-500/30',
    hoverShadowClass: 'hover:shadow-purple-500/50',
    imgClass: 'drop-shadow-lg'
  },
  {
    id: 6,
    name: 'Idea.uz',
    icon: '/idea.png',
    bgClass: 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-800',
    shadowClass: 'shadow-pink-500/30',
    hoverShadowClass: 'hover:shadow-pink-500/50',
    imgClass: 'rounded-lg drop-shadow-lg',
  },
  {
    id: 2,
    name: 'Olcha.uz',
    icon: '/olcha-icon.png',
    bgClass: 'bg-gradient-to-br from-red-400 via-red-500 to-red-700',
    shadowClass: 'shadow-red-500/30',
    hoverShadowClass: 'hover:shadow-red-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 3,
    name: 'Texnomart',
    icon: '/texnomart-icon.png',
    bgClass: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500',
    shadowClass: 'shadow-yellow-500/30',
    hoverShadowClass: 'hover:shadow-yellow-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 4,
    name: 'Elmakon',
    icon: '/elmakon.png',
    bgClass: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700',
    shadowClass: 'shadow-blue-500/30',
    hoverShadowClass: 'hover:shadow-blue-500/50',
    imgClass: 'rounded-lg drop-shadow-lg'
  },
  {
    id: 5,
    name: 'Mediapark',
    icon: '/mediapark.webp',
    bgClass: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700',
    shadowClass: 'shadow-blue-500/30',
    hoverShadowClass: 'hover:shadow-blue-500/50',
    imgClass: 'bg-white rounded-xl p-2 drop-shadow-lg'
  },
  {
    id: 7,
    name: 'AllGood',
    icon: '/allgood.png',
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
      <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
        Bizda mavjud marketlar
      </h2>
      <p class="text-gray-600 text-lg">Kuzating solishtiring va sotib oling</p>
    </div>
    
    <UCarousel
      auto-scroll
      arrows
      loop
      v-slot="{ item }"
      :items="marketplaces"
      :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4' }"
      class="mb-8"
    >
      <div class="p-3">
        <div 
          @click="navigateMarket(item.id)"
          :class="[
            item.bgClass,
            item.shadowClass,
            item.hoverShadowClass,
            'marketplace-card'
          ]"
          class="cursor-pointer rounded-3xl p-8 flex items-center justify-center h-[180px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group"
        >
          <!-- Animated background overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Floating particles effect -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div class="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
          
          <div class="text-white text-center flex flex-col justify-center items-center relative z-10">
            <div class="relative mb-4">
              <div class="absolute inset-0 bg-white/20 rounded-2xl blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <NuxtImg
                :class="[
                  'w-20 h-20 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110',
                  item.imgClass,
                  'motion-safe:animate-[pulseScale_4s_ease-in-out_infinite]'
                ]"
                :src="item.icon"
                :alt="item.name"
              />
            </div>
            <h3 class="text-xl font-bold tracking-wide drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
              {{ item.name }}
            </h3>
            
            <!-- Subtle shine effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          </div>
        </div>
      </div>
    </UCarousel>
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
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Custom scrollbar for carousel if needed */
::-webkit-scrollbar {
  height: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #5a67d8, #6b46c1);
}
</style>