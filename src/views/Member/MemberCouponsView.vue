<script setup>
  import { ref, computed, onMounted } from 'vue'
  import PageNumber from '@/components/buttons/page_number.vue'

  import CouponCard from '@/components/product/coupon_card.vue'
  import axios from 'axios'

  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const baseUrl = import.meta.env.VITE_API_BASE
  const allCoupons = ref([])
  const fetch_coupon = async() => {
    try {
      const api = `${baseUrl}/coupon/member_coupon_front.php`

      const r = await axios.get(api)
      allCoupons.value = r.data.map((coupon) => ({
        ...coupon,
        validityPeriod: `使用期限: ${coupon.validityPeriod ? coupon.validityPeriod : '沒有限制'}`
      }))
    } catch (err) {
      console.error('Fetch 錯誤：', err)
    }
  }

  const paginatedCoupons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return allCoupons.value.slice(start, end)
  })

  onMounted(async () => {
    try {
      await fetch_coupon()
    } finally {
    }
  })
</script>

<template>
  <main class="coupon_content_area">
    <div class="coupon_content_header">
      <h1>優惠卷</h1>
    </div>

    <div class="coupon_list_section">
      <h3>優惠卷清單</h3>
      <div class="coupon_list">
        <CouponCard v-for="coupon in paginatedCoupons" :key="coupon.id" :coupon="coupon" />
      </div>
    </div>

    <PageNumber
      class="my_pagination"
      v-if="allCoupons.length > itemsPerPage"
      :total-items="allCoupons.length"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
    />
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

  .coupon_content_area {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;
    padding: 20px 40px 40px;

    @include respond(md) {
      width: 100%;
      padding: 20px;
    }
  }

  .coupon_content_header {
    border-bottom: $border-hairline solid $border-color-gray;
    padding-bottom: 20px;
    margin-bottom: 20px;
    h1 {
      text-align: center;
      color: $color-text-main;
    }
  }

  .coupon_list_section h3 {
    text-align: center;
    color: $color-text-main;
    margin-bottom: 20px;
  }
  .coupon_list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    :deep(.coupon_value) {
      background-color: $color-orange;
    }
  }

  :deep(.my_pagination button) {
    background-color: $color-white;
    border: $border-base solid $border-color-gray;
    color: $color-text-main;
    font-weight: $font-bold;
    transition: all 0.3s;

    &:not(.active):not(:disabled):hover {
      background-color: $color-gray-light;
      border-color: $color-skyblue;
    }
  }

  :deep(.my_pagination button.active) {
    background-color: $color-yellow;
    border-color: $color-yellow;
    color: $color-text-white;

    &:hover {
      background-color: $color-yellow-hover;
      border-color: $color-yellow-hover;
    }
  }

  :deep(.my_pagination .arrow) {
    border: none !important;
    background-color: transparent !important;
  }

  :deep(.my_pagination .arrow svg path) {
    stroke: $color-black;
  }

  :deep(.my_pagination button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: $color-white;
    border-color: $border-color-gray;

    &.arrow svg path {
      stroke: $color-gray;
    }
  }
</style>
