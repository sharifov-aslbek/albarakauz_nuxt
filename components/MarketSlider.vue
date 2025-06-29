<script setup>
import { ref } from 'vue'
import { useRoute , useRouter } from 'vue-router'
// const items = [
//   'https://picsum.photos/468/468?random=1',
//   'https://picsum.photos/468/468?random=2',
//   'https://picsum.photos/468/468?random=3',
//   'https://picsum.photos/468/468?random=4',
//   'https://picsum.photos/468/468?random=5',
//   'https://picsum.photos/468/468?random=6'
// ]

const route = useRoute();
const router = useRouter();

const marketplaces = [
    {
          id: 1,
          name: 'Uzum market',
          icon: '/uzum-icon.png',
          bgClass: 'bg-gradient-to-br from-purple-600 to-purple-700',
          imgClass: ''
        },
        {
          id: 5,
          name: 'Mediapark',
          icon: '/mediapark.webp',
          bgClass: 'bg-gradient-to-tr from-blue-500 to-blue-700',
          imgClass: 'bg-white rounded-lg'
        },
        {
          id: 2,
          name: 'Olcha.uz',
          icon: '/olcha-icon.png',
          bgClass: 'bg-gradient-to-br from-red-500 to-red-600',
          imgClass: 'rounded-lg'
        },
        {
          id: 3,
          name: 'Texnomart',
          icon: '/texnomart-icon.png',
          bgClass: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
          imgClass: 'rounded-lg'
        },
        {
          id: 4,
          name: 'Elmakon',
          icon: '/elmakon.png',
          bgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
          imgClass: 'rounded-lg'
        }
]

const navigateMarket = (id) => {
  
  router.push(`market/${id}`)
}

</script>



<template>
    <div class="container">
        <h2 class="text-3xl font-medium my-6">Markets</h2>
        <UCarousel v-slot="{ item }" :items="marketplaces" :ui="{ item: 'basis-1/3' }">
          <div 
          @click="navigateMarket(item.id)"
          :class="item.bgClass"
          class="cursor-pointer rounded-2xl p-8 flex items-center justify-center h-[160px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div class="text-white text-center flex flex-col justify-center items-center">
            <img 
              :class="item.imgClass"
              :src="item.icon" 
              :alt="item.name"
              class="w-16 my-4"
            >
            <h3 class="text-xl font-bold">{{ item.name }}</h3>
          </div>
        </div>
        </UCarousel>
    </div>
    <br>
</template>

