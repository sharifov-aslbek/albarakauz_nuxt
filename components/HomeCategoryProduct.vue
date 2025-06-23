<template>
<div v-if="productStore.productCategoryList" class="container"> 
    <div class="" v-for="category in productStore.productCategoryList" :key="category.categoryInfo.id">
    
                <h2 @click="navigateCategory(category.categoryInfo.id)" class="text-2xl text-category cursor-pointer flex items-center gap-3">{{ category.categoryInfo.name }} <UIcon name="ic:outline-chevron-right" class="size-10 flex justify-center" />
</h2>
                <div class="grid grid-cols-5 gap-3">
                  <Card :data="category.products" />
                </div>
               </div>   
</div>
</template>

<script setup lang="ts">
import { watch, ref , onMounted } from 'vue'
import { useProductSeoStore } from '@/stores/productSeo'
import { useCategoryStore } from '@/stores/categoryStore'

const productStore = useProductSeoStore()
const categoryStore = useCategoryStore()    

const locale = ref('uz') // yoki useI18n().locale

// Birinchi 10ta category saqlanadi
const limitedCategories = ref([])

// Qolgan categorylar soni (ixtiyoriy, agar kerak bo‘lsa)
const remainingCount = ref(0)

onMounted(async () => {
  await categoryStore.getAllCategory()
})


watch(
  [() => categoryStore.categoryData, () => locale.value],
  ([categoryData, loc]) => {
    if (!Array.isArray(categoryData) || categoryData.length === 0) return

    productStore.productCategoryList = []

    // 0-9 indeksdagi 10 ta kategoriya
    limitedCategories.value = categoryData.slice(0, 10)
    remainingCount.value = categoryData.length - 10

    limitedCategories.value.forEach(category => {
      const childCategories = category.childCategories || []
      const childId = childCategories[4]?.id

      if (childId) {
        productStore.getCategoryIdProduct(childId, loc)
      }
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