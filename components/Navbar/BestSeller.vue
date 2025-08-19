<template>
    <div class="container">
        <div class="w-full">
          <Text :title="'Siz uchun bestsellerlar'" />

            <div class="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                   <USkeleton v-if="!data" v-for="i in 2" class="md:hidden block   h-[370px] w-[170px] bg-[#D9D9D9]" />
                   <USkeleton v-if="!data" v-for="i in 5" class="hidden lg:block h-[450px] w-[240px] bg-[#D9D9D9]" />
                   <Card v-else :data="data" />
            </div>
        </div>

    </div>

</template>


<script setup >
import { ref , onMounted } from 'vue';
import axios from 'axios';
import Text from '../shared/Text.vue';

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