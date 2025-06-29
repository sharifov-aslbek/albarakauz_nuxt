<template>
    <div class="container">

         <div class="flex flex-col items-center justify-center" v-if="store.marketProductsData.length === 0 && store.marketProductsCount === 0 && !store.marketProductLoader"
>
          <img class="w-96" src="/assets/search.png" alt="Image for not found product">

          <h3 class="font-bold text-2xl mb-4">Mahsulotlar topilmadi</h3>

          <p class="">Bu marketda hali mahsulotlar bo'lmasligi mumkin ! </p>
        </div>


        <h2 class="text-3xl font-bold">Topilgan barcha mahsulotlar soni: {{ store.marketProductsCount }}</h2>

        <div class="grid grid-cols-5 gap-3 my-10">
            <Card :data="store.marketProductsData"  />
          </div>
          <div class="flex justify-end w-full">
   <n-pagination 
class="py-10 flex justify-center md:justify-end" 
v-model:page="page" 
:page-count="Math.ceil(store.marketProductsCount / 20)"
:page-slot="5" 
@update:page="store.getProductSeo(route.params.id , page)" 
/>
</div>
    </div>
    
</template>


<script setup>
import { NPagination } from '#components';
import { ref , computed , watch } from '#imports';
import { useRoute } from 'vue-router';
import { useProductSeoStore } from '#imports';

const route = useRoute()
const store = useProductSeoStore();
const page = ref(1)

const pageCount = computed(() => {
  const count = Math.ceil(store.marketProductsCount / 20)
  return count < 1 ? 1 : count
})

watch(page, (newPage) => {
  store.getProductWithMarketId(route.params.id, newPage)
})

onMounted(() => {
    store.getProductWithMarketId(route.params.id)
})
</script>

<style scoped>

</style>