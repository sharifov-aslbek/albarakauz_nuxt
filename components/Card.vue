<template>
  <div
  @click="navigaItem(product.id , product.name)"
  v-for="product in data"
  :key="product.id"
  class="bg-gray-100 relative card w-full max-w-[300px] h-[400px] sm:h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between"
>
<UIcon  v-if="isFavorite(product.id)"  @click.stop="deleteFavoritesHandler(store.profileData.data.favorites.id, product.id , product.name)" class="w-8 h-8 text-red-500 absolute right-2 z-50" name="material-symbols:favorite" />
<UIcon v-else  @click.stop="handleAddFavorites(product)" class="w-8 h-8 absolute right-2 z-50" name="material-symbols-light:favorite-outline" />
  <!-- Rasm -->
  <div class="flex justify-center items-center aspect-square mb-4">
  <!-- Show image when it exists -->
  <img
    v-if="product.productImages?.length > 0 && product.productImages[0].imageEntity?.localImagePath"
    :src="`https://api.albaraka.uz/${product.productImages[0].imageEntity.localImagePath}`"
    loading="lazy"
    :alt="`${product.name} - Image 1`"
    class="w-full max-w-[260px] h-full max-h-[250px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
    @load="onImageLoad(product.id)"
  />
  
  <!-- Show not found when image doesn't exist -->
  <div
    v-else
    class="w-full max-w-[260px] h-full max-h-[250px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
  >
    <div class="text-center">
      <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-xs font-medium">Image not found</p>
    </div>
  </div>
</div>

  <!-- Kontent (pastki qism) -->
  <div class="flex flex-col justify-between flex-grow">
    <div>
      <h3 class="text-sm font-medium mb-3 line-clamp-2">{{ product.name }}</h3>

        <div class="text-lg mb-3 font-medium text-gray-800">
        {{ product.price.toLocaleString('uz-UZ') }} so'm
      </div>  

        <n-tag
        size="small"
        type='warning'
          v-if="getParsedProductModel(product.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth && product.marketResultmodel?.url === 'https://uzum.uz'"
        >
          {{
            getParsedProductModel(product.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
          }} so'm / oy
        </n-tag>


        <n-tag 
          v-else-if="getParsedProductModel(product.productModel)?.storeProducts?.[0]?.monthly_repayment && product.marketResultmodel?.url === 'https://olcha.uz'"
        type="warning">
                    {{
            getParsedProductModel(product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
          }} so'm / 12 oy
        </n-tag>
    </div>

    <!-- Narx + Market -->
    <div class="flex items-center justify-between mt-auto">
      <img
        v-if="product.marketResultmodel?.url"
        class="w-16"
        :src="getMarketLogo(product.marketResultmodel.url)"
        alt="Market Logo"
      />

      <div
            v-if="
              product.productModel && product.marketResultmodel?.name === 'Uzum' && getParsedProductModel(product.productModel).Rating
            "
            class="flex items-center sm:gap-1"
          >
            <UIcon name="material-symbols:star-rounded" class="text-yellow-400 size-3 sm:size-5" />
            <div
  v-if="product.productModel && product.marketResultmodel && product.marketResultmodel.url === 'https://uzum.uz'"
  class="text-xs sm:text-sm font-bold"
>
              {{ getParsedProductModel(product.productModel).Rating }}
            </div>
          </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { NTag } from '#components';
import { useAuthStore } from '#imports';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useToast } from '#imports'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'
import { NSpin } from 'naive-ui'

const loadedImages = ref<Record<number, boolean>>({})

function onImageLoad(productId: number) {
  loadedImages.value[productId] = true
}

function isImageLoaded(productId: number): boolean {
  return loadedImages.value[productId] === true
}


const props = defineProps<{
  data: Array<any>
}>()


const favoritesLoader = ref<number | false>(false)
const toast = useToast()
const store = useAuthStore()

function handleAddFavorites(product: Product) {
  const accessToken = localStorage.getItem('accessToken') 
  if (!accessToken) {
    new Audio(errorAudio).play()
    toast.add({
      title: 'Diqqat!',
      description: 'Avval login qilishingiz kerak.',
      icon: 'mynaui:x-circle'
    })
    return
  }

  addFavorites(
    store.profileData.data.favorites.id,
    product.id,
    product.name
  )
}


async function addFavorites(
  favouritesId: number,
  productId: number,
  productName: string
): Promise<void> {
  try {
    favoritesLoader.value = productId

    // Tokenni localStorage’dan olamiz
    const token = localStorage.getItem('accessToken')

    // Agar token bo‘lmasa, foydalanuvchiga xabar beramiz
    if (!token) {
      new Audio(errorAudio).play()
      toast.add({
        title: 'Diqqat!',
        description: 'Avval login qilishingiz kerak.',
        icon: 'mynaui:x-circle',
      })
      favoritesLoader.value = false
      return
    }

    const response = await fetch('https://api.albaraka.uz/api/favorites/add', {
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
      new Audio(successAudio).play()
      toast.add({
        title: 'Muvaffaqiyatli',
        description: `${productName} sevimliga qo'shildi`,
        icon: 'mynaui:check',
      })
    } else {
      new Audio(errorAudio).play()
      toast.add({
        title: 'Xatolik!',
        description: data?.message || 'Xatolik yuz berdi.',
        icon: 'mynaui:x-circle',
      })
    }
  } catch (error: any) {
    console.error(error)
    new Audio(errorAudio).play()
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

    const response = await fetch('https://api.albaraka.uz/api/favorites/remove', {
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


const navigaItem = (id: number, slug: string) => {
  const formattedSlug = slug
    .toLowerCase()                   // kichik harf
    .replace(/[^a-z0-9\s-]/g, '')    // barcha belgilarni olib tashlash (faqat lotin harflar, raqamlar, probel va - qoladi)
    .replace(/\s+/g, '-')            // probel → -
    .replace(/-+/g, '-')             // ketma-ket - ni bitta - ga tushirish
    .trim()

  router.push(`/product/${formattedSlug}-${id}`)
}


/**
 * Market logotipi URL'ga qarab tanlash
 */
const getMarketLogo = (url: string): string => {
  if (url === 'https://uzum.uz') return '/uzum-logo.png'
  if (url.includes('olcha.uz')) return '/olcha.png'
  if (url.includes('texnomart.uz')) return '/texnomart-text.png'
  if(url.includes('idea.uz')) return '/idea-logo.png'
  if(url.includes('elmakon.uz')) return '/elmakon-logo.png'
  return '/fallback.png'
}

const isFavorite = (productId: number): boolean => {
  return (
    store.profileData?.data?.favorites?.favoriteProducts?.some(
      (item: { product: { id: number } }) => item.product.id === productId
    ) ?? false
  )
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
