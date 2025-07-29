<template>
  <section id="pollute">
    <h2>汙染資訊</h2>
    <div id="pollute_data">
      <h3>
        1.2m
        <br />
        塑膠汙染
      </h3>
      <h3>
        2500
        <br />
        過度捕撈
      </h3>
      <h3>
        800+
        <br />
        氣候變遷
      </h3>
      <h3>
        50+
        <br />
        噪音汙染
      </h3>
    </div>
    <img :src="little_fish1" alt="" id="little_fish1" />
    <img :src="little_fish2" alt="" id="little_fish2" />
  </section>
</template>

<script setup>
  import little_fish1 from '@/assets/images/homepage/little_fish1.png'
  import little_fish2 from '@/assets/images/homepage/little_fish2.png'
</script>

<style lang="scss" scoped>
  #pollute {
    position: relative;
    h2 {
      background: url(@/assets/images/homepage/bg2.png) no-repeat center top / 100vw;
      padding: 0 18.75vw;
      @include respond(md) {
        padding: 0 5vw;
      }
    }
    #pollute_data {
      padding: 150px 18.75vw;
      background-color: v.$color-blue-extra-dark;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      @include respond(md) {
        padding: 60px 5vw;
        gap: 15px;
        h3 {
          flex-basis: 40%;
        }
      }
    }
    img {
      width: 12vw;
      position: absolute;
      top: -60px;
    }
    #little_fish1 {
      left: 2vw;
    }
    #little_fish2 {
      right: 2vw;
    }
  }
</style>
