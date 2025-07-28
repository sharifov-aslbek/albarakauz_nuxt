<template>
  <NavbarTagSlide />
  <NavbarMainSlider />
  <br><br>
   <!-- <NewSlider /> -->
   <ImageSlide />
   <NavbarSababMegaTaklif />
   <br> <br>
   <TavsiyaEtilgan />
   <MarketSlider />
   <ProductSlider />  
   <NavbarAvtomobilingizUchun />
   <br><br>
   <NavbarChillaSezon />
   <br>
   <NavbarBestSeller />
  <HomeCategoryProduct />
</template>


<script setup>
import { NButton } from 'naive-ui'  
import { useProductAllStore } from '../stores/productAll'
import HomeCategoryProduct from '@/components/HomeCategoryProduct'
import { useProductSeoStore }   from '@/stores/productSeo'
import { onMounted } from 'vue'
import MarketSlider from '~/components/MarketSlider.vue'
import ImageSlide from '~/components/Navbar/ImageSlide.vue'
import TavsiyaEtilgan from '~/components/Navbar/TavsiyaEtilgan.vue'

const store = useProductSeoStore();
const allProductStore = useProductAllStore()

useHead({
  title: 'Albaraka.uz - Biz bilan oson qidiring',
  meta: [
    { name: 'description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },

    // Open Graph (Facebook, LinkedIn va boshqalar uchun)
    { property: 'og:title', content: 'Albaraka.uz - Biz bilan oson qidiring' },
    { property: 'og:description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },
    { property: 'og:image', content: 'https://api.albaraka.uz/assets/logo.png' },
    { property: 'og:url', content: 'https://albaraka.uz' },
    { property: 'og:type', content: 'website' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Albaraka.uz - Biz bilan oson qidiring' },
    { name: 'twitter:description', content: "O'zbekistondagi online marketlardan mahsulotlarni oson qidirish" },
    { name: 'twitter:image', content: 'https://api.albaraka.uz/assets/logo.png' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: 'https://albaraka.uz/assets/logo.png' }
  ]
})

onMounted(() => {
  // localStorage da borligini tekshir
  if (!localStorage.getItem('productAllStore')) {
    // allProductStore.getAllProducts()
  } else {
    console.log('localStorage-dan productAll ishlatilmoqda')
  }
})
</script>