<template>
  <h3 class="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] mb-5">
    {{ title }}
  </h3>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
</style>
