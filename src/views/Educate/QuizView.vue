<script setup>
  import { quizData } from '@/assets/data/quiz.js'
  import Button from '@/components/buttons/button.vue'
  import ScoreBubble from '@/components/edu/score_bubble.vue'
  import BubbleCircle from '@/components/edu/BubbleCircle.vue'
  import LightRays from '@/components/edu/LightRays.vue'
  import { RouterLink } from 'vue-router'
  import { gsap } from 'gsap'
  import { ref, computed, inject, onMounted, onUnmounted } from 'vue'

  import doge from '@/assets/images/Educate/quiz/doge.png'

  const quiz_cur = ref(null)
  const question_block_ref = ref(null)
  const options_ref = ref(null)
  const quiz_type_selected = ref(null)
  const quiz_chosen = ref(null)
  const r = ref(80)

  const quiz_start = ref(false)
  const start_anime_end = ref(false)
  const option_shown = ref(true)
  const show_result = ref(false)
  const score = ref(0)
  const result_next_clicked = ref(false)
  const redeem_coupon_clicked = ref(false)

  const pass_grade = 60
  const q_index = ref(0)
  const bubble_text = ['海洋生物', '海洋汙染', '過度捕撈', '生態破壞']
  let q_order = [...Array(10).keys()]
  const question_num = ref('Q' + (q_index.value + 1))

  // date.now - last_date_redeemed >= 0
  const coupon_redeemable = ref(true)

  const forceQuizRefresh = inject('forceQuizRefresh')
  const triggerSelfRefresh = () => {
    if (forceQuizRefresh) {
      forceQuizRefresh()
    } else {
      console.warn('forceQuizRefresh not injected!')
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
  const onLeaveStart = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        start_anime_end.value = true
        done()
      },
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

  shuffleArray(q_order)

  const bubble_pick = (index) => {
    quiz_type_selected.value = quiz_type_selected.value === index ? null : index
    console.log(quiz_type_selected.value)
  }
  const start_quiz = () => {
    if (quiz_type_selected.value != null) {
      quiz_chosen.value = quizData[quiz_type_selected.value]
      quiz_start.value = true
      quiz_cur.value = quiz_chosen.value[q_order[q_index.value]]
    } else {
      window.alert('pick a topic')
    }
  }
  const nextQ = () => {
    if (q_index.value < 9) {
      question_num.value = 'Q' + (q_index.value + 2)
      const tl = gsap
        .timeline()
        .to(question_block_ref.value, {
          duration: 0.5,
          opacity: 0,
          ease: 'power2.out',
          onComplete: () => {
            quiz_cur.value = quiz_chosen.value[q_order[++q_index.value]]
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
      //if not logged in: alert login
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
    q_index.value = 9
    answered(4)
  }
  const quiz_slogan = computed(() => {
    let res = ''
    switch (quiz_type_selected.value) {
      case 0:
        res = '探索深藍奧秘，守護海洋生物！'
        break
      case 1:
        res = '揭開海洋污染真相，行動從我開始！'
        break
      case 2:
        res = '測試你對過度捕撈的了解，守護海洋資源！'
        break
      case 3:
        res = '直面棲地危機，拯救海洋家園！'
        break
    }
    return res
  })
  const answer = computed(() => {
    return 'option_' + quiz_cur.value.answer
  })

  const btn_next_text = computed(() => {
    return q_index.value == 9 ? '公布結果' : '下一題'
  })
  const result_text_top = computed(() => {
    if (result_next_clicked.value) {
      return coupon_redeemable.value
        ? '已領取專屬優惠卷快來去商店選購吧！'
        : '30天內已領取過優惠卷!'
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

  const ct = computed(() => {
    return coupon_redeemable.value ? 'redeemable' : 'not redeemable'
  })
  const doge_toggle = ref(true)

  const isMobile = ref(false)

  const checkBreakpoints = () => {
    const width = window.innerWidth
    isMobile.value = width < 425
    r.value = isMobile.value ? 120 : 80
  }

  onMounted(() => {
    checkBreakpoints()
    window.addEventListener('resize', checkBreakpoints)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkBreakpoints)
  })
</script>

<template>
  <LightRays />
  <main class="wrapper">
    <img
      :src="doge"
      alt=""
      class="doge"
      @click="
        () => {
          doge_toggle = !doge_toggle
        }
      "
    />
    <div v-if="doge_toggle" class="devMode">
      <Button @click="skipResult">skipResult</Button>
      <Button
        @click="
          () => {
            coupon_redeemable = !coupon_redeemable
          }
        "
      >
        {{ ct }}
      </Button>
      <h2 style="color: white">score: {{ score }}</h2>
    </div>
    <div class="content_block">
      <Transition @leave="onLeaveStart">
        <div v-if="!quiz_start" class="quiz_main">
          <ScoreBubble v-if="!isMobile" class="quiz_title" score="110" size="160"></ScoreBubble>
          <div v-if="isMobile" class="mobile_title">
            <h1>守護者挑戰</h1>
            <p>選擇主題，挑戰高分解鎖折扣</p>
          </div>
          <div class="float_bubbles">
            <BubbleCircle
              v-for="(txt, index) in bubble_text"
              :text="txt"
              :key="index"
              :class="{ selected: quiz_type_selected === index }"
              :r="r"
              @click="bubble_pick(index)"
              class="float_bubble"
            ></BubbleCircle>
          </div>
          <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" mode="out-in">
            <p :key="quiz_type_selected">{{ quiz_slogan }}</p>
          </Transition>
          <Button class="start_btn" @click="start_quiz">START</Button>
        </div>
      </Transition>
      <Transition @before-enter="onBeforeEnter" @enter="onEnter">
        <div v-if="start_anime_end && !show_result" class="question_block" ref="question_block_ref">
          <div class="question_num">
            <Transition
              mode="out-in"
              @leave="onLeave"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
            >
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
      </Transition>
      <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
        <div v-if="show_result" class="final_result">
          <div class="bubble_score">
            <ScoreBubble size="80" :score="score"></ScoreBubble>
          </div>
          <div class="text">
            <Transition
              mode="out-in"
              @leave="onLeave"
              @enter="onEnter"
              @before-enter="onBeforeEnter"
            >
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
              <div
                class="buttons"
                :class="{ coupon_na: !coupon_redeemable }"
                v-if="redeem_coupon_clicked"
              >
                <router-link :to="'/member/coupons'" custom v-slot="{ navigate }">
                  <Button
                    v-if="coupon_redeemable"
                    @click="navigate"
                    variant="transparent"
                    class="btn_member"
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
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper {
    height: 600px;
    .content_block {
      width: fit-content;
      margin: auto;

      @media (min-width: 768px) {
        margin-left: 20%;
      }
      @media (max-width: 425px) {
        max-width: 260px;
      }
    }
  }
  .wrapper::before {
    @include bg-layer-fixed-extra-dark;
  }
  .quiz_main {
    width: fit-content;
    .quiz_title {
      display: block;
      margin-inline: auto;
      margin-block: 20px;
    }
    .float_bubbles {
      width: fit-content;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      @media (max-width: 425px) {
        grid-template-columns: repeat(2, 1fr);
        margin-inline: auto;
        margin-top: 25px;
      }
    }
    button {
      display: block;
      margin: auto;
    }
    p {
      width: fit-content;
      color: white;
      margin-inline: auto;
      margin-block: 16px;
    }
    @media (max-width: 425px) {
      margin-top: 25px;
      color: white;
      h1{
        width: fit-content;
        margin: auto;
      }
      p{
        text-align: center;
      }
    }
  }
  .question_block {
    margin-top: 55px;
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
    margin-top: 55px;
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
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      .btn_member {
        color: white;
      }
    }
  }

  .coupon_na {
    width: 280px;
  }
  .devMode {
    position: absolute;
    right: 0;
  }
  .doge {
    position: absolute;
    cursor: pointer;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 50px;
  }
</style>
