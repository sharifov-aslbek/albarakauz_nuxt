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

const store = useProductSeoStore();

onMounted(() => {
  store.getAllProducts();
})
</script>