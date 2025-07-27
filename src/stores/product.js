import { defineStore } from 'pinia'
import { fakeProducts } from '@/assets/data/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: fakeProducts,
  }),
  getters: {
    // 現有的 getter
    getProductById: (state) => (id) => state.products.find((p) => p.id === Number(id)),

    // *** 新增的 relatedProducts getter ***
    relatedProducts: (state) => (currentProductId) => {
      const currentProduct = state.products.find((p) => p.id === Number(currentProductId))

      if (!currentProduct) {
        return [] // 如果找不到目前的商品，返回空陣列
      }

      // 假設你的 fakeProducts 每個商品都有一個 'category' 屬性
      // 我們將篩選出與當前商品類別相同，且 ID 不相同的商品
      return state.products.filter(
        (product) =>
          product.category === currentProduct.category && product.id !== Number(currentProductId)
      )
    },
  },
})
