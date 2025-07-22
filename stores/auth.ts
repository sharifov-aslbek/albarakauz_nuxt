import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios' // ✅ AXIOSNI QO‘SHISH

export const useAuthStore = defineStore('authStore', () => {
  const profileData = ref(null)
  const registerModal = ref(false)
  const verifyEmailModal = ref(false)
  const changePasswordModal = ref(false)
  const resetPasswordModal = ref(false)
  const currentStep = ref(1)

  const getProfileData = async () => {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.NUXT_PUBLIC_BACKEND_URL

      const token = localStorage.getItem('accessToken')

      const response = await axios.get(`${apiBase}/user/retrieve`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      profileData.value = response.data
      console.log('Profile maʼlumotlari:', response.data)

    } catch (error: any) {
      if (error.response) {
        // Server javob berdi, lekin xatolik holatida
        console.error('Xatolik:', error.response.data)
      } else {
        // So‘rov yuborilmadi yoki boshqa xatolik
        console.error('So‘rovda xatolik:', error.message)
      }
    }
  }

  return {
    profileData,
    getProfileData,
    registerModal,
    verifyEmailModal,
    changePasswordModal,
    resetPasswordModal,
    currentStep
  }
})
