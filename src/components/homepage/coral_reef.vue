<template>
  <section id="coral_reef">
    <h2>珊瑚礁白化危機</h2>
    <div id="slider_container">
      <ImgComparisonSlider class="slider-with-animated-handle">
        <svg
          slot="handle"
          class="custom-animated-handle"
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          viewBox="-8 -3 16 6"
        >
          <path
            d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2"
            fill="#fff"
            vector-effect="non-scaling-stroke"
          ></path>
        </svg>
        <figure slot="first" class="before">
          <img style="width: 100%" :src="coral_reef_1" alt="" />
          <figcaption>Before</figcaption>
        </figure>
        <figure slot="second" class="after">
          <img style="width: 100%" :src="coral_reef_2" alt="" />
          <figcaption>After</figcaption>
        </figure>
      </ImgComparisonSlider>
      <h3>-- 全球逾50%珊瑚礁已遭白化危機 --</h3>
      <p>自1950 年以來，全球已有一半以上的珊瑚礁因海水升溫與污染而嚴重白化</p>
    </div>
    <img :src="coral" alt="" id="coral1" />
    <img :src="coral" alt="" id="coral2" />
  </section>
</template>

<script setup>
  import coral_reef_1 from '@/assets/images/homepage/coral_reef_1.png'
  import coral_reef_2 from '@/assets/images/homepage/coral_reef_2.png'
  import coral from '@/assets/images/homepage/coral.png'
  import { ImgComparisonSlider } from '@img-comparison-slider/vue'
</script>

<style lang="scss" scoped>
  #coral_reef {
    background-color: v.$color-blue-extra-dark;
    position: relative;
    padding: 30px 18.75vw 0 18.75vw;
    @include respond(md){
      padding: 30px 5vw 0 5vw;
    }
    #slider_container {
      position: relative;
      z-index: 2;
      padding: 75px 0;
      text-align: center;
      @include respond(md){
        padding: 30px 0;
      }
    }
    img-comparison-slider {
      --divider-width: 3px;
      --divider-color: #012038;
    }
    .custom-animated-handle {
      transition: transform 0.2s;
    }
    .slider-with-animated-handle:hover .custom-animated-handle {
      transform: scale(1.2);
    }
    .before,
    .after {
      margin: 0;
    }
    .before figcaption,
    .after figcaption {
      background: #fff;
      border: 1px solid v.$color-skyblue;
      border-radius: 8px;
      color: v.$color-blue-dark;
      opacity: 0.6;
      padding: 6px 10px;
      position: absolute;
      top: 3%;
      line-height: 100%;
    }
    .before figcaption {
      left: 12px;
    }
    .after figcaption {
      right: 12px;
    }
    & > img {
      width: 17vw;
      position: absolute;
    }
    #coral1 {
      bottom: 0;
      left: -3%;
    }
    #coral2 {
      top: 0;
      right: -3%;
    }
  }
</style>
