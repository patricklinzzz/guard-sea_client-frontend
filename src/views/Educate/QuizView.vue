<script setup>
  import { quizData } from '@/assets/data/quiz.js'
  import Button from '@/components/buttons/button.vue'
  import ScoreBubble from '@/components/edu/score_bubble.vue'
  import { RouterLink } from 'vue-router'
  import { gsap } from 'gsap'
  import { ref, computed, inject } from 'vue'
  const quiz_cur = ref(null)
  const question_block_ref = ref(null)
  const options_ref = ref(null)

  const option_shown = ref(true)
  const show_result = ref(false)
  const score = ref(0)
  const result_next_clicked = ref(false)
  const redeem_coupon_clicked = ref(false)

  const pass_grade = 60
  let q_index = 0
  let q_order = [...Array(10).keys()]
  const question_num = ref('Q' + (q_index + 1))

  // date.now - last_date_redeemed >= 0
  let coupon_redeemable = true

  const forceQuizRefresh = inject('forceQuizRefresh')
  const triggerSelfRefresh = () => {
    if (forceQuizRefresh) {
      forceQuizRefresh()
    } else {
      console.warn('forceQuizRefresh not injected!')
    }
  }
  function shuffleArray(array) {
    let currentIndex = array.length
    let randomIndex

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
  }
  const answered = (option) => {
    if (options_ref.value) {
      const tl = gsap.timeline().to(options_ref.value, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          option_shown.value = false
        },
      })
      if (option == quiz_cur.value.answer) {
        question_num.value = 'O'
        score.value += 10
      } else {
        question_num.value = 'X'
      }
    }
  }
  const onLeave = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: done,
    })
  }
  const onLeaveResult = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        redeem_coupon_clicked.value = true
        done()
      },
    })
  }
  const onBeforeEnter = (el) => {
    gsap.set(el, { opacity: 0 })
  }
  const onEnter = (el, done) => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: done,
    })
  }

  shuffleArray(q_order)
  quiz_cur.value = quizData[q_order[q_index]]
  const answer = 'option_' + quiz_cur.value.answer
  const nextQ = () => {
    if (q_index < 9) {
      question_num.value = 'Q' + (q_index + 1)
      const tl = gsap
        .timeline()
        .to(question_block_ref.value, {
          duration: 0.5,
          opacity: 0,
          ease: 'power2.out',
          onComplete: () => {
            quiz_cur.value = quizData[q_order[++q_index]]
            option_shown.value = true
          },
        })
        .to(question_block_ref.value, {
          duration: 0.5,
          opacity: 1,
          ease: 'power2.out',
        })
    } else {
      const tl = gsap.to(question_block_ref.value, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          show_result.value = true
        },
      })
    }
  }

  const result_next = (navigate) => {
    result_next_clicked.value = true
    if (score.value >= pass_grade) {
      if (coupon_redeemable) {
        //generate coupon code, record score, coupon code to backend

        //activate coupon view
        score.value = -1
      } else {
        //coupon redeemed, no score recorded
        score.value = -1
      }
    } else {
      triggerSelfRefresh()
      //back to quiz home
    }
  }

  const skipResult = () => {
    score.value = Math.floor(Math.random() * 10) * 10
    q_index = 9
    answered(4)
  }
  const btn_next_text = computed(() => {
    return q_index == 9 ? '公布結果' : '下一題'
  })

  const result_text_top = computed(() => {
    if (result_next_clicked.value) {
      return coupon_redeemable ? '已領取專屬優惠卷快來去商店選購吧！' : '30天內已領取過優惠卷!'
    }
    return score.value >= pass_grade
      ? '您已具備維護海洋的基礎知識。 您對海洋污染的認知， 是邁向解決問題的重要一步！'
      : '您已經邁出關心海洋的一步。別灰心！再試一次挑戰成功就能獲得專屬折價券！'
  })
  const result_text_bot = computed(() => {
    return score.value >= pass_grade
      ? '恭喜獲得商品折價券！ 您的每一次消費， 都將支持我們的海洋保育工作。'
      : '每一次嘗試，都是守護海洋的開始'
  })
  const result_btn_next_text = computed(() => {
    return score.value >= pass_grade ? '領取折價券' : '重新測驗'
  })
</script>

<template>
  <main class="wrapper">
    <Button @click="skipResult">skipResult</Button>
    <h2 style="color: white">score: {{ score }}</h2>
    <div v-if="!show_result" class="question_block" ref="question_block_ref">
      <div class="question_num">
        <Transition mode="out-in" @leave="onLeave" @before-enter="onBeforeEnter" @enter="onEnter">
          <p :key="question_num">{{ question_num }}</p>
        </Transition>
      </div>
      <div class="text">
        <h3>{{ quiz_cur.question_description }}</h3>
        <ul v-if="option_shown" ref="options_ref">
          <li @click="answered(1)">
            <div>1</div>
            <p>{{ quiz_cur.option_1 }}</p>
          </li>
          <li @click="answered(2)">
            <div>2</div>
            <p>{{ quiz_cur.option_2 }}</p>
          </li>
          <li @click="answered(3)">
            <div>3</div>
            <p>{{ quiz_cur.option_3 }}</p>
          </li>
        </ul>
        <Transition @before-enter="onBeforeEnter" @enter="onEnter" :css="false">
          <div v-if="!option_shown">
            <p class="sub-text">正確答案:</p>
            <div class="answer">
              <div>{{ quiz_cur.answer }}</div>
              <p>{{ quiz_cur[answer] }}</p>
            </div>
            <p class="sub-text">小知識:</p>
            <p class="explanation">{{ quiz_cur.explanation }}</p>
            <Button @click="nextQ" class="btn_next_text">{{ btn_next_text }}</Button>
          </div>
        </Transition>
      </div>
    </div>
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="show_result" class="final_result">
        <div class="bubble_score">
          <ScoreBubble size="80" :score="score"></ScoreBubble>
        </div>
        <div class="text">
          <Transition mode="out-in" @leave="onLeave" @enter="onEnter" @before-enter="onBeforeEnter">
            <p class="top" :key="result_text_top">
              {{ result_text_top }}
            </p>
          </Transition>
          <Transition @leave="onLeave">
            <p v-if="!result_next_clicked" class="bottom">{{ result_text_bot }}</p>
          </Transition>

          <Transition @leave="onLeaveResult">
            <router-link :to="'/edu'" custom v-slot="{ navigate }">
              <Button v-if="!result_next_clicked" @click="result_next(navigate)">
                {{ result_btn_next_text }}
              </Button>
            </router-link>
          </Transition>

          <Transition @enter="onEnter" @before-enter="onBeforeEnter">
            <div v-if="redeem_coupon_clicked">
              <router-link :to="'/register'" custom v-slot="{ navigate }">
                <Button
                  v-if="coupon_redeemable"
                  @click="navigate"
                  variant="transparent"
                  class="button"
                >
                  會員中心
                </Button>
              </router-link>
              <router-link :to="'/productlist'" custom v-slot="{ navigate }">
                <Button @click="navigate" class="button">前往選購</Button>
              </router-link>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-extra-dark;
  }
  .question_block {
    margin-top: 100px;
    background-color: v.$color-bg-primary-dark;
    border: 1px solid v.$color-skyblue;
    border-radius: v.$border-radius-md;
    position: relative;
    max-width: 387px;
    color: v.$color-text-white;
    .question_num {
      position: absolute;
      top: -35px;
      left: 0;
      right: 0;
      margin-inline: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64.131px;
      height: 64.131px;
      color: black;
      border-radius: v.$border-radius-round;
      background-color: v.$color-skyblue;
    }
    .text {
      width: 85%;
      margin: 54px auto 20px;
      position: relative;
      li {
        margin-top: 20px;
        border-radius: v.$border-radius-md;
        background-color: #134487;
        display: flex;
        transition: 0.3s ease;
        border: 2px solid #134487;
        cursor: pointer;
        &:hover {
          border: 2px solid v.$color-orange-hover;
        }
        div {
          margin: auto 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          aspect-ratio: 1/1;
          border: 1px solid white;
          border-radius: v.$border-radius-round;
        }
        p {
          margin: 5px 1px;
        }
      }
      .answer {
        border-radius: v.$border-radius-md;
        background-color: #134487;
        display: flex;
        border: 2px solid #134487;
        div {
          margin: auto 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          aspect-ratio: 1/1;
          border: 1px solid white;
          border-radius: v.$border-radius-round;
        }
        p {
          margin: 5px 1px;
        }
      }
      .sub-text {
        color: white;
        margin-block: 15px;
        font-weight: bold;
      }
      .explanation {
        margin-bottom: 50px;
      }
      .btn_next_text {
        position: absolute;
        bottom: -75px;
        margin-inline: auto;
        left: 0;
        right: 0;
        width: fit-content;
      }
    }
  }
  .final_result {
    margin-top: 100px;
    color: white;
    max-width: 280px;
    text-align: center;
    .bubble_score {
      position: relative;
      width: fit-content;
      margin-inline: auto;
    }
    .text {
      p {
        margin-block: 30px;
      }
    }
  }
</style>
