<template>
  <UModal class="sm:max-w-6xl">
    <UButton label="Open Login Modal" color="primary" />

    <template #content>
      <div class="login-modal-content">
        <div class="w-full grid md:grid-cols-2 bg-green-500 rounded-3xl overflow-hidden shadow-xl">
          <!-- Left Side -->
          <div class="relative bg-brand-green p-12 hidden md:block">
            <div class="max-w-md text-white">
              <h1 class="text-4xl font-bold mb-4">Xush Kelibsiz</h1>
              <h3 class="text-2xl font-bold mb-4">
                Login va parollaringizni kiriting
              </h3>
              <p class="text-white/90">
                Simplify your e-commerce management with our user-friendly admin dashboard.
              </p>
            </div>
            <img src="/assets/login.png" alt="Dashboard illustration" class="mt-2 w-96" />
          </div>

          <!-- Right Side -->
          <div class="p-12 bg-white relative">
            <div class="max-w-md mx-auto">
              <!-- Close Button -->
              <UButton
                icon="i-heroicons-x-mark"
                color="gray"
                variant="ghost"
                class="absolute right-3 top-3"
                @click="$emit('close')"
              />

              <!-- Logo -->
              <div class="flex items-center gap-2 mb-8">
                <div
                  class="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">A</span>
                </div>
                <span class="font-bold text-xl">Albaraka.uz</span>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p class="text-gray-500 mb-8">
                Please login to your account
              </p>

              <form class="space-y-6" @submit.prevent="handleSubmit">
                <div>
                  <input
                    type="text"
                    placeholder="Email address"
                    class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                    required
                    v-model="email"
                  />
                </div>

                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                    required
                    v-model="password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <UIcon
                      v-if="!showPassword"
                      name="i-heroicons-eye"
                    />
                    <UIcon
                      v-else
                      name="i-heroicons-eye-slash"
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  class="w-full h-[50px] py-3 px-4 bg-brand-green hover:bg-brand-green/90 text-white rounded-lg transition-colors font-medium"
                >
                  <span v-if="loading">
                    <UIcon
                      name="i-heroicons-arrow-path-20-solid"
                      class="animate-spin w-5 h-5 mx-auto"
                    />
                  </span>
                  <span v-else>Login</span>
                </button>
              </form>

              <p
                class="flex items-center justify-center gap-3 mt-8 text-center text-gray-500"
              >
                Don't have an account?
                <button
                  @click="openRegister"
                  class="text-brand-green hover:text-brand-green/70 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

definePageMeta({
  ssr: false
})

const handleSubmit = () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    console.log('Logged in with', email.value, password.value)
  }, 1500)
}

const openRegister = () => {
  console.log('Redirect to registration')
}
</script>

<style scoped>
.bg-brand-green {
  background-color: #06D6A0;
}
.text-brand-green {
  color: #06D6A0;
}
.hover\:text-brand-green\/70:hover {
  color: rgba(6, 214, 160, 0.7);
}
.bg-brand-green\/90 {
  background-color: rgba(6, 214, 160, 0.9);
}

/* **DEEP SELECTOR** bilan modal container'ga width beramiz */
:deep(.nui-modal-container) {
  width: 900px !important;
  max-width: 100%;
}
</style>
