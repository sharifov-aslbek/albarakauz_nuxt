<template>
  <div class="container relative">
    <section class="bg-gradient-to-r rounded-lg">

      <div class="container">
        <div class="falling-leaves pointer-events-none">
          <span v-for="n in 50" :key="n" class="leaf">

          </span>
        </div>
        <h3
          class="text-[40px] py-[15px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#eab308] drop-shadow-md">
          🍁 KUZGI SEZON 🍂
        </h3>

        <div class="w-full max-w-full mx-auto pb-[20px]">
          <div class="flex justify-between flex-wrap gap-4">
            <div v-for="(img, index) in images" :key="img"
              class="group h-[225px] w-[190px] perspective-1000 transition-transform duration-500"
              :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="card-3d w-full h-full transform-style-preserve-3d transition-all duration-500
                group-hover:rotate-y-[12deg]
                group-hover:-rotate-x-[5deg]
                group-hover:scale-105
                group-hover:shadow-2xl">
                <!-- Front face -->
                <!-- Front face -->
                <div class="card-face card-front absolute inset-0 backface-hidden">
                  <div
                    class="w-full h-full bg-gradient-to-br from-[#fde68a] via-[#facc15] to-[#f59e0b] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] p-3 transition duration-300 hover:brightness-105">
                    <img :src="img" alt="Chilla Season Image" class="w-full h-full object-cover rounded-xl" />
                  </div>
                </div>

                <!-- Right face -->
                <div class="card-face card-right absolute inset-0 backface-hidden">
                  <div
                    class="w-full h-full bg-gradient-to-b from-[#fcd34d] to-[#f59e0b] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] transform rotate-y-90 origin-right transition duration-300 hover:brightness-105">
                  </div>
                </div>

                <!-- Top face -->
                <div class="card-face card-top absolute inset-0 backface-hidden">
                  <div
                    class="w-full h-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] transform rotate-x-90 origin-top transition duration-300 hover:brightness-105">
                  </div>
                </div>




              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  '/chilla-img1.png',
  '/chilla-img2.png',
  '/chilla-img3.png',
  '/chilla-img4.png',
  '/chilla-img5.png'
])
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.card-3d {
  transform-style: preserve-3d;
  position: relative;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.card-front {
  transform: translateZ(15px);
}

.card-right {
  transform: rotateY(90deg) translateZ(15px);
}

.card-top {
  transform: rotateX(90deg) translateZ(15px);
}

/* Animation on load (optional) */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px) rotateY(-10deg);
  }

  to {
    opacity: 1;
    transform: translateY(0) rotateY(0deg);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.falling-leaves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.leaf {
  position: absolute;
  top: -50px;
  width: 50px;
  height: 50px;
  background-image: url('/leaf.png');
  /* barg rasmi */
  background-size: contain;
  background-repeat: no-repeat;
  animation: fall linear infinite;
  opacity: 0.8;
}

/* Tasodifiy animatsiyalar */
.leaf:nth-child(odd) {
  animation-duration: 8s;
  left: 10%;
}

.leaf:nth-child(even) {
  animation-duration: 10s;
  left: 50%;
}

.leaf:nth-child(3n) {
  animation-duration: 12s;
  left: 30%;
}

.leaf:nth-child(4n) {
  animation-duration: 9s;
  left: 70%;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
