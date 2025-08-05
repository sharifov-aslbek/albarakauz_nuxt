<template>
  <div class="container">
    <h3 class="text-3xl font-bold mt-30 mb-10">O'xshash mahsulotlar</h3>
    <UCarousel arrows v-slot="{ item }" :items="props.data"
      class="w-full mx-auto max-w-[320px] sm:max-w-none hidden md:block" :ui="{
        item: 'basis-1/1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
      }">
      <div @click="navigaItem(item.id, item.name)"
        class="bg-gray-200 card w-full max-w-[300px] h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between">
        <!-- Rasm -->
        <div class="flex justify-center items-center aspect-square mb-4">
          <img v-if="item.productImages?.length > 0"
            :src="`https://api.albaraka.uz/${item.productImages[0].imageEntity.localImagePath}`"
            :alt="`${item.name} - Image 1`"
            class="w-full max-w-[260px] h-full max-h-[250px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>

        <!-- Kontent -->
        <div class="flex flex-col justify-between flex-grow">
          <div>
            <h3 class="text-sm font-medium mb-3 line-clamp-2">{{ item.name }}</h3>

            <div class="mb-3 flex justify-between gap-10 min-h-[32px]">
              <div v-if="
                item.productModel &&
                item.marketResultmodel?.name === 'Uzum' &&
                getParsedProductModel(item.productModel)?.Rating
              " class="flex items-center gap-1">
                <UIcon name="material-symbols:star-rounded" class="text-yellow-400 size-5" />
                <div v-if="
                  item.productModel &&
                  item.marketResultmodel &&
                  item.marketResultmodel.url === 'https://uzum.uz'
                " class="text-sm font-bold">
                  {{ getParsedProductModel(item.productModel).Rating }}
                </div>
              </div>

              <n-tag type="warning" v-if="
                getParsedProductModel(item.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth &&
                item.marketResultmodel?.url === 'https://uzum.uz'
              ">
                {{
                  getParsedProductModel(item.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
                }} so'm / oy
              </n-tag>

              <span v-else-if="
                getParsedProductModel(item.productModel)?.storeProducts?.[0]?.monthly_repayment &&
                item.marketResultmodel?.url === 'https://olcha.uz'
              " class="inline-block w-full text-center rounded-lg bg-[#feee00] text-black py-1 text-sm font-medium">
                {{
                  getParsedProductModel(item.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
                }} so'm / 12 months
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between mt-auto">
            <div class="text-sm font-bold text-gray-800">
              {{ item.price?.toLocaleString('uz-UZ') }} so'm
            </div>
            <img v-if="item.marketResultmodel?.url" class="w-16" :src="getMarketLogo(item.marketResultmodel.url)"
              alt="Market Logo" />
          </div>
        </div>
      </div>
    </UCarousel>


    <div class="grid md:hidden grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="item in props.data" :key="item.id" @click="navigaItem(item.id, item.name)"
        class="bg-gray-200 card w-full h-[410px] sm:h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between">
        <!-- Rasm -->
        <!-- Rasm -->
        <div class="flex justify-center items-center mb-4">
          <img v-if="item.productImages?.length > 0"
            :src="`https://api.albaraka.uz/${item.productImages[0].imageEntity.localImagePath}`"
            :alt="`${item.name} - Image 1`"
            class="w-full h-[180px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" />
        </div>

        <!-- Kontent -->
        <div class="flex flex-col justify-between flex-grow overflow-hidden">
          <div>
            <h3 class="text-sm font-medium mb-3 line-clamp-2">{{ item.name }}</h3>

            <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center min-h-[32px]">
              <!-- Rating -->
              <div v-if="
                item.productModel &&
                item.marketResultmodel?.name === 'Uzum' &&
                getParsedProductModel(item.productModel)?.Rating
              " class="flex items-center gap-1">
                <UIcon name="material-symbols:star-rounded" class="text-yellow-400 size-5" />
                <div v-if="item.marketResultmodel?.url === 'https://uzum.uz'" class="text-sm font-bold">
                  {{ getParsedProductModel(item.productModel).Rating }}
                </div>
              </div>

              <!-- Uzum - oyiga to'lov -->
              <n-tag type="warning" v-if="
                getParsedProductModel(item.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth &&
                item.marketResultmodel?.url === 'https://uzum.uz'
              ">
                {{
                  getParsedProductModel(item.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
                }} so'm / oy
              </n-tag>

              <!-- Olcha - oyiga to'lov -->
              <span v-else-if="
                getParsedProductModel(item.productModel)?.storeProducts?.[0]?.monthly_repayment &&
                item.marketResultmodel?.url === 'https://olcha.uz'
              " class="inline-block w-full sm:w-auto text-center rounded-lg bg-[#feee00] text-black py-1 text-sm font-medium">
                {{
                  getParsedProductModel(item.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
                }} so'm / 12 months
              </span>
            </div>

          </div>

          <div class="flex items-center justify-between mt-auto">
            <div class="text-sm font-bold text-gray-800">
              {{ item.price?.toLocaleString('uz-UZ') }} so'm
            </div>
            <img v-if="item.marketResultmodel?.url" class="w-16" :src="getMarketLogo(item.marketResultmodel.url)"
              alt="Market Logo" />
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useProductSeoStore } from '#imports';
import { useRouter, useRoute } from 'vue-router';
const props = defineProps<{
  data: Array<any>
}>()

const router = useRouter();
const route = useRoute();
const seoStore = useProductSeoStore()
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

  seoStore.linkedProducts = [] // O'xshash mahsulotlarni tozalash
  // seoStore.similarProductData = <any>(null)
  //  seoStore.getProductSimilars(route.params.id as string)
  router.push(`/product/${formattedSlug}-${id}`)
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
