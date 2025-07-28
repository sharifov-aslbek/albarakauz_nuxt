<template>
  <footer class="md:px-8 lg:px-12 bg-white border-t-2 border-black w-full">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Logo and copyright section -->
        <div class="flex flex-col gap-6 py-12 pr-12 border-r-2 border-black min-w-[300px]">
          <div class="flex gap-3">
            <img class="w-16 h-16 rounded-xl" src="/assets/logo.png" alt="Logo" />
            <div class="flex flex-col justify-center">
              <span class="text-3xl font-black text-black leading-tight">albaraka.uz</span>
              <span class="text-[#06D6A0] tracking-[.3em] font-light text-sm mt-1">
                Tovarlarni solishtiring
              </span>
            </div>
          </div>
          <div class="text-gray-600 space-y-1 text-xs">
            <p class="font-extralight">Albaraka.uz 2024-2025 - Barcha huquqlar himoyalangan</p>
          </div>
        </div>

        <div class="py-8">
          <ul class="font-thin text-black flex flex-col gap-1.5 mb-2">
            <li>
              <a href="#" class="text-xl">Biz xaqimizda</a>
            </li>
            <li>
              <a href="#" class="text-xs">Topshirish punktlari</a>
            </li>
            <li>
              <a href="#" class="text-xs">Vakansiyalar</a>
            </li>
          </ul>
          <ul class="font-thin text-black flex flex-col gap-1.5">
            <li>
              <a href="#" class="text-xl">Foydalanuvchilarga</a>
            </li>
            <li>
              <a href="#" class="text-xs">Savol-Javob</a>
            </li>
            <li>
              <a href="#" class="text-xs">Biz bilan bog'lanish</a>
            </li>
          </ul>
        </div>

        <!-- Contact section -->
        <!-- Contact section -->
        <div class="flex flex-col w-[500px] max-w-[500px] space-y-4 mt-32 ml-169">
          <h3 class="text-xl font-semibold text-gray-900">Biz bilan bog'lanish</h3>
          <div class="flex items-center space-x-2 flex-wrap">
            <a href="tel:=998774074274">
              <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a href="https://t.me/dotnet_sharpist" target="_blank" rel="noopener noreferrer">
              <UIcon class="w-10 h-10 ml-2" name="logos:telegram" />
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
