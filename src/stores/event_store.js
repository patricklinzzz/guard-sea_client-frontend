import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useEventStore = defineStore('event', () => {
  // --------- 1️⃣ state ---------
  const allEvents = ref([])
  const loading = ref(false)
  const error = ref(null)

  // --------- 2️⃣ getters ---------
  const getEventById = computed(() => {
    return (id) => allEvents.value.find((item) => Number(item.activity_id) === Number(id))
  })

  const activeEvents = computed(() => {
    return allEvents.value.filter((item) => item.status === '報名中')
  })

  // --------- 3️⃣ actions ---------
  async function fetchEvents() {
    if (allEvents.value.length > 0) return

    loading.value = true
    error.value = null
    const baseUrl = import.meta.env.VITE_API_BASE
    const apiUrl = `${baseUrl}/events/get_event.php`

    try {
      const res = await axios.get(apiUrl)
      console.log('API 回傳資料:', res.data)

      // 不用 map，直接存
      allEvents.value = Array.isArray(res.data.data?.events) ? res.data.data.events : []
    } catch (err) {
      console.error('活動資料載入失敗', err)
      error.value = '資料載入失敗，請稍後再試'
      allEvents.value = []
    } finally {
      loading.value = false
    }
  }

  // 單一活動的載入
  async function fetchEventById(id) {
    // 檢查資料是否已存在於 store 中
    if (getEventById.value(id)) {
      return getEventById.value(id)
    }

    loading.value = true
    error.value = null
    const baseUrl = import.meta.env.VITE_API_BASE
    // 根據 ID 查詢單一活動
    const apiUrl = `${baseUrl}/events/get_event.php?id=${id}`

    try {
      const res = await axios.get(apiUrl)
      const eventData = res.data.data?.events[0]
      
      // 如果找到資料，將其加入 allEvents
      if (eventData) {
        allEvents.value.push(eventData)
        return eventData
      }
    } catch (err) {
      console.error(`活動 ID ${id} 資料載入失敗`, err)
      error.value = '資料載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
    return null
  }

  // --------- 4️⃣ 把 state / getters / actions 都丟出去 ---------
  return {
    allEvents,
    loading,
    error,
    getEventById,
    activeEvents,
    fetchEvents,
    fetchEventById
  }
})