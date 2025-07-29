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
  import aboutus from '@/assets/images/homepage/aboutus.png'
  import turtle from '@/assets/images/homepage/turtle.png'
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
      right: -5%;
      top: -50%;
    }
  }
</style>
