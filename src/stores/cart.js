import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
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

    updateQuantity(index, newQuantity) {
      if (newQuantity <= 0) {
        this.items.splice(index, 1)
      } else {
        this.items[index].quantity = newQuantity
      }
    },

    removeItem(index) {
      this.items.splice(index, 1)
    },
  },
})
