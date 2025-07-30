<template>
  <main class="coupon_content_area">
    <div class="coupon_content_header">
      <h1>優惠卷</h1>
    </div>

    <div class="coupon_list_section">
      <h3>優惠卷清單</h3>
      <div class="coupon_list">
        <div class="coupon_card" v-for="coupon in paginatedCoupons" :key="coupon.id">
          <div class="coupon_value_box">
            <span class="label">購物金</span>
            <span class="value">$ {{ coupon.value }}</span>
          </div>
          <div class="coupon_details">
            <h3 class="title">{{ coupon.title }}</h3>

            <p>
              <span class="label">優惠代碼：</span>
              <strong>{{ coupon.code }}</strong>
            </p>
            <p>
              <span class="label">使用期限：</span>
              {{ coupon.expiry }}
            </p>
          </div>
        </div>
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

  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  const allCoupons = ref([
    { id: 'c001', value: 50, title: '首次購物限定', code: 'SAVE50-erhtyh', expiry: '沒有限制' },
    { id: 'c002', value: 30, title: '歡迎見面禮', code: 'WELCOME30-gfjdkkk', expiry: '沒有限制' },
    {
      id: 'c003',
      value: 50,
      title: '漁業永續問答闖關禮',
      code: 'FISHSAFE50-jkfhggg',
      expiry: '14天',
    },
    {
      id: 'c004',
      value: 50,
      title: '海洋知識家闖關禮',
      code: 'OCEANBIO50-skfneiv',
      expiry: '14天',
    },
    {
      id: 'c005',
      value: 30,
      title: '環保海洋守護者闖關禮',
      code: 'CLEANSEA30-kdhfien',
      expiry: '14天',
    },
    {
      id: 'c006',
      value: 60,
      title: '生態平衡維護者闖關禮',
      code: 'ECOGUARD50-aksjfir',
      expiry: '14天',
    },
    { id: 'c007', value: 60, title: '活動感謝禮', code: 'THANKYOU60-mcnjosw', expiry: '14天' },
    { id: 'c008', value: 20, title: '好友分享禮', code: 'SHARE20-abcdefg', expiry: '30天' },
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

  .coupon_card {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: $color-white;
    border-radius: $border-radius-md;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: $shadow-sm;
  }

  .coupon_value_box {
    flex-shrink: 0;
    width: 120px;
    height: 100px;
    background-color: $color-orange;
    color: $color-text-white;
    border-radius: $border-radius-sm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    .label {
      font-size: $sub-desktop;
    }
    .value {
      font-size: $h2-desktop;
      font-weight: $font-bold;
    }
  }

  .coupon_details {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
      color: $color-text-main;
      margin: 0;
    }

    p {
      color: $color-text-main;
      margin: 0;
      .label {
        color: $color-text-sub;
      }
      strong {
        font-weight: $font-bold;
      }
    }
  }

  @include respond(md) {
    .coupon_content_area {
      padding: 20px;
    }

    .coupon_card {
      flex-direction: column;
      align-items: stretch;
      padding: 15px;
    }

    .coupon_value_box {
      width: 100%;
      height: auto;
      padding: 15px;
      .label {
        font-size: $sub-mobile;
      }
      .value {
        font-size: $h2-mobile;
      }
    }

    .coupon_details {
      text-align: left;
      gap: 10px;
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
