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
           <UButton icon="material-symbols-light:favorite-outline" size="md" color="neutral" variant="outline">Add to favorites</UButton>

           <UButton icon="material-symbols-light:content-copy-outline-rounded" size="md" color="neutral" variant="outline">Copy Product</UButton>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex flex-col md:flex-row pb-5 gap-6 mr-7 py-12">
          <div class="flex gap-5 w-full h-[500px]">
            <div class="flex flex-col gap-1 justify-around pt-4 max-w-xs mx-auto">
              <div
                v-for="(item, index) in store.product.productImages"
                :key="index"
                class="size-11 opacity-40 hover:opacity-100 transition-opacity"
                :class="{ 'opacity-100': activeIndex === index }"
                @click="select(index)"
              >
                <img :src="item.imageEntity.externalImagePath" width="100" height="100" class="rounded-lg">
              </div>
            </div>
  <UCarousel
    ref="carousel"
    v-slot="{ item }"
    arrows
    :items="store.product.productImages"
    :prev="{ onClick: onClickPrev }"
    :next="{ onClick: onClickNext }"
    class="w-[500px] mx-auto"
    @select="onSelect"
  >
    <img
      :src="item.imageEntity.externalImagePath"
      width="500"
      height="500"
      class="rounded-lg object-cover w-[500px] h-[500px]"
    >
  </UCarousel>
  
  </div>
           <div class="flex w-full max-w-full flex-col items-start space-y-6">
                               <div class="flex justify-between w-full gap-3 pb-4">
                           <h1 class="text-3xl mr-4 w-full max-w-[470px] font-bold">{{ store.product.name }}</h1>
                       </div>
  
  
                       <div class="text-2xl font-bold text-gray-900 mb-2">
                 {{ store.product.price.toLocaleString('uz-UZ') }} so'm
               </div>
  
  
               <div class="flex items-center gap-2 mt-4">
                 <!-- <CreditCard class="w-5 h-5" /> -->
                 <img class="w-10 rounded-lg" src="/assets/uzum-nasiya.png" alt="Error">
                 <span class="text-lg font-medium">
                   {{ monthlyRepayment }} so'm/oy dan
                 </span>
                 <span class="text-sm text-gray-500">({{ monthly }} oy)</span>
               </div>
  
               <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                 <h3 class="text-lg font-semibold mb-4">Sotuvchi</h3>
                 <div class="flex items-center justify-between">
                   <div class="flex items-center gap-3">
                     <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <UIcon name="solar:shop-linear" class="size-7 flex justify-center" />
                     </div>
                     <div>
                       <div class="font-semibold text-sm mb-2">{{ sellers }}</div>
                       <div class="flex items-center gap-2 text-sm text-gray-600">
                      <UIcon name="material-symbols:star-rate-rounded" class="size-7 text-yellow-400 flex justify-center" />
                         <span class="text-xs">{{ sellersRating }} ({{ sellersReviews }} sharh)</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
  
               <UButton
        label="Do'konga o'tish  "
        icon="solar:shop-linear"
        :to="store.product.productUrl"
        target="_blank"
      />
  
  
           </div>  
            
        </div>
        
          <div class="h-[510px] w-full max-w-[305px] overflow-y-auto flex flex-col gap-5" >
            <h3 v-if="store.similarProductData && store.similarProductData.length > 0" class="text-2xl my-4 font-bold">O'xshash mahsulotlar</h3>
            <Card  v-if="store.similarProductData && store.similarProductData.length > 0"  :data="store.similarProductData" />

            <div   v-if="!store.similarProductData || store.similarProductData?.length === 0"
   class="flex flex-col items-center justify-center border border-gray-200 px-3 rounded-lg h-full py-6">
        <div class="w-24 h-24 mb-6 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Mahsulot topilmadi</h3>
        <p class="text-gray-500 text-center max-w-sm">
          Hozirda o'xshash mahsulotlar mavjud emas. Iltimos, keyinroq qayta tekshiring.
        </p>
        <button class="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          Bosh sahifaga qaytish
        </button>
      </div>
          </div>
      </div>

      <div class="max-w-4xl pt-2 bg-white">
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
      <h3 class="font-semibold text-gray-900">
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
  <p class="text-gray-700">
    <span class="font-medium">Izoh:</span>
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
import { ref, computed , watch , onMounted } from 'vue'
import CategoryPath from './CategoryPath.vue'

const store = useProductSeoStore() // <- o'zingiz ishlatayotgan store
const route = useRoute();

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


// Format data
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('uz-UZ', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
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

</style>