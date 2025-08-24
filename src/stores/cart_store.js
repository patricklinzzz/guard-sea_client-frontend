import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE
const CART_API_URL = `${API_BASE_URL}/cart`
const ORDER_API_URL = `${API_BASE_URL}/orders`
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const shippingMethod = ref('homedelivery')
  const finalOrder = ref(null)

  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart_items')
    console.log('storedCart', storedCart)
    if (storedCart) {
      try {
        items.value = JSON.parse(storedCart)
      } catch (e) {
        localStorage.removeItem('cart_items')
        items.value = []
      }
    }
  }

  const saveCartToStorage = () => {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  const fetchCartItemsFromBackend = async () => {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) return

    try {
      const response = await axios.get(`${CART_API_URL}/get_cart.php`, { withCredentials: true })
      if (response.status === 200) {
        items.value = response.data.items
        localStorage.removeItem('cart_items')
      }
    } catch (error) {
      console.error('從後端獲取購物車失敗:', error)
    }
  }

  const syncCartToBackend = async () => {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) return

    try {
      const response = await axios.post(
        `${CART_API_URL}/post_cart_sync.php`,
        {
          items: items.value,
        },
        { withCredentials: true }
      )

      if (response.status === 200) {
        localStorage.removeItem('cart_items')
        await fetchCartItemsFromBackend()
        console.log('購物車已與會員資料同步！')
      }
    } catch (error) {
      console.error('購物車同步失敗:', error)
    }
  }

  const addItem = async (product) => {
    const authStore = useAuthStore()

    const existing = items.value.find(
      (item) => item.id === product.id && item.color === product.color && item.size === product.size
    )

    if (existing) {
      existing.quantity += product.quantity
    } else {
      items.value.push({ ...product })
    }
    saveCartToStorage()

    if (authStore.isLoggedIn) {
      console.log('123')
      try {
        await axios.post(
          `${CART_API_URL}/post_cart.php`,
          {
            product_id: product.product_id,
            quantity: product.quantity,
            size: product.size,
            color: product.color,
          },
          { withCredentials: true }
        )
        await fetchCartItemsFromBackend()
      } catch (error) {
        console.error('新增商品到後端購物車失敗:', error)
      }
    }
  }

  const removeItem = async (index) => {
    const authStore = useAuthStore()
    const item = items.value[index]

    if (authStore.isLoggedIn && item.cart_item_id) {
      try {
        await axios.post(
          `${CART_API_URL}/remove_cart.php`,
          {
            cart_item_id: item.cart_item_id,
          },
          { withCredentials: true }
        )
        items.value.splice(index, 1)
        saveCartToStorage()
        console.log('商品已成功從購物車中移除')
      } catch (error) {
        console.error('從後端移除購物車項目失敗:', error)
      }
    } else {
      items.value.splice(index, 1)
      saveCartToStorage()
      console.log('商品已成功從購物車中移除')
    }
  }

  const updateQuantity = async (index, newQuantity) => {
    const authStore = useAuthStore()
    const item = items.value[index]

    if (item) {
      if (authStore.isLoggedIn && item.cart_item_id) {
        try {
          await axios.post(
            `${CART_API_URL}/update_cart.php`,
            {
              cart_item_id: item.cart_item_id,
              quantity: newQuantity,
            },
            { withCredentials: true }
          )
          await fetchCartItemsFromBackend()
        } catch (error) {
          console.error('更新購物車項目數量失敗:', error)
        }
      } else {
        console.log('fail')
        item.quantity = newQuantity
        saveCartToStorage()
      }
    }
  }
  const clearCart = async () => {
    const authStore = useAuthStore()

    if (authStore.isLoggedIn) {
      try {
        await axios.post(`${CART_API_URL}/clear_cart.php`, {}, { withCredentials: true })
        items.value = []
        finalOrder.value = null
        localStorage.removeItem('cart_items')
      } catch (error) {
        console.error('清空購物車失敗:', error)
      }
    } else {
      items.value = []
      finalOrder.value = null
      localStorage.removeItem('cart_items')
    }
  }

  const setShippingMethod = (method) => {
    shippingMethod.value = method
  }

  const placeOrder = async (orderDetails) => {
    try {
      const response = await axios.post(`${ORDER_API_URL}/post_order_create.php`, orderDetails, {
        withCredentials: true,
      })

      if (response.data.order_id) {
        items.value = []
        localStorage.removeItem('cart_items')
      }
      return response.data
    } catch (error) {
      console.error('建立訂單失敗:', error)
      return { success: false, error: error.response?.data?.error || '建立訂單失敗' }
    }
  }

  loadCartFromStorage()

  return {
    items,
    shippingMethod,
    finalOrder,
    totalQuantity: computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0)),
    itemCount: computed(() => items.value.length),
    finalTotal: computed(() => {
      const itemsTotal = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shippingFee = 60
      const discount = 0
      const total = itemsTotal + shippingFee - discount
      return total > 0 ? total : 0
    }),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setShippingMethod,
    placeOrder,
    syncCartToBackend,
    fetchCartItemsFromBackend,
  }
})
