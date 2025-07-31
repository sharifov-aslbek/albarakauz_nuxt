<template>
    <div class="container">
        <div class="w-full">
            <h3 class="text-[30px] mb-5">Siz uchun bestsellerlar</h3>

            <div class="flex justify-between gap-3">
                   <USkeleton v-if="!data" v-for="i in 5" class="h-[450px] w-[240px] bg-[#D9D9D9]" />
                   <Card v-else :data="data" />
            </div>
        </div>

    </div>

</template>


<script setup >
import { ref , onMounted } from 'vue';
import axios from 'axios';

const data = ref(null);
const err = ref(null);
    const fetchData = async () => {
  try {
    const res = await axios.get('https://api.albaraka.uz/api/uz/product/retrieve-by-categoryId?PageSize=5&PageIndex=1&id=4');
    data.value = res.data.data;
    console.log('avtomobil response', res.data);
  } catch (error) {
    err.value = error;
    console.error('Xatolik:', error);
  }
}



onMounted(() => {
    fetchData();
})
</script>