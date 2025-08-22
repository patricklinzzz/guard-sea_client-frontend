import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const memberData = ref(null) // 修正：新增 memberData 狀態

  const isLoggedIn = computed(() => user.value !== null)

  async function fetchUser() {
    try {
      const response = await axios.get(`${baseUrl}/auth/get_user_info.php`, {
        withCredentials: true,
      })
      if (response.data.success) {
        user.value = response.data.member
        return true
      }
    } catch (error) {
      user.value = null
      return false
    }
  }
  // 修正：新增 fetchMemberData 動作
  async function fetchMemberData() {
    if (!isLoggedIn.value) return
    try {
      const response = await axios.get(`${baseUrl}/members/get_member_data.php`, {
        withCredentials: true,
      })
      if (response.data.member) {
        memberData.value = response.data.member
        return true
      }
    } catch (error) {
      console.error('獲取會員資料失敗:', error)
      memberData.value = null
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
        memberData.value = null // 修正：登出時清除會員資料
        return true
      } else {
        throw new Error('登出失敗')
      }
    } catch (error) {
      console.error(error.message)
      return false
    }
  }

  return { user, memberData, isLoggedIn, login, logout, fetchUser, fetchMemberData }
})
