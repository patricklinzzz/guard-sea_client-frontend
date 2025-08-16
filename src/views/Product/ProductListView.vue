<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import ProductCard from '@/components/product/product_card.vue'
  import CategoryButtons from '@/components/buttons/category_button.vue'
  import DropdownFilter from '@/components/event/dropdown_filter.vue'
  import { useProductStore } from '@/stores/product_store.js'
  import { useProductCategoryStore } from '@/stores/product_category_store.js'

  const productStore = useProductStore()
  const categoryStore = useProductCategoryStore()

  const selectCategory = ref('全部商品')
  const categories = ref([]) 
  const selectSortText = ref('價格低到高')

  const sortOptionMap = {
    價格低到高: 'price_asc',
    價格高到低: 'price_desc',
  }
  const displayOptions = Object.keys(sortOptionMap)
  const sortOrder = computed(() => sortOptionMap[selectSortText.value])
  onMounted(() => {
    productStore.fetchProducts({ status: 1 }) 
    categoryStore.fetchCategories()
  })

  watch(
    () => categoryStore.categories,
    (newCategories) => {
      if (newCategories.length > 0) {
        categories.value = ['全部商品', ...newCategories.map((c) => c.category_name)]
      }
    },
    { immediate: true }
  )
  const filterAndSort = computed(() => {
    let result = [...productStore.products]

    if (selectCategory.value !== '全部商品') {
      result = result.filter((p) => {
        const category = categoryStore.categories.find(
          (c) => Number(c.category_id) === Number(p.category_id)
        )
        return category?.category_name === selectCategory.value
      })
    }

    if (sortOrder.value === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder.value === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    }
    return result
  })

  const getImageUrl = (path) => {
    if (!path) return ''
    return `http://localhost:8888/guard-sea_api${path}`
  }
</script>

<template>
  <div class="productlist">
    <div class="product_hero">
      <h1>商品列表</h1>
    </div>

    <section class="productlist_section">
      <div v-if="productStore.isLoading" class="loading-state">
        <p>商品載入中...</p>
      </div>
      <div v-else-if="productStore.error" class="error-state">
        <p>讀取商品失敗：{{ productStore.error }}</p>
      </div>
      <div v-else>
        <CategoryButtons :categories="categories" v-model:currentCategory="selectCategory" />
        <div class="product_sort">
          <DropdownFilter v-model="selectSortText" :options="displayOptions"></DropdownFilter>
        </div>
        <TransitionGroup appear tag="div" name="list" class="product_grid">
          <ProductCard
            v-for="product in filterAndSort"
            :key="product.product_id"
            :product="product"
          />
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .productlist::before {
    @include bg-layer-fixed-dark;
  }

  .product_hero {
    background-image: url('@/assets/images/product/product_banner.jpg');
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
    padding: 3.5% 17.7%;
    @include respond(md) {
      padding: 1rem 1.4rem;
    }
    :deep(.new_nav) {
      white-space: nowrap;
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
      max-width: 1040px;
      grid-template-columns: repeat(4, 1fr);
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      gap: 2rem;

      @include respond(md) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
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
