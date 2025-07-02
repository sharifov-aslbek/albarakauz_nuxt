<template>
                <div @click="loginModal = true" class="relative w-fit">
                  <!-- Heart icon container -->
                  <div class="group relative p-2 flex justify-center items-center cursor-pointer">
                    <!-- Background circle with scale animation -->
                    <div
                      class="absolute inset-0 bg-[#06D6A0] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
                    <UIcon class="size-8 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300"  name="material-symbols-light:account-circle" />
                  </div>  
                </div>

  <div v-if="loginModal"
      class="glass-overlay"></div>

      <client-only>
        <n-modal v-model:show="loginModal" transform-origin="center"   :teleport-disabled="true" >
           <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
             <!-- Left Side - Orange Section -->
             <div class="relative bg-[#06D6A0] p-12 hidden md:block">
               <div class="max-w-md text-white">
     
                 <h1 class="text-4xl font-bold mb-4">
                   Xush Kelibsiz
                 </h1>
     
                 <h3 class="text-2xl font-bold mb-4">
                   Login va parollaringizni kiriting
                 </h3>
                 <p class="text-white/90">
                   Simplify your e-commerce management with our user-friendly admin dashboard.
                 </p>
               </div>
               <img src="/assets/login.png" alt="Dashboard illustration" class="mt-2 w-96" />
             </div>
     
             <!-- Right Side - Login Form -->
             <div class="p-12">
               <div class="max-w-md mx-auto">
                 <!-- Logo -->
                 <div @click="loginModal = !loginModal" class="group absolute right-3 top-5 p-3 cursor-pointer">
                   <UButton
       icon="mynaui:x-circle"
       size="md"
       color="primary"
       variant="solid"
       class="bg-[#06D6A0] cursor-pointer border-none hover:bg-[#06d6a0] text-white"
     ></UButton>
     
                 </div>
     
                 <div class="flex items-center gap-2 mb-8">
                   <div class="w-10 h-10 bg-[#06D6A0] rounded-full flex items-center justify-center">
                       <span class="text-white font-bold">A</span>
                     </div>
                   <span class="font-bold text-xl">Albaraka.uz</span>
                 </div>
     
                 <!-- Login Form -->
                 <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                 <p class="text-gray-500 mb-8">Please login to your account</p>
     
                 <form @submit.prevent="handleSubmit" class="space-y-6">
                   <div>
                     <input type="text" placeholder="Email address"
                       class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                       required v-model="email" />
                   </div>
     
                   <div class="relative">
                     <input :type="showPassword ? 'text' : 'password'" placeholder="Password"
                       class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none  focus:border-brand-green"
                       required v-model="password" />
                     <button @click="showPassword = !showPassword" type="button"
                       class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                       <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                       <EyeOffIcon v-else class="w-5 h-5" />
                     </button>
                   </div>
     
                   <div class="text-right">
                     <!-- @click="store.changePasswordModal = !store.changePasswordModal , loginModal = !loginModal" -->
                     <h3 class="text-sm cursor-pointer text-gray-500 hover:text-brand-green">
                       Forgot password?
                     </h3>
                   </div>
     
     
                   <div>
     
                   </div>
     
                   <button type="submit"
                     class="w-full h-[50px] cursor-pointer py-3 px-4 bg-[#06D6A0] hover:bg-[#06D6A0]/70 text-white rounded-lg transition-colors">
                     <span v-if="loader">
                       <n-spin size="small" />
                     </span>
                     <span v-else class="text-[16px]">
                       Login
                     </span>
     
                   </button>
                 </form>
     
                 <!-- Social Login -->
                 <!-- <div class="mt-8">
                 <div class="relative">
                   <div class="absolute inset-0 flex items-center">
                     <div class="w-full border-t border-gray-200"></div>
                   </div>
                   <div class="relative flex justify-center text-sm">
                     <span class="px-4 bg-white text-gray-500">Or Login with</span>
                   </div>
                 </div>
     
                 <div class="mt-6 grid grid-cols-2 gap-4">
                   <button class="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                     <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5 mr-2" />
                     Google
                   </button>
                   <button class="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                     <img src="https://www.facebook.com/favicon.ico" alt="Facebook" class="w-5 h-5 mr-2" />
                     Facebook
                   </button>
                 </div>
               </div> -->
     
                 <!-- Sign Up Link -->
                 <p class="flex items-center gap-3 mt-8 text-center text-gray-500">
                   Don't have an account?
                   <!-- @click="store.registerModal = !store.registerModal, loginModal = !loginModal" -->
                 <h3
                   class="cursor-pointer text-brand-green hover:text-brand-green/70">Signup</h3>
                 </p>
               </div>
             </div>
           </div>
         </n-modal>
      </client-only>
</template>

<script setup>
import { useAuthStore } from "#imports";
import { NModal , NButton , NCard } from "#components";
import { defineComponent, ref } from "vue";
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'


const loginModal = ref(false);
const email = ref(null)
const password = ref(null)
const loader = ref(false)
const toast = useToast()
const authStore = useAuthStore();


const handleSubmit = async () => {
  try {
    loader.value = true;

    const response = await fetch('https://albaraka.uz/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      const accessToken = data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        authStore.getProfileData();
        // 🔊 Success audio
        new Audio(successAudio).play();

        toast.add({
          title: 'Success!',
          description: 'Muvaffaqiyatli login amalga oshirildi.',
          icon: 'mynaui:check'
        });
      } else {
        // 🔊 Error audio
        new Audio(errorAudio).play();

        toast.add({
          title: 'Xatolik!',
          description: 'Token topilmadi. Iltimos, qayta urinib ko‘ring.',
          icon: 'mynaui:x-circle'
        });
      }
    } else {
      // 🔊 Error audio
      new Audio(errorAudio).play();

      toast.add({
        title: 'Xatolik!',
        description: data?.message || 'Nomaʼlum xatolik yuz berdi.',
        icon: 'mynaui:x-circle'
      });
    }
  } catch (error) {
    // 🔊 Error audio
    new Audio(errorAudio).play();

    toast.add({
      title: 'Network xatolik!',
      description: error.message || 'So‘rov bajarilmadi. Internetni tekshiring.',
      icon: 'mynaui:x-circle'
    });
  } finally {
    loader.value = false;
  }
};


</script>

<style scoped>
.glass-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  /* lower than modal */
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  background-color: rgba(255, 255, 255, 0.2);
}

</style>