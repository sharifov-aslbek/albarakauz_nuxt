<template>
    <div class="container py-6">
      <div class="flex items-center justify-between">
        <div>
          <CategoryPath />
        
          <div 
  v-if="
    store.product.productModel &&
    getParsedProductModel(store.product.productModel).Rating
  " 
  class="flex items-center gap-4 my-4"
>
  <n-rate
    readonly 
    :default-value="getParsedProductModel(store.product.productModel).Rating" 
  />

  <a target="_blank" :href="store.product.productUrl" class="text-gray-500 text-sm">
    {{ getParsedProductModel(store.product.productModel).Rating }} - 
    <span>({{ getParsedProductModel(store.product.productModel).ReviewsAmount }} sharh)</span> - 
    <span>{{ getParsedProductModel(store.product.productModel).OrdersAmount }} marta sotilgan</span>
  </a>
</div>
        </div>


        <div class="flex gap-3">
           <UButton v-if="isFavorite(store.product.id)"  @click.stop="deleteFavoritesHandler(authStore.profileData.data.favorites.id, store.product.id , store.product.name)" icon="material-symbols-light:heart-check" size="md" color="error" variant="soft">Added to favorites</UButton>
           <UButton  v-else  @click.stop="addFavorites(authStore.profileData.data.favorites.id, store.product.id , store.product.name)" icon="material-symbols-light:favorite-outline" size="md" color="neutral" variant="outline">Add to favorites</UButton>

           <UButton @click="copyRoute" icon="material-symbols-light:content-copy-outline-rounded" size="md" color="neutral" variant="outline">Copy Product</UButton>
        </div>
      </div>

      <h3 v-if="linkedProducts && linkedProducts.length > 0" class="lg:hidden block text-2xl my-4 font-bold">O'xshash mahsulotlar</h3>

      <MiniCard v-if="linkedProducts && linkedProducts.length > 0"  :data="linkedProducts" />

        <div class="flex flex-col md:flex-row pb-5 justify-between w-full max-w-full gap-6 mr-7 py-12">
          <div class="flex w-[500px] h-[500px]">
                  <n-scrollbar
    style="max-height: 500px; width: 80px;"
  >
    <div class="flex flex-col gap-5 justify-around pt-4 max-w-xs mx-auto">
      <div
        v-for="(item, index) in store.product.productImages"
        :key="index"
        class="size-11 opacity-40 hover:opacity-100 transition-opacity"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <img
          :src="item.imageEntity.externalImagePath"
          width="100"
          height="100"
          class="rounded-lg object-cover"
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
      class="sm:w-full sm:max-w-[450px] w-full"
      @select="onSelect"
    >
      <!-- Show image if path exists, otherwise show not found -->
      <n-image
        v-if="item.imageEntity && item.imageEntity.localImagePath"
        class="rounded-lg object-cover h-[500px]"
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
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm font-medium">Image not found</p>
      </div>
    </div>
  </div>

</div>

              <!-- <div class="flex md:justify-center gap-4 w-full">
           <div class="md:flex flex-col gap-5 h-[500px] hidden overflow-y-scroll">
             <img
               v-for="(image, index) in store.product.productImages"
               :key="index"
               class="w-14 cursor-pointer rounded-lg object-cover"
               @click="goToSlide(index)"
               :class="{
                 'border border-blue-500': activeIndex === index,
                 'border-gray-300': activeIndex !== index,
               }"
               :src="image.imageEntity.externalImagePath"
               alt=""
             />
           </div>
      
           <el-carousel
             ref="carouselRef"
             class="w-[400px]"
             height="500px"
             arrow="always"
             indicator-position="outside"
             @change="handleChange"
           >
             <el-carousel-item
               v-for="(image, index) in store.product.productImages"
               :key="index"
             >
               <div class="relative">
                 <img
                   class="w-full h-[500px] object-cover rounded-lg"
                   :src="image.imageEntity.externalImagePath"
                   alt=""
                 />
               </div>
             </el-carousel-item>
           </el-carousel>
         </div> -->
       
           <div class="flex w-full max-w-[450px] flex-col items-start space-y-6">
                               <div class="flex justify-between w-full gap-3 py-4">
                           <h1 class="text-3xl mr-4 w-full max-w-[470px] font-bold">{{ store.product.name }}</h1>
                       </div>


   <div
  v-for="feature in getParsedProductModel(store.product.productModel).uz.characteristics[0].characters.slice(0 , 5)"
  :key="feature.feature_name_uz"
  class="flex w-full items-center text-xs md:text-sm text-gray-700"
>
  <!-- Feature Name -->
  <span class="text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
    {{ feature.name }}
  </span>

  <!-- Dotted Line -->
  <span class="flex-1 border-b border-dotted border-gray-300 mx-2"></span>

  <!-- Feature Value -->
  <span class="text-black whitespace-nowrap overflow-hidden text-ellipsis">
    {{ feature.value }}
  </span>
</div>


                       <div class="text-2xl font-bold text-gray-900 mb-2">
                 {{ store.product.price.toLocaleString('uz-UZ') }} so'm
               </div>



            
               <UButton
               color="warning"
               class="mt-14"
        label="Do'konga o'tish  "
        icon="solar:shop-linear"
        :to="store.product.productUrl"
        target="_blank"
      />


           </div>  
            <div class="h-[510px] w-full max-w-[305px] overflow-y-auto flex flex-col gap-5" >
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
        <RouterLink to="/" class="mt-6 px-4 py-2 bg-warning text-white rounded-md hover:bg-warning/90 transition-colors">
          Bosh sahifaga qaytish
        </RouterLink>
      </div>
          </div>

        </div>
        
<n-tabs type="line" animated :style="tabStyle">
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

  <n-tab-pane name="description" tab="Tavsif">
     <div
    v-if="store.product.description"
    class="gap-x-12 gap-y-2 max-w-full mt-6"
  >
  <!-- grid grid-cols-1 md:grid-cols-2 -->
  <div v-html="store.product.description"></div>
  <!-- {{ getParsedProductModel(store.product.productModel)?.[locale][1].characters }} -->
    <!-- Chap ustun -->
    <!-- <ul>
      <li
        v-for="(item, index) in getParsedProductModel(store.product.productModel)?.[locale]?.shortDescription"
        :key="'left-' + index"
        class="list-disc list-inside"
      >
        {{ item }}
      </li>
    </ul> -->
  </div>

    <p
      v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.[locale]?.description"
      class="w-full max-w-[900px] mt-12"
      v-html="getParsedProductModel(store.product.productModel)?.[locale].description"
    ></p>
  </n-tab-pane>

  <n-tab-pane
  id="xususiyatlar"
        v-if="getParsedProductModel(store.product.productModel).uz.characteristics.find(c => c.name === 'Qadoq o\'lchamlari')"
    name="xususiyatlar"
    tab="Xususiyatlar"
  >
  <div
    v-if="getParsedProductModel(store.product.productModel).uz.characteristics.find(c => c.name === 'Qadoq o\'lchamlari')"
  >
    <div
      v-for="(feature, index) in getParsedProductModel(store.product.productModel).uz.characteristics.find(c => c.name === 'Qadoq o\'lchamlari').characters"
      :key="index"
      class="flex w-full items-center text-xs md:text-sm text-gray-700"
    >
      <!-- Feature Name -->
      <span class="text-gray-400 my-3 whitespace-nowrap overflow-hidden text-ellipsis">
        {{ feature.name }}
      </span>

      <!-- Dotted Line -->
      <span class="flex-1 border-b border-dotted border-gray-300 mx-2"></span>

      <!-- Feature Value -->
      <span class="text-black whitespace-nowrap overflow-hidden text-ellipsis">
        {{ feature.value }}
      </span>
    </div>
  </div>

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
import { useRoute } from 'vue-router'
import { NTabs , NTab , NTabPane } from '#components'
import { useProductSeoStore } from '@/stores/productSeo'
import { useAuthStore } from '#imports'
import { ref, computed } from 'vue'
import CategoryPath from './CategoryPath.vue'
import Card from './Card.vue'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'
import { tabs } from '#build/ui'

const store = useProductSeoStore() // <- o'zingiz ishlatayotgan store
const toast = useToast(); 
const route = useRoute();
const linkedProducts = store.linkedProducts?.map(item => item.product) || []
const authStore = useAuthStore();
const tabStyle = {
  '--n-tab-text-color': 'gray',             // Oddiy holatdagi matn rangi
  '--n-tab-text-color-active': '#feee00',
  '--n-bar-color': '#feee00',     // Aktiv holatdagi matn rangi
  '--n-tab-text-color-hover': '#feee00',      // Hover holatdagi matn rangi
};
// Product model o'zgaruvchilari
// const monthlyRepayment = computed(() => {
//   return parsedModel.value?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth ?? null
// })

definePageMeta({
  ssr: false
})



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

</style>