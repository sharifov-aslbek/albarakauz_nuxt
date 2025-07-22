<template>
    <div class="container">

      <h2 class="text-xl sm:text-3xl font-medium my-8">Topilgan mahsulotlar soni: {{ store.searchProductsData.totalCount }}</h2>

       <div v-if="store.productLoader" class="container">
    <div class="relative flex w-full max-w-96 animate-pulse gap-2 py-4">
  <div class="flex-1">
    <div class="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
  </div>
  <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-300"></div>
  </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
        v-for="i in 100"
          class="flex flex-col bg-neutral-300 animate-pulse rounded-lg p-4 gap-4" 
        >
          <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
  </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <Card :data="store.searchProductsData.items" />
      </div>

      <not-found-search v-if="store.searchProductsData.totalCount === 0" />

      <n-pagination 
class="py-10 flex justify-center md:justify-end" 
v-model:page="page" 
:page-count="Math.ceil(store.searchProductsData.totalCount / 50)"
:page-slot="5" 
@update:page="store.searchProducts(route.params.id , page)" 
/>
    </div>
</template>


<script setup>
import Card from '~/components/Card.vue';
import { watch , ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductSeoStore } from '#imports';

const store = useProductSeoStore();
const route = useRoute();
const page = ref(1);

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