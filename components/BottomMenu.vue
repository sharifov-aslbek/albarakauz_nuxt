<template>
  <div class="fixed bottom-0 left-0 w-full z-50 border-t border-gray-200 bg-white sm:hidden flex justify-around py-2">
    <!-- Bosh sahifa -->
    <RouterLink
    to="/"
      class="flex flex-col items-center"
      :class="route.path === '/' ? 'text-[#feee00]' : 'text-gray-500'"
    >
      <UIcon name="material-symbols:home" class="text-2xl" />
      <span class="text-xs mt-1">Bosh sahifa</span>
    </RouterLink>


    <!-- Sevimlilar -->
    <RouterLink
      to="/favorites"
      class="flex flex-col items-center"
      :class="route.path === '/favorites' ? 'text-[#feee00]' : 'text-gray-500'"
    >
      <UIcon name="material-symbols:favorite-outline-rounded" class="text-2xl" />
      <span class="text-xs mt-1">Sevimlilar</span>
    </RouterLink>

    <button @click="openModal" class="flex flex-col items-center text-gray-500">
      <UIcon name="material-symbols:account-circle" class="text-2xl" />
      <span class="text-xs mt-1">My Kabinet</span>
    </button>

  </div>
</template>

<script setup>
import { useAuthStore } from '#imports';
import { useRoute } from 'vue-router'

const store = useAuthStore()
const route = useRoute()

const openModal = () => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    store.profileModal = !store.profileModal
  } else {
    store.registerModal = !store.registerModal
  }
}
</script>
