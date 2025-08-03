<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart_store'
  import { validatePhone } from '@/utils/validators.js'
  import Button from '@/components/buttons/button.vue'

  const cartStore = useCartStore()
  const router = useRouter()

  const formData = reactive({
    name: '',
    phone: '',
    address: '',
  })
  const sameAsMember = ref(false)

  const selectedPayment = ref('credit_card')

  const selectPayment = (method) => {
    selectedPayment.value = method
  }
  const nameError = ref('')
  const phoneError = ref('')
  const addressError = ref('')

  const validateRequired = (value, errorMessage = '此欄位為必填') => {
    if (String(value || '').trim() === '') {
      return errorMessage
    }
    return ''
  }

  const validateNameField = () => {
    nameError.value = validateRequired(formData.name, '請輸入收件人姓名')
  }
  const validatePhoneField = () => {
    phoneError.value = validatePhone(formData.phone)
  }
  const validateAddressField = () => {
    addressError.value = validateRequired(formData.address, '請輸入配送地址')
  }
  const validateForm = () => {
    validateNameField()
    validatePhoneField()
    validateAddressField()
    return !nameError.value && !phoneError.value && !addressError.value
  }
  const submitOrder = () => {
    const isFormValid = validateForm()
    if (!isFormValid) {
      console.log('表單資料有誤')
      return
    }
    console.log('表單驗證通過')
    const orderDetails = {
      recipient: { ...formData },
      paymentMethod: selectedPayment.value === 'credit_card' ? '信用卡' : '貨到付款',
      shippingMethod: '宅配',
      items: cartStore.items,
      finalTotal: cartStore.finalTotal,
    }
    cartStore.placeOrder(orderDetails)
    router.push('/ordercomplete')
  }
  const goBack = () => {
    router.back()
  }
</script>
<template>
  <section class="shipping_section">
    <div class="shipping_banner">
      <h1>購物車</h1>
    </div>

    <div class="shipping_container">
      <form @submit.prevent="submitOrder">
        <div class="shipping_title">
          <h3>收件人資料</h3>
          <div class="checkbox">
            <input type="checkbox" id="sameAsMember" v-model="sameAsMember" />
            <label for="sameAsMember">同會員資料</label>
          </div>
        </div>
        <div class="form-fields">
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="formData.name" @blur="validateNameField" />
            <p v-if="nameError" class="error-text">{{ nameError }}</p>
          </div>
          <div class="form-group">
            <label for="phone">電話</label>
            <input type="tel" id="phone" v-model="formData.phone" @blur="validatePhoneField" />
            <p v-if="phoneError" class="error-text">{{ phoneError }}</p>
          </div>
          <div class="form-group">
            <label for="address">地址</label>
            <input
              type="text"
              id="address"
              v-model="formData.address"
              @blur="validateAddressField"
            />
            <p v-if="addressError" class="error-text">{{ addressError }}</p>
          </div>
        </div>
        <div class="shipping_pay">
          <h3>選擇付款方式</h3>
          <div class="payment_options">
            <button
              type="button"
              :class="{ active: selectedPayment === 'credit_card' }"
              @click="selectPayment('credit_card')"
            >
              信用卡
            </button>
            <button
              type="button"
              :class="{ active: selectedPayment === 'cod' }"
              @click="selectPayment('cod')"
            >
              貨到付款
            </button>
          </div>
        </div>

        <div class="form-actions">
          <Button variant="gray" type="button" @click="goBack">返回編輯頁</Button>
          <Button variant="default" type="submit">確認下單</Button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .shipping_section {
    .shipping_banner {
      background-image: url('@/assets/images/product/cart_banner.png');
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
    .shipping_container {
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      .shipping_title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #666;
        padding: 1rem 0;
        .checkbox {
          input[type='checkbox'] {
            -webkit-appearance: auto;
          }
        }
      }
      .form-fields {
        width: 30.57vw;
        margin: 1.5rem auto;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        @include respond(md) {
          width: 90vw;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-start;

          label {
            font-size: v.$p-desktop;
          }

          input[type='text'],
          input[type='tel'] {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid v.$color-black;
            border-radius: v.$border-radius-sm;
          }
        }
        .error-text {
          color: #d9534f;
          font-size: 14px;
          margin-top: 4px;
          height: 16px;
        }
      }
      .payment_options {
        display: flex;
        justify-content: center;
        border-top: 1px solid v.$color-black;
        border-bottom: 1px solid v.$color-black;
        gap: 1rem;
        padding: 4rem 0;
        margin-top: 1rem;
        @include respond(md) {
          flex-wrap: wrap;
        }

        button {
          width: 14.32vw;
          padding: 0.75rem 0;
          border: 1px solid v.$color-black;
          background-color: v.$color-white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          &.active {
            background-color: v.$color-skyblue-light;
          }
          @include respond(md) {
            width: 87.5vw;
          }
        }
      }
    }

    .form-actions {
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
