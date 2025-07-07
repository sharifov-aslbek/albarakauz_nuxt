<template>
  <!-- {{ store.productAll }} -->
  <!-- <Card :data="store.productAll" /> -->
  <!-- <Login /> -->
   <Slider />
   <MarketSlider />
  <HomeCategoryProduct />
  <!-- <NButton>Default</NButton> -->
</template>


<script setup>
import { NButton } from 'naive-ui'
import HomeCategoryProduct from '@/components/HomeCategoryProduct'
import ColorModeButton from '@/components/ColorModeButton'
import Card from '@/components/Card.vue'
import { useProductSeoStore }   from '@/stores/productSeo'
import { onMounted } from 'vue'
import MarketSlider from '~/components/MarketSlider.vue'
import Toast from '~/components/Toast.vue'

const store = useProductSeoStore();

definePageMeta({
  ssr: false
})

onMounted(() => {
  // localStorage da borligini tekshir
  if (!localStorage.getItem('productSeo')) {
    store.getAllProducts()
  } else {
    console.log('localStorage-dan productAll ishlatilmoqda')
  }
})
</script>