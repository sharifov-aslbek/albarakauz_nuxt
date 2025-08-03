<template>
  <div class="container h-[300px] relative flex justify-between items-center rounded-xl p-6 overflow-hidden">
    <!-- Background Gradient Layer -->
    <div
      class="absolute left-0 right-0 top-[-30px] bottom-[-30px] z-0 rounded-xl"
      style="
        background: linear-gradient(90deg, #a855f7, #eab308, #f97316, #ef4444);
        mix-blend-mode: overlay;
        opacity: 0.6;
        filter: blur(10px);
      "
    ></div>

    <!-- Product Card 1 -->
    <div class="min-w-[320px] h-[180px] z-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <img src="/testproduct.png" alt="Bucket Hat" class="w-12 h-12 object-cover rounded" />
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">105,000 so'm</div>
          <div class="bg-white/20 px-3 py-1 rounded-full text-sm mt-2">Kepka</div>
        </div>
      </div>
      <div class="mt-4">
        <div class="text-lg font-semibold">uzum.uz</div>
      </div>
      <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full">
        <img src="/uzum.png" alt="">
      </div>
    </div>

    <div
  class="w-full h-[20px] bg-gradient-to-r from-purple-600 to-yellow-600 opacity-20"
/>


    <!-- Product Card 2 -->
    <div class="min-w-[320px] h-[180px] z-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-white relative overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <img src="/testproduct.png" alt="Red Bucket Hat" class="w-12 h-12 object-cover rounded" />
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">95,000 so'm</div>
          <div class="bg-white/20 px-3 py-1 rounded-full text-sm mt-2">Kepka</div>
        </div>
      </div>
      <div class="mt-4">
        <div class="text-lg font-semibold">texnomart.uz</div>
      </div>
      <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full">
        <img class="w-full h-full object-cover scale-[1.1]" src="/texnomart-iconn.png" alt="">
      </div>
    </div>
<div
  class="w-full h-[20px] bg-gradient-to-r from-yellow-600 to-orange-600 opacity-20"
/>

    <!-- Product Card 3 -->
    <div class="min-w-[320px] h-[180px] z-10 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <img src="/testproduct.png" alt="Patterned Bucket Hat" class="w-12 h-12 object-cover rounded" />
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">80,000 so'm</div>
          <div class="bg-white/20 px-3 py-1 rounded-full text-sm mt-2">Kepka</div>
        </div>
      </div>
      <div class="mt-4">
        <div class="text-lg font-semibold">olcha.uz</div>
      </div>
      <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full">
        <img class="w-full h-full object-cover" src="/olcha-3d.png" alt="">
      </div>
    </div>

  <div
  class="w-full h-[20px] bg-neutral-500/20"
/>



    <!-- Promotional Card -->
    <div class="min-w-[320px] h-[180px] z-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <img src="/testproduct.png" alt="Dark Bucket Hat" class="w-12 h-12 object-cover rounded" />
        </div>
        <div class="text-right">
          <div class="text-lg font-bold bg-white/20 px-3 py-2 rounded-lg">
            ARZONROQ<br />TOPAMIZ
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="text-lg font-semibold">albaraka.uz</div>
      </div>
      <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
    </div>
  </div>

</template>


<script setup>
// Component logic if needed
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
