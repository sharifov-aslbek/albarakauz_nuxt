<template>
  <footer class="w-full bg-white mt-30 px-4 sm:px-6 md:px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-10 justify-between items-center lg:items-start py-10">
        
        <!-- Logo and copyright section -->
        <div class="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
          <div class="flex items-center gap-3">
            <img class="w-24 rounded-xl" src="/assets/logo.png" alt="Logo" />
            <div class="flex flex-col justify-center">
              <span class="text-2xl sm:text-3xl font-semibold text-black">albaraka.uz</span>
              <span class="tracking-[.2em] font-medium text-black text-xs mt-1">
                Tovarlarni solishtiring
              </span>
            </div>
          </div>
          <p class="font-extralight text-sm text-black">Albaraka.uz 2024-2025 - Barcha huquqlar himoyalangan</p>
        </div>

        <!-- Link sections -->
        <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 text-center sm:text-left">
          <ul class="font-thin text-black flex flex-col gap-4">
            <li>
              <a href="#" class="text-lg font-medium">Biz xaqimizda</a>
            </li>
            <li>
              <a href="#" class="text-sm">Topshirish punktlari</a>
            </li>
            <li>
              <a href="#" class="text-sm">Vakansiyalar</a>
            </li>
          </ul>
          <ul class="font-thin text-black flex flex-col gap-4">
            <li>
              <a href="#" class="text-lg font-medium">Foydalanuvchilarga</a>
            </li>
            <li>
              <a href="#" class="text-sm">Savol-Javob</a>
            </li>
            <li>
              <a href="#" class="text-sm">Biz bilan bog'lanish</a>
            </li>
          </ul>
        </div>

        <!-- Contact section -->
        <div class="flex flex-col items-center gap-4 text-center">
          <h3 class="text-lg font-medium text-gray-900">Biz bilan bog'lanish</h3>
          <div class="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">  
              <img src="/instagram.png" alt="Instagram" class="w-10 h-10">
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" class="w-10 h-10">
            </a>
            <a href="https://t.me/dotnet_sharpist" target="_blank" rel="noopener noreferrer">
              <UIcon class="w-10 h-10" name="logos:telegram" />
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
