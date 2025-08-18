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
        <p>讓更多人了解海洋的生命，願意一起守護牠們的家</p>
        <div class="whale"><img :src="whaleAll" alt="" /></div>
      </div>

      <div class="ourTeam">
        <div class="team_left">
          <div class="corals">
            <img :src="coralyellow" alt="" />
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
          <h3>GuardSea團隊夥伴</h3>
          <p>我們來自不同的領域</p>
          <p>設計師、生態學家、教育者、工程師，但都有一個共同點</p>
          <p>“ 我們都愛這片海 ”</p>
        </div>
      </div>
    </section>

    <secition id="cooperate">
      <figure>
        <div><img src="" alt="" /></div>
        <figcaption>多所大學研究團隊</figcaption>
      </figure>

      <figure>
        <div><img src="" alt="" /></div>
        <figcaption>國內外海洋保育單位</figcaption>
      </figure>

      <figure>
        <div><img src="" alt="" /></div>
        <figcaption>社群媒體創作者</figcaption>
      </figure>

      <figure>
        <div><img src="" alt="" /></div>
        <figcaption>熱心有愛的志工們</figcaption>
      </figure>
    </secition>

    <section id="">輪播圖</section>
    <section id="">小魚穿梭</section>
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
  }

  // about_detail_end
</style>
