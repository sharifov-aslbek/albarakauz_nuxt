<template>
     <div 
  v-if="!favoriteProducts.length" 
  class="min-h-screen bg-gray-100 flex items-center justify-center p-4"
>
  <div class="text-center">
    <div class="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-md mx-auto">
        <UIcon class="size-12 text-gray-400 mb-4 mx-auto"  name="ic:outline-heart-broken" />
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Your favorites is empty</h2>
      <p class="text-gray-600 mb-6">Looks like you haven't added any items to your favorites yet.</p>
      <RouterLink to="/" 
        class="bg-[#06D6A0] hover:bg-brand-green/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Start liking
      </RouterLink>
    </div>
  </div>
</div>

    <div v-if="favoriteProducts.length" class="container">
        <h2 class="text-2xl font-bold my-6">Sevimli mahsulotlar soni: {{ store.profileData.data?.favorites?.favoriteProducts.length }}</h2>
    </div>
    <div v-if="favoriteProducts.length"  class="container grid grid-cols-5 gap-6">
        <div
        @click="navigaItem(product.product.id)"
        v-for="product in favoriteProducts"
        :key="product.product.id"
        class="bg-gray-100 relative card w-full max-w-[300px] h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between"
      >
      <UIcon @click.stop="deleteFavoritesHandler(store.profileData.data.favorites.id, product.product.id , product.product.name)" class="w-8 h-8 text-red-500 absolute right-2 z-50" name="mdi:heart" />
      <!-- <UIcon v-else  @click.stop="addFavorites(store.profileData.data.favorites.id, product.product.id , product.product.name)" class="w-8 h-8 absolute right-2 z-50" name="material-symbols-light:favorite-outline" /> -->
        <!-- Rasm -->
        <div class="flex justify-center items-center aspect-square mb-4">
          <img
            v-if="product.product.productImages?.length > 0"
            :src="`https://albaraka.uz/${product.product.productImages[0].imageEntity.localImagePath}`"
            :alt="`${product.product.name} - Image 1`"
            class="w-full max-w-[260px] h-full max-h-[250px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      
        <!-- Kontent (pastki qism) -->
        <div class="flex flex-col justify-between flex-grow">
          <div>
            <h3 class="text-sm font-medium mb-3 line-clamp-2">{{ product.product.name }}</h3>
      
            <!-- To‘lov bo‘lsa -->
            <div class="mb-3 flex justify-between gap-10 min-h-[32px]">
              <div
                  v-if="
                    product.product.productModel && product.product.marketResultmodel?.name === 'Uzum' && getParsedProductModel(product.product.productModel).Rating
                  "
                  class="flex items-center gap-1"
                >
                  <UIcon name="material-symbols:star-rounded" class="text-yellow-400 size-5" />
                  <div
        v-if="product.product.productModel && product.product.marketResultmodel && product.product.marketResultmodel.url === 'https://uzum.uz'"
        class="text-sm font-bold"
      >
                    {{ getParsedProductModel(product.product.productModel).Rating }}
                  </div>
                </div>
              <span
                v-if="getParsedProductModel(product.product.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth && product.product.marketResultmodel?.url === 'https://uzum.uz'"
                class="inline-block w-full text-center rounded-lg bg-green-100 text-green-800 py-1 text-sm font-medium"
              >
                {{
                  getParsedProductModel(product.product.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
                }} so'm / oy
              </span>
      
              <span
                v-else-if="getParsedProductModel(product.product.productModel)?.storeProducts?.[0]?.monthly_repayment && product.product.marketResultmodel?.url === 'https://olcha.uz'"
                class="inline-block w-full text-center rounded-lg bg-green-100 text-green-800 py-1 text-sm font-medium"
              >
                {{
                  getParsedProductModel(product.product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
                }} so'm / 12 months
              </span>
      
            </div>
          </div>
      
          <!-- Narx + Market -->
          <div class="flex items-center justify-between mt-auto">
            <div class="text-sm font-bold text-gray-800">
              {{ product.product.price.toLocaleString('uz-UZ') }} so'm
            </div>
            <img
              v-if="product.product.marketResultmodel?.url"
              class="w-16"
              :src="getMarketLogo(product.product.marketResultmodel.url)"
              alt="Market Logo"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
import { useRouter } from 'vue-router';
import { ref , computed } from 'vue'
import { useToast } from '#imports'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'



const favoritesLoader = ref<number | false>(false)
const toast = useToast()
const store = useAuthStore()
const favoriteProducts = computed(() =>
  store.profileData?.data?.favorites?.favoriteProducts || []
)


definePageMeta({
  ssr: false
})

async function addFavorites(
  favouritesId: number,
  productId: number,
  productName: string
): Promise<void> {
  try {
    favoritesLoader.value = productId

    const token = localStorage.getItem('accessToken')

    const response = await fetch('https://albaraka.uz/api/favorites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        favouritesId,
        productId,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      store.getProfileData()
        new Audio(successAudio).play();
      toast.add({
        title: 'Muvaffaqiyatli',
        description: `${productName} sevimliga qo'shildi`,
        icon: 'mynaui:check',
      })

      // store.getProfileData() // Agar kerak bo‘lsa, import qilib ishlat
    } else {
        new Audio(errorAudio).play();
      toast.add({
        title: 'Xatolik!',
        description: data?.message || 'Xatolik yuz berdi.',
        icon: 'mynaui:x-circle',
      })
    }
  } catch (error: any) {
    console.error(error)
        new Audio(errorAudio).play();
    toast.add({
      title: 'Xatolik!',
      description: error?.message || 'Internetni tekshiring.',
      icon: 'mynaui:x-circle',
    })
  } finally {
    favoritesLoader.value = false
  }
}


async function deleteFavoritesHandler(
  favouritesId: number,
  productId: number,
  productName: string
): Promise<void> {
  try {
    favoritesLoader.value = productId

    const token = localStorage.getItem('token')

    const response = await fetch('https://albaraka.uz/api/favorites/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        favouritesId,
        productId,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      toast.add({
        title: "O'chirildi",
        description: `${productName} sevimlidan o'chirildi`,
        icon: 'gravity-ui:xmark',
      })

      store.getProfileData()
    } else {
      toast.add({
        title: 'Xatolik!',
        description: data?.message || 'Nomaʼlum xatolik yuz berdi.',
        icon: 'mynaui:x-circle',
      })
    }
  } catch (error: any) {
    console.error(error)
    toast.add({
      title: 'Xatolik!',
      description: error?.message || 'So‘rov bajarilmadi. Internetni tekshiring.',
      icon: 'mynaui:x-circle',
    })
  } finally {
    favoritesLoader.value = false
  }
}


const router = useRouter();
/**
 * Har bir productModel'ni parse qiluvchi yordamchi funksiya
 */
const getParsedProductModel = (productModel: string): Record<string, any> | null => {
  try {
    const parsed = JSON.parse(productModel)
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}


const navigaItem = (id : Number) => {
  router.push(`/product/${id}`)
}

/**
 * Market logotipi URL'ga qarab tanlash
 */
const getMarketLogo = (url: string): string => {
  if (url === 'https://uzum.uz') return '/uzum-logo.png'
  if (url.includes('olcha.uz')) return '/olcha.png'
  if (url.includes('texnomart.uz')) return '/texnomart-text.png'
  return '/fallback.png'
}


</script>

<style scoped>
.card {
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
