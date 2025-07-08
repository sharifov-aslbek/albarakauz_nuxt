<template>
  <div class="container">
    <n-carousel class="rounded-lg" autoplay show-arrow>
      <div @click="navigateItem(product.id)"
  v-for="(product, index) in filteredProducts"
  :key="product.id">
        <div class="container relative w-full h-[600px] rounded-lg overflow-hidden">
    <div class="absolute inset-0 bg-[#06D6A0]/50"></div>
    <div class="relative h-full flex items-center px-2 md:px-12 lg:px-16">
      <div class="w-1/2 text-white z-10">
        
        <span class="flex items-center gap-4 text-white text-2xl rounded-xl">
          <img
  v-if="breadcrumbImages[index]"
  :src="`https://albaraka.uz/${breadcrumbImages[index]}`"
  alt="Parent Image"
  class="w-12 h-12 object-cover rounded-xl"
/>

          {{ product.categoryResultModel.name }}
        </span>

        <h1 class="text-lg sm:text-xl md:text-3xl font-bold mb-7 md:mb-2 mt-10">
          {{ product.name }}
        </h1>

        <p v-html="product.description.slice(0 , 200)" class="text-xl mt-4 mb-6 hidden md:block">

        </p>

        <button
          class="bg-white button-gotoproduct mt-3 text-black font-semibold px-2 sm:px-8 py-3 text-xs sm:text-sm rounded-full hover:bg-gray-100 transition-colors"
        >
          Mahsulotga o'tish
        </button>
      </div>
      
      <!-- Product image side -->
      <div class="w-1/2 relative">
        <div class="absolute right-0 top-1/2 transform -translate-y-1/2">
          <div class="bg-yellow-50 button-gotoproduct rounded-3xl p-4 shadow-lg">
            <div class="flex items-center justify-center">
              <img
                :src="`https://albaraka.uz/${product.productImages[0].imageEntity.localImagePath}`"
                :alt="product.name"
                class="max-h-[250px] sm:max-h-[420px] object-contain"
              />
            </div>

            <img
              v-if="product.productModel && product.marketResultmodel"
              class="w-32 flex justify-center items-center mx-auto mt-4"
              :src="
                product.marketResultmodel.url === 'https://uzum.uz'
                  ? '/uzum-logo.png'
                  : '/olcha.png'
              "
              alt="Error"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white w-[400px] h-[100px] rounded-lg">
      <h3>Product name</h3>
    </div>
  </div>
      </div>
    </n-carousel>

     <n-skeleton v-if="!filteredProducts.length" height="500px" width="100%" :sharp="false" />
  </div>
</template>

<script setup>
import { onMounted, ref , computed } from 'vue'
import { useRouter } from 'vue-router'
import { NSkeleton , NEllipsis , NTag  } from 'naive-ui'
import { useProductAllStore } from '#imports'
import { useCategoryAllStore } from '#imports'

const store = useCategoryAllStore();
const productStore = useProductAllStore();
const router = useRouter();


const breadcrumbImages = computed(() => {
  const categories = store.categoryData || []
  const products = filteredProducts.value || []

  if (!categories.length || !products.length) return []

  return products.map(product => {
    const categoryModel = product?.categoryResultModel
    if (!categoryModel?.name) return null
    return findTopMostParentImage(categories, categoryModel.name)
  })
})


const groupedProducts = computed(() => {
  const result = []
  for (let i = 0; i < filteredProducts.value.length; i += 2) {
    result.push(filteredProducts.value.slice(i, i + 2))
  }
  return result
})




function findTopMostParentImage(categories, targetName, path = []) {
  if (!Array.isArray(categories)) return null

  for (const category of categories) {
    const newPath = [...path, category]

    if (category.name === targetName) {
      const topParent = newPath[0]
      return topParent?.image?.localImagePath || null
    }

    if (Array.isArray(category.childCategories) && category.childCategories.length) {
      const found = findTopMostParentImage(category.childCategories, targetName, newPath)
      if (found) return found
    }
  }

  return null
}




const navigateItem = (id) => {
    router.push(`/product/${id}`)
  }



const getParsedMarketModel = (marketModel) => {
  try {
    return JSON.parse(marketModel) || "Noma'lum"
  } catch (error) {
    return "Xato"
  }
}

const filteredProducts = computed(() => {
  if (!productStore.productAll || !Array.isArray(productStore.productAll)) return []

  return productStore.productAll
    .map((product) => ({
      ...product,
      parsedMarketModel: getParsedMarketModel(product.productModel),
    }))
    .sort((a, b) => 
      (b.parsedMarketModel.meta?.feedbackQuantity || 0) - 
      (a.parsedMarketModel.meta?.feedbackQuantity || 0)
    )
    .slice(0, 10);
})





</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>