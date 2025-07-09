<template>
    <div class="container">

      <h2 class="text-3xl font-medium my-8">Topilgan mahsulotlar soni: {{ store.searchProductsData.totalCount }}</h2>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <Card :data="store.searchProductsData.items" />
      </div>

      <not-found-search v-if="store.searchProductsData.totalCount === 0" />
    </div>
</template>


<script setup>
import Card from '~/components/Card.vue';
import { watch , ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductSeoStore } from '#imports';

const store = useProductSeoStore();
const route = useRoute();

definePageMeta({
  ssr: false
})

onMounted(() => {
  store.searchProducts(route.params.id)
})

watch(() => route.params.id, (newId) => {
  store.searchProducts(newId)
})

</script>

<style scoped>


</style>