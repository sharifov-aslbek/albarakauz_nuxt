// stores/productSeo.ts

import { defineStore } from 'pinia'
import { useCategoryStore } from './categoryStore'
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  price: number
}

interface Category {
  id: number
  name: string
  childCategories?: Category[]
}

interface RetrieveByMarketIdResponse {
  data: {
    count: number
    data: Product[]
  }
}

export const useProductSeoStore = defineStore(
  'productSeo',
  () => {
    const product = ref<any>(null)
    const productLoader = ref(false)
    const similarLoader = ref(false)
    const productAll = ref<Product[] | null>(null)        // persist qilamiz
    const productCategoryList = ref<any>([])
    const title = ref('')
    const description = ref('')
    const image = ref('')
    const oneCategoryProducts = ref<any>([])
    const categoryStore = useCategoryStore()
    const marketProductLoader: Ref<boolean> = ref(false)
    const marketProductsCount: Ref<number> = ref(0)
    const marketProductsData: Ref<Product[]> = ref([])
    const similarsId = ref<any>(null)
    const similarProductData = ref<any[]>([])
    const locale: Ref<string> = ref('uz')

    const API_HOST_DEFAULT = 'https://albaraka.uz/api'

    async function getProductWithMarketId(
      id: number,
      pageindex: number = 1
    ): Promise<void> {
      marketProductLoader.value = true

      try {
        const url = `${API_HOST_DEFAULT}/${locale.value}/product/retrieve-by-marketId?PageSize=30&PageIndex=${pageindex}&id=${id}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: RetrieveByMarketIdResponse = await response.json()

        console.log(data, 'product with market id data')

        marketProductsCount.value = data.data.count
        marketProductsData.value = data.data.data
      } catch (err) {
        console.error('API Error:', err)
      } finally {
        marketProductLoader.value = false
      }
    }

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

    const getOneProductSimilar = async (id: string | number) => {
      similarLoader.value = true
      try {
        const res = await fetch(`https://albaraka.uz/api/uz/product/retrieve${id}`)
        const json = await res.json()

        if (json?.data) {
          similarProductData.value.push(json.data)
        } else {
          console.warn('APIdan data yo‘q')
        }
      } catch (e) {
        console.error('API error:', e)
      } finally {
        similarLoader.value = false
      }
    }

    const getProductSimilars = async (id: string | number) => {
      try {
        const res = await fetch(`https://albaraka.uz/api/uz/product/retrieve-similars?id=${id}`)
        const json = await res.json()

        if (json?.data) {
          similarsId.value = json.data
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
          productAll.value = json.data
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

        const { data, error } = await useFetch<{ code: number, message: string, data: Product[] }>(
          () => `https://albaraka.uz/api/${locale}/product/retrieve-by-categoryId?PageSize=5&id=${id}`,
          { method: 'GET' }
        )

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

    async function getOneCategoryProducts(id: number, locale: string) {
      productLoader.value = true

      try {
        const res = await fetch(`https://albaraka.uz/api/${locale}/product/retrieve-by-categoryId?PageSize=10&id=${id}`)
        const json = await res.json()

        if (json?.data) {
          oneCategoryProducts.value = json.data
        } else {
          console.warn('APIdan data yo‘q')
        }
      } catch (err) {
        console.error('API Error:', err)
      } finally {
        productLoader.value = false
      }
    }

    function stripHtml(html: string): string {
      return html.replace(/<[^>]*>/g, '').trim()
    }

    return {
      product,
      title,
      description,
      image,
      productAll,
      getAllProducts,
      productLoader,
      similarLoader,
      getProductSeo,
      getCategoryIdProduct,
      productCategoryList,
      getOneCategoryProducts,
      oneCategoryProducts,
      getProductWithMarketId,
      marketProductLoader,
      marketProductsCount,
      marketProductsData,
      getProductSimilars,
      similarsId,
      getOneProductSimilar,
      similarProductData
    }
  },
  {
    persist: process.client
      ? {
          storage: piniaPluginPersistedstate.localStorage(),
          paths: ['productAll']
        }
      : false
  }
)
