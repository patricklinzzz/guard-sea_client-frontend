import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE
const COUPON_API_URL = `${API_BASE_URL}/coupon`

function transformCouponData(coupon) {
  if (!coupon) return null
  return {
    ...coupon,
    id: Number(coupon.id),
    coupon_id: Number(coupon.id),
    coupon_code: coupon.code,
    min_order_amount: Number(coupon.min_order_amount),
    value: Number(coupon.value),
    valid_days: 0,
    expiration_date: coupon.validityPeriod,
  }
}

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const appliedCoupon = ref({
    coupon_id: null,
    coupon_code: null,
    discount_amount: 0,
  })

  const formattedAvailableCoupons = computed(() => {
    if (!coupons.value) return []
    return coupons.value
      .filter((c) => c.status === '1')
      .map((coupon) => {
        const validityPeriod = coupon.expiration_date
          ? `使用期限: ${coupon.expiration_date}`
          : '有效期限:沒有限制'
        return { ...coupon, validityPeriod }
      })
  })

  const getCouponByCode = computed(() => (code) => {
    return coupons.value.find((c) => c.coupon_code === code)
  })

  async function fetchCoupons() {
    isLoading.value = true
    error.value = null
    try {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('未登入，無法獲取優惠券')
      }
      const response = await axios.get(`${COUPON_API_URL}/get_member_coupons.php`, {
        withCredentials: true,
      })
      if (response.status !== 200 || !response.data) {
        throw new Error('無法從伺服器獲取優惠券資料')
      }
      coupons.value = response.data.coupons.map(transformCouponData)
    } catch (err) {
      error.value = err.response?.data?.error || err.message || '獲取優惠券失敗'
      //console.error('獲取優惠券失敗:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function validateCoupon(couponCode, subtotalAmount) {
    try {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('未登入，無法驗證優惠券')
      }
      const response = await axios.post(
        `${COUPON_API_URL}/check_coupon.php`,
        {
          coupon_code: couponCode,
          subtotal_amount: subtotalAmount,
        },
        { withCredentials: true }
      )

      if (response.status === 200) {
        appliedCoupon.value.coupon_id = response.data.coupon_id
        appliedCoupon.value.coupon_code = couponCode
        appliedCoupon.value.discount_amount = response.data.discount_amount
        return { success: true, message: '優惠券已成功套用！' }
      }
    } catch (err) {
      appliedCoupon.value = { coupon_id: null, coupon_code: null, discount_amount: 0 }
      //console.error('優惠券驗證失敗:', err)
      return { success: false, error: err.response?.data?.error || '優惠券驗證失敗' }
    }
  }

  async function markCouponAsUsed(couponId) {
    try {
      const response = await axios.post(
        `${COUPON_API_URL}/post_mark_as_used.php`,
        {
          coupon_id: couponId,
        },
        { withCredentials: true }
      )
      if (response.status === 200) {
        const coupon = coupons.value.find((c) => c.coupon_id === couponId)
        if (coupon) {
          coupon.status = '0'
        }
        return true
      }
    } catch (err) {
      //console.error('標記優惠券為已使用失敗:', err)
      return false
    }
  }

  function clearUserCoupons() {
    coupons.value = []
    appliedCoupon.value = { coupon_id: null, coupon_code: null, discount_amount: 0 }
  }

  return {
    coupons,
    isLoading,
    error,
    appliedCoupon,
    formattedAvailableCoupons,
    getCouponByCode,
    fetchCoupons,
    validateCoupon,
    markCouponAsUsed,
    clearUserCoupons,
  }
})
