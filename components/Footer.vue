<template>
  <footer class="py-8 mt-4 px-4 md:px-8 lg:px-12 bg-white">
    <div class="container mx-auto">
      <div class="flex justify-between gap-8">
        <!-- Logo and copyright section -->
        <div class="flex flex-col space-y-6">
          <div class="flex gap-3 items-center">
            <img class="w-14" src="/assets/logo.png" alt="">
            <div class="flex flex-col">
              <span class="text-xl font-bold text-[#06D6A0]">Albaraka.uz</span>
              <span class="font-medium text-[#06D6A0]">Tovarlarni solishtiring</span>
            </div>
          </div>
          
          <div class="text-gray-600 space-y-1">
            <p>Albaraka.uz 2024-2025</p>
            <p>Barcha huquqlar himoyalangan</p>
          </div>
          
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-icon lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        
        <!-- Bizning yutuqlarimiz section -->
        <!-- <div class="flex flex-col space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Bizning yutuqlarimiz</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div class="flex items-center space-x-2 mb-1">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                <span class="text-lg font-bold text-emerald-700">50K+</span>
              </div>
              <p class="text-sm text-gray-600">Foydalanuvchilar</p>
            </div>

            <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div class="flex items-center space-x-2 mb-1">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span class="text-lg font-bold text-emerald-700">10K+</span>
              </div>
              <p class="text-sm text-gray-600">Mahsulotlar</p>
            </div>

            <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div class="flex items-center space-x-2 mb-1">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-lg font-bold text-emerald-700">4.8</span>
              </div>
              <p class="text-sm text-gray-600">Reyting</p>
            </div>
            <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div class="flex items-center space-x-2 mb-1">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                <span class="text-lg font-bold text-emerald-700">99%</span>
              </div>
              <p class="text-sm text-gray-600">Mamnunlik</p>
            </div>
          </div>
        </div> -->

        <!-- <div class="flex flex-col space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Mashhur kategoriyalar</h3>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">Elektronika</span>
              <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">2.5K+</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">Kiyim-kechak</span>
              <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">1.8K+</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">Uy-ro'zg'or</span>
              <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">1.2K+</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">Sport</span>
              <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">800+</span>
            </div>
          </div>

          <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mt-6">
            <h4 class="font-semibold text-gray-900 mb-1">Yangiliklar</h4>
            <p class="text-sm text-gray-600 mb-3">Eng so'nggi takliflardan xabardor bo'ling</p>
            <div class="flex space-x-2">
              <input 
                type="email" 
                placeholder="Email manzilingiz"
                class="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
              <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
        </div> -->
        
        <!-- Contact section -->
        <div class="flex flex-col w-full max-w-[500px] space-y-4">
          <h3 class="text-xl font-semibold text-gray-900">Bog'lanish</h3>
          
          <div class="flex items-center space-x-2">
            <span class="text-xl font-medium text-gray-900">+998 77 777 77 77</span>
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          
          <p class="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, sint.
          </p>

          <!-- Action buttons -->
          <div class="space-y-2 mt-4">
            <button class="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Email yuborish</span>
            </button>
            <!-- <button class="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span>Online chat</span>
            </button> -->
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex flex-wrap gap-6 text-sm text-gray-600">
            <a href="#" class="hover:text-gray-900 transition-colors">Foydalanish shartlari</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Maxfiylik siyosati</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Yordam</a>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">Ishonchli xaridlar uchun</span>
            <div class="flex space-x-1">
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Component logic here if needed
</script>