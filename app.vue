<template>
  <n-message-provider>
   <div :class="{ 'blur-sm transition-all duration-300': errorStore.isVisible }"> 
    <div class="">
      <Banner />
      <Navbar />
      <br>
      <UApp>
        <SharedOfflineAlert />
        <NuxtPage />
        <SharedLoader />
        <SharedBackTop />
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
    </div>
   </div>

    <!-- <ErrorModal /> -->
  </n-message-provider>
</template>

<script setup>
import { useErrorStore } from '#imports';
import ErrorModal from './components/ErrorModal.vue';

import Navbar from './components/Navbar.vue'
import { defineAsyncComponent, onMounted , ref } from 'vue'
import { useAuthStore, useColorMode } from '#imports'
import { SharedBackTop } from '#components'

useHead({
  htmlAttrs: {
    class: 'light'
  }
})

// throw createError({
//   statusCode: 420,
//   statusMessage: "Component Error (Fake)"
// })

const errorStore = useErrorStore();

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
