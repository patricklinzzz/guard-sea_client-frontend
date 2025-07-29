<template>
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
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { newsData } from '@/assets/data/map_news'
  import Button from '@/components/buttons/button.vue'
  const allNews = ref(newsData)
  const router = useRouter()
  const goToNewsDetail = (id) => {
    router.push(`/new/${id}`)
  }
</script>

<style lang="scss" scoped>
  #future_action {
    background-color: v.$color-blue-extra-dark;
    padding: 0 18.75vw;
    @include respond(md) {
      padding: 0 5vw;
    }
    #news_container {
      padding: 75px 0 150px 0;
      display: grid;
      grid-template-columns: 2fr, 1fr;
      grid-template-rows: repeat(3, auto);
      gap: 20px;
      @include respond(md) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, auto);
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
        @include respond(md) {
          grid-column: 1;
          height: auto;
        }
        //左側第一個
        &:nth-of-type(1) {
          grid-column: 1;
          grid-row: 1 / span 3;
          flex-direction: column;
          @include respond(md) {
            grid-row: 1 / span 2;
          }
          img {
            width: 100%;
          }
        }
        img {
          width: 100%;
          flex-basis: 30%;
          height: 100%;
          object-fit: cover;
          @include respond(md) {
            height: inherit;
          }
        }
        #text_btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          flex-grow: 1;
          flex-basis: 70%;
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
</style>
