// stores/productSeo.ts

import { defineStore } from 'pinia'
import { useCategoryStore } from './categoryStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Product {
  id: number
  name: string
  price: number
}


export const useProductAllStore = defineStore('productAllStore', () => {
  const { locale } = useI18n()
  const categoryStore = useCategoryStore()

  const productAll = ref<Product[] | null>(null)

  const API_HOST_DEFAULT = 'https://albaraka.uz/api'


  const getAllProducts = async () => {
    try {
      const res = await fetch(`${API_HOST_DEFAULT}/${locale.value}/product/all`)
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


  return {
    productAll,
    getAllProducts,
  }
}, {
  persist: process.client
    ? {
        storage: piniaPluginPersistedstate.localStorage(),
        paths: ['productAll']
      }
    : false
})
