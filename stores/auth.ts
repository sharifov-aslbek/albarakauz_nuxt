import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const profileData = ref(null)

  const getProfileData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await fetch('https://albaraka.uz/api/user/retrieve', {
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
    getProfileData
  }
})
