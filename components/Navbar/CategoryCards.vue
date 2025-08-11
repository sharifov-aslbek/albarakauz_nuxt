<template>
  <div v-if="store.categoryData" class="container">
    <div class="flex flex-wrap justify-between gap-5">
      <div @click="navigateCategory(category.id)" v-for="(category, index) in store.categoryData.slice(0, 9)"
        :key="category.id" class="category-card 
         w-full 
         sm:w-[48%] 
         md:w-[45%] 
         lg:w-[30%] 
         relative 
         flex flex-col lg:flex-row  <!-- o'zgarish -->
         justify-between items-center 
         h-auto lg:h-[200px]  <!-- balandlik moslashdi -->
         rounded-lg p-3 sm:p-5 
         overflow-hidden group 
         hover:scale-105 
         transition-transform duration-300 
         cursor-pointer" :style="{ animationDelay: `${index * 0.1}s` }">
        <!-- Animated background -->
        <div class="absolute inset-0 bg-gradient-to-bl from-[#feee00] to-black/10">
          <div
            class="absolute w-[200px] h-[200px] bg-white/20 rounded-full blur-3xl top-[-50px] left-[-50px] animate-float">
          </div>
          <div
            class="absolute w-[150px] h-[150px] bg-white/10 rounded-full blur-2xl bottom-[-40px] right-[-40px] animate-float-reverse">
          </div>
          <div
            class="absolute w-[100px] h-[100px] bg-yellow-300/10 rounded-full blur-xl top-[50%] left-[20%] animate-pulse-slow">
          </div>
          <div
            class="absolute w-[80px] h-[80px] bg-white/15 rounded-full blur-lg top-[20%] right-[30%] animate-bounce-slow">
          </div>
        </div>

        <!-- Animated gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer">
        </div>

        <!-- Title -->
        <h4 class="category-title
        text-md
        text-center
        sm:text-start
             sm:text-2xl 
             relative z-10 
             group-hover:text-yellow-600 
             transition-colors duration-300 
             animate-fade-in-up
             mb-2 lg:mb-0">
          {{ category.name }}
        </h4>

        <!-- Image -->
        <img :src="category.image && category.image.localImagePath
          ? `https://api.albaraka.uz/${category.image.localImagePath}`
          : 'https://cdn-icons-png.flaticon.com/512/8634/8634546.png'" class="w-[60px] sm:w-[160px] object-cover relative z-10 
           group-hover:rotate-3 group-hover:scale-110 
           transition-all duration-500 
           animate-gentle-bounce" :alt="category.name" />
      </div>

    </div>
  </div>

  <br>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { useCategoryAllStore } from '#imports';
const store = useCategoryAllStore();
const router = useRouter();

const navigateCategory = (id) => {
  router.push(`/category/${id}`);
}

</script>

<style scoped>
.category-card {
  background: linear-gradient(135deg, #fefefe, #feee00);
  animation: card-glow 4s ease-in-out infinite alternate;
}

/* Custom animations */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  25% {
    transform: translateY(-10px) translateX(5px);
  }

  50% {
    transform: translateY(-5px) translateX(-5px);
  }

  75% {
    transform: translateY(-15px) translateX(3px);
  }
}

@keyframes float-reverse {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  25% {
    transform: translateY(10px) translateX(-5px);
  }

  50% {
    transform: translateY(5px) translateX(5px);
  }

  75% {
    transform: translateY(15px) translateX(-3px);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes gentle-bounce {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-3px);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-glow {
  0% {
    box-shadow: 0 4px 20px rgba(254, 238, 0, 0.2);
  }

  100% {
    box-shadow: 0 8px 30px rgba(254, 238, 0, 0.4);
  }
}

/* Animation classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 8s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-gentle-bounce {
  animation: gentle-bounce 2s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .category-card {
    width: 100% !important;
  }
}

@media (max-width: 1024px) {
  .category-card {
    width: 45% !important;
  }
}
</style>