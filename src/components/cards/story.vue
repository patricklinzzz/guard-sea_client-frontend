<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/scss'
  import 'swiper/scss/effect-cards'
  import 'swiper/css/navigation'
  import { EffectCards, Navigation } from 'swiper/modules'
  const modules = [EffectCards, Navigation]
</script>

<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :navigation="true"
    :cards-effect="{
      perSlideOffset: 20,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <article>
        <h2>令人大開眼界！</h2>
        <p>
          "我從來沒有意識到我們的海洋面臨的挑戰有多麼嚴峻，直到我瀏覽了這個網站。『海洋生物』區塊的內容非常詳細且呈現精美。它真的啟發了我，讓我開始思考我日常生活的影響，以及我能如何為保育工作做出貢獻。請繼續保持如此出色的工作！"
        </p>
        <p>-Olivia</p>
      </article>
    </swiper-slide>
    <swiper-slide>
      <article>
        <h2>絕佳的保育資源</h2>
        <p>
          "這個網站簡直是資訊寶庫！『保育行動』模組提供了實用的技巧和想法，我可以輕鬆地將其融入我的生活中。我也很欣賞『最新消息』區塊，它讓我能隨時了解最新的發展。強烈推薦給所有關心海洋健康的人！"
        </p>
        <p>-Marcus</p>
      </article>
    </swiper-slide>
    <swiper-slide>
      <article>
        <h2>使用者友善且內容豐富！</h2>
        <p>
          "瀏覽這個網站輕而易舉，而且內容真的引人入勝。我特別喜歡『海洋生物』區塊中的影片——它們讓海底世界栩栩如生！很明顯，製作團隊在讓複雜主題變得易於理解方面投入了大量心血。感謝你們創建了這麼重要的平台。"
        </p>
        <p>-Sophia</p>
      </article>
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
  .swiper {
    width: 40vw;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background-color: v.$color-skyblue;
    article {
      height: 100%;
      padding: 30px;
      display: flex;
      gap: 10px;
      flex-direction: column;
      justify-content: space-around;
      color: v.$color-black;
      font-weight: normal;
      & > :nth-child(1) {
        align-self: center;
      }
      & > :nth-child(3) {
        align-self: flex-end;
      }
    }
  }
  :deep(.swiper-button-prev) {
    left: -100px;
    font-weight: bolder;
    color: v.$color-white;
  }
  :deep(.swiper-button-next) {
    right: -100px;
    font-weight: bolder;
    color: v.$color-white;
  }
</style>
