<script setup>
  import aboutwhiteblock from '@/assets/images/about/aboutwhiteblock.png'
  import feel from '@/assets/images/about/advantage/feel.jpg'
  import know from '@/assets/images/about/advantage/know.jpg'
  import protect from '@/assets/images/about/advantage/protect.jpg'
  import diver from '@/assets/images/about/diver.png'
  import seaturtle from '@/assets/images/about/seaturtle.png'
  import dolphinAll from '@/assets/images/about/dolphin/dolphinAll.png'
  import whaleAll from '@/assets/images/about/whale/whaleAll.png'
  import coralorange from '@/assets/images/about/ourteam/coralorange.png'
  import coralyellow from '@/assets/images/about/ourteam/coralyellow.png'
  import team1 from '@/assets/images/about/ourteam/team1.jpg'
  import team2 from '@/assets/images/about/ourteam/team2.jpg'
  import team3 from '@/assets/images/about/ourteam/team3.jpg'
  import localforeignocean from '@/assets/images/about/cooperate/localforeignocean.png'
  import socialmedia from '@/assets/images/about/cooperate/socialmedia.png'
  import university from '@/assets/images/about/cooperate/university.png'
  import volunteer from '@/assets/images/about/cooperate/volunteer.png'

  // 引入 FishShoal 組件
  import FishShoal from '../../components/about/FishShoal.vue'

  // 寫gsap關於cooperate區

  import { onMounted, onUnmounted, ref } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  const main = ref()

  onMounted(() => {
    const gtx = gsap.context(() => {
      const gtl = gsap.timeline({
        scrollTrigger: {
          trigger: main.value,
          start: 'top center',
          toggleActions: 'restart none none none',
        },
      })

      gtl
        .from('h2', {
          opacity: 0,
          y: 30,
          duration: 0.6,
        })
        .from(
          '.cooperate_figure',
          {
            opacity: 0,
            x: -500,
            y: 20,
            rotationZ: -40,
            duration: 1.6,
            stagger: {
              each: 0.8,
              from: 'end', // 指定從結尾的元素開始 stagger
            },
          },
          '+=0.1'
        )
    }, main.value)
  })
</script>

<template>
  <main class="wrapper">
    <section id="banner">
      <h1 class="main_slogan">
        我們看見傷痕，
        <span class="main_slogan_bottom">於是決定成為希望的起點</span>
      </h1>
      <div class="sub_slogan_wrap">
        <div class="aboutwhiteblock">
          <img :src="aboutwhiteblock" alt="" class="aboutwhiteblock" />
        </div>
        <div class="sub_slogan">
          <p>在一趟潛水旅程中，我們親眼目睹一隻小海龜被塑膠纏住，掙扎著無法游動。</p>
          <p>那一刻，我們意識到海洋不只是美麗的藍色畫面，更藏著我們忽視太久的傷痕。</p>

          <p>-- 這個平台因此誕生</p>
        </div>
        <div class="diver">
          <img :src="diver" alt="" />
        </div>
        <div class="seaturtle">
          <img :src="seaturtle" alt="" />
        </div>
      </div>
    </section>

    <section id="about_detail">
      <div class="wave_block">
        <div class="wave"></div>
      </div>

      <div class="idea">
        <h2>我們致力於打造一個</h2>

        <h2>讓人們能夠感受海洋、認識海洋、守護海洋的數位行動基地</h2>
      </div>

      <div class="advantage">
        <div>
          <img :src="feel" alt="" />
          <h2>感受</h2>
        </div>
        <div>
          <img :src="know" alt="" />
          <h2>認識</h2>
        </div>
        <div>
          <img :src="protect" alt="" />
          <h2>守護</h2>
        </div>
      </div>

      <div class="protect">
        <div class="dolphin"><img :src="dolphinAll" alt="" /></div>
        <h3>讓更多人了解海洋的生命，願意一起守護牠們的家</h3>
        <div class="whale"><img :src="whaleAll" alt="" /></div>
      </div>

      <div class="ourTeam">
        <div class="team_left">
          <div class="coralyellow">
            <img :src="coralyellow" alt="" />
          </div>
          <div class="coralorange">
            <img :src="coralorange" alt="" />
          </div>

          <div class="team_pic">
            <div>
              <img :src="team1" alt="" />
            </div>
            <div>
              <img :src="team2" alt="" />
            </div>
            <div>
              <img :src="team3" alt="" />
            </div>
          </div>
        </div>

        <div class="team_right">
          <h2>GuardSea團隊夥伴</h2>
          <p>我們來自不同的領域</p>
          <p>設計師、生態學家、教育者、工程師，但都有一個共同點</p>
          <p>“ 我們都愛這片海 ”</p>
        </div>
      </div>
    </section>

    <section id="cooperate" ref="main">
      <h2>- 並肩合作的還有 -</h2>

      <div class="figure_item">
        <figure class="cooperate_figure">
          <div><img :src="university" alt="" /></div>
          <figcaption>多所大學研究團隊</figcaption>
        </figure>

        <figure class="cooperate_figure">
          <div><img :src="localforeignocean" alt="" /></div>
          <figcaption>國內外海洋保育單位</figcaption>
        </figure>

        <figure class="cooperate_figure">
          <div><img :src="socialmedia" alt="" /></div>
          <figcaption>社群媒體創作者</figcaption>
        </figure>

        <figure class="cooperate_figure">
          <div><img :src="volunteer" alt="" /></div>
          <figcaption>熱心有愛的志工們</figcaption>
        </figure>
      </div>
    </section>

    <div class="fish_animation_container">
      <FishShoal />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }

  main {
    color: white;
  }

  main.wrapper {
    position: relative;
  }

  // banner_start

  #banner {
    position: relative;
    width: 100%;

    background-image: url('@/assets/images/about/aboutbanner.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 8.5vw;

    @media screen and (max-width: 1800px) {
      padding-bottom: 10vw;
    }

    @media screen and (max-width: 1500px) {
      padding-bottom: 13vw;
    }

    @media screen and (max-width: 1200px) {
      padding-bottom: 15vw;
    }

    @include respond(md) {
      padding-bottom: 30vw;
    }

    @media screen and (max-width: 420px) {
      padding-bottom: 35vw;
    }

    @media screen and (max-width: 350px) {
      padding-bottom: 38vw;
    }

    h1 {
      text-align: center;
      padding: 5.8333333% 20px 0px 20px;
      margin-bottom: 6%;

      @include respond(md) {
        padding-top: 40px;
        text-align: left;

        .main_slogan_bottom {
          display: block;
        }
      }
    }

    .sub_slogan_wrap {
      position: relative;
      max-width: 1010px;
      margin: 0 auto;
      padding: 0 10px;

      .aboutwhiteblock {
        margin: 0 auto;
        width: 100%;

        @include respond(md) {
          background-color: hsla(0, 0%, 100%, 0.8);
          border-radius: 30px;
        }

        @include respond(md) {
          .aboutwhiteblock {
            display: none;
          }
        }

        @include respond(md) {
          max-width: 95%;
          height: 280px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
      .sub_slogan {
        position: absolute;
        width: 75%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: #333;
        font-size: v.$h3-desktop;

        p:first-child {
          margin-bottom: 2.6%;
        }
        p:last-child {
          margin-top: 8%;
          text-align: right;
        }
      }
    }

    // diver_start

    .diver {
      position: absolute;
      z-index: 1;
      left: -10%;
      top: 65%;
      @include respond(md) {
        transform: scale(0.75);
        left: -15%;
        top: 78%;
      }

      @media screen and (max-width: 480px) {
        left: -29%;

        top: 70%;
        transform: scale(0.7) rotate(-40deg);
      }

      @media screen and (max-width: 380px) {
        left: -10%;
        top: 78%;
        transform: scale(0.6);
      }
    }
    .seaturtle {
      position: absolute;
      z-index: 1;
      right: 3%;
      @include respond(md) {
        transform: scale(0.75);
      }
      @media screen and (max-width: 480px) {
        transform: scale(0.7);
        top: 78%;
      }

      @media screen and (max-width: 380px) {
        right: 50%;
        top: 65%;
        transform: scale(0.6);
      }
    }
    // diver_end
  }

  // banner_end

  // // about_detail_start

  #about_detail {
    position: relative;

    //wave_start

    .wave_block {
      position: absolute;
      width: 100%;
      height: 85px;
      top: -84px;
      overflow: hidden;
      // transform: rotate(180deg); // 如果波浪是白色往上疊就轉一下
    }
    .wave {
      //背景圖大小2100px x 85px高
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTAwIiBoZWlnaHQ9Ijg1IiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMDEyMDM4IiBkPSJNMTQwMCA3Ni44NzhjLTEzNi4wNiAwLTE3OS4yOS03Ni45NzUtMzU0LjgxLTc2Ljg3OEM4NzAuMTg4IDAgODI2LjQzOCA3Ni44NzggNzAwIDc2Ljg3OFY4NWg3MDB2LTguMTIyWk03MDAgNzYuODc4QzU2My45MzggNzYuODc4IDUyMC43MTMtLjA5NyAzNDUuMTg4IDAgMTcwLjE4OCAwIDEyNi40MzggNzYuODc4IDAgNzYuODc4Vjg1aDcwMHYtOC4xMjJaTTIxMDAgNzYuODc4Yy0xMzYuMDYgMC0xNzkuMjktNzYuOTc1LTM1NC44MS03Ni44NzgtMTc1IDAtMjE4Ljc1IDc2Ljg3OC0zNDUuMTkgNzYuODc4Vjg1aDcwMHYtOC4xMjJaIi8+PC9zdmc+');
      display: block;

      width: 6300px;
      height: 100%;
      background-repeat: repeat-x;
      background-size: 2100px 100%;
      animation: wave 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;

      transform: translateX(0);
    }
    @keyframes wave {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-2100px);
      }
    }

    //wave_end
    .idea {
      padding-top: 6%;
      margin-bottom: 4vw;

      @include respond(md) {
        padding-top: 9%;
      }

      @media screen and (max-width: 480px) {
        padding-top: 14%;
      }

      h2 {
        padding: 0 10px;
        text-align: center;
        margin-bottom: 15px;
        &:last-child {
          @include respond(md) {
            padding: 0 20px;
            padding-top: 6%;
            line-height: 1.6;
          }
        }
      }
    }

    //advantage_start

    .advantage {
      max-width: 980px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      gap: 5%;
      margin: 0 auto;
      margin-bottom: 40px;

      @include respond(md) {
        flex-wrap: wrap;
        justify-content: center;
      }
      div {
        position: relative;
        width: 31.25%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        overflow: hidden;

        @include respond(md) {
          width: 45%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        h2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.8);
        }
      }
    }

    //advantage_end

    //protect_start

    .protect {
      display: flex;
      max-width: 1250px;
      margin: 0 auto;
      justify-content: space-between;

      margin-bottom: 90px;

      .dolphin {
        transform: translateY(50px);
      }
      h3 {
        max-width: 340px;
        text-align: center;
        transform: translate(100px, 80px);
      }
    }
    //protect_end

    //ourTeam_start

    .ourTeam {
      max-width: 1050px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      margin-bottom: 100px;

      .team_left {
        position: relative;
        width: 45.714285%;
        height: auto;
        .coralyellow {
          position: absolute;
          bottom: 94%;
          right: 9%;
          aspect-ratio: 108 / 236;
          width: 27%;
          transform-origin: bottom center;
          animation: gentleSway 2s ease-in-out infinite alternate;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .coralorange {
          position: absolute;
          bottom: 90%;
          right: -21.7%;
          aspect-ratio: 1 / 1;
          width: 37%;
          transform-origin: bottom center;
          animation: gentleSway 2s ease-in-out infinite alternate;
          animation-delay: 1s;

          img {
            width: 100%;
          }
        }

        .team_pic {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 5px;
          overflow: hidden;
          div {
            position: absolute;
            width: 100%;
            height: 100%;

            animation: slideIn 9s ease-in-out infinite;
            transform: translateX(-100%);

            &:nth-child(1) {
              animation-delay: 0s;
              transform: translateX(0);
            }

            &:nth-child(2) {
              animation-delay: 3s;
            }

            &:nth-child(3) {
              animation-delay: 6s;
            }

            img {
              object-fit: cover;
              width: 100%;
              display: block;
              animation: picScale 9s ease-out infinite;

              /*讓圖片動畫繼承父層 div 的延遲時間 */
              animation-delay: inherit;
            }
          }
        }
      }

      .team_right {
        h2 {
          margin-bottom: 5%;
        }
        p:last-child {
          margin-top: 4%;
        }
      }
    }

    @keyframes gentleSway {
      /* 動畫開始時，向左輕微旋轉 3 度 */
      from {
        transform: rotate(-3deg);
      }
      /* 動畫結束時，向右輕微旋轉 3 度 */
      to {
        transform: rotate(3deg);
      }
    }

    @keyframes slideIn {
      0% {
        transform: translateX(-100%); /* 左側畫面外開始 */
        z-index: 10; /* 確保新滑入的圖片在最上層 */
      }
      5% {
        /* 在總時長的 5% (約 0.45s) 內滑入畫面 */
        transform: translateX(0);
      }
      33.3% {
        /* 保持在畫面中，直到它的顯示時間結束 */
        transform: translateX(0);
        z-index: 10;
      }
      /* 之後的時間，圖片保持不動，但層級降低，等待被下一張覆蓋 */
      33.4% {
        transform: translateX(0);
        z-index: 1; /* 層級降低，這樣下一張圖片才能蓋過它 */
      }
      100% {
        transform: translateX(0);
        z-index: 1;
      }
    }

    @keyframes picScale {
      0% {
        transform: scale(1); /* 在顯示的開頭，是原始大小 */
      }
      33.3% {
        transform: scale(1.1); /* 在顯示的結尾，放大到 1.1 倍 */
      }

      100% {
        transform: scale(1.1);
      }
    }

    //ourTeam_end
  }

  // about_detail_end

  #cooperate {
    h2 {
      text-align: center;
      margin-bottom: 55px;
    }
    .figure_item {
      max-width: 940px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      figure {
        text-align: center;
        div {
          margin-bottom: 1px;
        }
      }
    }
  }

  .fish_animation_container {
    /* 讓容器留在原地，並成為子元件的定位基準 */
    position: relative;

    /* 剪掉所有橫向超出螢幕的內容 */
    overflow-x: hidden;

    /* 為了讓魚群和頁尾重疊，我們在這裡設定負邊距 */
    /* 值應該和 FishShoal 組件的高度及重疊量有關 */

    height: 350px;
    margin-bottom: -230px;
  }

  :deep(footer) {
    position: relative;
    z-index: 10;
  }
</style>
