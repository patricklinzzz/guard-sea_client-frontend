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
    <img :src="turtle" alt="" id="turtle" />
  </section>
</template>

<script setup>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)
  import { onMounted, onUnmounted } from 'vue'
  import aboutus from '@/assets/images/homepage/aboutus.png'
  import turtle from '@/assets/images/homepage/turtle.png'

  onMounted(() => {
    let turtle = document.getElementById('turtle')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: turtle,
        start: 'center bottom',
        end: 'bottom top',
        scrub: true,
        // markers:true
      },
    })
    tl.to(turtle, {
      x: -200,
      y: -150,
      duration: 0.4,
    })
    tl.to(turtle, {
      scaleX: -1,
      duration: 0.1,
    })
    tl.to(turtle, {
      x: '+=300',
      duration: 0.7,
    })
  })
</script>

<style lang="scss" scoped>
  #about_us {
    position: relative;
    height: 10vh;
    min-height: 300px;
    article {
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
    }
  }
</style>
