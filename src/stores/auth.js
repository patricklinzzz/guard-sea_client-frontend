import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      console.error(e)
      localStorage.removeItem('user')
    }
  }

  const isLoggedIn = computed(() => user.value !== null)

  function login(memberData) {
    user.value = memberData
    localStorage.setItem('user', JSON.stringify(memberData))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isLoggedIn, login, logout }
})
