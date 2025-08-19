<!-- components/OfflineAlert.vue -->
<template>
  <!-- E'lon global chiqishi uchun -->
  <teleport to="body">
    <transition name="slide-up">
      <div
        v-if="!online"
        class="fixed inset-x-0 bottom-4 z-[1000] px-4"
        aria-live="polite"
        role="status"
      >
        <div
          class="mx-auto max-w-xl rounded-2xl shadow-2xl border border-black/10"
          :style="{ backgroundColor: '#feee00' }"
        >
          <div class="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
            <!-- Icon -->
            <svg class="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 20h.01M2.06 11c2.87-2.87 6.79-4.32 10.71-4.08 2.34.14 4.62.83 6.58 2.03M5.53 14.47c3.51-3.51 9.2-3.51 12.73 0M9.76 18.24c1.74-1.74 4.74-1.74 6.49 0" />
              <line x1="3" y1="3" x2="21" y2="21" stroke-width="1.5" stroke="currentColor"/>
            </svg>

            <div class="flex-1">
              <h3 class="font-semibold text-black text-base sm:text-lg">
                Internet aloqasi uzildi
              </h3>
              <p class="text-black/80 text-sm sm:text-[15px] mt-1">
                Iltimos, tarmoqni tekshiring. Ulanish qaytgach sahifani yangilashingiz mumkin.
              </p>

              <div class="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
                <button
                  @click="reloadPage"
                  class="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border border-black/20 shadow-sm
                         hover:-translate-y-0.5 active:translate-y-0 transition
                         focus:outline-none focus:ring-2 focus:ring-black/30"
                  :style="{ backgroundColor: '#feee00', color: '#000' }"
                >
                  Reload
                </button>

                <button
                  v-if="showTryAgain"
                  @click="checkAgain"
                  class="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border border-black/20
                         bg-white text-black shadow-sm hover:bg-black hover:text-white transition
                         focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  Re-check
                </button>
              </div>
            </div>

            <!-- ixtiyoriy yopish tugmasi (agar kerak bo'lsa) -->
            <!-- <button @click="dismiss" class="p-1 rounded-lg hover:bg-black/10 transition">
              <span class="sr-only">Yopish</span>
              ✕
            </button> -->
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useOnline } from '@vueuse/core'

const online = useOnline()
const showTryAgain = ref(true)

const reloadPage = () => {
  // toza reload
  window.location.reload()
}

const checkAgain = () => {
  // navigator.onLine bilan qayta tekshiruv
  // (useOnline ham avtomatik yangilanadi, bu yerda shunchaki UX uchun)
  showTryAgain.value = false
  setTimeout(() => (showTryAgain.value = true), 2000)
}
</script>

<style scoped>
/* Pastdan muloyim ko'tarilib chiqadigan animatsiya */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 250ms ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>
