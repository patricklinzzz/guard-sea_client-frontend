<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useCartStore } from '@/stores/cart_store'
  import { useCouponStore } from '@/stores/coupon_store'
  import { useRouter } from 'vue-router'
  import QuantityInput from '@/components/product/quantity_button.vue'
  import Button from '@/components/buttons/button.vue'
  import CouponCard from '@/components/product/coupon_card.vue'
  import { useAuthStore } from '@/stores/auth'
  import Swal from 'sweetalert2'

  const API_BASE_URL = import.meta.env.VITE_API_BASE

  const cartStore = useCartStore()
  const couponStore = useCouponStore()
  const authStore = useAuthStore()
  const router = useRouter()

  const cartTotalAmount = computed(() =>
    cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  const shippingFee = ref(60)

  const discountAmount = computed(() => couponStore.appliedCoupon.discount_amount)

  const finalTotal = computed(() => {
    const total = cartTotalAmount.value + shippingFee.value - discountAmount.value
    return total > 0 ? total : 0
  })

  const getImageUrl = (path) => {
    if (!path || path.startsWith('http')) {
      return path
    }
    return `${API_BASE_URL}${path}`
  }

  onMounted(async () => {
    if (authStore.isLoggedIn) {
      await cartStore.fetchCartItemsFromBackend()
      await cartStore.syncCartToBackend()
      await couponStore.fetchCoupons()
    } else {
      cartStore.loadCartFromStorage()
    }
  })

  const availableCoupons = computed(() => {
    return couponStore.formattedAvailableCoupons.map((coupon) => ({
      ...coupon,
      isActive: coupon.coupon_code === couponStore.appliedCoupon.coupon_code,
    }))
  })

  const applyCoupon = async (coupon) => {
    if (!authStore.isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: '請先登入以套用優惠券。',
      })
      return
    }

    const result = await couponStore.validateCoupon(coupon.coupon_code)

    if (result.success) {
      Swal.fire(result.message)
    } else {
      Swal.fire(result.error)
    }
  }

  const handleUpdateQuantity = (index, newQuantity) => {
    cartStore.updateQuantity(index, newQuantity)
  }

  watch(
    () => cartStore.items,
    (newItems, oldItems) => {
      newItems.forEach((newItem, index) => {
        const oldItem = oldItems[index]
        if (oldItem && newItem.quantity !== oldItem.quantity) {
          cartStore.updateQuantity(index, newItem.quantity)
        }
      })
      const indexToRemove = newItems.findIndex((item) => item.quantity === 0)
      if (indexToRemove !== -1) {
        cartStore.removeItem(indexToRemove)
      }

      if (couponStore.appliedCoupon.coupon_id) {
        couponStore.validateCoupon(couponStore.appliedCoupon.coupon_code)
      }
    },
    { deep: true }
  )

  const goToNextStep = () => {
    if (cartStore.items.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '您的購物車是空的，無法結帳！',
      })
      return
    }
    router.push('/shippinginfo')
  }
</script>

<template>
  <section class="cart_section">
    <div class="cart_banner">
      <h1>購物車</h1>
    </div>

    <div v-if="!authStore.isLoggedIn" class="cart_content">
      <div class="login-prompt">
        <h2>請先登入會員以查看購物車</h2>
        <p>登入後，你加入的商品會自動同步</p>
        <button @click="router.push('/login')">前往登入</button>
      </div>
    </div>
    <div v-else class="cart_content">
      <h2>購物車內容</h2>
      <div v-if="cartStore.items.length === 0">
        <h3>購物車是空的</h3>
      </div>
      <div
        v-for="(item, index) in cartStore.items"
        :key="`${item.id}-${item.color}-${item.size}`"
        class="cart_item"
      >
        <div class="item_img">
          <img :src="getImageUrl(item.image)" alt="商品圖" class="product_img" />
        </div>
        <div class="item_details">
          <h3 class="name">{{ item.name }}</h3>
          <h3 class="color">
            顏色：
            <span :style="{ backgroundColor: item.color }"></span>
          </h3>
          <h3>尺寸：{{ item.size }}</h3>
          <div class="quantity_box">
            <QuantityInput
              :modelValue="cartStore.items[index].quantity"
              @update:modelValue="(newQuantity) => handleUpdateQuantity(index, newQuantity)"
              :min="0"
            />
          </div>
          <h3>
            價格:
            <span class="price">${{ item.price }}</span>
          </h3>
        </div>
        <button class="remove_btn" @click="cartStore.removeItem(index)">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
      <div class="coupon_section">
        <h2>選擇優惠券</h2>
        <div v-if="availableCoupons.length > 0" class="coupon_list">
          <CouponCard
            v-for="coupon in availableCoupons"
            :key="coupon.coupon_code"
            :coupon="coupon"
            :is-active="coupon.coupon_code === couponStore.appliedCoupon.coupon_code"
            @click="applyCoupon(coupon)"
            style="cursor: pointer"
          ></CouponCard>
        </div>
        <div v-else>
          <h3>目前沒有可用的優惠券。</h3>
        </div>
      </div>
      <div class="shipping">
        <h2>配送方式</h2>
        <label class="shipping-label active">
          <span class="custom-radio"></span>
          <span class="shipping-text">宅配到府</span>
        </label>
      </div>
      <div class="order">
        <h2>訂單摘要</h2>
        <div class="order_content">
          <ul>
            <li>
              <p>商品小計</p>
              <p>${{ cartTotalAmount }}</p>
            </li>
            <li>
              <p>優惠折抵</p>
              <p class="discount-text">-${{ discountAmount }}</p>
            </li>
            <li>
              <p>運費小計</p>
              <p>${{ shippingFee }}</p>
            </li>
            <li class="total">
              <h3>總計</h3>
              <h3>${{ finalTotal }}</h3>
            </li>
          </ul>
        </div>
      </div>
      <div class="order_actions">
        <RouterLink to="/productlist"><Button variant="gray">返回商品頁</Button></RouterLink>
        <Button variant="default" @click="goToNextStep">下一步</Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .cart_section {
    .cart_banner {
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
    .cart_content {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
      h2 {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        margin: 2rem 0;
        color: #333;

        &::before,
        &::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: #333;
          margin: 0 1rem;
        }
      }

      .cart_item {
        display: flex;
        column-gap: 5rem;
        border-bottom: 1px solid #ddd;
        align-items: center;
        position: relative;
        padding: 2rem 0 2rem 6.25rem;
        @include respond(md) {
          column-gap: 0.5rem;
          padding: 0;
        }

        .item_img {
          width: 21.25vw;
          img {
            width: 100%;
          }
          @include respond(md) {
            width: 40.62vw;
          }
        }
        .item_details {
          display: flex;
          flex-direction: column;
          row-gap: 1.875rem;
          @include respond(md) {
            row-gap: 0.5rem;
          }
          .name {
            font-weight: bold;
          }
          .color {
            display: flex;
            align-items: center;
            span {
              width: 35px;
              height: 35px;
              border-radius: 50%;
            }
          }
          .price {
            color: v.$color-orange;
            font-weight: v.$font-bold;
          }
        }
        .remove_btn {
          background: none;
          border: none;
          font-size: 35px;
          color: #666;
          cursor: pointer;
          position: absolute;
          right: 0;
          bottom: 1rem;
          z-index: 1;
        }
      }
      .coupon_section {
        margin: 2rem 0;
        .coupon_list {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          gap: 2rem;
          justify-content: center;
          align-items: stretch;
          @include respond(md) {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }
      }
      .shipping {
        text-align: center;
        margin: 2rem 0;
        .shipping-label {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding: 0.25rem;
        }
        .custom-radio {
          width: 18px;
          height: 18px;
          border: 2px solid #999;
          border-radius: 50%;
          margin-right: 0.75rem;
          padding: 3px;
          background-clip: content-box;
        }
        .shipping-text {
          border: 1px solid transparent;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .shipping-label.active {
          .custom-radio {
            border-color: black;
            background-color: black;
          }
          .shipping-text {
            border-color: black;
          }
        }
      }
      .order {
        padding: 1.5rem;
        margin-bottom: 4rem;

        .order_content {
          background-color: v.$color-skyblue-light;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem;
        }
        ul {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          background-color: v.$color-white;
          width: 31.25vw;
          row-gap: 1.5rem;
          @include respond(md) {
            background-color: transparent;
            padding: 0;
          }
          li {
            display: flex;
            justify-content: space-between;
            &.total {
              font-weight: bold;
              font-size: 1.2rem;
              border-top: 1px solid v.$color-black;
              padding-top: 1rem;
            }
          }
        }
      }
      .order_actions {
        display: flex;
        justify-content: center;
        column-gap: 1.5rem;
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
  }
</style>
