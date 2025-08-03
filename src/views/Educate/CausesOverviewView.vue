<script setup>
  // remaining objectives: 
  // RWD
  // irregular bubble + (constant animaiton?)
  // pngs? + svg expand into view transition?

  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { gsap } from 'gsap'
  import { TextPlugin } from 'gsap/TextPlugin'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import Arrow from '@/components/icons/arrow.vue'
  import Bubble from '@/components/edu/bubble.vue'
  import Button from '@/components/buttons/button.vue'
  const modules = [Navigation]
  gsap.registerPlugin(TextPlugin)

  const swiper_cur = ref(null)
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
  const init_title = (el) => {
    cause_title.value = el ? el : null
    // console.log(cause_title.value)
  }
  const isEasingEnabled = ref(true)
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
  }
  const handleSlideChange = (swiper) => {
    // console.log('Active index:', swiper.activeIndex)
  }
  const text_tween = ref([])
  const arrow_pressed = (isRight) => {
    index_now.value = isRight ? index_now.value + 1 : index_now.value - 1
    index_now.value = index_now.value < 0 ? 2 : index_now.value % 3
    dynamic_link.value = './causes/' + links[index_now.value]
    text_tween.value[index_now.value].play()
    text_tween.value[index_now.value].restart()
    if (isRight) swiper_cur.value?.slideNext()
    else swiper_cur.value?.slidePrev()
  }
  const bubble_click = (index, navigate) => {
    const active_index = index_now.value + 1
    index = index >= 4 ? index % 3 : index
    if (index === active_index) {
      navigate()
    } else {
      arrow_pressed(index == (active_index % 3) + 1)
    }
  }

  onMounted(() => {
    const base = {
      duration: 1,
      paused: true,
      ease: 'power3.out',
    }
    for (let i = 0; i < 3; i++)
      text_tween.value[i] = gsap.to(cause_title.value, { ...base, text: causeList[i] })
  })
</script>

<template>
  <main class="wrapper">
    <swiper
      :slidesPerView="'1'"

      :loop="true"
      :centeredSlides="true"
      :allowTouchMove="false"
      :modules="modules"
      :initialSlide="4"
      class="mySwiper"
      @slideChange="handleSlideChange"
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
    <h1 class="cause" :ref="(el) => init_title(el)">海洋汙染</h1>
    <div class="button_wrap">
      <Arrow class="left_arrow" direction="left" @click="arrow_pressed(false)"></Arrow>
      <router-link :to="dynamic_link" custom v-slot="{ navigate }">
        <Button @click="navigate" class="button">了解更多</Button>
      </router-link>
      <Arrow class="right_arrow" @click="arrow_pressed(true)"></Arrow>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  h1 {
    width: fit-content;
    color: v.$color-text-white;
    margin: auto;
  }
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  .mySwiper {
    margin-top: 20px;
    width: 100%;
    padding: 0 24%;
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

  .easing_enabled {
    transition:
      transform 0.3s ease,
      scale 0.3s ease;
  }
</style>
