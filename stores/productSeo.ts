import { defineStore } from 'pinia'
import { useCategoryAllStore } from '#imports'
import { useCategoryStore } from './categoryStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from "#app"
import axios from 'axios'

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

export const useProductSeoStore = defineStore('productSeo', () => {
  const { locale } = useI18n()
  const categoryStore = useCategoryStore()
  const allCategoryStore = useCategoryAllStore()

  const product = ref<any>(null)
  const productLoader = ref(false)
  const similarLoader = ref(false)
  const productAll = ref<Product[] | null>(null)
  const productCategoryList = ref<any>([])
  const title = ref('')
  const description = ref('')
  const image = ref('')
  const oneCategoryProducts = ref<any>([])
  const searchProductsData = ref<any>([])
  const linkedProducts = ref<any>([])
  const marketProductLoader = ref(false)
  const marketProductsCount = ref(0)
  const marketProductsData = ref<Product[]>([])
  const similarsId = ref<any>(null)
  const similarProductData = ref<any[]>([])
  const config = useRuntimeConfig()

  const API_HOST_DEFAULT = config.public.NUXT_PUBLIC_BACKEND_URL

  async function getProductWithMarketId(id: number, pageindex: number = 1) {
    marketProductLoader.value = true
    try {
      const response = await axios.get<RetrieveByMarketIdResponse>(
        `${API_HOST_DEFAULT}/${locale.value}/product/retrieve-by-marketId`,
        {
          params: {
            PageSize: 30,
            PageIndex: pageindex,
            id
          }
        }
      )

      marketProductsCount.value = response.data.data.count
      marketProductsData.value = response.data.data.data
    } catch (err) {
      console.error('API Error:', err)
    } finally {
      marketProductLoader.value = false
    }
  }

  const getProductSeo = async (slug: string) => {
    try {
      linkedProducts.value = []

      const response = await axios.get(`${API_HOST_DEFAULT}/uz/product/${slug}`)
      const json = response.data

      if (json?.data.product) {
        const data = json.data.product
        product.value = data
        title.value = data.name || ''
        description.value = stripHtml(data.description || '')
        image.value = data.productImages?.[0]?.imageEntity?.externalImagePath || ''
      }

      if (json?.data.linkedProducts && json.data.linkedProducts.length > 0) {
        linkedProducts.value = json.data.linkedProducts
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
      const response = await axios.get(`${API_HOST_DEFAULT}/${locale.value}/product/retrieve${id}`)
      const json = response.data
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
      const response = await axios.get(`${API_HOST_DEFAULT}/${locale.value}/product/retrieve-similars`, {
        params: { id }
      })
      const json = response.data
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
      const response = await axios.get(`${API_HOST_DEFAULT}/${locale.value}/product/all`)
      const json = response.data
      if (json?.data) {
        productAll.value = json.data
      } else {
        console.warn('APIdan data yo‘q')
      }
    } catch (e) {
      console.error('API error:', e)
    }
  }

  function findCategoryById(categories: Category[], id: number): Category | null {
    for (const category of categories) {
      if (category.id === id) {
        return category
      }
      if (category.childCategories?.length) {
        const found = findCategoryById(category.childCategories, id)
        if (found) {
          return found
        }
      }
    }
    return null
  }

  async function getCategoryIdProduct(id: number) {
    productLoader.value = true
    try {
      let category = findCategoryById(allCategoryStore.categoryData, id)

      if (!category) {
        console.warn(`Category with id ${id} not found in local store, requesting API anyway.`)
      }

      const response = await axios.get(`${API_HOST_DEFAULT}/uz/product/retrieve-by-categoryId`, {
        params: {
          PageSize: 5,
          id
        }
      })

      const data = response.data

      if (data?.data?.length) {
        if (!category) {
          category = findCategoryById(allCategoryStore.categoryData, id)
        }

        productCategoryList.value.push({
          categoryInfo: category,
          products: data.data
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

  function resetProductCategoryList() {
    productCategoryList.value = []
  }

  async function getOneCategoryProducts(id: number) {
    productLoader.value = true
    try {
      const response = await axios.get(`${API_HOST_DEFAULT}/${locale.value}/product/retrieve-by-categoryId`, {
        params: { id }
      })
      const json = response.data
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

  async function searchProducts(slug: string, page: number = 1) {
    productLoader.value = true
    try {
      const response = await axios.get(`https://api.albaraka.uz/api/uz/product/search`, {
        params: {
          PageSize: 50,
          PageIndex: page,
          key: slug
        }
      })
      const json = response.data
      if (json?.data) {
        searchProductsData.value = json.data
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
    similarProductData,
    resetProductCategoryList,
    searchProductsData,
    searchProducts,
    linkedProducts
  }
})
