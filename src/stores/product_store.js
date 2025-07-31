import { defineStore } from 'pinia'
import { fakeProducts } from '@/assets/data/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: fakeProducts,
  }),
  getters: {
    getProductById: (state) => (id) => state.products.find((p) => p.id === Number(id)),

    relatedProducts: (state) => (currentProductId) => {
      const currentProduct = state.products.find((p) => p.id === Number(currentProductId))

      if (!currentProduct) {
        return []
      }
      return state.products.filter(
        (product) =>
          product.category === currentProduct.category && product.id !== Number(currentProductId)
      )
    },
  },
})
