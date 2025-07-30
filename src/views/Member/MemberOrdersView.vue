<template>
  <main class="order_content_area">
    <div class="order_content_header">
      <h1>會員專區</h1>
    </div>

    <div class="order_filter_section">
      <h3>訂單查詢</h3>
      <form class="order_status_filter">
        <select v-model="selectedStatus">
          <option value="processing">處理中</option>
          <option value="shipped">已出貨</option>
        </select>
      </form>
    </div>

    <div class="order_list">
      <div class="order_card" v-for="order in paginatedOrders" :key="order.id">
        <div class="order_card_header">
          <div class="order_meta">
            <div class="sub-text">
              <span>下單時間：</span>
              {{ order.date }}
            </div>
            <div class="sub-text">
              <span>訂單編號：</span>
              {{ order.id }}
            </div>
            <div class="sub-text">
              <span>狀態：</span>
              {{ order.status }}
            </div>
            <div class="sub-text">
              <span>預計出貨：</span>
              {{ order.shipping_estimate }}
            </div>
          </div>
          <button class="button_view_details" @click="toggleDetails(order)">
            {{ order.isExpanded ? '收合詳情' : '查看詳情' }}
          </button>
        </div>

        <template v-if="order.isExpanded">
          <div class="order_card_body">
            <div class="product_item" v-for="item in order.items" :key="item.name">
              <img :src="item.image" :alt="item.name" class="product_image" />
              <div class="product_details">
                <div class="detail_item">商品名稱：{{ item.name }}</div>
                <div class="detail_item">尺寸：{{ item.size }}</div>
                <div class="detail_item">
                  顏色：
                  <span class="product_color_swatch"></span>
                </div>
                <div class="detail_item">數量：{{ item.quantity }}</div>
                <div class="detail_item">價錢：$ {{ item.price }}</div>
              </div>
            </div>
          </div>
          <div class="order_card_footer">
            <div class="order_summary">
              <div class="summary_line">
                <span>商品小計</span>
                <span>$ {{ order.summary.subtotal }}</span>
              </div>
              <div class="summary_line">
                <span>優惠卷折抵</span>
                <span>- $ {{ order.summary.discount }}</span>
              </div>
              <div class="summary_line">
                <span>運費小計</span>
                <span>$ {{ order.summary.shipping_fee }}</span>
              </div>
              <div class="summary_line total">
                <span>總計</span>
                <span>$ {{ order.summary.total }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <PageNumber
      class="my_pagination"
      :total-items="filteredOrders.length"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
    />
  </main>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import productTshirtImage from '@/assets/images/member-system/cloth.png'

  import PageNumber from '@/components/buttons/page_number.vue'

  const selectedStatus = ref('processing')

  const currentPage = ref(1)
  const itemsPerPage = ref(3)

  const allOrders = ref([
    {
      id: '10043475',
      date: '2025/07/04',
      status: '處理中',
      shipping_estimate: '7天內',
      items: [
        {
          name: '淨灘支持T恤',
          image: productTshirtImage,
          color: '白色',
          size: 'L',
          quantity: 2,
          price: 1540,
        },
      ],
      summary: { subtotal: 1540, discount: 0, shipping_fee: 100, total: 1640 },
    },

    // { id: '10043474', date: '2025/07/03', status: '處理中', shipping_estimate: '7天內', items: [{ name: '環保杯', image: productTshirtImage, color: '藍色', size: 'M', quantity: 1, price: 800 }], summary: { subtotal: 800, discount: 0, shipping_fee: 100, total: 900 } },
    // { id: '10043473', date: '2025/07/02', status: '處理中', shipping_estimate: '7天內', items: [{ name: '海龜抱枕', image: productTshirtImage, color: '綠色', size: 'S', quantity: 1, price: 1200 }], summary: { subtotal: 1200, discount: 50, shipping_fee: 100, total: 1250 } },
    // { id: '10043472', date: '2025/07/01', status: '已出貨', shipping_estimate: 'N/A', items: [{ name: '淨灘支持T恤', image: productTshirtImage, color: '白色', size: 'XL', quantity: 3, price: 2310 }], summary: { subtotal: 2310, discount: 0, shipping_fee: 0, total: 2310 } },
  ])

  const filteredOrders = computed(() => {
    const statusMap = {
      processing: '處理中',
      shipped: '已出貨',
    }
    const selected = statusMap[selectedStatus.value]
    return allOrders.value.filter((order) => order.status === selected)
  })

  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredOrders.value.slice(start, end)
  })

  onMounted(() => {
    allOrders.value.forEach((order) => {
      order.isExpanded = false
    })
  })

  const toggleDetails = (order) => {
    order.isExpanded = !order.isExpanded
  }
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

  .order_content_area {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;
    padding: 20px 40px 40px;
  }

  .order_content_header {
    border-bottom: $border-hairline solid $border-color-gray;
    padding-bottom: 20px;
    margin-bottom: 20px;
    h1 {
      text-align: center;
      color: $color-text-main;
    }
  }

  .order_filter_section {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      width: 100%;
      text-align: center;
      color: $color-text-main;
    }
    .order_status_filter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      select {
        height: $input-height-desktop;
        padding: 0 40px 0 15px;
        border: $border-base solid $border-color-gray;
        border-radius: $border-radius-sm;
        background-color: $color-white;
        font-size: $p-desktop;
        color: $color-text-main;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23333333' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 15px center;
      }
    }
  }

  .order_card {
    background-color: $color-bg-base;
    border-radius: $border-radius-md;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: $shadow-sm;
    border: $border-hairline solid $border-color-gray;
  }

  .order_card_header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .order_meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .sub-text {
        font-size: $sub-desktop;
        color: $color-text-main;
        margin: 0;
        span {
          color: $color-text-sub;
        }
      }
    }
    .button_view_details {
      height: 40px;
      padding: 0 24px;
      background-color: $color-yellow;
      color: $color-text-white;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $sub-desktop;
      font-weight: $font-bold;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: $color-yellow-hover;
      }
    }
  }

  .order_card_body {
    padding: 20px 0;
    border-top: $border-hairline solid $border-color-gray;
    margin-top: 20px;
    .product_item {
      display: flex;
      gap: 20px;
    }
    .product_image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: $border-radius-sm;
      flex-shrink: 0;
    }
    .product_details {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 16px;
      font-size: $sub-desktop;
      color: $color-text-main;
      .detail_item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .product_color_swatch {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: $border-radius-round;
        background-color: $color-white;
        border: $border-base solid $border-color-gray;
      }
    }
  }

  .order_card_footer {
    padding-top: 20px;
    border-top: $border-hairline solid $border-color-gray;
    .order_summary {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      .summary_line {
        display: flex;
        justify-content: space-between;
        width: 200px;
        font-size: $sub-desktop;
        color: $color-text-main;
        &.total {
          font-size: $p-desktop;
          font-weight: $font-bold;
        }
      }
    }
  }

  @include respond(md) {
    .order_content_area {
      width: 100%;
      padding: 20px;
      border-radius: 0;
    }
    .order_filter_section {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      h3 {
        font-size: $h3-mobile;
      }
      .order_status_filter {
        position: static;
        transform: none;
        width: 100%;
        select {
          width: 100%;
          height: $input-height-mobile;
          font-size: $p-mobile;
        }
      }
    }
    .order_card {
      padding: 15px;
    }
    .order_card_header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
      .order_meta {
        width: 100%;
        .sub-text {
          font-size: $sub-mobile;
        }
      }
      .button_view_details {
        width: 100%;
        height: $button-height-mobile;
        font-size: $sub-mobile;
      }
    }
    .order_card_body {
      .product_item {
        flex-direction: row;
        gap: 15px;
      }
      .product_image {
        width: 80px;
        height: 80px;
      }
      .product_details {
        grid-template-columns: 1fr;
        font-size: $sub-mobile;
      }
    }
    .order_card_footer .order_summary {
      .summary_line {
        font-size: $sub-mobile;
        &.total {
          font-size: $p-mobile;
        }
      }
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
