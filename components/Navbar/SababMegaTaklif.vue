<template>
    <div class="container flex flex-col gap-20 sm:gap-0 sm:flex-row justify-between">
        <div class="w-full sm:w-[47%] h-[61 0px] bg-white py-6 px-2.5 sm:block hidden">
            <h3 class="text-[20px] sm:text-[30px] mb-5">Yaxna ichimliklar 🍷</h3>

            <div class="flex justify-between gap-5">
                   <USkeleton v-if="!data" v-for="i in 2" class="h-[300px] sm:h-[450px] w-[150px]  sm:w-[300px] bg-[#D9D9D9]" />
                   <Card :data="data" v-else />
            </div>
        </div>


        <div class="w-full sm:w-[47%] sm:h-[610px] bg-white py-6 px-2.5 sm:block hidden">
            <h3 class="text-[20px] sm:text-[30px] mb-5">Mega Takliflar 🔥</h3>

<div class="flex justify-between gap-5">
                   <USkeleton v-if="!data" v-for="i in 2" class="h-[300px] sm:h-[450px] w-[150px] sm:w-[300px] bg-[#D9D9D9]" />
                   <Card :data="data2" v-else />
            </div>
        </div>


        <div class="block sm:hidden">

          <n-tabs type="line" animated>
    <template #tabs="{ panes }">
      <div class="flex w-full">
        <div
          v-for="pane in panes"
          :key="pane.name"
          class="flex-1 text-center border border-gray-300 py-2 cursor-pointer"
        >
          {{ pane.tab }}
        </div>
      </div>
    </template>
  
    <n-tab-pane name="oasis" tab="Xarid qilish uchun sabablar">
       <div class="flex justify-between gap-5">
                   <USkeleton v-if="!data" v-for="i in 2" class="h-[300px] sm:h-[450px] w-[150px]  sm:w-[300px] bg-[#D9D9D9]" />
                   <Card :data="data" v-else />
            </div>
    </n-tab-pane>
  
    <n-tab-pane
      name="sostav"
      tab="Mega Takliflar"
    >
    <div class="flex justify-between gap-5">
                   <USkeleton v-if="!data" v-for="i in 2" class="h-[300px] sm:h-[450px] w-[150px] sm:w-[300px] bg-[#D9D9D9]" />
                   <Card :data="data2" v-else />
            </div>
    </n-tab-pane>
  
  </n-tabs>
        </div>
        </div>



</template>


<script setup >
import { NTab , NTabPane } from '#components';
import { ref , onMounted } from 'vue';
import axios from 'axios';

const data = ref(null);
const err = ref(null);

const data2 = ref(null);
const err2 = ref(null);

    const fetchData = async () => {
  try {
    const res = await axios.get('https://api.albaraka.uz/api/uz/product/retrieve-by-categoryId?PageSize=2&PageIndex=1&id=1303');
    data.value = res.data.data;
    console.log('Allgood response', res.data);
  } catch (error) {
    err.value = error;
    console.error('Xatolik:', error);
  }
}


   const fetchData2 = async () => {
  try {
    const res = await axios.get('https://api.albaraka.uz/api/uz/product/retrieve-by-marketId?PageSize=2&PageIndex=2&id=4');
    data2.value = res.data.data.data;
    console.log('Allgood response', res.data);
  } catch (error) {
    err2.value = error;
    console.error('Xatolik:', error);
  }
}


onMounted(() => {
    fetchData();
    fetchData2();
})
</script>