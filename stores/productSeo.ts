// stores/productSeo.ts
import { defineStore } from 'pinia'
import { useCategoryStore } from './categoryStore'
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  // boshqa product property'larini qo‘shing
}

interface Category {
  id: number
  name: string
  childCategories?: Category[]
}

interface ProductCategoryItem {
  categoryInfo: Category
  products: Product[]
}

export const useProductSeoStore = defineStore('productSeo', () => {
  const product = ref<any>(null)
  const productLoader = ref(false)
  const productAll = ref<any>(null)
  const productCategoryList = ref<any>([])
  const title = ref('')
  const description = ref('')
  const image = ref('')
  const categoryStore = useCategoryStore();

  const getProductSeo = async (id: string | number) => {
    try {
      const res = await fetch(`https://albaraka.uz/api/uz/product/retrieve${id}`)
      const json = await res.json()

      if (json?.data) {
        const data = json.data
        product.value = data
        title.value = data.name || ''
        description.value = stripHtml(data.description || '')
        image.value =
          data.productImages?.[0]?.imageEntity?.externalImagePath || ''
      } else {
        console.warn('APIdan data yo‘q')
      }
    } catch (e) {
      console.error('API error:', e)
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await fetch(`https://albaraka.uz/api/uz/product/all`)
      const json = await res.json()

      if (json?.data) {
        const data = json.data
        productAll.value = data
      } else {
        console.warn('APIdan data yo‘q')
      }
    } catch (e) {
      console.error('API error:', e)
    }
  }

    async function getCategoryIdProduct(id: number, locale: string) {
    productLoader.value = true

    try {
      // child categoryni topamiz
      let category: Category | null = null

      for (const parentCategory of categoryStore.categoryData) {
        const foundChild = parentCategory.childCategories?.find(
          (child: Category) => child.id === id
        )
        if (foundChild) {
          category = foundChild
          break
        }
      }

      if (!category) {
        console.warn(`Child category with id ${id} not found`)
        return
      }

      // mahsulotlarni fetch qilamiz
const { data, error } = await useFetch<{ code: number, message: string, data: Product[] }>(
  () => `https://albaraka.uz/api/${locale}/product/retrieve-by-categoryId?PageSize=5&id=${id}`,
  { method: 'GET' }
)


      console.log(data.value?.data , 'data');
      

      if (error.value) {
        throw new Error(error.value.message)
      }

      if (data.value?.data.length) {
        productCategoryList.value.push({
          categoryInfo: category,
          products: data.value.data
        })
      } else {
        console.warn(`Category id ${id} uchun mahsulot topilmadi.`)
      }
    } catch (err) {
      console.error('API Error:', err)
    } finally {
      productLoader.value = false
    }
  }

  // HTML <p> taglaridan tozalash (description uchun)
  function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim()
  }

  return {
    product,
    title,
    description,
    image,
    getProductSeo,
    getAllProducts,
    productAll,
    getCategoryIdProduct,
    productCategoryList
  }
})
