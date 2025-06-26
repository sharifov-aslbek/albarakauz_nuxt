<template>
  <div
  @click="navigaItem(product.id)"
  v-for="product in data"
  :key="product.id"
  class="bg-gray-100 card w-full max-w-[300px] h-[450px] cursor-pointer rounded-lg p-4 flex flex-col justify-between"
>
  <!-- Rasm -->
  <div class="flex justify-center items-center aspect-square mb-4">
    <img
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
      <div class="mb-3 min-h-[32px]">
        <span
          v-if="getParsedProductModel(product.productModel)?.SkuList?.[0]?.ProductOptionDtos?.[0]?.PaymentPerMonth && product.marketResultmodel?.url === 'https://uzum.uz'"
          class="inline-block w-full text-center rounded-lg bg-green-100 text-green-800 py-1 text-sm font-medium"
        >
          {{
            getParsedProductModel(product.productModel).SkuList[0].ProductOptionDtos[0].PaymentPerMonth
          }} so'm / oy
        </span>

        <span
          v-else-if="getParsedProductModel(product.productModel)?.storeProducts?.[0]?.monthly_repayment && product.marketResultmodel?.url === 'https://olcha.uz'"
          class="inline-block w-full text-center rounded-lg bg-green-100 text-green-800 py-1 text-sm font-medium"
        >
          {{
            getParsedProductModel(product.productModel).storeProducts[0].monthly_repayment.toLocaleString('uz-UZ')
          }} so'm / 12 months
        </span>
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
import { useRouter } from 'vue-router';
const props = defineProps<{
  data: Array<any>
}>()

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
