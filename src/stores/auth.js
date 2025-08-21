import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => user.value !== null)

  async function fetchUser() {
    try {
      const response = await axios.get(`${baseUrl}/auth/get_user_info.php`, {
        withCredentials: true,
      })
      if (response.data.success) {
        user.value = response.data.member
        if (user.value['avatar_url'] && user.value['avatar_url'].startsWith('/')) {
          user.value['avatar_url'] = baseUrl + user.value['avatar_url']
        }
        // 如果 image_url 不符合條件 (例如 null 或已經是完整的 http 路徑)，直接返回
        return true
      }
    } catch (error) {
      user.value = null
      return false
    }
  }

  function login(memberData) {
    user.value = memberData
  }

  async function logout() {
    try {
      const apiUrl = `${baseUrl}/auth/logout.php`
      const response = await axios.get(apiUrl)

      if (response.data.success) {
        user.value = null
        return true
      } else {
        throw new Error('登出失敗')
      }
    } catch (error) {
      console.error(error.message)
      return false
    }
  }

  return { user, isLoggedIn, login, logout, fetchUser }
})
