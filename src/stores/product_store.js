import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE
const PRODUCT_API_URL = `${API_BASE_URL}/products`

function transformProductData(product) {
  if (!product) return null
  return {
    ...product,
    product_id: Number(product.product_id),
    price: Number(product.price),
    category_id: Number(product.category_id),
    status: Number(product.status),
    size: product.size ? String(product.size).split(',') : [],
  }
}

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const getProductById = computed(() => {
    return (id) => products.value.find((p) => Number(p.product_id) === Number(id))
  })

  async function fetchProducts(filters = {}) {
    isLoading.value = true
    error.value = null
    try {
      const { status } = filters
      let apiEndpoint = `${PRODUCT_API_URL}/get_product.php`

      if (status !== undefined) {
        apiEndpoint += `?status=${status}`
      }

      const response = await axios.get(apiEndpoint)
      if (response.status !== 200 || !response.data) {
        throw new Error('無法從伺服器獲取商品資料')
      }
      products.value = response.data.map(transformProductData)
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取商品資料失敗'
      console.error('獲取商品資料失敗:', err.response?.data || err)
    } finally {
      isLoading.value = false
    }
  }
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
