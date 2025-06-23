<template>
  <!-- <UApp> -->
    <NuxtPage />
  <!-- </UApp> -->
</template>

<script setup> 
useHead({
  htmlAttrs: {
    class: 'light' // bu orqali dark rejimni butunlay o'chiramiz
  }
})

const colorMode = useColorMode()
colorMode.value = 'light'
</script>