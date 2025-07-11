<template>
  <!-- <div v-if="productStore.productCategoryList.length < 1" class="container">
    <div class="relative flex w-full max-w-96 animate-pulse gap-2 py-4">
  <div class="flex-1">
    <div class="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
  </div>
  <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-300"></div>
  </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
        v-for="i in 100"
          class="flex flex-col bg-neutral-300 animate-pulse rounded-lg p-4 gap-4"
        >
          <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
  </div> -->

  <div v-if="productStore.productCategoryList" class="container">
    <div
      v-for="category in productStore.productCategoryList"
    >
    <!-- 
      :key="category.categoryInfo.id" 
     -->
      <h2
        @click="navigateCategory(category.categoryInfo.id)"
        class="text-2xl text-category cursor-pointer flex items-center gap-3"
      >
        {{ category.categoryInfo.name }}
        <UIcon
          name="ic:outline-chevron-right"
          class="size-10 flex justify-center"
        />
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
  <Card :data="category.products" />
</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watch, ref, onMounted } from 'vue'
import { useCategoryAllStore } from '#imports'
import { useProductSeoStore } from '@/stores/productSeo'
import { useCategoryStore } from '@/stores/categoryStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()
const productStore = useProductSeoStore()
const categoryStore = useCategoryStore()
const allCategoryStore = useCategoryAllStore()
definePageMeta({
  ssr: false
})


// Local states
const limitedCategories = ref([])
const remainingCount = ref(0)

// Sahifa yuklanganda categoryData localStorage'dan olinadi
onMounted(async () => {
  const saved = localStorage.getItem('categoryAllStore')

  if (!saved) {
    console.log('LocalStorage-da yo‘q, API chaqirildi.')
    await allCategoryStore.getAllCategory()
  } else {
    console.log('LocalStorage-dan o‘qildi, API chaqirilmadi.')
    const parsed = JSON.parse(saved)

    if (parsed?.categoryData) {
      allCategoryStore.categoryData = parsed.categoryData
    } else {
      console.log('categoryData yo‘q, API chaqirildi.')
      await allCategoryStore.getAllCategory()
    }
  }

})

// Navigatsiya
const navigateCategory = (id: number) => {
  router.push('/category/' + id)
}

// categoryData va locale.value kuzatish
// locale almashsa category reload qilish
// watch(
//   () => locale.value,
//   (newLocale) => {
//     console.log('Locale o‘zgardi:', newLocale)
//     productStore.resetProductCategoryList()
//     categoryStore.getAllCategory()
//   }
// )

// categoryData update bo‘lsa, mahsulotlarni chaqirish
watch(
  () => allCategoryStore.categoryData,
  (categoryData) => {
    if (!Array.isArray(categoryData) || categoryData.length === 0) return
    // faqat 4ta aniq id-lar uchun chaqiruv
    const ids = [9, 4, 1740, 139 , 16, 44 , 346]
    const ids2 = [2 , 8]
    ids.forEach(id => {
      console.log('id:', id)

      productStore.getCategoryIdProduct(id)
    })
  },
  { immediate: true }
)



</script>

<style scoped>
.text-category {
  margin: 10px 0px;
}
</style>
