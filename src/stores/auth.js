import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE

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

  async function logout() {
    if (confirm('您確定要登出嗎？')) {
      try {
        const apiUrl = `${baseUrl}/auth/logout.php`
        const response = await axios.get(apiUrl)

        if (response.data.success) {
          user.value = null
          localStorage.removeItem('user')
          return true
        } else {
          throw new Error('登出失敗')
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  }

  return { user, isLoggedIn, login, logout }
})
