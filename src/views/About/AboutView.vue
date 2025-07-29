<script setup></script>

<template>
  <main class="wrapper">
    <section id="banner">
      <h1 class="main_slogan">
        我們看見傷痕，
        <span class="main_slogan_bottom">於是決定成為希望的起點</span>
      </h1>
      <div class="sub_slogan">
        <p>在一趟潛水旅程中，我們親眼目睹一隻小海龜被塑膠纏住，掙扎著無法游動。</p>
        <p>那一刻，我們意識到海洋不只是美麗的藍色畫面，更藏著我們忽視太久的傷痕。</p>

        <p>-- 這個平台因此誕生</p>
      </div>
      <div class="wave_block">
        <div class="wave"></div>
      </div>
    </section>

    <div></div>

    <section id="about_detail">
      <p>我們致力於打造一個 讓人們能夠感受海洋、認識海洋、守護海洋的數位行動基地</p>

      <p>讓更多人了解海洋的生命，願意一起守護牠們的家</p>
      <div></div>
      <div></div>
      <div></div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  main {
    color: white;
  }

  // banner_start

  #banner {
    position: relative;
    width: 100%;
    height: 1200px;
    background-image: url('@/assets/images/about/aboutbanner.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    background-position: center -210px;
    h1 {
      text-align: center;
      padding: 5.8333333% 20px 0px 20px;
      margin-bottom: 240px;

      @include respond(md) {
        padding-top: 40px;
        text-align: left;
        .main_slogan_bottom {
          display: block;
        }
      }
    }

    .sub_slogan {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 1018px;
      min-height: 362px;
      margin: 0 auto;
      background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201058%20403%22%3E%3Cpath%20d%3D%22M20%2065C20%2038%2042%2016%2069%2016H907C923%2016%20936%2030%20936%2046C936%2061%20949%2075%20965%2075H988C1015%2075%201037%2097%201037%20124V329C1037%20356%201015%20378%20988%20378H178C163%20378%20151%20366%20151%20352C151%20337%20139%20325%20125%20325H69C42%20325%2020%20303%2020%20276V65Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .wave_block {
    position: absolute;
    width: 100%;
    height: 280px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  // banner_end

  .wave {
    background-image: url('/src/assets/images/about/aboutwave.png');
    width: 100%;
    height: 100%;

    animation: wave 12s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;

    background-size: 1920px 100%;
    background-position-x: 0;
  }

  @keyframes wave {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -1920px;
    }
  }

  @include respond(md) {
    .wave_block {
      height: 300px;
    }
    .wave {
      background-size: 1000px auto;
      animation: waveMobile 12s linear infinite;
    }

    @keyframes waveMobile {
      0% {
        background-position-x: 0px;
      }
      100% {
        background-position-x: -1000px;
      }
    }
  }

  // about_detail_start

  #about_detail {
    @include respond(md) {
      position: relative;
      top: -160px;
    }
  }

  // about_detail_end
</style>
