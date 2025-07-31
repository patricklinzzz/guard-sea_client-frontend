import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    shippingMethod: 'homedelivery',
    finalOrder: null,
  }),

  getters: {
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    itemCount: (state) => state.items.length,
    finalTotal: (state) => {
      const itemsTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shippingFee = 60
      const discount = 0
      const total = itemsTotal + shippingFee - discount
      return total > 0 ? total : 0
    },
  },

  actions: {
    addItem(product) {
      const existing = this.items.find(
        (item) =>
          item.id === product.id && item.color === product.color && item.size === product.size
      )
      if (existing) {
        existing.quantity += product.quantity
      } else {
        this.items.push({ ...product })
      }
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
    clearCart() {
      this.items = []
      this.finalOrder = null
    },

    setShippingMethod(method) {
      this.shippingMethod = method
    },

    // 最終訂單資訊
    placeOrder(orderDetails) {
      // 將傳入的訂單細節存入 state.finalOrder
      this.finalOrder = {
        ...orderDetails,
        orderDate: new Date().toISOString().slice(0, 10),
        orderNumber: `GS${Date.now()}`,
      }
      this.items = []
    },
  },
})
