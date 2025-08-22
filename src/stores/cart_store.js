import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE
const CART_API_URL = `${API_BASE_URL}/cart`
const ORDER_API_URL = `${API_BASE_URL}/orders` // 修正：新增訂單 API 基礎 URL
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

  // const placeOrder = (orderDetails) => {
  //   finalOrder.value = {
  //     ...orderDetails,
  //     orderDate: new Date().toISOString().slice(0, 10),
  //     orderNumber: `GS${Date.now()}`,
  //   }
  //   items.value = []
  // }
  const placeOrder = async (orderDetails) => {
    try {
      const response = await axios.post(`${ORDER_API_URL}/post_order_create.php`, orderDetails, {
        withCredentials: true,
      })
      // 修正：針對綠界支付，使用 ngrok 網址
      // const ORDER_API_NGROK_URL = 'https://fc28ef460f6f.ngrok-free.app/guard-sea_api/orders'
      //guard-sea_api/orders/post_order_create.php
      // try {
      //   const response = await axios.post(
      //     `${ORDER_API_NGROK_URL}/post_order_create.php`,
      //     orderDetails,
      //     { withCredentials: true }
      //   )

      if (response.data.order_id) {
        // 訂單建立成功後，可以清空本地購物車狀態
        items.value = []
        localStorage.removeItem('cart_items')

        //       // 處理支付邏輯
        //       if (response.data.payment_url) {
        //         // 如果有支付 URL，則自動跳轉
        //         window.location.href = response.data.payment_url
        //       } else {
        //         // 如果沒有支付 URL，直接導向訂單完成頁面
        //         return { success: true, orderId: response.data.order_id }
        //       }
        //     } else {
        //       throw new Error(response.data.message || '訂單建立失敗')
        //     }
        //   } catch (error) {
        //     console.error('建立訂單失敗:', error)
        //     return { success: false, error: error.response?.data?.message || '建立訂單失敗' }
        //   }
        // }
        // 修正：處理支付邏輯
        if (response.data.payment_url && response.data.payment_form) {
          // 步驟 1: 建立一個隱藏的 HTML 表單
          const form = document.createElement('form')
          form.method = 'POST'
          form.action = response.data.payment_url
          form.style.display = 'none'

          // 步驟 2: 將 payment_form 的所有資料作為隱藏欄位
          for (const key in response.data.payment_form) {
            if (Object.prototype.hasOwnProperty.call(response.data.payment_form, key)) {
              const input = document.createElement('input')
              input.type = 'hidden'
              input.name = key
              input.value = response.data.payment_form[key]
              form.appendChild(input)
            }
          }

          // 步驟 3: 將表單加入頁面並自動提交
          document.body.appendChild(form)
          form.submit()
        } else {
          // 如果後端沒有回傳支付 URL，直接導向訂單完成頁面
          alert('訂單建立成功，但無支付資訊')
          return { success: true, orderId: response.data.order_id }
        }
      } else {
        console.log('response', response)
        throw new Error(response.data.message || '訂單建立失敗')
      }
    } catch (error) {
      console.error('建立訂單失敗:', error)
      return { success: false, error: error.response?.data?.message || '建立訂單失敗' }
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
