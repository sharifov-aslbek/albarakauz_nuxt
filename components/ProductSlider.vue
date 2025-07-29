<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ColorThief from 'colorthief'

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
    img: '/testproduct.png',
    shopImg: '/olcha-icon.png',
    bgColor: '',
    textColor: ""
  },
  {
    id: 4,
    name: 'Pixel 8',
    price: 799,
    img: '/testproduct.png',
    shopImg: '/yandexmarket.png',
    bgColor: '',
    textColor: ""
  }
])

const currentIndex = ref(0)
const gradientStyle = ref('')

const groupedProducts = computed(() => {
  const chunked: typeof products.value[] = []
  for (let i = 0; i < products.value.length; i += 3) {
    chunked.push(products.value.slice(i, i + 3)) // ❗ i + 4 emas, i + 3 bo'lishi kerak
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
  const colors = visibleGroup.map(p => {
    const rgb = p.bgColor || 'rgb(51, 51, 51)'
    const rgba = rgb.replace('rgb(', 'rgba(').replace(')', ', 0.5)')
    return rgba
  })
  gradientStyle.value = `linear-gradient(to right, ${colors.join(', ')})`
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
  <div class="container">
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

      <!-- Yonma-yon mahsulotlar -->
      <div class="relative z-10 flex justify-between flex-wrap gap-y-6">
        <div v-for="product in products" :key="product.id" @click="goToProduct(product.id)"
          class="relative w-[280px] h-[120px] rounded-2xl cursor-pointer overflow-hidden group transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl border border-white/25 bg-white/10 backdrop-blur-md">

          <!-- Card Background (gradient + image) -->
          <div class="absolute inset-0 z-0" :style="{
            backgroundImage: `linear-gradient(to right, ${product.bgColor.replace('rgb', 'rgba').replace(')', ', 0.4)')}, ${product.bgColor.replace('rgb', 'rgba').replace(')', ', 0.3)')}), url(${product.shopImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.05)',
          }" />

          <!-- Inner shadow / highlight -->
          <div class="absolute inset-0 rounded-2xl z-10 bg-black/10" :style="{
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)'
          }"></div>


          <!-- Content -->
          <div class="relative z-20 flex items-center justify-between h-full p-4 text-white ">

            <img :src="product.img" alt="product"
              class="h-[100px] w-[100px] object-contain rounded-xl p-2 bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110" />

            <div class="text-right">
              <p class="text-3xl font-semibold drop-shadow-md">
                {{ product.price }}$
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

  <br><br>
</template>
