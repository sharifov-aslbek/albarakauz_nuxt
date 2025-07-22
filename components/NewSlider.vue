<template>
  <div class="container mx-auto p-6">
    <!-- Main Carousel Container -->
    <div class="relative rounded-xl overflow-hidden">
      <!-- Slides Container -->
      <div v-if="store.linkedProductsPerProduct.length > 0" class="relative h-80 md:h-[600px] overflow-hidden">
        <div 
           v-for="(slide, index) in store.linkedProductsPerProduct" 
          :key="slide.id"
          :class="[
            'absolute inset-0 w-full h-full transition-all duration-500 ease-in-out',
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          ]"
        >
        <!-- .filter(s => s.linkedProducts.length > 0) -->
        <!-- :class="slide.bgClass" -->
          <div class="flex items-center justify-between gap-3 sm:gap-0 h-full p-3 sm:p-8 md:p-12 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
            <!-- Main Content Area -->
            <div class="flex-1 space-y-6 z-10">
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <UIcon name="solar:shop-2-outline" class="text-gray-600 size-6" />
                  <h3 class="text-sm sm:text-base text-gray-600">
                    {{ slide.product.productModel ? getParsedMarketModel(slide.product.productModel).Seller?.Title : 'Noma\'lum' }}
  
                  </h3>
                </div>

                <h2 class="text-lg sm:text-4xl md:text-[43px] font-bold text-gray-800 my-6">
                  {{ slide.product.name }}
                </h2>
                <p class="text-xl md:text-2xl text-gray-600 font-medium">
                  {{ slide.product.price.toLocaleString('uz') }} so'm
                  <!-- {{ slide.product }} -->
                </p>
<!-- 
                <h3 class="text-lg sm:text-xl text-gray-800 font-semibold mt-2">
                  {{ slide.product.price }} so'm
                </h3> -->

                
              </div>
              
              <button 
    @click="navigateItem(slide.product.id, slide.product.name)"
                class="px-4 sm:px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg bg-[#06D6A0] hover:bg-[#06D6A0]/80"
              >
                Mahsulotga o'tish
              </button>
            </div>

            <!-- Product Image -->
            <div class="flex-1 flex justify-start items-center z-10">
  <div class="relative md:ml-12">
    <img 
      :src="`https://api.albaraka.uz/${slide.product.productImages?.[0]?.imageEntity?.localImagePath}`"
      :alt="slide.product.name"
      class="w-64 md:w-80 h-64 md:h-96 object-cover rounded-3xl drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl -z-10"></div>
  </div>
</div>


            <!-- Side Products (only for first slide) -->
            <div class="hidden lg:flex">
  <div class="grid grid-cols-2 grid-rows-3 gap-2 ml-8 z-10">
    <div 
      v-for="(sideProduct, sideIndex) in slide.linkedProducts.slice(0, 3)" 
      :key="sideIndex"
      class="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 w-64"
      :class="{
        'col-start-2 row-start-2': sideIndex === 1,
        'row-start-3': sideIndex === 2
      }"
    >
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-sm font-bold text-gray-800">{{ sideProduct.product.price }} so'm</p>
          <p class="text-sm text-gray-600">{{ sideProduct.product.productModel ? getParsedMarketModel(sideProduct.product.productModel).Seller?.Title : 'Noma\'lum' }}</p>
        </div>
        <img 
          :src="`https://api.albaraka.uz/${sideProduct.product.productImages[0].imageEntity.localImagePath}`"
          :alt="sideProduct.product.name"
          class="w-20 h-24 rounded-md object-cover"
        />
      </div>
      <button
        class="w-full py-1 px-4 rounded-lg text-xs font-semibold bg-[#06D6A0] text-white transition-all duration-200 hover:scale-105"
        @click="navigateItem(sideProduct.product.id, sideProduct.product.name)"
      >
        O'tish
      </button>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <!-- <button 
        @click="prevSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronLeftIcon class="w-6 h-6" />
      </button>
      
      <button 
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronRightIcon class="w-6 h-6" />
      </button> -->
    </div>

    <!-- Navigation Dots -->
    <div class="flex justify-center mt-6 space-x-3">
      <button
        v-for="(slide, index) in store.linkedProductsPerProduct.filter(s => s.linkedProducts.length > 0)"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all duration-200',
          currentSlide === index 
            ? 'bg-[#06D6A0] scale-125 shadow-lg' 
            : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
        ]"
      ></button>
    </div>

    <!-- Slide Info -->
    <div class="mt-4 text-center">
      <!-- <p class="text-gray-600 text-sm">
        {{ store.linkedProductsPerProduct[currentSlide].product.name }} - Slide {{ currentSlide + 1 }} of {{ store.linkedProductsPerProduct.length }}
      </p> -->
    </div>

    <!-- Auto-play Controls -->
    <!-- <div class="flex justify-center mt-4 space-x-4">
      <button 
        @click="toggleAutoPlay"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          isAutoPlaying 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'
        ]"
      >
        {{ isAutoPlaying ? 'Pause' : 'Play' }}
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { useRouter } from '#imports'
import { useProductAllStore } from '#imports'
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const store = useProductAllStore()
const isAutoPlaying = ref(true)
const router = useRouter()
let autoPlayInterval = null
const targetProductIds = [
  345612, 324550, 352123, 332558, 346898, 
  351794, 324665, 320835, 322120, 322023
]




const navigateItem = (id , slug) => {
  const formattedSlug = slug
    .toLowerCase()                   // kichik harf
    .replace(/[^a-z0-9\s-]/g, '')    // barcha belgilarni olib tashlash (faqat lotin harflar, raqamlar, probel va - qoladi)
    .replace(/\s+/g, '-')            // probel → -
    .replace(/-+/g, '-')             // ketma-ket - ni bitta - ga tushirish
    .trim()

    router.push(`/product/${formattedSlug}-${id}`)
  }


// Navigation functions
const nextSlide = () => {
  if (currentSlide.value === store.linkedProductsPerProduct.filter(s => s.linkedProducts.length > 0).length - 1) {
    currentSlide.value = 0
  } else {
    currentSlide.value++
  }
}


const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? store.linkedProductsPerProduct.filter(s => s.linkedProducts.length > 0).length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Auto-play functionality
const startAutoPlay = () => {
  if (autoPlayInterval) return
  
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 3000)
  isAutoPlaying.value = true
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
  isAutoPlaying.value = false
}

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}



const getParsedMarketModel = (marketModel) => {
  try {
    return JSON.parse(marketModel) || "Noma'lum"
  } catch (error) {
    return "Xato"
  }
}

// Lifecycle hooks
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

const filteredProducts = computed(() => {
  if (!store.productAll || !Array.isArray(store.productAll)) return []

  return store.productAll
    .map((product) => ({
      ...product,
      parsedMarketModel: getParsedMarketModel(product.productModel),
    }))
    .sort((a, b) => 
      (b.parsedMarketModel.meta?.feedbackQuantity || 0) - 
      (a.parsedMarketModel.meta?.feedbackQuantity || 0)
    )
    .slice(0, 10);
})



onMounted(async () => {
  // await store.getAllProducts()

  const stored = localStorage.getItem('productAllStore')
  const parsed = stored ? JSON.parse(stored) : null

  const hasLinkedProducts =
    parsed &&
    Array.isArray(parsed.linkedProductsPerProduct) &&
    parsed.linkedProductsPerProduct.length > 0

  if (!hasLinkedProducts) {
    await store.fetchAllLinkedProductsByIds(targetProductIds)
  }
})


</script>

<style scoped>
/* Smooth transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Ensure proper layering */
.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

/* Custom scrollbar for mobile */
@media (max-width: 768px) {
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
  
  .overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Animation for slide content */
@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-content {
  animation: slideInFromRight 0.6s ease-out;
}
</style>