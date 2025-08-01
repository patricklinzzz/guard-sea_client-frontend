<script setup>
  import { ref, computed } from 'vue'
  import { fakeProducts } from '@/assets/data/product'
  import ProductCard from '@/components/product/product_card.vue'
  import CategoryButtons from '@/components/buttons/category_button.vue'
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
    <section class="productlist_section">
      <CategoryButtons :categories="categories" v-model:currentCategory="selectCategory" />
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
      <TransitionGroup appear tag="div" name="list" class="product_grid">
        <ProductCard v-for="product in filterAndSort" :key="product.id" :product="product" />
      </TransitionGroup>
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
      object-fit: cover;
    }
    h1 {
      position: absolute;
      color: #fff;
    }
  }
  .productlist_section {
    padding: 5% 18.75vw;
    @include respond(md) {
      padding: 1rem;
    }

    .product_sort {
      margin: 3% 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        color: v.$color-text-white;
      }
      #sort_order {
        font-size: v.$p-mobile;
      }
    }
    .product_grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-content: center;
      align-items: center;
      column-gap: 1.68rem;
      row-gap: 2.31rem;

      @include respond(md) {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 1rem;
      }
    }
    .list-enter-from {
      opacity: 0;
      transform: scale(0.7);
    }
    .list-enter-to {
      opacity: 1;
      transform: scale(1);
    }
    .list-enter-active {
      transition: all 0.6s ease-out;
    }
  }
</style>
