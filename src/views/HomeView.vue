<script setup>
  import { computed, ref } from 'vue'
  //組件
  import Button from '@/components/buttons/button.vue'
  import Map from '@/components/map/map.vue'
  import ProductCard from '@/components/product/product_card.vue'
  import { ImgComparisonSlider } from '@img-comparison-slider/vue'
  import storyCard from '@/components/cards/story.vue'
  //圖片
  import banner from '@/assets/images/homepage/banner.png'
  import bg1 from '@/assets/images/homepage/bg1.png'
  import aboutus from '@/assets/images/homepage/aboutus.png'
  import action1 from '@/assets/images/homepage/action1.png'
  import action2 from '@/assets/images/homepage/action2.png'
  import action3 from '@/assets/images/homepage/action3.png'
  import diver from '@/assets/images/homepage/diver.png'
  import coral_reef_1 from '@/assets/images/homepage/coral_reef_1.png'
  import coral_reef_2 from '@/assets/images/homepage/coral_reef_2.png'
  import turtle from '@/assets/images/homepage/turtle.png'
  import whale from '@/assets/images/homepage/whale.png'
  import little_fish1 from '@/assets/images/homepage/little_fish1.png'
  import little_fish2 from '@/assets/images/homepage/little_fish2.png'
  import coral from '@/assets/images/homepage/coral.png'
  //Data
  import { newsData } from '@/assets/data/map_news'
  import { fakeProducts } from '@/assets/data/product'

  const allNews = ref(newsData)
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goToNewsDetail = (id) => {
    router.push(`/new/${id}`) // 跳轉到 /new/1, /new/2 等
  }

  const productsToShow = computed(() => {
    let products = [...fakeProducts]
    return products.slice(0, 4)
  })
</script>

<template>
  <main>
    <section id="banner">
      <img :src="banner" alt="" />
      <article>
        <h1>守護海洋,從了解開始</h1>
        <div id="buttons">
          <Button variant="transparent" @click="router.push('/edu/species')">了解更多</Button>
          <Button @click="router.push('/event')">我想參與</Button>
        </div>
      </article>
      <img :src="bg1" alt="" />
    </section>
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
    <section id="action">
      <h2>我們在做什麼</h2>
      <div>
        <div>
          <img :src="action1" alt="" />
          <h3>海洋守護行動</h3>
          <p>
            從棲地到物種
            <br />
            全面守護海洋生命
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
      <img :src="whale" alt="" id="whale" />
    </section>
    <section id="map">
      <h2>互動地圖</h2>
      <p>
        <i class="fa-regular fa-circle"></i>
        點擊圓圈，探索區域詳情
        <br />
        <i class="fa-solid fa-map-pin"></i>
        點擊圖標，了解海洋生物
      </p>
      <Map></Map>
    </section>
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
    <section id="future_action">
      <h2>未來的行動藍圖</h2>
      <div id="news_container">
        <div v-for="news in allNews" :key="news.id">
          <img :src="news.imgUrl" alt="最新消息圖片" />
          <div id="text_btn">
            <span>
              <p>{{ news.title }}</p>
              <p>{{ news.info }}</p>
            </span>
            <Button @click="goToNewsDetail(news.id)" variant="round">
              <i class="fa-solid fa-chevron-right"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section id="story">
      <img :src="diver" alt="" id="img_diver" />
      <h2>真實故事或社群感</h2>
      <div id="story_container">
        <storyCard></storyCard>
      </div>
    </section>
    <section id="store">
      <h2 id="store_banner">支持我們，讓守護不斷電</h2>
      <p>你購買的每一件商品，我們將捐出50%，支持海龜回家、珊瑚重生，讓愛海的你成為改變的一部分</p>
      <Button @click="router.push('/productlist')">
        來去支持
        <i class="fa-solid fa-chevron-right"></i>
      </Button>
      <div id="store_container">
        <ProductCard
          v-for="product in productsToShow"
          :key="product.id"
          :product="product"
        ></ProductCard>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
  main {
    overflow: hidden;
    &::before {
      @include bg-layer-fixed-dark;
    }
    color: v.$color-white;
  }
  #banner {
    position: relative;
    background-color: v.$color-blue-extra-dark;
    img {
      width: 100%;
      vertical-align: middle;
    }
    article {
      position: absolute;
      top: 25%;
      left: 15%;
      h1 {
        text-shadow: 0 4px 4px #000000ce;
      }
      #buttons {
        margin: 28px 15px 0 0;
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        .button--transparent {
          color: v.$color-orange;
        }
      }
    }
  }
  #about_us {
    position: relative;
    height: 100px;
    article {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      top: -250px;
      left: 20%;
      img {
        height: 300px;
      }
      div {
        width: 40vw;
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
  #action {
    margin-top: 70px;
    position: relative;
    h2 {
      width: 62.5vw;
      margin: auto;
    }
    & > div {
      width: 62.5vw;
      margin: 75px auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
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
        padding: 25px 40px;
        margin-bottom: 30px;
        img {
          height: 30%;
        }
        h3 {
          color: v.$color-skyblue-light;
          font-weight: bold;
        }
      }
    }
    #whale {
      width: 17vw;
      position: absolute;
      bottom: -30%;
      left: -3%;
    }
  }
  #map {
    width: 62.5vw;
    margin: auto;
    p {
      font-size: v.$sub-desktop;
      margin-top: 40px;
      margin-bottom: 10px;
      color: v.$color-skyblue;
      i {
        width: 1em;
        text-align: center;
        color: v.$color-orange;
      }
    }
    div {
      margin-bottom: 75px;
    }
  }
  #pollute {
    position: relative;
    h2 {
      background: url(@/assets/images/homepage/bg2.png) no-repeat center top / 100vw;
      padding: 0 18.75vw;
    }
    #pollute_data {
      padding: 150px 18.75vw;
      background-color: v.$color-blue-extra-dark;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
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
  #coral_reef {
    background-color: v.$color-blue-extra-dark;
    position: relative;
    h2 {
      padding: 0 18.75vw;
    }
    #slider_container {
      padding: 75px 18.75vw;
      text-align: center;
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
  #future_action {
    background-color: v.$color-blue-extra-dark;
    padding: 0 18.75vw;
    #news_container {
      padding: 75px 0 150px 0;
      display: grid;
      grid-template-columns: 2fr, 1fr;
      grid-template-rows: repeat(3, auto);
      gap: 20px;
      //左側第一個
      & > div:nth-of-type(1) {
        grid-column: 1;
        grid-row: 1 / span 3;
        flex-direction: column;
        img {
          width: 100%;
        }
      }
      //右側3個
      & > div {
        grid-column: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: v.$color-white;
        color: v.$color-black;
        border-radius: v.$border-radius-md;
        overflow: hidden;
        img {
          width: 30%;
          height: 100%;
          object-fit: cover;
        }
        #text_btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          flex-grow: 1;
          button {
            aspect-ratio: 1/1;
          }
          span {
            p {
              font-weight: bold;
            }
            & > p:nth-of-type(2) {
              font-weight: normal;
              font-size: v.$sub-desktop;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              line-clamp: 1;
            }
          }
        }
      }
    }
  }
  #story {
    position: relative;
    padding: 100px 18.75vw 0 18.75vw;
    #img_diver {
      position: absolute;
      top: -75px;
      height: 150px;
      left: 50%;
      transform: translateX(-50%);
    }
    #story_container {
      padding: 75px 0;
    }
  }
  #store {
    width: 62.5vw;
    margin: auto;
    #store_banner {
      background: url('@/assets/images/homepage/store_banner.png') no-repeat center/ auto 3em;
      text-align: center;
      height: 3em;
      padding-top: 0.4em;
      color: v.$color-black;
    }
    p {
      padding: 50px 0;
    }
    button {
      float: right;
    }
    #store_container {
      padding: 70px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
    }
  }
</style>
