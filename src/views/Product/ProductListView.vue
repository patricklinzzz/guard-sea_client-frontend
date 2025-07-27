<script setup>
  import { ref, computed } from 'vue'
  import { fakeProducts } from '@/assets/data/product'
  import ProductCard from '@/components/product/product_card.vue'
  const selectCategory = ref('全部商品')
  const categories = ['全部商品', '機能服飾', '各類包款', '周邊小物']

  const sortOrder = ref('')

  const filterAndSort = computed(() => {
    let result = [...fakeProducts]
    if (selectCategory.value !== '全部商品') {
      result = result.filter((p) => p.category === selectCategory.value)
    }
    if (sortOrder.value === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder.value === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    }
    return result
  })
</script>

<template>
  <div class="productlist">
    <div class="product_hero">
      <img src="/src/assets/images/product/product_banner.png" alt="" />
      <h1>周邊商品</h1>
    </div>
    <section>
      <div class="product_category">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory = cat"
          :class="{ active: selectCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>
      <div class="product_sort">
        <h2>{{ selectCategory }}</h2>
        <div>
          <select id="sort_order" v-model="sortOrder">
            <option value="">排序</option>
            <option value="price_asc">價格低到高</option>
            <option value="price_desc">價格高到低</option>
          </select>
        </div>
      </div>

      <div class="product_grid">
        <ProductCard v-for="product in filterAndSort" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .productlist::before {
    @include bg-layer-fixed-dark;
  }
  .product_hero {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: auto;
    }
    h1 {
      position: absolute;
      color: #fff;
    }
  }
  section {
    padding: 0 18.75vw;

    @include respond(md) {
      padding: 0 6.25rem;
    }
    .product_category {
      display: flex;
      justify-content: center;
      column-gap: 1.5rem;
      button {
        position: relative;
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: v.$color-text-white;
        font-size: v.$h3-desktop;
        &.active {
          background-color: v.$color-skyblue-light;
          color: v.$color-black;
          border-radius: v.$border-radius-sm;
        }
        &:nth-child(n + 2):nth-child(-n + 4)::before {
          content: '';
          display: block;
          position: absolute;
          left: -10%;
          top: 20%;
          height: 1.5rem;
          width: 2px;
          background-color: white;
        }
      }
      @include respond(md) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        button {
          font-size: v.$h3-mobile;
          white-space: nowrap;
          &:nth-child(3)::before {
            display: none !important;
          }
        }
      }
    }
    .product_sort {
      display: flex;
      justify-content: space-between;
      h2 {
        color: v.$color-text-white;
      }
    }
    .product_grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1.68rem;
      row-gap: 2.31rem;

      @include respond(md) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.31rem;
        row-gap: 1.62rem;
      }
    }
  }
</style>
