<template>
    <!-- <h1>404 - Страница не найдена</h1> -->
    <div class="bg-yellow-500">
        <h1 class="error-title">Error 404</h1>
        <div class="relative flex items-center justify-center mb-8">
            <span class="text-4xl md:text-[200px] font-black text-white z-10">4</span>

            <div class="relative mx-4 z-0">
                <div class="absolute -top-4 -right-16 bg-yellow-300 px-4 py-2 rounded-full shadow-md z-20 transform -rotate-12">
                    <span class="font-bold text-lg">OOPS!</span>
                </div>

                <svg width="150" height="180" viewBox="0 0 150 180" class="drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">

                    <rect x="10" y="160" width="130" height="20" fill="#333" rx="5"/>
                    <rect x="0" y="155" width="150" height="10" fill="#222" rx="5"/>
                    
                    <polygon points="75,10 30,160 120,160" fill="#FF6B00"/>
                    
                    <polygon points="75,50 45,110 105,110" fill="white"/>
                    <polygon points="75,10 30,160 120,160" fill="none" stroke="#E65100" stroke-width="2"/>

                    <circle cx="60" cy="130" r="5" fill="#333"/>
                    <circle cx="90" cy="130" r="5" fill="#333"/>
                    <path d="M70 140 Q 75 145 80 140" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
                    
                    <circle cx="50" cy="135" r="7" fill="#FFC0CB" opacity="0.7"/>
                    <circle cx="100" cy="135" r="7" fill="#FFC0CB" opacity="0.7"/>
                </svg>

            </div>
            
            <span class="text-4xl md:text-[200px] font-black text-white z-10 ">4</span>
        </div>

        <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-2">Sahifa topilmadi</h1>
            <p class="text-lg md:text-xl mb-6">Bu serverda soʻralgan URL topilmadi.</p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button class="bg-transparent text-gray-700 font-bold py-3 px-6 rounded-lg  hover:bg-gray-800 hover:text-white transition-colors duration-300 w-full sm:w-auto cursor-pointer" @click="$router.push('/')">
                    Bosh sahifaga qaytish
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.error-title {
    color: red;
    text-align: center;
    font-size: 2rem;
    padding-top: 15rem;
    /* margin-bottom: 1rem; */
}
.bg-yellow-500 {
    background-color: #fbbf24;
    padding-bottom: 15rem;
}
.z-10{
    font-size: 12rem;
    line-height: 1;
}
</style>