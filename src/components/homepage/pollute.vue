<template>
  <section id="pollute">
    <h2>汙染資訊</h2>
    <div id="pollute_data">
      <h3>
        <div>
          <CountUp :number="1100"></CountUp>
          <h2>萬噸</h2>
        </div>
        塑膠流入海洋
      </h3>
      <h3>
        <div>
          <CountUp :number="9600"></CountUp>
          <h2>萬噸</h2>
        </div>
        全球年漁獲量
      </h3>
      <h3>
        <div>
          <CountUp :number="90"></CountUp>
          <h2>% 熱量</h2>
        </div>
        海洋承擔暖化
      </h3>
      <h3>
        <div>
          <CountUp :number="170"></CountUp>
          <h2>dB↑</h2>
        </div>
        聲壓威脅鯨豚
      </h3>
    </div>
    <img :src="little_fish1" alt="" id="little_fish1" />
    <img :src="little_fish2" alt="" id="little_fish2" />
  </section>
</template>

<script setup>
  import CountUp from '@/components/edu/CountUp.vue'
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
      gap: 15px;
      h3 {
        flex-basis: 45%;
      }
      @include respond(md) {
        padding: 60px 5vw;
      }
      h3 > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-wrap: nowrap;
        & > * {
          font-size: 1.3em;
          line-height: 1.3em;
        }
        h2 {
          padding: 0;
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
