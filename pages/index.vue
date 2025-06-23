<template>
  <!-- {{ store.productAll }} -->
  <!-- <Card :data="store.productAll" /> -->
  <HomeCategoryProduct />
</template>


<script setup>
import HomeCategoryProduct from '@/components/HomeCategoryProduct'
import ColorModeButton from '@/components/ColorModeButton'
import Card from '@/components/Card.vue'
import { useProductSeoStore }   from '@/stores/productSeo'
import { onMounted } from 'vue'

const store = useProductSeoStore();

onMounted(() => {
  store.getAllProducts();
})
</script>