<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Button from '@/components/buttons/button.vue'

  const router = useRouter()
  const route = useRoute()
  const order = ref(null)
  const isLoading = ref(true)
  const hasError = ref(false)

  const orderId = route.query.order_id
  const API_BASE_URL = import.meta.env.VITE_API_BASE

  const paymentMethodsMap = {
    credit_card: '信用卡',
    linepay: 'Line Pay',
    cash_on_delivery: '貨到付款',
  }
  if (!orderId) {
    router.replace('/')
  }
  onMounted(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/get_member_order.php`, {
        params: {
          order_id: orderId,
        },
        withCredentials: true,
      })

      if (response.data.order) {
        order.value = response.data.order
      } else {
        hasError.value = true
        console.error('API 回傳資料格式錯誤')
      }
    } catch (error) {
      console.error('獲取訂單資料失敗:', error)
      hasError.value = true
      if (error.response && error.response.status === 404) {
        router.replace('/')
      } else if (error.response && error.response.status === 401) {
        router.push('/login')
      }
    } finally {
      isLoading.value = false
    }
  })
</script>
<template>
  <section class="completion_section">
    <div class="completion_banner">
      <h1>購物車</h1>
    </div>

    <div class="container">
      <div v-if="isLoading" class="loading-state">
        <h2>正在載入訂單資料...</h2>
      </div>

      <div v-else-if="hasError" class="error-state">
        <h2>無法取得訂單資料，請稍後再試。</h2>
      </div>

      <div v-else-if="order">
        <div class="completion-title">
          <h2>訂單完成！感謝您的購買</h2>
        </div>

        <h3>訂單資料</h3>
        <div class="order-details">
          <ul>
            <li>
              <h3>訂單編號:</h3>
              <span>{{ order.order_id }}</span>
            </li>
            <li>
              <h3>收件人姓名:</h3>
              <span>{{ order.receiver_name }}</span>
            </li>
            <li>
              <h3>收件人電話:</h3>
              <span>{{ order.receiver_phone }}</span>
            </li>
            <li>
              <h3>收件人地址:</h3>
              <span>{{ order.receiver_address }}</span>
            </li>
            <li>
              <h3>運送方式:</h3>
              <span>宅配</span>
            </li>
            <li>
              <h3>付款方式:</h3>
              <span>{{ paymentMethodsMap[order.payment_method] || order.payment_method }}</span>
            </li>
            <li>
              <h3>付款狀態:</h3>
              <span class="payment-status">{{ order.payment_status }}</span>
            </li>
            <li class="total">
              <h3>商品總計:</h3>
              <span>${{ order.final_amount }}</span>
            </li>
          </ul>
        </div>
        <div class="actions">
          <RouterLink to="/member/orders">
            <Button variant="gray">查詢所有訂單</Button>
          </RouterLink>

          <RouterLink to="/productlist">
            <Button variant="default">繼續購物</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .completion_section {
    max-width: 1920px;
    .completion_banner {
      background-image: url('@/assets/images/product/cart_banner.jpg');
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
      }
    }
    .container {
      max-width: 800px;
      margin: 3rem auto;
      padding: 0 1rem;
    }
    .completion-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      color: #555;
      position: relative;

      h2 {
        font-weight: bold;
        color: v.$color-orange;
        white-space: nowrap;
        padding: 0 1.5rem;
        background-color: #fff;
        z-index: 1;
      }

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: v.$color-black;
        top: 50%;
        left: 0;
        z-index: 0;
      }
    }
    .order-details {
      padding: 2rem;
      border-top: 1px solid v.$color-black;
      border-bottom: 1px solid v.$color-black;
      padding: 1.5rem 0;
      margin-top: 1rem;

      ul {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        width: max-content;
        margin: 0 auto;

        li {
          display: flex;
          justify-content: flex-start;
        }
      }
    }
    .actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 3rem;
      :deep(button) {
        width: 14.79vw;
      }
      @include respond(md) {
        :deep(button) {
          width: 39.68vw;
        }
      }
    }
  }
</style>
