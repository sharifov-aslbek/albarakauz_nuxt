<template>
  <div class="container">
    <n-carousel class="rounded-lg" autoplay show-arrow>
  <div
    v-for="(product, index) in filteredProducts"
    :key="product.id"
    @click="navigateItem(product.id , product.name)"
  >
    <div class="container relative w-full h-auto md:h-[600px] rounded-lg overflow-hidden">
      <div class="absolute inset-0 bg-[#06D6A0]/50"></div>

      <div
        class="relative flex flex-col md:flex-row items-center md:items-center px-4 md:px-12 lg:px-16 py-8 md:py-0 h-full"
      >
        <!-- Text section -->
        <div class="w-full md:w-1/2 text-white z-10 text-center md:text-left">
          <span
            class="flex justify-center md:justify-start items-center gap-4 text-white text-xl md:text-2xl rounded-xl mb-4 md:mb-0"
          >
            <img
              v-if="breadcrumbImages[index]"
              :src="`https://api.albaraka.uz/${breadcrumbImages[index]}`"
              alt="Parent Image"
              class="w-10 h-10 md:w-12 md:h-12 object-cover rounded-xl"
            />
            {{ product.categoryResultModel.name }}
          </span>

          <h1
            class="text-lg sm:text-xl md:text-3xl font-bold mt-4 md:mt-10 mb-4"
          >
            {{ product.name }}
          </h1>

          <p
            v-html="product.description.slice(0, 200)"
            class="text-base md:text-xl mt-2 mb-6 hidden md:block"
          ></p>

          <button
            class="bg-white button-gotoproduct mt-4 md:mt-3 text-black font-semibold px-4 sm:px-8 py-3 text-sm sm:text-sm rounded-full hover:bg-gray-100 transition-colors"
          >
            Mahsulotga o'tish
          </button>
        </div>

        <!-- Product image side -->
        <div
          class="w-full md:w-1/2 relative mt-6 md:mt-0 flex justify-center md:justify-end"
        >
          <div
            class="bg-yellow-50 button-gotoproduct rounded-3xl p-4 shadow-lg max-w-xs md:max-w-none"
          >
            <div class="flex items-center justify-center">
              <img
                :src="`https://api.albaraka.uz/${product.productImages[0].imageEntity.localImagePath}`"
                :alt="product.name"
                class="max-h-[200px] sm:max-h-[250px] md:max-h-[420px] object-contain"
              />
            </div>

            <img
              v-if="product.productModel && product.marketResultmodel"
              class="w-24 md:w-32 flex justify-center items-center mx-auto mt-4"
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




const navigateItem = (id , slug) => {
  const formattedSlug = slug
    .toLowerCase()                   // kichik harf
    .replace(/[^a-z0-9\s-]/g, '')    // barcha belgilarni olib tashlash (faqat lotin harflar, raqamlar, probel va - qoladi)
    .replace(/\s+/g, '-')            // probel → -
    .replace(/-+/g, '-')             // ketma-ket - ni bitta - ga tushirish
    .trim()

    router.push(`/product/${formattedSlug}-${id}`)
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