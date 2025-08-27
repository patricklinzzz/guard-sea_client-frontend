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

  // 輔助函式：處理圖片路徑
  const processEventData = (data) => {
    const baseUrl = import.meta.env.VITE_API_BASE
    // 檢查回傳資料是否為陣列
    // 注意：這裡的 data?.events 需要根據實際 API 回傳的 JSON 結構調整
    const eventsArray = Array.isArray(data) ? data : data?.events || []

    return eventsArray.map((item) => {
      let processedItem = { ...item }

      // 檢查 image_url 屬性
      if (processedItem.image_url) {
        // 如果 image_url 以 '/' 開頭，加上 baseUrl
        if (processedItem.image_url.startsWith('/')) {
          processedItem.main_image = baseUrl + processedItem.image_url
        } else {
          // 否則直接使用 image_url 的值
          processedItem.main_image = processedItem.image_url
        }
      }

      // 處理 content 中的圖片路徑
      if (processedItem.activity_content) {
        const regex = /src="(\/uploads\/.*?)"/g
        processedItem.activity_content = processedItem.activity_content.replace(
          regex,
          `src="${baseUrl}$1"`
        )
      }
      return processedItem
    })
  }

  // --------- 3️⃣ actions ---------
  async function fetchEvents() {
    if (allEvents.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const baseUrl = import.meta.env.VITE_API_BASE
      const apiUrl = `${baseUrl}/events/get_event.php`
      const response = await axios.get(apiUrl)

      // 修正資料路徑：從 response.data.data 讀取資料
      // 並將其傳遞給輔助函式進行處理
      const processedEvents = processEventData(response.data.data)

      allEvents.value = processedEvents
      //console.log('API 回傳資料:', response.data)
    } catch (err) {
      //console.error('活動資料載入失敗', err)
      error.value = '資料載入失敗，請稍後再試'
      allEvents.value = []
    } finally {
      loading.value = false
    }
  }

  // 單一活動的載入
  async function fetchEventById(id) {
    if (getEventById.value(id)) {
      return getEventById.value(id)
    }

    loading.value = true
    error.value = null
    const baseUrl = import.meta.env.VITE_API_BASE
    const apiUrl = `${baseUrl}/events/get_event.php?id=${id}`

    try {
      const res = await axios.get(apiUrl)
      // 使用輔助函式處理圖片路徑
      const processedEventData = processEventData(res.data.data)

      if (processedEventData.length > 0) {
        const eventData = processedEventData[0]
        allEvents.value.push(eventData)
        return eventData
      }
    } catch (err) {
      //console.error(`活動 ID ${id} 資料載入失敗`, err)
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
    fetchEventById,
  }
})
