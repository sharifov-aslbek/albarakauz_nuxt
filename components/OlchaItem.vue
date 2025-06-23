<template>
    <div class="container py-6">
        <div class="flex flex-col md:flex-row pb-5 gap-6 mr-7 py-12">
          <div class="flex w-full h-[500px]">
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
       
           <div class="flex w-full max-w-full flex-col items-start space-y-6">
                               <div class="flex justify-between w-full gap-3 py-4">
                           <h1 class="text-3xl mr-4 w-full max-w-[470px] font-bold">{{ store.product.name }}</h1>
                       </div>


                         <p
  class="my-5"
  v-if="!getParsedProductModel(store.product.productModel)?.main_features?.data"
  v-html="getParsedProductModel(store.product.productModel).short_description_ru"
></p>


        <div
          v-if="store.product.marketResultmodel.name === 'Olcha' &&
          getParsedProductModel(store.product.productModel)?.main_features?.data"
          class="space-y-2 w-full lg:w-[500px]"
        >
          <div
            v-for="feature in getParsedProductModel(store.product.productModel).main_features.data.slice(0 , 5)"
            :key="feature.feature_name_uz"
            class="flex justify-between text-xs md:text-sm text-gray-700"
          >
            <span class="text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] md:max-w-[150px]">
              {{ feature.feature_name_ru }}
            </span>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-2"></span>
            <span class="text-black whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] md:max-w-[200px]">
              {{ feature.feature_value_name_ru }}
            </span>
          </div>
        </div>

        <div v-if="store.product.marketResultmodel.name === 'Olcha' &&
          getParsedProductModel(store.product.productModel)?.main_features?.data" 
          class="flex items-center gap-3">
          <!-- IMG tag: faqat slug mavjud bo‘lsa va null bo‘lmasa ko‘rsatish -->
<img
  v-if="getParsedProductModel(store.product.productModel)?.manufacturer?.slug"
  class="w-8 md:w-12 rounded-md"
  :src="getParsedProductModel(store.product.productModel)?.manufacturer?.main_image"
  :alt="getParsedProductModel(store.product.productModel)?.manufacturer?.name_uz"
/>

<a
  v-if="getParsedProductModel(store.product.productModel)?.manufacturer?.name_uz"
  target="_blank"
  :href="`https://olcha.uz/ru/manufacturer/${getParsedProductModel(store.product.productModel)?.manufacturer?.slug}`"
  class="font-bold text-brand-blue cursor-pointer text-sm md:text-base"
>
  Все товары бренда {{ getParsedProductModel(store.product.productModel)?.manufacturer?.name_uz }}
</a>
</div>


                       <div class="text-2xl font-bold text-gray-900 mb-2">
                 {{ store.product.price.toLocaleString('uz-UZ') }} so'm
               </div>



            
               <UButton
        label="Do'konga o'tish  "
        icon="solar:shop-linear"
        :to="store.product.productUrl"
        target="_blank"
      />


           </div>  
            
        </div>
        

          <h3 class="text-green-500 font-medium text-3xl my-5 border-b-2 w-[300px] border-b-green-400">Description:</h3>
           <p
  v-if="getParsedProductModel(store.product.productModel)?.description_ru"
  v-html="getParsedProductModel(store.product.productModel).description_ru"
  class="text-sm md:text-base"
></p>

        

    </div>
</template>

<script setup lang="ts">
import { useProductSeoStore } from '@/stores/productSeo'
import { ref, computed } from 'vue'

const store = useProductSeoStore() // <- o'zingiz ishlatayotgan store


// Product model o'zgaruvchilari
// const monthlyRepayment = computed(() => {
//   return parsedModel.value?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth ?? null
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