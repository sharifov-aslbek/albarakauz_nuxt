<template>
  <n-modal v-model:show="store.changePasswordModal" transform-origin="center">
    <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
      
      <!-- Close icon -->
      <div
        @click="store.changePasswordModal = false"
        class="group absolute right-3 top-5 p-3 cursor-pointer"
      >
        <div
          class="absolute inset-0 bg-[#06D6A0] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out"
        />
        <UIcon
          name="i-heroicons-x-mark"
          class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300"
        />
      </div>

      <!-- Left Section -->
      <div class="relative bg-[#06D6A0] p-12 hidden md:block">
        <div class="max-w-md text-white">
          <h1 class="text-4xl font-bold mb-4">
            Set a new password for your account
          </h1>
          <p class="text-white/90">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
        </div>
        <img
          src="/assets/shop-icon.png"
          alt="Dashboard illustration"
          class="my-6 w-96"
        />
      </div>

      <!-- Right Section -->
      <div class="p-12">
        <div class="max-w-md mx-auto">
          <!-- Logo -->
          <div class="flex items-center gap-2 mb-8">
            <div
              class="w-10 h-10 bg-[#06D6A0] rounded-full flex items-center justify-center"
            >
              <span class="text-white font-bold">A</span>
            </div>
            <span class="font-bold text-xl">Albaraka.uz</span>
          </div>

          <!-- Title -->
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Enter your passwords
          </h2>
          <p class="text-gray-500 mb-8">Please enter passwords</p>

          <!-- FORM -->
          <form @submit.prevent="handleSubmitChange" class="space-y-6">
            <!-- Old Password -->
            <div class="relative">
              <input
                :type="showChangePassword3 ? 'text' : 'password'"
                placeholder="Old password"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#06D6A0]"
                required
                v-model="oldpassword"
              />
              <button
                @click="showChangePassword3 = !showChangePassword3"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <UIcon
                  v-if="!showChangePassword3"
                  name="i-heroicons-eye"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else
                  name="i-heroicons-eye-slash"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <!-- New Password -->
            <div class="relative">
              <input
                :type="showChangePassword2 ? 'text' : 'password'"
                placeholder="New password"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#06D6A0]"
                required
                v-model="newpassword"
              />
              <button
                @click="showChangePassword2 = !showChangePassword2"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <UIcon
                  v-if="!showChangePassword2"
                  name="i-heroicons-eye"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else
                  name="i-heroicons-eye-slash"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <!-- Confirm Password -->
            <div class="relative">
              <input
                :type="showChangePassword ? 'text' : 'password'"
                placeholder="Confirm new password"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#06D6A0]"
                required
                v-model="confirmPassword"
              />
              <button
                @click="showChangePassword = !showChangePassword"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <UIcon
                  v-if="!showChangePassword"
                  name="i-heroicons-eye"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else
                  name="i-heroicons-eye-slash"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <div class="text-right">
              <a
                href="#"
                class="text-sm text-gray-500 hover:text-[#06D6A0]"
              >
                Forgot password?
              </a>
            </div>

            <!-- SUBMIT BUTTON -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 px-4 bg-[#06D6A0] hover:bg-[#06D6A0]/70 text-white rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-60"
            >
              <span v-if="!isSubmitting">Change password</span>
              <svg
                v-else
                class="w-5 h-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </button>
          </form>

          <!-- SIGNUP LINK -->
          <p
            class="flex items-center gap-2 mt-8 text-center text-gray-500"
          >
            Akkauntingiz yo'qmi?
            <h3
              @click="registerOpener"
              class="cursor-pointer text-[#06D6A0] hover:text-[#06D6A0]/70"
            >
              Ro'yxatdan o'ting
            </h3>
          </p>
        </div>
      </div>
    </div>
  </n-modal>
</template>


<script setup>
import { ref } from 'vue'
import { useToast, useAuthStore } from '#imports'
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'

const store = useAuthStore()
const toast = useToast()

// audio
const successSound = new Audio(successAudio)
const errorSound = new Audio(errorAudio)

// form states
const showChangePassword = ref(false)
const showChangePassword2 = ref(false)
const showChangePassword3 = ref(false)

const oldpassword = ref('')
const newpassword = ref('')
const confirmPassword = ref('')

const isSubmitting = ref(false)

const registerOpener = () => {
  store.registerModal = true
  store.changePasswordModal = false
}

const handleSubmitChange = async () => {
  if (!oldpassword.value) {
    toast.add({
      title: 'Xatolik',
      description: 'Old password kiritilmagan',
      color: 'error',
    })
    errorSound.play()
    return
  }

  if (!newpassword.value) {
    toast.add({
      title: 'Xatolik',
      description: 'Yangi parol kiritilmagan',
      color: 'error',
    })
    errorSound.play()
    return
  }

  if (!confirmPassword.value) {
    toast.add({
      title: 'Xatolik',
      description: 'Parol tasdiqlanmagan',
      color: 'error',
    })
    errorSound.play()
    return
  }

  if (newpassword.value !== confirmPassword.value) {
    toast.add({
      title: 'Xatolik',
      description: 'Parollar mos emas',
      color: 'error',
    })
    errorSound.play()
    return
  }

  isSubmitting.value = true

  try {
    await changePassword(oldpassword.value, newpassword.value, confirmPassword.value)
    oldpassword.value = ''
    newpassword.value = ''
    confirmPassword.value = ''
    successSound.play()
  } catch (error) {
    // toast ichida ham errorSound bor
  } finally {
    isSubmitting.value = false
  }
}

const changePassword = async (oldPassword, newPassword, newPasswordConfirmation) => {
  try {
    const token = localStorage.getItem('accessToken')

    const res = await fetch('https://albaraka.uz/api/user/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        newPasswordConfirmation,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      let errorMsg = errorData?.message || 'Server xatoligi'

      if (res.status === 400) {
        console.log('Error 400:', errorMsg)
      } else {
        console.log('API Error:', errorData)
      }

      toast.add({
        title: 'Xatolik',
        description: errorMsg,
        color: 'error',
      })
      errorSound.play()
      throw new Error(errorMsg)
    }

    const data = await res.json()

    toast.add({
      title: 'Parol o‘zgartirildi',
      description: 'Parolingiz muvaffaqiyatli o‘zgartirildi',
      color: 'success',
    })
    successSound.play()

    store.changePasswordModal = false

    return data
  } catch (error) {
    const errorMsg = error.message || 'Tarmoq xatoligi'

    console.log('Network Error:', errorMsg)

    toast.add({
      title: 'Xatolik',
      description: errorMsg,
      color: 'error',
    })
    errorSound.play()

    throw error
  }
}
</script>
