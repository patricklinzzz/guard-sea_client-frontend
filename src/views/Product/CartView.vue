<script setup>
  import { computed } from 'vue'
  import { useCartStore } from '@/stores/cart'

  const cartStore = useCartStore()

  const totalAmount = computed(() =>
    cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const shippingFee = 60
  const discount = 0

  const finalTotal = computed(() => totalAmount.value + shippingFee - discount)
</script>

<template>
  <section class="cart-wrapper">
    <div class="cart-banner">
      <img src="/src/assets/images/product/cart_banner.png" alt="" />
      <h1>購物車</h1>
    </div>

    <div class="cart-content">
      <h2>購物車內容</h2>

      <div v-if="cartStore.items.length === 0">
        <p>購物車是空的</p>
      </div>

      <div
        v-for="(item, index) in cartStore.items"
        :key="`${item.id}-${item.color}-${item.size}`"
        class="cart-item"
      >
        <img :src="item.image" alt="商品圖" class="product-img" />
        <div class="item-details">
          <h3 class="name">{{ item.name }}</h3>
          <p>
            顏色：
            <span class="color-circle" :style="{ backgroundColor: item.color }"></span>
          </p>
          <p>尺寸：{{ item.size }}</p>
          <div class="quantity-box">
            <button @click="cartStore.updateQuantity(index, item.quantity - 1)">－</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(index, item.quantity + 1)">＋</button>
          </div>
          <p class="price">價格 ${{ item.price }}</p>
        </div>
        <button class="remove-btn" @click="cartStore.removeItem(index)">🗑</button>
      </div>

      <!-- 優惠券區塊（靜態展示） -->
      <div class="coupon-section">
        <h3>選擇優惠券</h3>
        <div class="coupon-list">
          <div class="coupon">
            購物金 $50
            <br />
            <small>代碼：SAVE50</small>
          </div>
          <div class="coupon">
            購物金 $30
            <br />
            <small>WELCOME30</small>
          </div>
          <div class="coupon disabled">
            購物金 $50
            <br />
            <small>OCEANBIO50</small>
          </div>
        </div>
      </div>

      <!-- 配送方式 -->
      <div class="delivery-method">
        <h3>配送方式</h3>
        <label>
          <input type="radio" checked disabled />
          宅配到府
        </label>
      </div>

      <!-- 訂單摘要 -->
      <div class="summary">
        <h3>訂單摘要</h3>
        <ul>
          <li>
            <span>商品小計</span>
            <span>${{ totalAmount }}</span>
          </li>
          <li>
            <span>優惠折抵</span>
            <span>-${{ discount }}</span>
          </li>
          <li>
            <span>運費小計</span>
            <span>${{ shippingFee }}</span>
          </li>
          <li class="total">
            <span>總計</span>
            <span>${{ finalTotal }}</span>
          </li>
        </ul>
        <div class="summary-actions">
          <button class="back-btn">返回商品頁</button>
          <button class="next-btn">下一步</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .cart-wrapper {
    .cart-banner {
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
  }
  .cart-content {
    max-width: 960px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .cart-item {
    display: flex;
    gap: 1.5rem;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
    align-items: center;
  }
  .product-img {
    width: 150px;
    object-fit: cover;
  }
  .item-details {
    flex: 1;
  }
  .color-circle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-left: 0.5rem;
  }
  .quantity-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .quantity-box button {
    width: 28px;
    height: 28px;
  }
  .price {
    color: #c00;
    font-weight: bold;
  }
  .remove-btn {
    background: none;
    border: none;
    font-size: 20px;
    color: #666;
    cursor: pointer;
  }
  .coupon-section {
    margin: 2rem 0;
  }
  .coupon-list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .coupon {
    background: #f4f4f4;
    padding: 1rem;
    border: 1px solid #ccc;
    width: 160px;
  }
  .coupon.disabled {
    opacity: 0.4;
  }
  .delivery-method {
    margin: 2rem 0;
  }
  .summary {
    background: #e0f4fa;
    padding: 1.5rem;
    margin-bottom: 4rem;
  }
  .summary ul {
    list-style: none;
    padding: 0;
  }
  .summary li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .summary li.total {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .summary-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  .back-btn,
  .next-btn {
    padding: 0.6rem 1.2rem;
    border: none;
    cursor: pointer;
  }
  .back-btn {
    background: #ddd;
  }
  .next-btn {
    background: #f26522;
    color: white;
  }
</style>
