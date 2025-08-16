// src/stores/product_category_store.js

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// 從環境變數讀取 API 基礎 URL，與你的後台專案一致
const API_BASE_URL = import.meta.env.VITE_API_BASE
const CATEGORY_API_URL = `${API_BASE_URL}/products`

// 輔助函數：將後端傳來的字串數字轉換為數字型態
function transformCategoryData(category) {
  if (!category) return null
  return {
    ...category,
    category_id: Number(category.category_id),
  }
}

export const useProductCategoryStore = defineStore('productCategoryAdmin', () => {
  const categories = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchCategories() {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`${CATEGORY_API_URL}/get_product_categories.php`)
      if (response.status !== 200 || !response.data) {
        throw new Error('無法從伺服器獲取商品分類')
      }
      // 使用輔助函數在載入資料時就進行轉換
      categories.value = response.data.map(transformCategoryData)
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取商品分類失敗'
      console.error('獲取商品分類失敗:', err)
    } finally {
      isLoading.value = false
    }
  }

  return { categories, isLoading, error, fetchCategories }
})
