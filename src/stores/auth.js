import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user-token'))

  const isLoggedIn = computed(() => !!token.value)

  function login(userToken) {
    token.value = userToken
    localStorage.setItem('user-token', userToken)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('user-token')
  }

  return { token, isLoggedIn, login, logout }
})
