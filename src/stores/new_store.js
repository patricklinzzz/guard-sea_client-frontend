// stores/newsStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useNewsStore = defineStore('news', () => {
  // 1. State: 狀態
  const allNews = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 2. Getters: 衍生的狀態 (類似 computed)
  const getNewsById = computed(() => {
    return (id) => allNews.value.find((item) => Number(item.news_id) === Number(id))
  })

  // 專門用來過濾出狀態為 1 (顯示) 的消息
  const publishedNews = computed(() => {
    return allNews.value.filter((item) => item.status === 1)
  })

  // 3. Actions: 方法
  async function fetchNews() {
    // 如果已經有資料了，就不要重複載入，直接返回
    if (allNews.value.length > 0) {
      return
    }

    loading.value = true
    error.value = null
    try {
      const baseUrl = import.meta.env.VITE_API_BASE
      const apiUrl = `${baseUrl}/news/get_news.php`
      const response = await axios.get(apiUrl)
      const data = response.data

      const processedNews = data.news.map((item) => {
        let processedItem = { ...item }
        if (processedItem.image_url && processedItem.image_url.startsWith('/')) {
          processedItem.image_url = baseUrl + processedItem.image_url
        }
        if (processedItem.content) {
          const regex = /src="(\/uploads\/.*?)"/g
          processedItem.content = processedItem.content.replace(regex, `src="${baseUrl}$1"`)
        }
        return processedItem
      })

      allNews.value = processedNews
    } catch (err) {
      console.error('讀取失敗', err)
      error.value = '資料載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    allNews,
    loading,
    error,
    // Getters
    getNewsById,
    publishedNews,
    // Actions
    fetchNews,
  }
})
