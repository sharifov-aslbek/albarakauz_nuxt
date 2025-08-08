<template>
  <div class="fixed bottom-0 left-0 w-full z-50 border-t border-gray-200 bg-white sm:hidden flex justify-around py-2">
    <!-- Bosh sahifa -->
    <RouterLink
    to="/"
      class="flex flex-col items-center"
      :class="route.path === '/' ? 'text-[#feee00]' : 'text-gray-500'"
    >
      <UIcon name="i-heroicons-power" class="text-2xl" />
      <span class="text-xs mt-1">Bosh sahifa</span>
    </RouterLink>

    <!-- Katalog (doim gray, hali route qilinmagan shekilli) -->
    <div class="flex flex-col items-center text-gray-500">
      <UIcon name="i-heroicons-magnifying-glass" class="text-2xl" />
      <span class="text-xs mt-1">Katalog</span>
    </div>

    <!-- Sevimlilar -->
    <RouterLink
      to="/favorites"
      class="flex flex-col items-center"
      :class="route.path === '/favorites' ? 'text-[#feee00]' : 'text-gray-500'"
    >
      <UIcon name="material-symbols-light:favorite-outline-rounded" class="text-2xl" />
      <span class="text-xs mt-1">Sevimlilar</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
