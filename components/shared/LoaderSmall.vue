<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div v-if="store.productLoader" class="w-full flex items-center justify-center my-5">
      <n-spin size="medium" />
    </div>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NSpin } from 'naive-ui'
import { useProductSeoStore } from '#imports'

const store = useProductSeoStore()

const themeOverrides = {
  Spin: {
    color: '#feee00' // Sariq rang
  }
}
</script>
