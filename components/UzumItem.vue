<template>
    <div class="container py-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
  <div class="flex flex-col">
    <CategoryPath />

    <div 
      v-if="
        store.product.productModel &&
        getParsedProductModel(store.product.productModel).Rating
      " 
      class="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4"
    >
      <n-rate
        readonly 
        :default-value="getParsedProductModel(store.product.productModel).Rating" 
      />

      <a 
        target="_blank" 
        :href="store.product.productUrl" 
        class="text-gray-500 text-sm mt-2 sm:mt-0"
      >
        {{ getParsedProductModel(store.product.productModel).Rating }} - 
        <span>({{ getParsedProductModel(store.product.productModel).ReviewsAmount }} sharh)</span> - 
        <span>{{ getParsedProductModel(store.product.productModel).OrdersAmount }} marta sotilgan</span>
      </a>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
    <UButton 
      v-if="isFavorite(store.product.id)"  
      @click.stop="deleteFavoritesHandler(authStore.profileData.data.favorites.id, store.product.id, store.product.name)" 
      icon="material-symbols-light:heart-check" 
      size="md" 
      color="error" 
      variant="soft"
      class="w-full sm:w-auto"
    >
      Sevimlidan o'chirish
    </UButton>

    <UButton  
      v-else  
      @click.stop="handleAddFavorites(store.product)" 
      icon="material-symbols-light:favorite-outline" 
      size="md" 
      color="neutral" 
      variant="outline"
      class="w-full sm:w-auto"
    >
      Sevimliga qo'shish
    </UButton>

      <!-- <UButton 
        @click="copyRoute" 
        icon="material-symbols-light:content-copy-outline-rounded" 
        size="md" 
        color="neutral" 
        variant="outline"
        class="w-full sm:w-auto"
      >
        Nusxalash
      </UButton> -->

    <ItemDropdownMenu />
  </div>
</div>

            <!-- <h3 v-if="linkedProducts && linkedProducts.length > 0" class="lg:hidden block text-2xl my-4 font-bold">O'xshash mahsulotlar</h3> -->

      <MiniCard v-if="linkedProducts && linkedProducts.length > 0"  :data="linkedProducts" />

      <div class="flex justify-between items-center">
        <div class="flex flex-col md:flex-row pb-5 gap-6 sm:mr-7 py-12">
          <div class="flex flex-col items-center sm:flex-row gap-5 w-full h-[500px]">
             <n-scrollbar
             v-if="store.product.productImages && store.product.productImages.length > 0"
    style="max-height: 500px; width: 80px;"
  >
    <div class="sm:flex hidden flex-col gap-5 justify-around pt-4 max-w-xs mx-auto">
      <div
        v-for="(item, index) in store.product.productImages"
        :key="index"
        class="size-11 opacity-40 hover:opacity-100 transition-opacity"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <img
          :src="`https://api.albaraka.uz/${item.imageEntity.localImagePath}`"
          width="100"
          height="100"
          class="rounded-lg"
        >
      </div>
    </div>
  </n-scrollbar>
<div class="sm:w-full sm:max-w-[400px] w-full">
    <!-- Show carousel when images exist -->
    <UCarousel
      v-if="store.product.productImages && store.product.productImages.length > 0"
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="store.product.productImages"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="sm:w-full sm:max-w-[400px] w-full"
      @select="onSelect"
    >
      <!-- Show image if path exists, otherwise show not found -->
      <n-image
        v-if="item.imageEntity && item.imageEntity.localImagePath"
        class="w-full sm:w-[420px] rounded-lg object-cover h-[500px]"
        :src="`https://api.albaraka.uz/${item.imageEntity.localImagePath}`"
      />
      <div
        v-else
        class="w-full sm:w-[420px] rounded-lg bg-gray-100 h-[500px] flex items-center justify-center text-gray-500"
      >
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-sm font-medium">Image not found</p>
        </div>
      </div>
    </UCarousel>

    <!-- Show not found when no images array -->
    <div
      v-else
      class="w-full sm:w-[420px] rounded-lg bg-gray-200 h-[500px] flex items-center justify-center text-gray-500"
    >
      <div class="flex flex-col gap-5 items-center justify-center text-center"> 
<div class="loader"></div>
        <p class="text-sm font-medium">Image not found</p>
      </div>
    </div>
  </div>


  </div>
           <div class="flex w-full max-w-full md:max-w-[40%] flex-col items-start space-y-6">
                               <div class="flex justify-between w-full gap-3 pb-4">
                           <h1 class="text-xl mt-5 sm:mt-0 sm:text-3xl mr-4 w-full max-w-full sm:max-w-[470px] font-bold">{{ store.product.name }}</h1>
                       </div>
  
                       <div class="w-full max-w-full sm:w-[400px] border border-gray-300 rounded-xl shadow-lg p-5">
            <div class="flex items-center justify-between">
              <div class="text-3xl font-medium text-gray-900 mb-5">
                  {{ store.product.price.toLocaleString('uz-UZ') }} so'm
                </div>
  
                <span class="line-through">
                  {{ getParsedProductModel(store.product.productModel).SkuList[0].FullPrice }} so'm
                </span>
            </div>
  
            <div class="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-between">
              <UButton 
      v-if="isFavorite(store.product.id)"  
      @click.stop="deleteFavoritesHandler(authStore.profileData.data.favorites.id, store.product.id, store.product.name)" 
      icon="material-symbols-light:heart-check" 
      size="md" 
      color="error" 
      variant="soft"
      class="w-full sm:w-auto"
    >
      Sevimlidan o'chirish
    </UButton>

    <UButton  
      v-else  
      @click.stop="handleAddFavorites(store.product)" 
      icon="material-symbols-light:favorite-outline" 
      size="md" 
      color="neutral" 
      variant="outline"
      class="w-full sm:w-auto"
    >
      Sevimliga qo'shish
    </UButton>
  
  
  <UButton
    size="md" 
    color="warning" 
    variant="outline"
    class="w-full sm:w-auto"
  >
    {{ monthlyRepayment }}/so'm (12 oy)
  </UButton>
            </div>
  
  
         <div class="font-normal items-center rounded-lg flex gap-2 justify-start mt-5" variant="subtle">
           <UIcon name="hugeicons:delivery-delay-02" class="size-4" />
           1-kun ichida yetkazamiz</div>
  

           <UButton
           class="mt-4 w-full flex items-center justify-center"
               color="warning"
               variant="outline"
        label="Mahsulotga o'tish  "
        icon="ix:product"
        :to="store.product.productUrl"
        target="_blank"
      />
          </div>

  
                       <!-- <div class="text-2xl font-bold text-gray-900 mb-2">
                 {{ store.product.price.toLocaleString('uz-UZ') }} so'm
               </div>
  
  
               <div class="flex items-center gap-2 mt-4">
                 <img class="w-10 rounded-lg" src="/assets/uzum-nasiya.png" alt="Error">
                 <span class="text-lg font-medium">
                   {{ monthlyRepayment }} so'm/oy dan
                 </span>
                 <span class="text-sm text-gray-500">({{ monthly }} oy)</span>
               </div> -->
  
  <div class="w-full max-w-full sm:w-[400px] border border-gray-300 rounded-xl shadow-lg p-5">
            <div class="flex items-center gap-3">
                     <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <UIcon name="solar:shop-linear" class="size-7 flex justify-center" />
                     </div>
                     <div>
                       <div class="font-semibold text-sm mb-2">{{ sellers }}</div>
                       <div class="flex items-center gap-2 text-sm text-gray-600">
                        <div class="flex items-center">
                          <UIcon name="material-symbols:star-rate-rounded" class="size-7 text-yellow-400 flex justify-center" />
                          <span>{{ sellersRating }}</span>
                        </div>
                         <span class="text-xs flex items-center gap-2">({{ sellersReviews }} sharh) <UIcon name="fa6-regular:comments" class="size-4" /></span>
                       </div>
                     </div>
                   </div>
  
                   <UButton :to="`https://uzum.uz/uz/shop/${getParsedProductModel(store.product.productModel).Seller.Link}`" class="mt-5 w-full flex items-center justify-center" color="warning" variant="outline">Do'konga o'tish</UButton>
          </div>
  
           </div>      
        </div>
          
        

          <div class="h-[510px] w-full max-w-[305px] overflow-y-auto hidden lg:flex flex-col gap-5" >
            <h3 v-if="linkedProducts && linkedProducts.length > 0" class="text-2xl my-4 font-bold">O'xshash mahsulotlar</h3>
            <Card  v-if="linkedProducts && linkedProducts.length > 0"  :data="linkedProducts" />

            <div   v-if="!store.linkedProducts || store.linkedProducts?.length === 0"
   class="flex flex-col items-center justify-center border border-gray-300 shadow-xl px-3 rounded-lg h-full py-6">
        <div class="w-24 h-24 mb-6 text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ --><path fill="currentColor" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176M7.4 8.55a.75.75 0 0 1 1.05-.15l2 1.5a.75.75 0 0 1 0 1.2l-2 1.5a.75.75 0 1 1-.9-1.2l1.2-.9l-1.2-.9a.75.75 0 0 1-.15-1.05m9.2 0a.75.75 0 0 1-.15 1.05l-1.2.9l1.2.9a.75.75 0 1 1-.9 1.2l-2-1.5a.75.75 0 0 1 0-1.2l2-1.5a.75.75 0 0 1 1.05.15m-8.13 6.92l1-1a.75.75 0 0 1 1.06 0l.47.47l.47-.47a.75.75 0 0 1 1.06 0l.47.47l.47-.47a.75.75 0 0 1 1.06 0l1 1a.75.75 0 1 1-1.06 1.06l-.47-.47l-.47.47a.75.75 0 0 1-1.06 0l-.47-.47l-.47.47a.75.75 0 0 1-1.06 0l-.47-.47l-.47.47a.75.75 0 0 1-1.06-1.06" clip-rule="evenodd"/></svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Mahsulot topilmadi</h3>
        <p class="text-gray-500 text-center max-w-sm">
          Hozirda o'xshash mahsulotlar mavjud emas. Iltimos, keyinroq qayta tekshiring.
        </p>
        <button class="mt-6 px-4 py-2 bg-warning text-white rounded-md hover:bg-warning/90 transition-colors">
          Bosh sahifaga qaytish
        </button>
      </div>
                </div>
      </div>


      <div class="max-w-4xl pt-2 mt-4">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl font-bold text-gray-900">{{ getParsedProductModel(store.product.productModel).ReviewsAmount }}</span>
      <div class="flex items-center gap-1">
        <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= 3 ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <span class="text-gray-500">{{ getParsedProductModel(store.product.productModel).ReviewsAmount }} sharh</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div
  v-if="getParsedProductModel(store.product.productModel).TopFeedback &&
        Object.values(getParsedProductModel(store.product.productModel).TopFeedback).some(v => v)"
  class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
>
  <div class="flex items-start justify-between mb-3">
    <div>
      <h3 class="font-semibold flex items-center text-gray-900">
        <UIcon name="material-symbols:account-circle" class="text-gray-900 mr-2" />
        {{ getParsedProductModel(store.product.productModel).TopFeedback.Customer }}
      </h3>
      <p class="text-sm text-gray-500">
        {{ formatDate(getParsedProductModel(store.product.productModel).TopFeedback.Date) }}
      </p>
    </div>
    <div class="flex items-center">
       <UIcon name="material-symbols:kid-star" class=" text-yellow-400 fill-current mr-1 size-5" />
      <span class="text-sm text-gray-600 ml-1">
        {{ getParsedProductModel(store.product.productModel).TopFeedback.Rating }}.0
      </span>
    </div>
  </div>
  <p class="text-gray-700 flex items-center">
    <UIcon name="iconamoon:comment-duotone mr-1" />
    <span class="font-medium mr-2">Izoh:</span>
    {{ getParsedProductModel(store.product.productModel).TopFeedback.Content }}
  </p>
</div>
    </div>

  </div>

            <n-tabs type="line" animated>
  <template #tabs="{ panes }">
    <div class="flex w-full">
      <div
        v-for="pane in panes"
        :key="pane.name"
        class="flex-1 text-center border border-gray-300 py-2 cursor-pointer"
        :class="{ 'bg-gray-200 font-bold': pane.name === store.activeTab }"
        @click="store.activeTab = pane.name"
      >
        {{ pane.tab }}
      </div>
    </div>
  </template>

  <n-tab-pane name="oasis" tab="Описание">
     <div
    v-if="store.product.description"
    class="gap-x-12 gap-y-2 max-w-full mt-6"
  >

               <div class="text-gray-700 leading-relaxed" v-html="store.product.description"></div>
  </div>

    <p
      v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.[locale]?.description"
      class="w-full max-w-[900px] mt-12"
      v-html="getParsedProductModel(store.product.productModel)?.[locale].description"
    ></p>
  </n-tab-pane>

  <n-tab-pane
    v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.[locale]?.composition"
    name="sostav"
    tab="Состав"
  >
    <p class="w-full max-w-full mt-12" v-html="getParsedProductModel(store.product.productModel)?.[locale].composition"></p>
  </n-tab-pane>

  <n-tab-pane
    v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.[locale]?.sizes"
    name="the beatles"
    tab="Размеры"
  >
    <p class="w-full max-w-full mt-12" v-html="getParsedProductModel(store.product.productModel)?.[locale].sizes"></p>
  </n-tab-pane>
</n-tabs>
    </div>
</template>

<script setup lang="ts">
import { NRate , NTab , NTabs , NTabPane } from '#components'
import { useRoute } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { useAuthStore } from '#imports'
import { ref, computed , watch , onMounted } from 'vue'
import CategoryPath from './CategoryPath.vue'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'

const store = useProductSeoStore() // <- o'zingiz ishlatayotgan store
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const linkedProducts = store.linkedProducts?.map(item => item.product) || []




definePageMeta({
  ssr: false
})


// Product model o'zgaruvchilari
const monthlyRepayment = computed(() => {
  return parsedModel.value?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth ?? null
})

const monthly = computed(() => {
  return parsedModel.value?.SkuList?.[0]?.ProductOptionDtos?.[0]?.Period ?? null
})

const sellers = computed(() => {
  return parsedModel.value?.Seller?.Title ?? null
})

const sellersRating = computed(() => {
  return parsedModel.value?.Seller?.Rating ?? null
})

const sellersReviews = computed(() => {
  return parsedModel.value?.Seller?.Reviews ?? null
})

function handleAddFavorites(product: Product) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    new Audio(errorAudio).play();
    toast.add({
      title: 'Diqqat!',
      description: 'Avval login qilishingiz kerak.',
      icon: 'mynaui:x-circle',
      color: 'warning'
    });
    return;
  }

  if (!authStore.profileData?.data?.favorites?.id) {
    toast.add({
      title: 'Xatolik!',
      description: 'Favorites maʼlumotlari topilmadi.',
      icon: 'mynaui:x-circle',
      color: 'warning'
    });
    return;
  }

  addFavorites(
    authStore.profileData.data.favorites.id,
    product.id,
    product.name
  );
}



// Format data
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('uz-UZ', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const copyRoute = async () => {
  try {
    const fullUrl = window.location.origin + route.fullPath
    await navigator.clipboard.writeText(fullUrl)
        new Audio(successAudio).play();
    toast.add({
      title: 'Mahsulot muvaffaqiyatli copy qilindi',
      color: 'success',
      icon: 'lucide:copy'
    })
  } catch (error) {
        new Audio(errorAudio).play();
    toast.add({
      title: 'Copy qilishda xatolik yuz berdi',
      color: 'error',
      icon: 'lucide:x-circle'
    })
    console.error('Copy failed:', error)
  }
}

async function addFavorites(
  favouritesId: number,
  productId: number,
  productName: string
): Promise<void> {
  try {

    const token = localStorage.getItem('accessToken')

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
      authStore.getProfileData()
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
  }
}


async function deleteFavoritesHandler(
  favouritesId: number,
  productId: number,
  productName: string
) {
  try {

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
        new Audio(errorAudio).play();


      authStore.getProfileData()
    } else {
      toast.add({
        title: 'Xatolik!',
        description: data?.message || 'Nomaʼlum xatolik yuz berdi.',
        icon: 'mynaui:x-circle',
      })
        new Audio(errorAudio).play();

    }
  } catch (error: any) {
    console.error(error)
    toast.add({
      title: 'Xatolik!',
      description: error?.message || 'So‘rov bajarilmadi. Internetni tekshiring.',
      icon: 'mynaui:x-circle',
    })
        new Audio(errorAudio).play();

  }
}


const isFavorite = (productId: number): boolean => {
  return (
    authStore.profileData?.data?.favorites?.favoriteProducts?.some(
      (item: { product: { id: number } }) => item.product.id === productId
    ) ?? false
  )
} 



// onMounted(() => {
//   const id = route.params.id
//   store.getProductSimilars(id)
// })


// Carousel slider parametrs
const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}



const breadcrumb = computed(() => {
  const categories = categoryStore.categoryData || []
  const categoryModel = store.product?.categoryResultModel

  if (!categories.length || !categoryModel?.name) return []

  try {
    const path = findCategoryPath(categories, categoryModel.name)
    return path && path.length > 1 ? path : [categoryModel]
  } catch (e) {
    console.error('Kategoriya path topilmadi:', e)
    return [categoryModel]
  }
})

// Json parse qilish product.productModel
const parsedModel = computed(() => {
  const parsed = getParsedProductModel(store.product.productModel)
  return typeof parsed === 'object' && parsed !== null ? parsed : null
})

const getParsedProductModel = (productModel: string): Record<string, any> | string => {
  try {
    return JSON.parse(productModel) || "Noma'lum"
  } catch (error) {
    return "Xato"
  }
}


// Mahsulot zaxirasi tugaganmi?
// const isSoldOut = computed(() =>
//   getParsedProductModel(store.product.productModel).TotalAvailableAmount === 0
// )
</script>

<style scoped>
/* From Uiverse.io by Shoh2008 */ 
.loader {
  width: 64px;
  height: 64px;
  position: relative;
  background: #FFF;
  border-radius: 4px;
  overflow: hidden;
}

.loader:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  transform: rotate(45deg) translate(30%, 40%);
  background: #feee00;
  box-shadow: 32px -34px 0 5px #feee00;
  animation: slide 2s infinite ease-in-out alternate;
}

.loader:after {
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #feee00;
  transform: rotate(0deg);
  transform-origin: 35px 145px;
  animation: rotate 2s infinite ease-in-out;
}

@keyframes slide {
  0% , 100% {
    bottom: -35px
  }

  25% , 75% {
    bottom: -2px
  }

  20% , 80% {
    bottom: 2px
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-15deg)
  }

  25% , 75% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(25deg)
  }
}
  
</style>