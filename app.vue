<template>
  <Banner />
  <Navbar />
  <br>
  <UApp>
    <NuxtPage />
    <n-back-top :right="20" />
    <BottomMenu />
  </UApp>

  <Suspense>
    <template #default>
      <LazyFooter />
    </template>
    <template #fallback>
      <!-- <div class="text-center py-4 text-gray-500">Footer yuklanmoqda...</div> -->
    </template>
  </Suspense>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { defineAsyncComponent, onMounted , ref } from 'vue'
import { useAuthStore, useColorMode } from '#imports'

useHead({
  htmlAttrs: {
    class: 'light'
  }
})


const store = useAuthStore()
const colorMode = useColorMode()
colorMode.value = 'light'
const text = ref('')

const LazyFooter = defineAsyncComponent(() =>
  import('./components/Footer.vue')
)

onMounted(() => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    store.getProfileData()
  } else {
    console.log('Token mavjud emas, profileData olish shart emas')
  }
})
</script>
