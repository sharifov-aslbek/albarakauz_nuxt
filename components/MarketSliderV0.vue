<template>
  <section class="py-8 md:py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          Ulangan Marketlar
        </h2>
        <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Mahsulotlaringizni Oʻzbekistonning eng yirik onlayn savdo platformalarida bir vaqtning oʻzida sotish
        </p>
        <div class="flex items-center justify-center mt-4 md:mt-6">
          <!-- Updated status indicator to use yellow color scheme -->
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
          class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:border-yellow-400"
          :disabled="scrollPosition <= 0"
          :class="{ 'opacity-50 cursor-not-allowed': scrollPosition <= 0 }"
        >
          <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          @click="scrollRight"
          class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:border-yellow-400"
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
          <div class="flex gap-4 md:gap-6 pb-4" style="width: max-content;">
            <div
              v-for="marketplace in connectedMarkets"
              :key="marketplace.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-yellow-200 hover:border-yellow-400 flex-shrink-0 w-72 sm:w-80 lg:w-80"
            >
              <div class="p-4 md:p-6">
                <!-- Logo and Status -->
                <div class="flex items-start justify-between mb-4">
                  <!-- Updated logo background to yellow gradient -->
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                    <img 
                      :src="marketplace.icon" 
                      :alt="marketplace.name"
                      class="w-6 h-6 md:w-8 md:h-8 rounded"
                    />
                  </div>
                  <!-- Updated status badge to yellow theme -->
                  <div class="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200">
                    <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                    Faol
                  </div>
                </div>

                <!-- Marketplace Info -->
                <div class="mb-4">
                  <h3 class="font-semibold text-gray-900 text-base md:text-lg mb-1">
                    {{ marketplace.name }}
                  </h3>
                  <p class="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {{ marketplace.description }}
                  </p>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div class="text-center">
                    <!-- Updated stats colors to yellow theme -->
                    <div class="text-lg md:text-2xl font-bold text-yellow-600">{{ formatNumber(marketplace.products) }}</div>
                    <div class="text-xs text-gray-500">Mahsulotlar</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg md:text-2xl font-bold text-yellow-700">{{ formatNumber(marketplace.orders) }}</div>
                    <div class="text-xs text-gray-500">Buyurtmalar</div>
                  </div>
                </div>

                <!-- Action Button -->
                <!-- Updated button to yellow gradient -->
                <button class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 py-2 md:py-2.5 px-4 rounded-lg transition-all duration-200 text-xs md:text-sm font-medium shadow-md hover:shadow-lg">
                  Kuzatish
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
            class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200"
            :class="currentSlide === index ? 'bg-yellow-500' : 'bg-yellow-200'"
          ></div>
        </div>

        <!-- Mobile navigation buttons at bottom -->
        <div class="flex md:hidden justify-center gap-4 mt-6">
          <button 
            @click="scrollLeft"
            class="bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:border-yellow-400"
            :disabled="scrollPosition <= 0"
            :class="{ 'opacity-50 cursor-not-allowed': scrollPosition <= 0 }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            @click="scrollRight"
            class="bg-white hover:bg-yellow-50 border-2 border-yellow-300 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:border-yellow-400"
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

const totalProducts = computed(() => {
  return connectedMarkets.value.reduce((sum, market) => sum + market.products, 0)
})

const totalOrders = computed(() => {
  return connectedMarkets.value.reduce((sum, market) => sum + market.orders, 0)
})

const totalRevenue = computed(() => {
  return (totalOrders.value * 125000).toLocaleString() + ' so\'m'
})

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
  const cardWidth = window.innerWidth < 640 ? 288 + 16 : 320 + 24 // card width + gap
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
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Added smooth touch scrolling for mobile */
.scrollbar-hide {
  -webkit-overflow-scrolling: touch;
}
</style>
