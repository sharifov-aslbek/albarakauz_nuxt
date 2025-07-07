<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <n-button>{{ currentLanguageName }}</n-button>
  </n-dropdown>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { NDropdown, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    NDropdown,
    NButton
  },
  setup() {
    const { locale } = useI18n()
    
    // Get the initial locale from localStorage or use default
    const savedLocale = process.client ? localStorage.getItem('locale') : null
    if (savedLocale) {
      locale.value = savedLocale
    }

    const options = ref([
      {
        label: 'Oʻzbekcha',
        key: 'uz'
      },
      {
        label: 'Русский',
        key: 'ru'
      }
    ])

    const currentLanguageName = computed(() => {
      return locale.value === 'uz' ? 'Oʻzbekcha' : 'Русский'
    })

    const handleSelect = (key) => {
      locale.value = key
      if (process.client) {
        localStorage.setItem('locale', key)
      }
    }

    return {
      options,
      currentLanguageName,
      handleSelect
    }
  }
})
</script>