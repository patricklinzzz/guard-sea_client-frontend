<script setup>
  // goals: button on diff views,  disable swipe,  button change on Arrow
  
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
  const modules = [Navigation]
  gsap.registerPlugin(TextPlugin)
  const a = () => {
    window.alert('pressed')
  }
  //---swiper
  const swiper_cur = ref(null)
  const onSwiper = (swiper) => {
    swiper_cur.value = swiper
  }
  const causeList = ['海洋汙染', '過度捕撈', '生境破壞', '海洋汙染', '過度捕撈', '生境破壞']
  const index_now = ref(0)
  const cause_title = ref(null)
  const init_title = (el) => {
    cause_title.value = el ? el : null
    console.log(cause_title.value)
  }
  const isEasingEnabled = ref(true)
  const handleTransitionEnd = (swiper) => {
    if (swiper.activeIndex === 4) {
      isEasingEnabled.value = false
      swiper.slideTo(1, 0, false)
    } else if (swiper.activeIndex === 0) {
      isEasingEnabled.value = false
      swiper.slideTo(3, 0, false)
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
    text_tween.value[index_now.value].play()
    text_tween.value[index_now.value].restart()
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
  <swiper
    :slidesPerView="'1'"
    :spaceBetween="100"
    :loop="true"
    :centeredSlides="true"
    :modules="modules"
    class="mySwiper"
    @slideChange="handleSlideChange"
    @transitionEnd="handleTransitionEnd"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="causes in causeList" :class="{ easing_enabled: isEasingEnabled }">
      <Bubble></Bubble>
    </swiper-slide>
  </swiper>
  <h1 class="cause" :ref="(el) => init_title(el)">海洋汙染</h1>
  <button @click="a">了解更多</button>
  <div class="arrows">
    <Arrow
      class="left_arrow"
      direction="left"
      @click="
        arrow_pressed(false);
        swiper_cur?.slidePrev()
      "
    ></Arrow>
    <Arrow
      class="right_arrow"
      @click="
        arrow_pressed(true);
        swiper_cur?.slideNext()
      "
    ></Arrow>
  </div>
</template>

<style lang="scss" scoped>
  * {
    width: fit-content;
  }
  button {
    display: block;
    margin-inline: auto;
  }

  h1 {
    margin: auto;
  }
  .swiper {
    width: 100%;
    padding: 0 25%;
  }
  .arrows {
    margin-inline: auto;
    margin-top: 50px;
    .left_arrow {
      margin-right: 20px;
    }
    .right_arrow {
      margin-left: 20px;
    }
  }
  .swiper-slide {
    scale: 0.6;
    text-align: center;

    &.swiper-slide-active {
      scale: 1;
    }
  }
  .easing_enabled {
    transition:
      transform 0.3s ease,
      scale 0.3s ease;
  }
</style>
