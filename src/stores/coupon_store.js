import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fakeCoupons } from '@/assets/data/coupons'

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    // 全站優惠券
    allCoupons: [...fakeCoupons],

    //預設為空
    userCoupons: ref([]),
  }),

  // 經過計算或篩選後的 state
  getters: {
    formattedAvailableCoupons(state) {
      return state.userCoupons
        .filter((c) => !c.used) // 先篩選
        .map((coupon) => {
          // 再格式化
          if (!coupon.validDays) {
            return { ...coupon, validityPeriod: '有效期限:沒有限制' }
          }
          const today = new Date()
          const expiryDate = new Date(today)
          expiryDate.setDate(today.getDate() + coupon.validDays)
          const formattedDate = expiryDate.toISOString().slice(0, 10)
          return { ...coupon, validityPeriod: `使用期限: ${formattedDate}` }
        })
    },

    // 根據優惠券代碼 (code) 查找使用者擁有的特定優惠券
    getCouponByCode: (state) => (code) => state.userCoupons.find((c) => c.code === code),
  },

  // Actions：定義所有修改 state 的方法
  actions: {
    // 根據觸發類型，從 allCoupons 發放對應的券到 userCoupons。
    grantCoupon(triggerType, options = null) {
      // triggerType 第一層篩選
      let matchedCoupons = this.allCoupons.filter((c) => c.trigger === triggerType)

      //如果是問答券，且 options 中有提供 quiz_category，第二層篩選
      if (triggerType === 'onQuizPass' && options && options.quiz_category) {
        matchedCoupons = matchedCoupons.filter((c) => c.quiz_category === options.quiz_category)
      }

      // (避免重複發放)
      matchedCoupons.forEach((coupon) => {
        const alreadyGranted = this.userCoupons.some((uc) => uc.code === coupon.code)
        if (!alreadyGranted) {
          this.userCoupons.push({ ...coupon, used: false })
        }
      })
    },

    // 清空當前使用者的所有優惠券，常用於登出或重置狀態。
    clearUserCoupons() {
      this.userCoupons = []
    },

    // 當使用者成功結帳後，將某張優惠券標記為「已使用」。
    markCouponAsUsed(code) {
      const coupon = this.userCoupons.find((c) => c.code === code)
      if (coupon) {
        coupon.used = true
      }
    },
  },
})


//=========================測驗引入優惠卷參考
// import { ref } from 'vue'
// // 1. 引入你的 coupon store
// import { useCouponStore } from '@/stores/coupon_store'

// // 2. 取得 store 的實例
// const couponStore = useCouponStore()

// const quizPassed = ref(false)
// const couponGrantedMessage = ref('')

// // 3. 模擬使用者通過測驗後要執行的函式
// const handleQuizComplete = () => {
//   // 假設這裡有一些判斷使用者是否答對的邏輯...
//   const isCorrect = true; // 假設使用者答對了

//   if (isCorrect) {
//     quizPassed.value = true;
    
//     // ★★★ 核心步驟：呼叫 action 來發放優惠券 ★★★
//     // 第一個參數是 triggerType，必須和 coupon 資料中的 'onQuizPass' 完全一樣
//     // 第二個參數是 options 物件，用來指定是哪一個測驗
//     couponStore.grantCoupon('onQuizPass', { quiz_category: 'oceanbio' });

//     // 顯示成功訊息給使用者
//     couponGrantedMessage.value = '恭喜！您已獲得「海洋知識家闖關禮」優惠券！';
    
//     // (可選) 禁用按鈕，避免重複領取
//     // 雖然你的 store 裡已經有防重複的邏輯，但在介面上禁用是更好的使用者體驗
//   }
// }
/* <template>
  <div class="quiz-container">
    <h2>海洋知識家問答</h2>
    <!-- ... 這裡放你的問答題目 ... -->
    
    <button @click="handleQuizComplete" :disabled="quizPassed">
      完成作答，領取獎勵
    </button>

    <div v-if="couponGrantedMessage" class="success-message">
      {{ couponGrantedMessage }}
    </div>
  </div>
</template> */









//==================================活動引入優惠卷的方式參考
// import { ref } from 'vue'
// // 1. 引入你的 coupon store
// import { useCouponStore } from '@/stores/coupon_store'

// // 2. 取得 store 的實例
// const couponStore = useCouponStore()

// const isClaimed = ref(false)

// // 3. 點擊按鈕後要執行的函式
// const claimEventCoupon = () => {
//   // ★★★ 核心步驟：呼叫 action 來發放優惠券 ★★★
//   // 這次的 triggerType 是 'event'，並且不需要第二個 options 參數
//   couponStore.grantCoupon('event');
  
//   isClaimed.value = true;
//   alert('您已成功領取「活動感謝禮」！');
// }

/* <template>
  <div class="event-container">
    <h2>夏日特別活動</h2>
    <p>點擊下方按鈕，即可領取活動限定優惠券！</p>
    
    <button @click="claimEventCoupon" :disabled="isClaimed">
      {{ isClaimed ? '已領取' : '立即領取感謝禮' }}
    </button>
  </div>
</template> */

