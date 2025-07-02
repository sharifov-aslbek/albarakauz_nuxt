<template>
  <!-- <UApp> -->
    <Navbar />
    <UApp>

      <NuxtPage />

    </UApp>
    <Footer />
  <!-- </UApp> -->
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue' 
useHead({
  htmlAttrs: {
    class: 'light' // bu orqali dark rejimni butunlay o'chiramiz
  }
})

const colorMode = useColorMode()
colorMode.value = 'light'
</script>