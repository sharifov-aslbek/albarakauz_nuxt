import { defineStore } from 'pinia'
import { ref } from 'vue' // ⛔️ XATO

import { useRuntimeConfig } from '#app'

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

      const response = await fetch(`${apiBase}/user/retrieve`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        profileData.value = data
        console.log('Profile maʼlumotlari:', data)
      } else {
        console.error('Xatolik:', data)
      }
    } catch (error) {
      console.error('So‘rovda xatolik:', error)
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
