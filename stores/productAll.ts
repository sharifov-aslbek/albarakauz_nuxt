import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from "#app"
import axios from 'axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // agar kerak bo‘lsa

interface Product {
  id: number
  name: string
  price: number
  productImages?: Array<{ imageEntity: { localImagePath: string } }>
  productModel?: string
  marketResultmodel?: { url: string }
  categoryResultModel?: { name: string }
}

interface LinkedProduct extends Product {}

export const useProductAllStore = defineStore('productAllStore', () => {
  const productAll = ref<Product[] | null>(null)
  const linkedProductsPerProduct = ref<
    {
      product: Product
      linkedProducts: LinkedProduct[]
    }[]
  >([])

  const config = useRuntimeConfig()
  const API_HOST_DEFAULT = config.public.NUXT_PUBLIC_BACKEND_URL

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_HOST_DEFAULT}/uz/product/retrieve-by-categoryId`, {
        params: {
          PageSize: 10,
          id: 4,
        },
      })

      productAll.value = response.data?.data || null
    } catch (e) {
      console.error('API error:', e)
      productAll.value = null
    }
  }

  const slugify = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const fetchAllLinkedProductsByIds = async (ids: number[]) => {
    try {
      const requests = ids.map(async (id) => {
        const url = `${API_HOST_DEFAULT}/uz/product/by-id-${id}`
        const response = await axios.get(url)
        const data = response.data?.data

        return {
          product: data?.product || null,
          linkedProducts: data?.linkedProducts || [],
        }
      })

      const result = await Promise.all(requests)
      linkedProductsPerProduct.value = result
      return result
    } catch (error) {
      console.error('LinkedProductsByIds fetch error:', error)
      return []
    }
  }

  return {
    productAll,
    getAllProducts,
    fetchAllLinkedProductsByIds,
    linkedProductsPerProduct,
  }
}, {
  // persist: {
  //   key: 'productAllStore',
  //   storage: piniaPluginPersistedstate.localStorage(),
  //   paths: ['productAll', 'linkedProductsPerProduct']
  // }
})
