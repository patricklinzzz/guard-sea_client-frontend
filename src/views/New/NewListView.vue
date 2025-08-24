<script setup>
  import PageNumber from '@/components/buttons/page_number.vue'

  import { ref, reactive, computed, onMounted } from 'vue'
  import CategoryButtons from '@/components/buttons/category_button.vue'

  import { newdata } from '@/assets/data/newdata.js'
  import { useNewsStore } from '@/stores/new_store.js'
  import { storeToRefs } from 'pinia' // 引入 storeToRefs 保持響應性

  //響應性pinia的api_start

  // 1. 初始化 Pinia Store
  const newsStore = useNewsStore()

  // 2. 【核心修改】建立橋樑，讓舊變數名稱直接讀取 Pinia 的狀態
  // 這樣您下方的所有 computed 都不用改
  const allnews = computed(() => newsStore.allNews)
  const errorMsg = computed(() => newsStore.error)
  const loading = computed(() => newsStore.loading) // 順便也把 loading 接過來

  // 3. 在 onMounted 時呼叫 action 來獲取資料 (這行保持不變)
  onMounted(() => {
    newsStore.fetchNews()
  })
  //響應性pinia的api_end

  //page_start

  const current_page = ref(1)
  const items_per_page = 4

  //show_per_page_items

  const show_per_page_items = computed(() => {
    const start = (current_page.value - 1) * items_per_page

    const end = start + items_per_page

    return filter_items.value.slice(start, end)
  })

  //page_end

  // 舊的沒有響應pinia的api_data_start

  // const loading = ref(true)
  // const errorMsg = ref(null)
  // const allnews = ref([])

  // onMounted(async () => {
  //   try {
  //     loading.value = true

  //     //以下是假資料要寫的 allnews.value = newdata 是為了搭配上面的import { newdata } from '@/assets/data/newdata.js'

  //     //假資料_開始

  //     // allnews.value = newdata

  //     //假資料_結束

  //     //以下是真正串api要寫的 開始

  //     // 1. 從環境變數讀取 API 的基礎路徑
  //     const baseUrl = import.meta.env.VITE_API_BASE

  //     // 2. 拼接出完整的 API 端點 URL
  //     const apiUrl = `${baseUrl}/news/get_news.php`
  //     const response = await axios.get(apiUrl)
  //     const data = response.data

  //     // 3. 【核心修正】在將資料存入 ref 之前，處理所有圖片路徑
  //     const processedNews = data.news.map((item) => {
  //       let processedItem = { ...item }

  //       // 3a. 處理封面圖 (image_url)
  //       if (processedItem.image_url && processedItem.image_url.startsWith('/')) {
  //         processedItem.image_url = baseUrl + processedItem.image_url
  //       }

  //       // 3b. 處理 CKEditor 內容 (content) 中的圖片
  //       if (processedItem.content) {
  //         // 使用正規表示式，查找所有 src="/uploads/..." 的圖片標籤
  //         // 並將它們替換為 src="http://.../api/uploads/..."
  //         const regex = /src="(\/uploads\/.*?)"/g
  //         processedItem.content = processedItem.content.replace(regex, `src="${baseUrl}$1"`)
  //       }

  //       return processedItem
  //     })

  //     allnews.value = processedNews // <-- 使用最終處理過的資料

  //     //以下是真正串api要寫的 結束
  //   } catch (err) {
  //     console.error('讀取失敗', err)
  //     errorMsg.value = '資料載入失敗，請稍後再試'
  //   } finally {
  //     loading.value = false
  //   }
  // })

  // 舊的沒有響應pinia的api_data_end

  //contentHtml_extract_start

  function extract_text(htmlString) {
    const extract_el = document.createElement('div')
    extract_el.innerHTML = htmlString
    return extract_el.innerText || ''
  }

  function extract_summary(text, maxLength = 110) {
    const alltext = extract_text(text).trim()
    return alltext.length > maxLength ? alltext.slice(0, 110) + '...' : alltext
  }

  //contentHtml_extract_end

  // 專門用來過濾出狀態為 1 (顯示) 的消息start
  const published_news = computed(() => {
    // 使用 Array.prototype.filter 方法
    // 只返回 item.status 等於 1 的項目
    return allnews.value.filter((item) => item.status === 1)
  })
  // 專門用來過濾出狀態為 1 (顯示) 的消息end

  // categories_array_start

  const categories = ['全部消息', '品牌動態', '優惠情報', '活動花絮']
  const all_categories = ref('全部消息')

  // 將 filter_items 的資料來源是要發佈的資料 published_news.value
  const filter_items = computed(() => {
    return all_categories.value === '全部消息'
      ? published_news.value // <-- 使用過濾後的資料
      : published_news.value.filter((item) => item.category_name === all_categories.value) // <-- 使用過濾後的資料
  })

  const handleCategoryChange = (val) => {
    all_categories.value = val
    current_page.value = 1 // 重設分頁
  }

  // categories_array_end
</script>

<template>
  <!-- banner_start -->
  <section class="banner_400dh_200ph">
    <h1>最新消息</h1>
  </section>

  <!-- banner_end -->

  <!-- new_content_start -->

  <main class="wrapper">
    <!--  Loading 提示 -->
    <p v-if="loading">資料載入中...</p>
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
    <!--new_nav_start  -->

    <CategoryButtons
      :categories="categories"
      :current-category="all_categories"
      @update:currentCategory="handleCategoryChange"
    />
    <!--new_nav_end  -->

    <!-- new_list_start -->
    <section class="new_list">
      <article
        v-for="(item, index) in show_per_page_items"
        :key="item.news_id"
        :class="{
          reverse: index % 2 === 1,
        }"
      >
        <div class="new_img">
          <img :src="item.image_url" :alt="item.title" />
        </div>
        <div class="new_info">
          <div class="category_date_wrap">
            <p class="category">{{ item.category_name }}</p>
            <p class="date">{{ item.publish_date }}</p>
          </div>

          <h3 class="title">{{ item.title }}</h3>
          <p class="desc">{{ extract_summary(item.content) }}</p>

          <RouterLink
            :to="{ name: 'newinside', params: { id: item.news_id } }"
            class="read_more_link"
            @click="createRipple"
          >
            閱讀全文+
          </RouterLink>
        </div>
      </article>
    </section>

    <!-- new_list_end -->
  </main>

  <!-- new_content_end -->

  <!-- page_number_start-->
  <!-- 分頁按鈕區 -->
  <nav>
    <PageNumber
      v-model="current_page"
      :total-items="filter_items.length"
      :items-per-page="items_per_page"
      class="my_pagination"
    />
  </nav>

  <!-- page_number_end-->
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  // banner_start
  .banner_400dh_200ph {
    background-image: url('@/assets/images/new/newbanner.jpg');
    width: 100%;
    height: 300px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    margin-bottom: 50px;

    @include respond(md) {
      height: 180px;
      background-position: 49% center;
      margin-bottom: 30px;
    }
  }

  h1 {
    font-family: v.$font-serif-tc;
    font-size: v.$h1-desktop;
    font-weight: v.$font-bold;
    letter-spacing: v.$letter-spacing-wide;
    line-height: v.$line-height-normal;
    color: white;
    text-shadow: 0px 0px 3px #000;

    @include respond(md) {
      font-size: v.$h1-mobile;
    }
  }

  // banner_end

  // new_categories_list_start

  // new_list_start

  .new_list {
    max-width: 1010px;
    padding: 0 5px;
    margin: 0 auto;

    article {
      border: 3px solid v.$color-skyblue;
      display: flex;
      margin-bottom: 40px;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;

      @include respond(md) {
        flex-direction: column;
        margin: 0 20px 32px 20px;
      }

      .new_img {
        width: 44%;
        flex-shrink: 0;
        aspect-ratio: 4 / 3;
        overflow: hidden;

        @include respond(md) {
          width: 100%;
        }

        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }

      .new_info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 8px;
        padding: 2% 4%;
        color: black;

        @include respond(md) {
          padding: 3% 4%;
        }

        .category_date_wrap {
          display: flex;
          align-items: center;
          gap: 10px;

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
        }

        .title {
          font-size: v.$h3-desktop;
          font-weight: v.$font-bold;
        }

        .desc {
          // font-size:v.$p-desktop;
          font-size: 18px;
          color: #333333;
          margin-bottom: 18px;

          @include respond(md) {
            margin-bottom: 14px;
          }
        }

        .read_more_link {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background-color: v.$color-orange;
          color: white;
          width: 102px;
          height: 48px;
          border-radius: 4px;
          font-size: 16px;
          margin-left: auto;

          // 做hover掃光效果 先加上這三個屬性
          position: relative; // 為了讓 ::before 能定位
          overflow: hidden; // 隱藏超出範圍的閃光
          transition: background-color 0.5s ease; // 讓背景色變化平滑

          // 加上閃光帶的偽元素 ::before
          &::before {
            content: '';
            position: absolute;
            // 調整寬度與位置，確保旋轉後能完整覆蓋
            top: -50%;
            left: -150%;
            width: 100%;
            height: 200%;

            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.35),
              // 光芒可以稍微調亮一點點
              transparent
            );

            // 增加旋轉效果，讓光芒傾斜
            transform: rotate(-30deg); // 傾斜 -30 度，您可以調整這個角度

            transition: left 0.7s ease-in-out; // 可以微調速度與動畫曲線
          }

          // Hover 效果
          &:hover {
            // 讓閃光帶掃過去
            &::before {
              left: 100%;
            }
          }
        }
      }

      &.reverse {
        flex-direction: row-reverse;

        .new_info {
          margin-left: 0;
          margin-right: auto;
          @include respond(md) {
            margin-right: 0;
          }
        }

        @include respond(md) {
          flex-direction: column;
        }
        .read_more_link {
          margin-left: 0;
          margin-right: auto;

          @include respond(md) {
            margin-left: auto;
            margin-right: 0;
          }
        }
      }
    }
  }

  //new_list_end
</style>
