<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb skeleton -->
    <div class="flex items-center gap-2 mb-6 my-10">
      <div v-for="item in 4" :key="item" class="flex items-center">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        <span v-if="item < 4" class="mx-2 text-gray-300">›</span>
      </div>
      <div class="ml-auto flex gap-3">
        <div v-for="item in 3" :key="item" class="h-5 bg-gray-200 rounded animate-pulse w-28"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
      <!-- Left thumbnails skeleton -->
      <div class="hidden md:flex md:col-span-1 flex-col gap-3">
        <div 
          v-for="item in 5" 
          :key="item" 
          class="aspect-square bg-gray-200 rounded animate-pulse"
        ></div>
      </div>

      <!-- Main product image skeleton -->
      <div class="md:col-span-5">
        <div class="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="mt-4 flex justify-between">
          <div class="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div class="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Product details skeleton -->
      <div class="md:col-span-6">
        <!-- Product title -->
        <div class="h-8 bg-gray-200 rounded animate-pulse w-3/4 mb-6"></div>

        <!-- Product specifications -->
        <div class="space-y-4 mb-6">
          <div 
            v-for="item in 5" 
            :key="item" 
            class="flex justify-between items-center border-b pb-2"
          >
            <div class="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div class="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
          </div>
        </div>

        <!-- Brand section -->
        <div class="flex items-center gap-3 my-6">
          <div class="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
        </div>

        <!-- Price section -->
        <div class="flex items-center gap-2 mb-6">
          <div class="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div class="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
        </div>

        <!-- CTA Button -->
        <div class="h-12 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
      </div>
    </div>

    <!-- Related products section -->
    <div class="mt-12">
      <div class="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-6"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="item in 4" 
          :key="item" 
          class="border border-gray-100 rounded-lg p-4"
        >
          <div class="aspect-square bg-gray-200 rounded animate-pulse mb-4"></div>
          <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
          <div class="flex items-center gap-1 mb-2">
            <div 
              v-for="star in 5" 
              :key="star" 
              class="h-4 w-4 bg-gray-200 rounded animate-pulse"
            ></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-8 ml-2"></div>
          </div>
          <div class="h-5 bg-gray-200 rounded animate-pulse w-1/2 mb-1"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Demo toggle button -->
    

    <!-- Actual content (for demo) -->
    
  </div>
</template>

<script setup>

definePageMeta({
  ssr: false
})

import { ref, onMounted } from 'vue'

const isLoading = ref(true)

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}

// Auto-toggle for demo
onMounted(() => {
  const interval = setInterval(() => {
    isLoading.value = !isLoading.value
  }, 4000)

  // Clean up interval after 20 seconds
  setTimeout(() => {
    clearInterval(interval)
  }, 20000)
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>