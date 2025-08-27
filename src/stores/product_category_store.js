import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE
const CATEGORY_API_URL = `${API_BASE_URL}/products`
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
      categories.value = response.data.map(transformCategoryData)
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取商品分類失敗'
      //console.error('獲取商品分類失敗:', err)
    } finally {
      isLoading.value = false
    }
  }

  return { categories, isLoading, error, fetchCategories }
})
