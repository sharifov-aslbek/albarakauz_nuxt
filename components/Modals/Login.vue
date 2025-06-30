<template>
     <n-button @click="showModal = true">
    Start me up
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        Oops!
      </template>
      Content
      <template #footer>
        Footer
      </template>
    </n-card>
  </n-modal>

    <n-button @click="loginModal = !loginModal">Open</n-button>
    <n-modal v-model:show="loginModal" transform-origin="center">
      <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
        <!-- Left Side - Orange Section -->
        <div class="relative bg-brand-green p-12 hidden md:block">
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
              <!-- Background circle with scale animation -->
              <div
                class="absolute inset-0 bg-brand-green rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
              <X class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
            </div>
            <div class="flex items-center gap-2 mb-8">
              <div class="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <span class="text-white font-bold">A</span>
              </div>
              <span class="font-bold text-xl">Albaraka.uz</span>
            </div>

            <!-- Login Form -->
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p class="text-gray-500 mb-8">Please login to your account</p>

            <!-- @submit.prevent="handleSubmit" -->
            <form  class="space-y-6">
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
                  <!-- <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                  <EyeOffIcon v-else class="w-5 h-5" /> -->
                </button>
              </div>

              <div class="text-right">
                <!-- <h3 @click="store.changePasswordModal = !store.changePasswordModal , loginModal = !loginModal" class="text-sm cursor-pointer text-gray-500 hover:text-brand-green">
                  Forgot password?
                </h3> -->
              </div>


              <div>

              </div>

              <button type="submit"
                class="w-full h-[50px] py-3 px-4 bg-brand-green hover:bg-brand-green/70 text-white rounded-lg transition-colors">
                <span v-if="loader">
                  <n-spin size="small" />
                </span>
                <span v-else class="text-[16px]">
                  Login
                </span>

              </button>
            </form>

            <!-- Sign Up Link -->
            <p class="flex items-center gap-3 mt-8 text-center text-gray-500">
              Don't have an account?
            <!-- <h3 @click="store.registerModal = !store.registerModal, loginModal = !loginModal"
              class="cursor-pointer text-brand-green hover:text-brand-green/70">Signup</h3> -->
            </p>
          </div>
        </div>
      </div>
    </n-modal>
</template>


<script setup>
import { NModal , NSpin , NButton , NCard } from '#components';
import { ref } from 'vue';

const loader = ref(false);
const loginModal = ref(true);
let email = ref(null)
let password = ref(null)
const showPassword = ref(false);
const showModal = ref(false);

</script>

<style scoped>

</style>