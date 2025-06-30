<template>
    <div class="container py-6">
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
  
               <div class="bg-white p-6 rounded-lg shadow-sm border">
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
  
          <div class="h-[510px] overflow-y-auto flex flex-col gap-5" >
            <h3 class="text-2xl my-4 font-bold">O'xshash mahsulotlar</h3>
            <Card :data="store.similarProductData" />
          </div>
      </div>

          <h3 class="text-green-500 font-medium text-3xl my-5 border-b-2 w-[300px] border-b-green-400">Description:</h3>
           <div class="text-gray-700 leading-relaxed" v-html="store.product.description" />

    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { ref, computed , watch , onMounted } from 'vue'

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