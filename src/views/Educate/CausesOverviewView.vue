<script setup>
  // remaining objectives:
  // irregular bubble + (constant animaiton?)

  import { ref, onMounted, nextTick } from 'vue'
  import { RouterLink } from 'vue-router'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/SplitText'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import Arrow from '@/components/icons/arrow.vue'
  import Bubble from '@/components/edu/bubble.vue'
  import BubbleExpand from '@/components/edu/BubbleExpand.vue'
  import Button from '@/components/buttons/button.vue'
  const modules = [Navigation]
  gsap.registerPlugin(SplitText)

  const swiper_cur = ref(null)
  const bt = ref(null)
  const onSwiper = (swiper) => {
    swiper_cur.value = swiper
  }
  const causeList = [
    '海洋汙染',
    '過度捕撈',
    '生境破壞',
    '海洋汙染',
    '過度捕撈',
    '生境破壞',
    '海洋汙染',
  ]
  const links = ['pollution', 'overfishing', 'degradation']
  const index_now = ref(0)
  const cause_title = ref(null)
  const dynamic_link = ref('./causes/pollution')

  const isEasingEnabled = ref(true)
  const inTransition = ref(false)
  const inAnime = ref(false)
  const handleTransitionStart = (swiper) => {
    inTransition.value = true
  }
  const handleTransitionEnd = (swiper) => {
    if (swiper.activeIndex === 5) {
      isEasingEnabled.value = false
      swiper.slideTo(2, 0, false)
    } else if (swiper.activeIndex === 1) {
      isEasingEnabled.value = false
      swiper.slideTo(4, 0, false)
    }
    setTimeout(() => {
      isEasingEnabled.value = true
    }, 0)
    inTransition.value = false
  }
  const handleSlideChange = (swiper) => {
    // console.log('Active index:', swiper.activeIndex)
  }
  const text_appear = ref(null)
  const text_out = ref(null)
  const arrow_pressed = (isRight) => {
    index_now.value = isRight ? index_now.value + 1 : index_now.value - 1
    index_now.value = index_now.value < 0 ? 2 : index_now.value % 3
    text_appear.value.resume()
    dynamic_link.value = './causes/' + links[index_now.value]
    if (isRight) swiper_cur.value?.slideNext()
    else swiper_cur.value?.slidePrev()
  }
  const bubble_click = (index, navigate) => {
    const active_index = index_now.value + 1
    index = index >= 4 ? index % 3 : index
    if (index === active_index) {
      handel_anime(navigate)
    } else {
      arrow_pressed(index == (active_index % 3) + 1)
    }
  }
  const anime_start = ref(false)
  const handel_anime = (navigate) => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop
    if (scrollPosition > 0) {
      window.scrollTo({
        top: 0,
      })

    }
    anime_start.value = true
    nextTick(() => {
      if (bt.value) {
        bt.value.anime()
      }
      setTimeout(() => {
        navigate()
      }, 100)
    })
  }

  onMounted(() => {
    document.fonts.ready.then(() => {
      let h1_split = new SplitText(cause_title.value, { type: 'lines' })
      let tl = gsap.timeline()
      tl.from(h1_split.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: 'expo.out',
        onStart: () => {
          inAnime.value = true
        },
        onComplete: () => {
          inAnime.value = false
        },
      })
      tl.addPause()
      tl.to(h1_split.lines, {
        yPercent: -100,
        duration: 0.6,
        ease: 'expo.out',
        onStart: () => {
          inAnime.value = true
        },
        onComplete: () => {
          h1_split.lines[0].textContent = causeList[index_now.value]
          text_appear.value.restart()
        },
      })

      text_appear.value = tl
      // text_out.value = out
      // for (let i = 0; i < 3; i++)
      //   // text_appear.value[i] = gsap.to(cause_title.value, { ...base, text: causeList[i] })
      //   text_appear.value = appear
    })
  })
</script>
<template>
  <main class="wrapper">
    <div v-if="!anime_start">
      <swiper
        :slidesPerView="'1'"
        :speed="800"
        :loop="true"
        :centeredSlides="true"
        :allowTouchMove="false"
        :modules="modules"
        :initialSlide="4"
        class="mySwiper"
        @slideChange="handleSlideChange"
        @transitionStart="handleTransitionStart"
        @transitionEnd="handleTransitionEnd"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="(causes, index) in causeList"
          :class="{ easing_enabled: isEasingEnabled }"
        >
          <router-link :to="dynamic_link" custom v-slot="{ navigate }">
            <Bubble
              @click="bubble_click(index, navigate)"
              :code="index"
              :title="links[(index + 2) % 3]"
            ></Bubble>
          </router-link>
        </swiper-slide>
      </swiper>
      <h1 class="cause" ref="cause_title">海洋汙染</h1>
      <div class="button_wrap">
        <Arrow
          :class="{ arrow_disabled: inTransition || inAnime }"
          class="left_arrow"
          direction="left"
          @click="arrow_pressed(false)"
        ></Arrow>
        <router-link :to="dynamic_link" custom v-slot="{ navigate }">
          <Button @click="handel_anime(navigate)" class="button">了解更多</Button>
        </router-link>
        <Arrow
          :class="{ arrow_disabled: inTransition || inAnime }"
          class="right_arrow"
          @click="arrow_pressed(true)"
        ></Arrow>
      </div>
    </div>
    <div v-else class="expand">
      <BubbleExpand ref="bt" :code="index_now" :title="links[0]"></BubbleExpand>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  h1 {
    width: fit-content;
    color: v.$color-text-white;
    margin: auto;
    overflow: hidden;
  }
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  .mySwiper {
    margin-top: 20px;
    width: 100%;
    padding: 0 26%;
    .swiper-slide {
      position: relative;
      scale: 0.6;
      text-align: center;
      height: 100%;

      &.swiper-slide-active {
        scale: 1;
      }
    }
    @include respond(md) {
      padding: 0;
    }
  }
  .button_wrap {
    display: flex;
    align-items: center;
    margin-inline: auto;
    margin-top: 15px;
    width: fit-content;
    .button {
      margin-inline: 50px;
    }
  }
  .arrow_disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
    transform: 0.3 ease;
  }
  .easing_enabled {
    transition:
      transform 0.3s ease,
      scale 0.3s ease;
  }
  .expand {
    height: 550px;
  }
</style>
