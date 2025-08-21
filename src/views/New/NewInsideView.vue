<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { newdata } from '@/assets/data/newdata.js' // 假資料

  // 1. 從 Pinia Store 引入 useNewsStore
  import { useNewsStore } from '@/stores/new_store.js'

  // --- 初始化 ---
  const route = useRoute() // 用來取得路由參數，例如 id
  const router = useRouter() // 用來操作返回上一頁等功能
  const newsStore = useNewsStore() // 初始化 Pinia Store

  // --- Pinia 橋接區  ---

  // 橋接 'loading' 狀態
  const loading = computed(() => newsStore.loading)

  // 橋接 'errorMsg' 狀態 (讓舊名字指向新來源)
  const errorMsg = computed(() => newsStore.error)

  // 【橋接 'allnews' 陣列
  // 我們從 Store 找到單一文章物件，然後把它放進一個陣列裡，以符合 template 中 v-for 的需求
  const allnews = computed(() => {
    const currentId = Number(route.params.id)
    const foundArticle = newsStore.getNewsById(currentId) // 從 store 找到文章物件

    // 如果找到了文章，就回傳一個只包含該文章的陣列
    // 如果沒找到，就回傳一個空陣列
    return foundArticle ? [foundArticle] : []
  })

  // --- onMounted (職責單純化) ---
  // 確保 store 中有資料，特別是當使用者直接用網址進入此頁面時
  onMounted(() => {
    newsStore.fetchNews()
  })

  // 舊的沒有響應pinia的api_data_start

  // const props = defineProps(['id']) // 從路由接收 ID 參數
  // const router = useRouter()

  // 定義需要的 ref 變數
  // const allnews = ref([]) // 依然是 allnews，保持為一個陣列
  // const errorMsg = ref(null) // 錯誤訊息
  // const loading = ref(true) // 讀取狀態

  // 在 mounted 時處理假資料
  // onMounted(async () => {
  //   try {
  //     const currentId = Number(props.id)
  //     // 使用 filter，讓 allnews 成為一個只包含目標文章的「陣列」

  //     //假資料邏輯start (到時候要切換真假資料只需要註解掉這一行)
  //     // const foundNews = newdata.filter((item) => item.news_id === currentId)
  //     //假資料邏輯end

  //     //真實 API 邏輯start

  //     // 1. 從環境變數讀取 API 的基礎路徑
  //     const baseUrl = import.meta.env.VITE_API_BASE

  //     // 2. 拼接出完整的 API 端點 URL
  //     const apiUrl = `${baseUrl}/news/get_news.php`
  //     const response = await axios.get(apiUrl)
  //     const allApiNews = response.data.news

  //     // 3. 【核心修正】從所有新聞中，找到我們需要的那一筆
  //     let targetNews = allApiNews.find((item) => Number(item.news_id) === currentId)

  //     // 4. 如果找到了目標新聞，就對它進行路徑處理
  //     if (targetNews) {
  //       // 4a. 處理封面圖 (雖然內頁可能沒用到，但處理一下更完整)
  //       if (targetNews.image_url && targetNews.image_url.startsWith('/')) {
  //         targetNews.image_url = baseUrl + targetNews.image_url
  //       }

  //       // 4b. 處理 CKEditor 內容 (content) 中的圖片
  //       if (targetNews.content) {
  //         const regex = /src="(\/uploads\/.*?)"/g
  //         targetNews.content = targetNews.content.replace(regex, `src="${baseUrl}$1"`)
  //       }
  //     }

  //     // 5. 將處理過的資料（如果找到了）放進一個陣列中，以匹配 v-for 的需求
  //     const foundNews = targetNews ? [targetNews] : []

  //     //真實 API 邏輯end

  //     //後續判斷是否找的到文章
  //     if (foundNews.length > 0) {
  //       allnews.value = foundNews
  //     } else {
  //       // 如果找不到對應 id 的文章
  //       errorMsg.value = '找不到指定的文章內容'
  //     }
  //   } catch (error) {
  //     console.error('讀取失敗', error)
  //     errorMsg.value = '資料載入失敗，請稍後再試'
  //   } finally {
  //     loading.value = false // 載入完成，設置為 false
  //   }
  // })

  // 舊的沒有響應pinia的api_data_end

  // 返回上一頁的功能
  const goBack = () => {
    router.back()
  }
</script>
<template>
  <!-- 狀態一：載入中 -->
  <p v-if="loading">載入中...</p>

  <!-- 狀態二：發生錯誤或找不到文章 -->
  <main v-else-if="errorMsg || allnews.length === 0">
    <p class="error-msg">{{ errorMsg || '找不到文章' }}</p>
    <button @click="goBack">上一頁</button>
  </main>

  <!-- 狀態三：成功載入，顯示文章 -->
  <main v-else>
    <!-- 
      因為 allnews 陣列現在只有一筆資料，v-for 只會跑一次。
      我們移除了有問題的 v-if，因為過濾的動作已經在 script 中完成了。
    -->
    <div v-for="item in allnews" :key="item.news_id">
      <h1>{{ item.title }}</h1>
      <div class="category_date_wrap">
        <p class="category">{{ item.category_name }}</p>
        <p class="date">{{ item.publish_date }}</p>
      </div>
      <div v-html="item.content" class="content"></div>
    </div>
    <button @click="goBack">上一頁</button>
  </main>
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

      :deep(img) {
        // 1. 最大寬度為 100% -> 圖片最寬只能跟它的容器一樣寬 (900px)
        max-width: 100%;

        // 2. 高度自動 -> 確保圖片等比例縮放，不會變形
        height: auto;

        // 3.  讓圖片像區塊一樣顯示，並自動居中
        display: block;
        margin: 1.5rem auto; // 上下留白，左右自動居中

        // 4. (可選但推薦) 給圖片加個圓角，更好看
        border-radius: 5px;
      }
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
