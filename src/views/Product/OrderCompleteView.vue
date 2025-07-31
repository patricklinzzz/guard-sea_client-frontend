<script setup>
  import { useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart_store'
  import Button from '@/components/buttons/button.vue'

  const router = useRouter()
  const cartStore = useCartStore()

  const order = cartStore.finalOrder
  if (!order) {
    router.replace('/')
  }
</script>

<template>
  <section class="completion_section" v-if="order">
    <div class="completion_banner">
      <img src="/src/assets/images/product/cart_banner.png" alt="訂單完成" />
      <h1>購物車</h1>
    </div>

    <div class="container">
      <div class="completion-title">
        <h2>訂單完成！感謝您的購買</h2>
      </div>

      <h3>訂單資料</h3>
      <div class="order-details">
        <ul>
          <li>
            <h3>收件人姓名:</h3>
            <span>{{ order.recipient.name }}</span>
          </li>
          <li>
            <h3>收件人電話:</h3>
            <span>{{ order.recipient.phone }}</span>
          </li>
          <li>
            <h3>收件人地址:</h3>
            <span>{{ order.recipient.address }}</span>
          </li>
          <li>
            <h3>運送方式:</h3>
            <span>{{ order.shippingMethod }}</span>
          </li>
          <li>
            <h3>付款方式:</h3>
            <span>{{ order.paymentMethod }}</span>
          </li>
          <li class="total">
            <h3>商品總計:</h3>
            <span>${{ order.finalTotal }}</span>
          </li>
        </ul>
      </div>

      <div class="actions">
        <Button variant="gray" to="/orders">查詢訂單</Button>
        <RouterLink to="/productlist">
          <Button variant="default" to="/products">周邊商品</Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .completion_section {
    max-width: 1920px;
    .completion_banner {
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
