<template>
  <main class="coupon_content_area">
    <div class="coupon_content_header">
      <h1>優惠卷</h1>
    </div>

    <div class="coupon_list_section">
      <h3>優惠卷清單</h3>
      <div class="coupon_list">
        <!-- 
          這裡就是改動的核心：
          我們用 v-for 循環 CouponCard 元件，
          並透過 :coupon="coupon" 將每一筆優惠券資料傳遞進去。
        -->
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

<script setup>
  import { ref, computed } from 'vue'
  import PageNumber from '@/components/buttons/page_number.vue'

  import CouponCard from '@/components/product/coupon_card.vue'

  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  const allCoupons = ref([
    // 為了讓子元件能正確顯示，我們直接提供 `validityPeriod` 欄位
    {
      id: 'c001',
      value: 50,
      title: '首次購物限定',
      code: 'SAVE50',
      validityPeriod: '使用期限: 沒有限制',
    },
    {
      id: 'c002',
      value: 30,
      title: '歡迎見面禮',
      code: 'WELCOME30',
      validityPeriod: '使用期限: 沒有限制',
    },
    {
      id: 'c003',
      value: 50,
      title: '漁業永續問答闖關禮',
      code: 'FISHSAFE50',
      validityPeriod: '使用期限: 2025-08-18',
    },
    {
      id: 'c004',
      value: 50,
      title: '海洋知識家闖關禮',
      code: 'OCEANBIO50',
      validityPeriod: '使用期限: 2025-09-01',
    },
    {
      id: 'c005',
      value: 30,
      title: '環保海洋守護者闖關禮',
      code: 'CLEANSEA30',
      validityPeriod: '使用期限: 2025-09-15',
    },
    {
      id: 'c006',
      value: 60,
      title: '生態平衡維護者闖關禮',
      code: 'ECOGUARD50',
      validityPeriod: '使用期限: 2025-10-01',
    },
    {
      id: 'c007',
      value: 60,
      title: '活動感謝禮',
      code: 'THANKYOU60',
      validityPeriod: '使用期限: 2025-10-10',
    },
    {
      id: 'c008',
      value: 20,
      title: '好友分享禮',
      code: 'SHARE20',
      validityPeriod: '使用期限: 2025-11-20',
    },
  ])

  const paginatedCoupons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return allCoupons.value.slice(start, end)
  })
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

  .coupon_content_area {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;
    padding: 20px 40px 40px;
    // RWD 手機版寬度修正
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
    gap: 20px; // 使用 gap 來控制卡片之間的間距，比 margin-bottom 更好
    align-items: center;
    :deep(.coupon_value) {
      background-color: $color-orange;
    }
  }

  // 分頁按鈕的樣式維持不變
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
