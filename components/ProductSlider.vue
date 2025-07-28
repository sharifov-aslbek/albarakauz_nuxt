<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ColorThief from 'colorthief'
import { NButton, NCarousel, NCarouselItem } from 'naive-ui'

// Router
const router = useRouter()

// Mahsulotlar
const products = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 1299,
    img: '/testproduct.png',
    shopImg: '/uzum.png',
    bgColor: '',
    textColor: ""
  },
  {
    id: 2,
    name: 'Samsung S23 Ultra',
    price: 1199,
    img: '/testproduct.png',
    shopImg: '/texnomart-icon.png',
    bgColor: '',
    textColor: ""
  },
  {
    id: 3,
    name: 'Redmi Note 13',
    price: 499,
    img: '/products/redmi.jpg',
    shopImg: '/olcha-icon.png',
    bgColor: '',
    textColor: ""
  },
  {
    id: 4,
    name: 'Pixel 8',
    price: 799,
    img: '/products/pixel.jpg',
    shopImg: '/yandexmarket.png',
    bgColor: '',
    textColor: ""
  }
])

const currentIndex = ref(0)
const gradientStyle = ref('')

// 3 tadan mahsulot guruhlash
const groupedProducts = computed(() => {
  const chunked: typeof products.value[] = []
  for (let i = 0; i < products.value.length; i += 3) {
    chunked.push(products.value.slice(i, i + 4))
  }
  return chunked
})

// Mahsulot sahifasiga o'tish
const goToProduct = (id: number) => {
  router.push(`/products/${id}`)
}

// shopImg rasmlaridan rang olish
const extractColors = async () => {
  for (const product of products.value) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = product.shopImg

    await new Promise<void>((resolve) => {
      img.onload = () => {
        try {
          const colorThief = new ColorThief()
          const [r, g, b] = colorThief.getColor(img)
          product.bgColor = `rgb(${r}, ${g}, ${b})`
        } catch {
          product.bgColor = 'rgb(51, 51, 51)'
        }
        resolve()
      }
    })
  }
}

// Gradientni yangilash
const updateGradient = () => {
  const visibleGroup = groupedProducts.value[currentIndex.value] || []
  const colors = visibleGroup.map(p => p.bgColor || 'rgb(51, 51, 51)')
  gradientStyle.value = `linear-gradient(to right, ${colors.join(', ')}`
}

// Slider indeks o'zgarsa
const handleSlideChange = (val: number) => {
  currentIndex.value = val
  updateGradient()
}

// shopImg rasmlaridan rang olish
// const extractColors = async () => {
//   for (const product of products.value) {
//     const img = new Image()
//     img.crossOrigin = 'anonymous'
//     img.src = product.shopImg

//     await new Promise<void>((resolve) => {
//       img.onload = () => {
//         try {
//           const colorThief = new ColorThief()
//           const [r, g, b] = colorThief.getColor(img)
//           product.bgColor = `rgb(${r}, ${g}, ${b})`

//           // Yorqinlikni hisoblash
//           const brightness = (r * 299 + g * 587 + b * 114) / 1000
//           product.textColor = brightness > 128 ? 'black' : 'white'
//         } catch {
//           product.bgColor = 'rgb(51, 51, 51)'
//           product.textColor = 'white'
//         }
//         resolve()
//       }
//     })
//   }
// }


// Dastlab ishga tushganida
onMounted(async () => {
  await extractColors()
  updateGradient()
})

</script>

<template>
  <div class="mx-auto px-4">
    <h2 class="text-4xl font-bold my-8 text-center text-neutral-800 dark:text-white tracking-wide">
      🔥 Trenddagi Mahsulotlar
    </h2>

    <div class="rounded-xl p-6 transition-all duration-700 shadow-xl relative border border-white/20 backdrop-blur-xl"
      :style="{
        backgroundImage: gradientStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }">
      <!-- Overlay blur -->
      <div class="absolute inset-0 backdrop-blur-[2px] z-0 rounded-xl"></div>


      <!-- Carousel -->
      <n-carousel :slides-per-view="1" :space-between="10" draggable :show-dots="false"
        @update:current-index="handleSlideChange" class="relative z-10 rounded-lg overflow-hidden">
        <n-carousel-item v-for="(group, index) in groupedProducts" :key="index">
          <div class="flex justify-between gap-4 flex-wrap">
            <div v-for="product in group" :key="product.id" @click="goToProduct(product.id)"
              class="relative w-[280px] h-[120px] rounded-xl cursor-pointer overflow-hidden transition hover:scale-[1.03] hover:shadow-xl duration-300 group border border-black border-solid">
              <!-- Background image + gradient overlay -->
              <div class="absolute inset-0 z-0 transition-all duration-500" :style="{
                backgroundImage: `linear-gradient(to right, ${product.bgColor.replace('rgb', 'rgba').replace(')', ', 0.5)')}, ${product.bgColor.replace('rgb', 'rgba').replace(')', ', 0.5)')}), url(${product.shopImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }" />

              <!-- Foreground content -->
              <div class="relative z-10 flex items-center justify-between h-full p-4"
                :class="product.textColor === 'white' ? 'text-white' : 'text-black'">
                <img :src="product.img" alt="product"
                  class="h-[100px] w-[100px] object-contain rounded-lg p-2 bg-white/25 backdrop-blur-sm transition group-hover:scale-105" />
                <div class="text-right">
                  <p class="text-4xl font-medium drop-shadow-sm leading-5">
                    {{ product.price }}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </n-carousel-item>
      </n-carousel>
    </div>
  </div>
</template>
