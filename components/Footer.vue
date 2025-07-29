<template>
  <footer class="md:px-8 lg:px-12 bg-white border-t-[0.5px] border-gray-500 w-full mt-30">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-8  justify-between ">
        <!-- Logo and copyright section -->
        <div class="flex flex-col gap-6 py-8 pr-0 border-r-[0.5px] border-gray-500 min-w-[330px]">
          <div class="flex gap-3">
            <img class="w-16 h-16 rounded-xl" src="/assets/logo.png" alt="Logo" />
            <div class="flex flex-col justify-center">
              <span class="text-3xl font-black text-black leading-tight">albaraka.uz</span>
              <span class="tracking-[.2em] font-extralight text-xs mt-1">
                Tovarlarni solishtiring
              </span>
            </div>
          </div>
          <div class="space-y-1">
            <p class="font-extralight text-[10px]">Albaraka.uz 2024-2025 - Barcha huquqlar himoyalangan</p>
          </div>
        </div>

        <div class="py-8 flex gap-8 w-[750px]">
          <ul class="font-thin text-black flex flex-col gap-[16px] mb-[22px]">
            <li>
              <a href="#" class="text-xl">Biz xaqimizda</a>
            </li>
            <li>
              <a href="#" class="text-ms">Topshirish punktlari</a>
            </li>
            <li>
              <a href="#" class="text-ms">Vakansiyalar</a>
            </li>
          </ul>
          <ul class="font-thin text-black flex flex-col gap-[16px]">
            <li>
              <a href="#" class="text-xl">Foydalanuvchilarga</a>
            </li>
            <li>
              <a href="#" class="text-ms">Savol-Javob</a>
            </li>
            <li>
              <a href="#" class="text-ms">Biz bilan bog'lanish</a>
            </li>
          </ul>
        </div>

        <!-- Contact section -->
        <!-- Contact section -->
        <div class="flex flex-col w-[200px] max-w-[500px] space-y-4 mt-20 ml- text-center">
          <h3 class="text-xl font-medium text-gray-900">Biz bilan bog'lanish</h3>
          <div class="flex items-center w-full justify-center gap-2 space-x-2">
            <a href="https://instagram.com">  
              <img src="/instagram.png" alt="" class="w-10 h-10">
            </a>
            <a href="https://linkedin.com">
              <img src="/linkedin.png" alt="" class="w-10 h-10">
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
