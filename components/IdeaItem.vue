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
           <UButton  v-else  @click.stop="handleAddFavorites(store.product)" icon="material-symbols-light:favorite-outline" size="md" color="neutral" variant="outline">Sevimliga qo'shish</UButton>

           <UButton @click="copyRoute" icon="material-symbols-light:content-copy-outline-rounded" size="md" color="neutral" variant="outline">Copy Product</UButton>
        </div>
      </div>

      <h3 v-if="linkedProducts && linkedProducts.length > 0" class="lg:hidden block text-2xl my-4 font-bold">O'xshash mahsulotlar</h3>

      <MiniCard v-if="linkedProducts && linkedProducts.length > 0"  :data="linkedProducts" />

        <div class="flex flex-col md:flex-row pb-5 justify-between gap-5 w-full max-w-full mr-7 py-12">
          <div class="flex w-full h-[500px]">
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


                         <p
  class="my-5"
  v-if="!getParsedProductModel(store.product.productModel)?.main_features?.data"
  v-html="getParsedProductModel(store.product.productModel).short_description_ru"
></p>


        <div
          v-if="store.product.marketResultmodel.name === 'Olcha' &&
          getParsedProductModel(store.product.productModel)?.main_features?.data"
          class="space-y-2 w-full lg:w-[400px]"
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


                       <div class="text-2xl font-bold text-gray-900 mb-6">
                 {{ store.product.price.toLocaleString('uz-UZ') }} so'm
               </div>



            
               <UButton
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
        

        <div class="flex gap-12 justify-center">
          <n-tabs type="line" animated>
                  <template #tabs="{ panes }">
                    <div class="flex w-full">
                      <div
                        v-for="pane in panes"
                        :key="pane.name"
                        class="flex-1 text-center border border-gray-300 py-2 cursor-pointer text-sm md:text-base"
                        :class="{ 'bg-gray-200 font-bold': pane.name === store.activeTab }"
                        @click="store.activeTab = pane.name"
                      >
                        {{ pane.tab }}
                      </div>
                    </div>
                  </template>
          
                  <n-tab-pane name="oasis" tab="Описание">
                    <p
                      v-if="store.product.description"
                      class="w-full max-w-full text-sm md:text-base"
                      v-html="store.product.description"
                    ></p>
                  
                    
                    <div v-if="store.product.descriptionUz || store.product.descriptionRu" class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-4xl mt-6">
                      <p v-if="store.product.descriptionUz" class="w-full max-w-full mb-6 md:mb-12 text-sm md:text-base">
                        {{ store.product.descriptionUz }}
                      </p>
                      <p v-else class="w-full max-w-full mb-6 md:mb-12 text-sm md:text-base">
                        {{ store.product.descriptionRu }}
                      </p>
                    </div>
          
                    <!-- <p
                      v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.[locale]?.description"
                      class="w-full max-w-[900px] mt-6 md:mt-12 text-sm md:text-base"
                      v-html="getParsedProductModel(store.product.productModel)?.[locale].description"
                    ></p> -->
                  </n-tab-pane>
          
                  <n-tab-pane
                    v-if="store.product.productModel && getParsedProductModel(store.product.productModel)?.main_features?.data"
                    name="xarakteristika"
                    tab="Характеристика"
                  >
                    <div
                      v-for="feature in getParsedProductModel(store.product.productModel).features[getParsedProductModel(store.product.productModel).main_features.data[0].group_id].data"
                      :key="feature.feature_name_uz"
                      class="flex justify-between text-sm md:text-base text-gray-700 w-full gap-3"
                    >
                      <span class="text-gray-400 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        {{ feature.feature_name_ru }}
                      </span>
                      <span class="flex-1 border-b border-dotted border-gray-300 mx-2"></span>
                      <span class="text-black whitespace-nowrap overflow-hidden max-w-full">
                        {{ feature.feature_value_name_ru }}
                      </span>
                    </div>
                  </n-tab-pane>
                </n-tabs>

                   <div class="mb-7 w-full xl:w-[28%]">
      <div v-if="store.product.marketResultmodel.name == 'Olcha'" 
        :class="[
          'flex flex-col justify-between border-gray-300 border gap-8 md:gap-14 rounded-lg py-4 md:py-10 px-4 md:px-5'
        ]">
                  <ItemOlchaMarketMap />

        <!-- <YandexMap
          v-if="lat !== null && lng !== null"
          :lat="lat"
          :lng="lng"
          class="h-[200px] md:h-[250px]"
        /> -->
        
        <h3 v-if="store.product.marketResultmodel.name === 'Olcha' &&
          getParsedProductModel(store.product.productModel)?.store
        ">
          <span class="flex items-center font-bold text-lg gap-2 mb-2">
            <UIcon class="size-8" name="material-symbols-light:home-work-rounded" />
            {{ getParsedProductModel(store.product.productModel).store.name_ru }}
          </span>
          <p class="text-sm md:text-base">{{ getParsedProductModel(store.product.productModel).store.address_ru }}</p>
  
  
          <h3 class="flex text-base md:text-lg font-semibold gap-2 mt-7 items-center">
            <UIcon class="size-8" name="material-symbols:delivery-truck-bolt-outline-rounded" />
            Стандартная доставка
          </h3>
          <p class="text-sm md:text-base">
            {{ getParsedProductModel(store.product.productModel).store.delivery_info_ru }}
          </p>
  
          <h3 class="flex text-base md:text-lg font-semibold gap-2 items-center mt-6 md:mt-10">
            <UIcon class="size-8" name="ph:hand-coins-fill" />
            Рассрочка от:
          </h3>
          <h3
  v-if="
    getParsedProductModel(store.product.productModel)?.storeProducts?.length > 0 &&
    getParsedProductModel(store.product.productModel).storeProducts[0].monthly_repayment
  "
  class="text-brand-green text-lg md:text-lg mt-5 font-semibold"
>
  {{
    getParsedProductModel(store.product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
  }} so'm / 12 months
</h3>


<!-- {{ getParsedProductModel(store.product.productModel).store.lng }} -->

        </h3>
      </div>
    </div>
  
        </div>

        

    </div>
</template>

<script setup lang="ts">
import { NTabs , NTabPane } from '#components'
import { useRoute } from 'vue-router'
import { useAuthStore } from '#imports'
import { useProductSeoStore } from '@/stores/productSeo'
import { ref, computed , watch } from 'vue'
import CategoryPath from './CategoryPath.vue'
import Card from './Card.vue'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'

definePageMeta({
  ssr: false
})

const authStore = useAuthStore() // <- o'zingiz ishlatayotgan store
const store = useProductSeoStore() // <- o'zingiz ishlatayotgan store
const toast = useToast();
const route = useRoute();
const linkedProducts = store.linkedProducts?.map(item => item.product) || []

// const lng = ref(null)
// const lat = ref(null)

// watch(
//   () => store.product,
//   (newVal) => {
//     const parsed = getParsedProductModel(newVal.productModel);
//     if (parsed?.store?.lat && parsed?.store?.lng) {
//       lat.value = parsed.store.lat;
//       lng.value = parsed.store.lng;
//     } else {
//       lat.value = null;
//       lng.value = null;
//     }
//   },
//   { immediate: true, deep: true }
// );

function handleAddFavorites(product: Product) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    new Audio(errorAudio).play();
    toast.add({
      title: 'Diqqat!',
      description: 'Avval login qilishingiz kerak.',
      icon: 'mynaui:x-circle'
    });
    return;
  }

  if (!authStore.profileData?.data?.favorites?.id) {
    toast.add({
      title: 'Xatolik!',
      description: 'Favorites maʼlumotlari topilmadi.',
      icon: 'mynaui:x-circle'
    });
    return;
  }

  addFavorites(
    authStore.profileData.data.favorites.id,
    product.id,
    product.name
  );
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