import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ErrorDetails {
  statusCode: number;
  title: string;
  message: string;
}

export const useErrorStore = defineStore('errorStore', () => {
  const isVisible = ref(false)
  const error = ref<ErrorDetails | null>(null)

  function showError(details: ErrorDetails) {
    error.value = details
    isVisible.value = true
  }

  function hideError() {
    isVisible.value = false
    error.value = null
  }

  return { isVisible, error, showError, hideError }
})
