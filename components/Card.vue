<template>
  <div
  @click="navigaItem(product.id)"
  v-for="product in data"
  :key="product.id"
  class="bg-gray-100 relative card w-full max-w-[300px] h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between"
>
<UIcon  v-if="isFavorite(product.id)"  @click.stop="deleteFavoritesHandler(store.profileData.data.favorites.id, product.id , product.name)" class="w-8 h-8 text-red-500 absolute right-2 z-50" name="material-symbols:favorite" />
<UIcon v-else  @click.stop="handleAddFavorites(product)" class="w-8 h-8 absolute right-2 z-50" name="material-symbols-light:favorite-outline" />
  <!-- Rasm -->
  <div class="flex justify-center items-center aspect-square mb-4">
    <NuxtImg
  v-if="product.productImages?.length > 0"
  :src="`https://albaraka.uz/${product.productImages[0].imageEntity.localImagePath}`"
  :alt="`${product.name} - Image 1`"
  class="w-full max-w-[260px] h-full max-h-[250px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
/>

  </div>

  <!-- Kontent (pastki qism) -->
  <div class="flex flex-col justify-between flex-grow">
    <div>
      <h3 class="text-sm font-medium mb-3 line-clamp-2">{{ product.name }}</h3>

      <!-- To‘lov bo‘lsa -->
      <div class="mb-3 flex justify-between gap-10 min-h-[32px]">
        <div
            v-if="
              product.productModel && product.marketResultmodel?.name === 'Uzum' && getParsedProductModel(product.productModel).Rating
            "
            class="flex items-center gap-1"
          >
            <UIcon name="material-symbols:star-rounded" class="text-yellow-400 size-5" />
            <div
  v-if="product.productModel && product.marketResultmodel && product.marketResultmodel.url === 'https://uzum.uz'"
  class="text-sm font-bold"
>
              {{ getParsedProductModel(product.productModel).Rating }}
            </div>
          </div>
        <n-tag
        type='success'
          v-if="getParsedProductModel(product.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth && product.marketResultmodel?.url === 'https://uzum.uz'"
        >
          {{
            getParsedProductModel(product.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
          }} so'm / oy
        </n-tag>

        <!-- <span
          v-else-if="getParsedProductModel(product.productModel)?.storeProducts?.[0]?.monthly_repayment && product.marketResultmodel?.url === 'https://olcha.uz'"
          class="inline-block w-full text-center rounded-lg bg-green-100 text-green-800 py-1 text-sm font-medium"
        >
          {{
            getParsedProductModel(product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
          }} so'm / 12 months
        </span> -->

        <n-tag 
          v-else-if="getParsedProductModel(product.productModel)?.storeProducts?.[0]?.monthly_repayment && product.marketResultmodel?.url === 'https://olcha.uz'"
        type="success">
                    {{
            getParsedProductModel(product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
          }} so'm / 12 oy
        </n-tag>
      </div>
    </div>

    <!-- Narx + Market -->
    <div class="flex items-center justify-between mt-auto">
      <div class="text-sm font-bold text-gray-800">
        {{ product.price.toLocaleString('uz-UZ') }} so'm
      </div>
      <img
        v-if="product.marketResultmodel?.url"
        class="w-16"
        :src="getMarketLogo(product.marketResultmodel.url)"
        alt="Market Logo"
      />
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
