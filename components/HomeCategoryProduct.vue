<template>
  <div v-if="productStore.productCategoryList" class="container">
    <div
      v-for="category in productStore.productCategoryList"
      :key="category.categoryInfo.id"
    >
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

      <div class="grid grid-cols-5 gap-3">
        <Card :data="category.products" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watch, ref, onMounted } from 'vue'
import { useProductSeoStore } from '@/stores/productSeo'
import { useCategoryStore } from '@/stores/categoryStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()
const productStore = useProductSeoStore()
const categoryStore = useCategoryStore()

// Local states
const limitedCategories = ref([])
const remainingCount = ref(0)

// Sahifa yuklanganda categoryData localStorage'dan olinadi
onMounted(async () => {
  const saved = localStorage.getItem('categoryStore')

  if (!saved) {
    console.log('LocalStorage-da yo‘q, API chaqirildi.')
    await categoryStore.getAllCategory()
  } else {
    console.log('LocalStorage-dan o‘qildi, API chaqirilmadi.')
    const parsed = JSON.parse(saved)

    if (parsed?.categoryData) {
      categoryStore.categoryData = parsed.categoryData
    } else {
      console.log('categoryData yo‘q, API chaqirildi.')
      await categoryStore.getAllCategory()
    }
  }
})

// Navigatsiya
const navigateCategory = (id: number) => {
  router.push('/category/' + id)
}

// categoryData va locale.value kuzatish
watch(
  [() => categoryStore.categoryData, () => locale.value],
  ([categoryData, loc]) => {
    if (!Array.isArray(categoryData) || categoryData.length === 0) return

    productStore.productCategoryList = []

    limitedCategories.value = categoryData.slice(0, 10)
    remainingCount.value = categoryData.length - 10

    const usedChildIds = new Set<number>()

    limitedCategories.value.forEach(category => {
      const childId = category.childCategories?.[2]?.id
      if (
        childId &&
        !usedChildIds.has(childId) &&
        !productStore.productCategoryList.some(
          (item) => item.categoryInfo?.id === childId
        )
      ) {
        usedChildIds.add(childId)
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
