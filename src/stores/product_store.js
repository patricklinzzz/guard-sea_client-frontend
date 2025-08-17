// import { defineStore } from 'pinia'
// import { fakeProducts } from '@/assets/data/product'

// export const useProductStore = defineStore('product', {
//   state: () => ({
//     products: fakeProducts,
//   }),
//   getters: {
//     getProductById: (state) => (id) => state.products.find((p) => p.id === Number(id)),

//     relatedProducts: (state) => (currentProductId) => {
//       const currentProduct = state.products.find((p) => p.id === Number(currentProductId))

//       if (!currentProduct) {
//         return []
//       }
//       return state.products.filter(
//         (product) =>
//           product.category === currentProduct.category && product.id !== Number(currentProductId)
//       )
//     },
//   },
// })

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// 你的 API 基礎 URL，與後台專案一致
const API_BASE_URL = import.meta.env.VITE_API_BASE
const PRODUCT_API_URL = `${API_BASE_URL}/products`

// 輔助函數：將後端傳來的字串數字轉換為數字型態
function transformProductData(product) {
  if (!product) return null
  return {
    ...product,
    product_id: Number(product.product_id),
    price: Number(product.price),
    category_id: Number(product.category_id),
    status: Number(product.status),
    // 確保 size 欄位轉換為陣列
    size: product.size ? String(product.size).split(',') : [],
  }
}

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // 這是一個 Computed 屬性，當 products 變動時會自動更新
  const getProductById = computed(() => {
    return (id) => products.value.find((p) => Number(p.product_id) === Number(id))
  })

  // 獲取商品列表的方法，並可根據 status 篩選
  async function fetchProducts(filters = {}) {
    isLoading.value = true
    error.value = null
    try {
      const { status } = filters
      let apiEndpoint = `${PRODUCT_API_URL}/get_product.php`

      // 根據 filters 參數動態添加查詢字串
      if (status !== undefined) {
        apiEndpoint += `?status=${status}`
      }

      const response = await axios.get(apiEndpoint)
      if (response.status !== 200 || !response.data) {
        throw new Error('無法從伺服器獲取商品資料')
      }

      // 使用輔助函數在載入資料時就進行轉換
      products.value = response.data.map(transformProductData)
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取商品資料失敗'
      console.error('獲取商品資料失敗:', err.response?.data || err)
    } finally {
      isLoading.value = false
    }
  }

  // 前台只提供獲取相關商品的功能
  const relatedProducts = computed(() => {
    return (currentProductId) => {
      const currentProduct = products.value.find(
        (p) => Number(p.product_id) === Number(currentProductId)
      )
      if (!currentProduct) {
        return []
      }
      return products.value.filter(
        (product) =>
          Number(product.category_id) === Number(currentProduct.category_id) &&
          Number(product.product_id) !== Number(currentProductId)
      )
    }
  })

  return {
    products,
    isLoading,
    error,
    getProductById,
    relatedProducts,
    fetchProducts,
  }
})
