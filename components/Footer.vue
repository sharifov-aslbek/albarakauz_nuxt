<template>
  <footer class="md:px-8 lg:px-12 bg-white border-t-1 border-black w-full mt-30">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-8 ">
        <!-- Logo and copyright section -->
        <div class="flex flex-col gap-6 py-12 pr-0 border-r-1 border-black min-w-[330px]">
          <div class="flex gap-3">
            <img class="w-16 h-16 rounded-xl" src="/assets/logo.png" alt="Logo" />
            <div class="flex flex-col justify-center">
              <span class="text-3xl font-black text-black leading-tight">albaraka.uz</span>
              <span class="tracking-[.2em] font-extralight text-xs mt-1">
                Tovarlarni solishtiring
              </span>
            </div>
          </div>
          <div class="space-y-1 mt-[21px]">
            <p class="font-extralight text-[10px]">Albaraka.uz 2024-2025 - Barcha huquqlar himoyalangan</p>
          </div>
        </div>

        <div class="py-8">
          <ul class="font-thin text-black flex flex-col gap-[4px] mb-[22px]">
            <li>
              <a href="#" class="text-xs">Biz xaqimizda</a>
            </li>
            <li>
              <a href="#" class="text-[7px]">Topshirish punktlari</a>
            </li>
            <li>
              <a href="#" class="text-[7px]">Vakansiyalar</a>
            </li>
          </ul>
          <ul class="font-thin text-black flex flex-col gap-[4px]">
            <li>
              <a href="#" class="text-xs">Foydalanuvchilarga</a>
            </li>
            <li>
              <a href="#" class="text-[7px]">Savol-Javob</a>
            </li>
            <li>
              <a href="#" class="text-[7px]">Biz bilan bog'lanish</a>
            </li>
          </ul>
        </div>

        <!-- Contact section -->
        <!-- Contact section -->
        <div class="flex flex-col w-[500px] max-w-[500px] space-y-4 mt-32 ml-200 text-center">
          <h3 class="text-[10px] font-semibold text-gray-900">Biz bilan bog'lanish</h3>
          <div class="flex items-center space-x-2">
            <a href="https://instagram.com">
              <img src="/instagram.png" alt="" class="w-[32px] h-[32px]">
            </a>
            <a href="https://linkedin.com">
              <img src="/linkedin.png" alt="" class="w-[32px] h-[32px]">
            </a>
            <a href="https://t.me/dotnet_sharpist" target="_blank" rel="noopener noreferrer">
              <UIcon class="w-[32px] h-[32px]" name="logos:telegram" />
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
