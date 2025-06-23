// stores/productSeo.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categoryStore', () => {
  const product = ref<any>(null)
  const categoryData = ref<any>(null)
  const title = ref('')
  const description = ref('')
  const image = ref('')

 
  const getAllCategory = async () => {
    try {
      const res = await fetch(`https://albaraka.uz/api/uz/category/all`)
      const json = await res.json()

      if (json?.data) {
        const data = json.data
        categoryData.value = data
      } else {
        console.warn('APIdan data yo‘q')
      }
    } catch (e) {
      console.error('API error:', e)
    }
  }


  return {
    product,
    title,
    description,
    image,
    getAllCategory,
    categoryData
  }
})
