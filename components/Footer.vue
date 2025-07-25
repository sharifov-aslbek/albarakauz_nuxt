<template>
  <footer class="py-20 mt-4 px-4 md:px-8 lg:py-12 lg:px-12 bg-[#FFFDDD]">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row justify-between gap-8">
        <!-- Logo and copyright section -->
        <div class="flex flex-col space-y-6">
          <div class="flex items-center gap-4 bg-[#FFFCDF] p-4 rounded-lg">
            <!-- Logo -->
            <img class="w-16 h-16 rounded-xl" src="/assets/logo.png" alt="Logo" />

            <!-- Matnlar -->
            <div class="flex flex-col justify-center">
              <span class="text-3xl font-black text-black leading-tight">albaraka.uz</span>
              <span class="text-[#06D6A0] tracking-[.3em] font-light text-sm mt-1">
                Tovarlarni solishtiring
              </span>
            </div>
          </div>

          <div class="text-gray-600 space-y-1">
            <p>Albaraka.uz 2024-2025</p>
            <p>Barcha huquqlar himoyalangan</p>
          </div>
        </div>

        <!-- Contact section -->
        <div class="flex flex-col w-full lg:max-w-[500px] space-y-4">
          <h3 class="text-xl font-semibold text-gray-900">Bog'lanish</h3>

          <div class="flex items-center space-x-2 flex-wrap">
            <span class="text-xl font-medium text-gray-900">+998 77 407 42 74</span>
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>

          <!-- Action buttons -->
          <div class="space-y-2 mt-4 w-full">
            <a href="https://t.me/dotnet_sharpist" target="_blank" rel="noopener noreferrer"
              class="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <UIcon class="w-5 h-5 mr-4" name="logos:telegram" />
              <span>Telegramdan murojaat qilish</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Nothing needed here for now
</script>
