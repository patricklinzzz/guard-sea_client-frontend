import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE
const MEMBER_API_URL = `${API_BASE_URL}/members`

export const useMemberStore = defineStore('member', () => {
  const memberData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isMemberDataLoaded = computed(() => !!memberData.value)
  async function fetchMemberData() {
    isLoading.value = true
    error.value = null
    try {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('未登入，無法獲取會員資料')
      }

      const response = await axios.get(`${MEMBER_API_URL}/get_member_data.php`)

      if (response.status !== 200 || !response.data?.member) {
        throw new Error('無法從伺服器獲取會員資料')
      }

      memberData.value = response.data.member
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取會員資料失敗'
      //console.error('獲取會員資料失敗:', err.response?.data || err)
      ElMessage.error(error.value)
    } finally {
      isLoading.value = false
    }
  }

  // 清除會員資料的 Action
  function clearMemberData() {
    memberData.value = null
  }

  return {
    memberData,
    isLoading,
    error,
    isMemberDataLoaded,
    fetchMemberData,
    clearMemberData,
  }
})
