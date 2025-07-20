<!-- goal: fix easing, position arrows -->

<script setup>
import { ref, onMounted} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
const modules = [Navigation]

const a = () => {
  window.alert('pressed')
}
const causeList = ['海洋汙染', '過度捕撈', '生境破壞', '海洋汙染', '過度捕撈', '生境破壞']
const handleSlideChange = (swiper) => {
  console.log('Active index:', swiper.activeIndex)
  console.log('pre index:', swiper)
}
const handleTransitionEnd = (swiper) => {
  if (swiper.activeIndex === 4) {
    swiper.updateSlidesClasses()
    swiper.slideTo(1, 0, false)
  } else if (swiper.activeIndex === 0) {
    swiper.slideTo(3, 0, false)
  }
}
</script>

<template>
  <h2>滅絕原因</h2>
  <swiper
    :slidesPerView="'1'"
    :spaceBetween="100"
    :loop="true"
    :centeredSlides="true"
    :modules="modules"
    navigation
    class="mySwiper"
    @slideChange="handleSlideChange"
    @transitionEnd="handleTransitionEnd"
  >
  <!-- class="easing-enabled" -->
    <swiper-slide v-for="causes in causeList" >
      <svg
        width="481"
        height="481"
        viewBox="0 0 481 481"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="240.5" cy="240.5" r="239" stroke="black" stroke-width="3" />
      </svg>
      <h1>{{ causes }}</h1>
      <button @click="a">了解更多</button>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
* {
  width: fit-content;
}
button {
  display: block;
}
h1,
button {
  margin: auto;
}
.swiper {
  width: 100%;
  // height: 30%;
  padding: 0 25%;
}

.swiper-slide {
  scale: 0.6;
  text-align: center;
  // font-size: 18px;

  &.swiper-slide-active {
    scale: 1;
  }
}
.easing-enabled {
  transition: 0.1s ease;
}

</style>
