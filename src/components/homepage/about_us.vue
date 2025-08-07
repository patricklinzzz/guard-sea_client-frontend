<template>
  <section id="about_us">
    <article>
      <img :src="aboutus" alt="" />
      <div>
        <h2>關於我們</h2>
        <p>
          我們致力於推廣海洋保育及教育，串連知識、行動與社群。用最簡單的方式，讓每個人都能理解海洋的重要性，成為改變的力量。
        </p>
      </div>
    </article>
    <img :src="turtle" alt="" id="turtle" ref="turtleRef" />
  </section>
</template>

<script setup>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)
  import { onMounted, onUnmounted, ref } from 'vue'
  import aboutus from '@/assets/images/homepage/aboutus.png'
  import turtle from '@/assets/images/homepage/turtle.png'

  let tl = null
  const turtleRef = ref(null)

  onMounted(() => {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: turtleRef.value,
        start: 'center bottom',
        end: 'bottom top',
        scrub: 1.5,
        // markers: true,
      },
    })
    tl.to(turtleRef.value, {
      x: -200,
      duration: 0.4,
    })
    tl.to(turtleRef.value, {
      scaleX: -1,
      y: -10,
      duration: 0.1,
    })
    tl.to(turtleRef.value, {
      x: '+=100',
      scaleX: -0.3,
      scaleY: 0.3,
      duration: 0.7,
    })
  })

  onUnmounted(() => {
    if (tl) {
      tl.kill()
    }
  })
</script>

<style lang="scss" scoped>
  #about_us {
    position: relative;
    height: 12vh;
    // min-height: 300px;
    article {
      z-index: 2;
      position: absolute;
      display: flex;
      justify-content: center;
      min-width: 800px;
      gap: 50px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      img {
        max-width: 30vw;
        object-fit: contain;
      }
      div {
        max-width: 40vw;
        margin-top: 5%;
        p {
          margin-top: 23px;
        }
      }
    }
    #turtle {
      width: 17vw;
      position: absolute;
      right: -150px;
      top: 0;
      @include respond(md) {
        display: none;
      }
    }
  }
</style>
