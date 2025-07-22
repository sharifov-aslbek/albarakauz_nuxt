import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from "#app";

interface Product {
  id: number
  name: string
  price: number
  productImages?: Array<{ imageEntity: { localImagePath: string } }>
  productModel?: string
  marketResultmodel?: { url: string }
  categoryResultModel?: { name: string }
}

interface LinkedProduct extends Product {
  // Linked products have the same structure as products
}

export const useProductAllStore = defineStore('productAllStore', () => {
  const productAll = ref<Product[] | null>(null)
  const linkedProductsPerProduct = ref<
  {
    product: Product
    linkedProducts: LinkedProduct[]
  }[]
>([])

  const config = useRuntimeConfig();
  const API_HOST_DEFAULT = config.public.NUXT_PUBLIC_BACKEND_URL

  const getAllProducts = async () => {
    try {
      const res = await fetch(`${config.public.NUXT_PUBLIC_BACKEND_URL}/uz/product/retrieve-by-categoryId?PageSize=10&id=4`)
      const json = await res.json()
      productAll.value = json?.data || null
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
      const res = await fetch(url)
      const json = await res.json()
      const product = json?.data?.product || null
      const linked = json?.data.linkedProducts || []

      return {
        product,
        linkedProducts: linked
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
  persist: {
    key: 'productAllStore',
    storage: piniaPluginPersistedstate.localStorage(),
    paths: ['productAll', 'linkedProductsPerProduct']
  }
})