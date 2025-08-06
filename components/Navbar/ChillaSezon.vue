<template>
  <div class="container">
    <section class="bg-gradient-to-r rounded-lg">
      <div class="container">
        <h3 class="text-[40px] py-[15px] font-bold text-center">CHILLA SEZON</h3>
        <div class="w-full max-w-full mx-auto pb-[20px]">
          <div class="flex justify-between flex-wrap gap-4">
            <div
              v-for="(img, index) in images"
              :key="img"
              class="group h-[225px] w-[190px] perspective-1000 transition-transform duration-500"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div
                class="card-3d w-full h-full transform-style-preserve-3d transition-all duration-500
                group-hover:rotate-y-[12deg]
                group-hover:-rotate-x-[5deg]
                group-hover:scale-105
                group-hover:shadow-2xl"
              >
                <!-- Front face -->
                <div class="card-face card-front absolute inset-0 backface-hidden">
                  <div class="w-full h-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 rounded-xl shadow-xl p-3">
                    <img 
                      :src="img" 
                      alt="Chilla Season Image" 
                      class="w-full h-full object-cover rounded-lg" 
                    />
                  </div>
                </div>

                <!-- Right face -->
                <div class="card-face card-right absolute inset-0 backface-hidden">
                  <div class="w-full h-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-xl shadow-xl transform rotate-y-90 origin-right"></div>
                </div>

                <!-- Top face -->
                <div class="card-face card-top absolute inset-0 backface-hidden">
                  <div class="w-full h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-xl shadow-xl transform rotate-x-90 origin-top"></div>
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
</style>
