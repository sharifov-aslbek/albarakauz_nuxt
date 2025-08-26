<template>
  <div v-if="errorStore.isVisible && errorStore.error" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="glass-box-modal relative flex flex-col items-center justify-center mx-auto p-8 rounded-2xl max-w-2xl w-full">
      <div class="flex items-center mb-8">
        <span class="text-4xl md:text-[150px] font-black text-white z-10">{{ firstDigit }}</span>
        <div class="relative mx-4 z-0">
          <div class="absolute -top-4 -right-16 bg-yellow-300 px-4 py-2 rounded-full shadow-md z-20 transform -rotate-12">
            <span class="font-bold text-lg">OOPS!</span>
          </div>
          <svg width="120" height="150" viewBox="0 0 150 180" class="drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="160" width="130" height="20" fill="#333" rx="5" />
            <rect x="0" y="155" width="150" height="10" fill="#222" rx="5" />
            <polygon points="75,10 30,160 120,160" fill="#FF6B00" />
            <polygon points="75,50 45,110 105,110" fill="white" />
            <polygon points="75,10 30,160 120,160" fill="none" stroke="#E65100" stroke-width="2"/>
            <circle cx="60" cy="130" r="5" fill="#333" />
            <circle cx="90" cy="130" r="5" fill="#333" />
            <path d="M70 140 Q 75 145 80 140" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="135" r="7" fill="#FFC0CB" opacity="0.7" />
            <circle cx="100" cy="135" r="7" fill="#FFC0CB" opacity="0.7" />
          </svg>
        </div>

        <span class="text-4xl md:text-[150px] font-black text-white z-10">{{ lastDigit }}</span>
      </div>

      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-2 text-white">
          {{ errorStore.error.title }}
        </h1>
        <p class="text-md md:text-lg mb-6 text-gray-200">
          {{ errorStore.error.message }}
        </p>
        <button class="font-bold py-3 px-6 rounded-lg bg-gray-800 text-white transition-colors duration-300 cursor-pointer" @click="closeModal">
          Yopish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useErrorStore } from '#imports';

const errorStore = useErrorStore();

const firstDigit = computed(() => String(errorStore.error?.statusCode || '500').charAt(0));
const lastDigit = computed(() => String(errorStore.error?.statusCode || '500').charAt(2));

const closeModal = () => {
  errorStore.hideError();
};
</script>

<style scoped>
.glass-box-modal {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
</style>