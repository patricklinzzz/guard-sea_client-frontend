<template>
  <section id="action">
    <h2>我們在做什麼</h2>
    <div id="container">
      <div>
        <img :src="action1" alt="" />
        <h3>海洋守護行動</h3>
        <p>
          從棲地到物種
          <br />
          守護海洋生命力
        </p>
      </div>
      <div>
        <img :src="action2" alt="" />
        <h3>知識推廣平台</h3>
        <p>
          從認識到行動
          <br />
          學習不止於知識
        </p>
      </div>
      <div>
        <img :src="action3" alt="" />
        <h3>教育推廣</h3>
        <p>
          從教育到實踐
          <br />
          永續海洋新世代
        </p>
      </div>
    </div>
    <img :src="whale" alt="" id="whale" ref="whaleRef" />
  </section>
</template>

<script setup>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { onMounted, ref } from 'vue'
  import action1 from '@/assets/images/homepage/action1.svg'
  import action2 from '@/assets/images/homepage/action2.svg'
  import action3 from '@/assets/images/homepage/action3.svg'
  import whale from '@/assets/images/homepage/whale.svg'

  gsap.registerPlugin(ScrollTrigger)
  const whaleRef = ref(null)
  onMounted(() => {
    gsap.from(whaleRef.value, {
      scrollTrigger: {
        trigger: whaleRef.value,
        start: 'center bottom',
        toggleActions: 'play reverse play reverse',
      },
      x: -100,
      rotation:40,
      duration:1.5,
    })
  })
</script>

<style lang="scss" scoped>
  #action {
    margin-top: 40px;
    position: relative;
    @include respond(md) {
      margin-top: 30px;
    }
    h2 {
      width: 62.5vw;
      margin: auto;
      @include respond(md) {
        width: 90vw;
      }
    }
    & > #container {
      width: 62.5vw;
      margin: 55px auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      @include respond(md) {
        width: 90vw;
        margin: 30px auto;
      }
      & > div {
        height: 250px;
        width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        border: 1px solid v.$color-skyblue;
        box-sizing: border-box;
        border-radius: v.$border-radius-md;
        padding: 15px 20px;
        @include respond(md) {
          display: grid;
          grid-template-columns: 40% 60%;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          width: 90vw;
          height: auto;
        }
        img {
          width: 100px;
          height: 100px;
          @include respond(md) {
            grid-row: 1 / span2;
            margin: auto;
          }
        }
        h3 {
          color: v.$color-skyblue-light;
          font-weight: bold;
        }
        h3,
        p {
          @include respond(md) {
            // height: 50%;
          }
        }
      }
    }
    #whale {
      width: 17vw;
      position: absolute;
      bottom: -30%;
      left: -3%;
      @include respond(md) {
        display: none;
      }
    }
  }
</style>
