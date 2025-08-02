<script setup>
  import { ref, computed } from 'vue'
  import { fakeProducts } from '@/assets/data/product'
  import ProductCard from '@/components/product/product_card.vue'
  import CategoryButtons from '@/components/buttons/category_button.vue'
  import DropdownFilter from '@/components/event/dropdown_filter.vue'
  const selectCategory = ref('全部商品')
  const categories = ['全部商品', '機能服飾', '各類包款', '周邊小物']

  const sortOptionMap = {
    價格低到高: 'price_asc',
    價格高到低: 'price_desc',
  }
  const displayOptions = Object.keys(sortOptionMap)
  const selectSortText = ref('價格低到高')

  const sortOrder = computed(() => sortOptionMap[selectSortText.value])

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
      <h1>周邊商品</h1>
    </div>

    <section class="productlist_section">
      <CategoryButtons :categories="categories" v-model:currentCategory="selectCategory" />
      <div class="product_sort">
        <DropdownFilter v-model="selectSortText" :options="displayOptions"></DropdownFilter>
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
    background-image: url('@/assets/images/product/product_banner.png');
    width: 100%;
    height: 300px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    @include respond(md) {
      height: 180px;
      background-position: 49% center;
      margin-bottom: 30px;
    }
    h1 {
      position: absolute;
      color: #fff;
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.7);
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
      justify-content: flex-end;
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
