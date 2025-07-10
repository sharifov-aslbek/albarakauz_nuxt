<template>
  <!-- {{ store.productAll }} -->
  <!-- <Card :data="store.productAll" /> -->
  <!-- <Login /> -->
   <div class="container">
     <p>update naxuy</p>
     <p>update naxuy</p>
     <p>update naxuy</p>
     <p>update naxuy</p>
     <p>update naxuy</p>
     ⚡
   </div>


   <Slider />
   <MarketSlider />
  <HomeCategoryProduct />
  <!-- <NButton>Default</NButton> -->
</template>


<script setup>
import { NButton } from 'naive-ui'
import { useProductAllStore } from '../stores/productAll'
import HomeCategoryProduct from '@/components/HomeCategoryProduct'
import ColorModeButton from '@/components/ColorModeButton'
import Card from '@/components/Card.vue'
import { useProductSeoStore }   from '@/stores/productSeo'
import { onMounted } from 'vue'
import MarketSlider from '~/components/MarketSlider.vue'
import Toast from '~/components/Toast.vue'

const store = useProductSeoStore();
const allProductStore = useProductAllStore()

useHead({
  title: 'Albaraka.uz - Biz bilan oson qidiring',
  meta: [
    { name: 'description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },

    // Open Graph (Facebook, LinkedIn va boshqalar uchun)
    { property: 'og:title', content: 'Albaraka.uz - Biz bilan oson qidiring' },
    { property: 'og:description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },
    { property: 'og:image', content: 'https://albaraka.uz/assets/logo.png' },
    { property: 'og:url', content: 'https://albaraka.uz' },
    { property: 'og:type', content: 'website' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Albaraka.uz - Biz bilan oson qidiring' },
    { name: 'twitter:description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },
    { name: 'twitter:image', content: 'https://albaraka.uz/assets/logo.png' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: 'https://albaraka.uz/assets/logo.png' }
  ]
})

onMounted(() => {
  // localStorage da borligini tekshir
  if (!localStorage.getItem('productAllStore')) {
    allProductStore.getAllProducts()
  } else {
    console.log('localStorage-dan productAll ishlatilmoqda')
  }
})
</script>