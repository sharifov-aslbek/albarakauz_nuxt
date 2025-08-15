<template>
  <section class="py-8 md:py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">
          Ulangan Marketlar
        </h2>
        <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 animate-fade-in-up animation-delay-200">
          Mahsulotlaringizni Oʻzbekistonning eng yirik onlayn savdo platformalarida bir vaqtning oʻzida sotish
        </p>
        <div class="flex items-center justify-center mt-4 md:mt-6 animate-fade-in-up animation-delay-400">
          <div class="flex items-center bg-yellow-100 text-yellow-800 px-3 md:px-4 py-2 rounded-full border border-yellow-200">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
            <span class="text-xs md:text-sm font-medium">{{ connectedMarkets.length }} ta market ulangan</span>
          </div>
        </div>
      </div>

      <!-- Marketplace Slider -->
      <div class="relative">
        <!-- Navigation Buttons -->
        <button 
          @click="scrollLeft"
          class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:border-yellow-400 hover:scale-110"
          :disabled="scrollPosition <= 0"
          :class="{ 'opacity-50 cursor-not-allowed': scrollPosition <= 0 }"
        >
          <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          @click="scrollRight"
          class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:border-yellow-400 hover:scale-110"
          :disabled="scrollPosition >= maxScroll"
          :class="{ 'opacity-50 cursor-not-allowed': scrollPosition >= maxScroll }"
        >
          <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Slider Container -->
        <div 
          ref="sliderContainer"
          class="overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-12"
          @scroll="updateScrollPosition"
        >
          <div class="flex gap-4 md:gap-6 py-8" style="width: max-content; height: 500px;">
            <div
              v-for="(marketplace, index) in connectedMarkets"
              :key="marketplace.id"
              class="bg-white rounded-xl h-[400px] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-2 border-yellow-200 hover:border-yellow-400 flex-shrink-0 w-72 sm:w-80 lg:w-80 animate-slide-in-right group"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="p-4 md:p-6">
                <!-- Logo and Status -->
                <div class="flex items-start justify-between mb-6">
                  <!-- <CHANGE> Made icon container larger and more centered -->
                  <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      :src="marketplace.icon" 
                      :alt="marketplace.name"
                      class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div class="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200 animate-bounce-subtle">
                    <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1 animate-pulse"></div>
                    Faol
                  </div>
                </div>

                <!-- Marketplace Info -->
                <div class="mb-6">
                  <h3 class="flex items-center gap-3 font-semibold text-gray-900 text-base md:text-lg mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                    {{ marketplace.name }}
                    <UIcon name="material-symbols:verified" />
                  </h3>
                  <p class="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {{ marketplace.description }}
                  </p>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div class="text-center p-3 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors duration-300">
                    <div class="text-lg md:text-2xl font-bold text-yellow-600 animate-count-up">{{ formatNumber(marketplace.products) }}</div>
                    <div class="text-xs text-gray-500">Mahsulotlar</div>
                  </div>
                  <div class="text-center p-3 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors duration-300">
                    <div class="text-lg md:text-2xl font-bold text-yellow-700 animate-count-up">{{ formatNumber(marketplace.orders) }}</div>
                    <div class="text-xs text-gray-500">Buyurtmalar</div>
                  </div>
                </div>

                <!-- Action Button -->
                <button class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 py-3 md:py-3.5 px-4 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95">
                  <span class="flex items-center justify-center gap-2">
                    Kuzatish
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicators -->
        <div class="flex justify-center mt-4 md:mt-6 gap-1.5 md:gap-2">
          <div 
            v-for="(dot, index) in Math.ceil(connectedMarkets.length / getCardsPerView())" 
            :key="index"
            class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer"
            :class="currentSlide === index ? 'bg-yellow-500 scale-125' : 'bg-yellow-200 hover:bg-yellow-300'"
          ></div>
        </div>

        <!-- Mobile navigation buttons at bottom -->
        <div class="flex md:hidden justify-center gap-4 mt-6">
          <button 
            @click="scrollLeft"
            class="bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:border-yellow-400 hover:scale-110 active:scale-95"
            :disabled="scrollPosition <= 0"
            :class="{ 'opacity-50 cursor-not-allowed': scrollPosition <= 0 }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            @click="scrollRight"
            class="bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:border-yellow-400 hover:scale-110 active:scale-95"
            :disabled="scrollPosition >= maxScroll"
            :class="{ 'opacity-50 cursor-not-allowed': scrollPosition >= maxScroll }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const connectedMarkets = ref([
  {
    id: 1,
    name: 'Uzum.uz',
    description: 'Oʻzbekistonning eng yirik onlayn savdo platformasi',
    products: 287000,
    orders: 190000,
    icon: '/uzum-icon.png',
    status: 'active'
  },
  {
    id: 2,
    name: 'Olcha.uz',
    description: 'Texnika va elektronika uchun mashhur market',
    products: 32000,
    orders: 19450,
    icon: '/olcha-icon.png',
    status: 'active'
  },
  {
    id: 3,
    name: 'Texnomart.uz',
    description: 'Texnika va elektronika uchun mashhur market',
    products: 4326,
    orders: 67,
    icon: '/texnomart-icon.png',
    status: 'active'
  },
  {
    id: 4,
    name: 'Allgood.uz',
    description: 'Kiyim va aksessuarlar uchun onlayn do\'kon',
    products: 1343,
    orders: 346,
    icon: '/allgood.png',
    status: 'active'
  },
  {
    id: 5,
    name: 'Mediapark.uz',
    description: 'Uy uchun kerakli bolgan barcha texnikalar',
    products: 0,
    orders: 0,
    icon: '/mediapark.webp',
    status: 'active'
  },
  {
    id: 6,
    name: 'Idea.uz',
    description: 'Kreativ mahsulotlar va dizayn buyumlari',
    products: 1230,
    orders: 12,
    icon: '/idea.png',
    status: 'active'
  },
  {
    id: 7,
    name: 'Elmakon.uz',
    description: 'Uy-roʻzgʻor buyumlari va mebel',
    products: 572,
    orders: 56,
    icon: '/elmakon.png',
    status: 'active'
  }
])

const sliderContainer = ref(null)
const scrollPosition = ref(0)
const maxScroll = ref(0)

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

const getCardsPerView = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }
  return 3
}

const currentSlide = computed(() => {
  if (!sliderContainer.value) return 0
  const cardWidth = window.innerWidth < 640 ? 288 + 16 : 320 + 24
  const cardsPerView = getCardsPerView()
  return Math.round(scrollPosition.value / (cardWidth * cardsPerView))
})

const scrollLeft = () => {
  if (sliderContainer.value) {
    const cardWidth = window.innerWidth < 640 ? 288 + 16 : 320 + 24
    const scrollAmount = window.innerWidth < 768 ? cardWidth : cardWidth * 2
    sliderContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (sliderContainer.value) {
    const cardWidth = window.innerWidth < 640 ? 288 + 16 : 320 + 24
    const scrollAmount = window.innerWidth < 768 ? cardWidth : cardWidth * 2
    sliderContainer.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
}

const updateScrollPosition = () => {
  if (sliderContainer.value) {
    scrollPosition.value = sliderContainer.value.scrollLeft
  }
}

onMounted(async () => {
  await nextTick()
  if (sliderContainer.value) {
    maxScroll.value = sliderContainer.value.scrollWidth - sliderContainer.value.clientWidth
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* <CHANGE> Added custom animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes count-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.6s ease-out forwards;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-count-up {
  animation: count-up 0.5s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

/* Enhanced hover effects */
.group:hover .animate-count-up {
  animation: count-up 0.3s ease-out forwards;
}
</style>