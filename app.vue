<template>
  <!-- <UApp> -->
    <Navbar />
    <UApp>

      <NuxtPage />
       <n-back-top :right="20" />
    </UApp>
    <Footer />
  <!-- </UApp> -->
</template>

<script setup>
import { onMounted } from '#imports'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from '#imports'

useHead({
  htmlAttrs: {
    class: 'light' // bu orqali dark rejimni butunlay o'chiramiz
  }
})

const store = useAuthStore()
const colorMode = useColorMode()
colorMode.value = 'light'


onMounted(() => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    store.getProfileData()
  } else {
    console.log('Token mavjud emas, profileData olish shart emas')
  }
})
</script>

