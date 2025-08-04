<script setup>
  import { ref, onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { newdata } from '@/assets/data/newdata.js'

  const props = defineProps(['id'])
  const router = useRouter()

  // api_data_start

  const errorMsg = ref(null)
  const loading = ref(true)
  const allnews = ref([])
  const newsDetail = ref(null)

  onMounted(async () => {
    try {
      console.log('目前的 props.id 是：', props.id)
      allnews.value = newdata
      newsDetail.value = allnews.value.find((item) => item.id === Number(props.id)) || null
    } catch (error) {
      console.error('讀取失敗', err)
      errorMsg.value = '資料載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  })
  // api_data_end

  const goBack = () => {
    router.back()
  }
</script>

<template>
  <main v-if="!loading && newsDetail">
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

    <h1>{{ newsDetail.title }}</h1>
    <div>
      <div class="category_date_wrap">
        <p class="category">{{ newsDetail.category }}</p>
        <p class="date">{{ newsDetail.date }}</p>
      </div>
      <div v-html="newsDetail.content" class="content"></div>
    </div>

    <button @click="goBack">上一頁</button>
  </main>
  <p v-else>載入中...</p>
</template>

<style lang="scss" scoped>
  main {
    padding: 0px 20px;
    max-width: 1040px;
    margin: 0 auto;

    h1 {
      font-family: v.$font-serif-tc;
      font-size: v.$h1-desktop;
      font-weight: v.$font-bold;
      letter-spacing: v.$letter-spacing-wide;
      line-height: v.$line-height-normal;
      border-bottom: 1px dashed v.$color-blue-dark;
      padding-top: 60px;
      padding-bottom: 10px;
      margin-bottom: 18px;
      color: v.$color-black;

      @include respond(md) {
        font-size: v.$h1-mobile;
        padding-top: 35px;
      }
    }

    .category_date_wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;
    }

    .content {
      max-width: 900px;

      margin: 0 auto;
    }

    .category {
      text-align: center;
      color: v.$color-orange;
      width: 90px;
      height: 32px;
      line-height: 32px;
      border: 1px solid v.$color-orange;
      border-radius: 4px;
      font-size: 18px;
    }

    .date {
      font-size: 16px;
      color: #666;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
    }

    > div {
      margin-bottom: 50px;
      @include respond(md) {
        margin-bottom: 35px;
      }
    }
    > button {
      margin: 0 auto;
      display: block;
      border: none;
      width: 85px;
      height: 40px;
      border-radius: 4px;
      background-color: v.$color-skyblue-light;
      font-size: 18px;
      cursor: pointer;
      @include respond(md) {
        margin-bottom: 20px;
        font-size: 16px;
        width: 80px;
        height: 36px;
      }
    }
  }
</style>
