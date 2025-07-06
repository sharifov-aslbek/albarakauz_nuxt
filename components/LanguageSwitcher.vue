<template>
  <div class="flex justify-end p-4">
    <n-dropdown
      :options="locales"
      trigger="click"
      @select="changeLocale"
    >
      <n-button>
        🌐 {{ currentLabel }}
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useProductSeoStore } from '#imports'
import { useCategoryStore } from '~/stores/categoryStore'
import { computed, onMounted } from 'vue'

const { locale, setLocale } = useI18n()
const categoryStore = useCategoryStore()
const productSeoStore = useProductSeoStore()

// Til variantlari
const locales = [
  { label: '🇺🇿 Oʻzbekcha', key: 'uz' },
  { label: '🇷🇺 Русский', key: 'ru' }
]

// Hozirgi til labelini olish
const currentLabel = computed(() => {
  return locales.find(l => l.key === locale.value)?.label || 'Til'
})

// Tilni o‘zgartirish + localStorage + sahifani qayta yuklash
function changeLocale(lang) {
  localStorage.setItem('selectedLang', lang)
  setLocale(lang)
  categoryStore.categoryData = null;
  categoryStore.getAllCategory()
}

// Sahifa ochilganda localStorage dan tilni o‘qib qo‘llash
onMounted(() => {
  const savedLang = localStorage.getItem('selectedLang')
  if (savedLang && savedLang !== locale.value) {
    setLocale(savedLang)
  }
})
</script>

