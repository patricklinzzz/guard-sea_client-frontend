<script setup>
  import PageNumber from '@/components/buttons/page_number.vue'

  import { ref, reactive, computed, onMounted } from 'vue'

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

  // api_data_start

  const loading = ref(true)
  const errorMsg = ref(null)
  const allnews = ref([])

  onMounted(async () => {
    try {
      loading.value = true
      allnews.value = [
        {
          id: 1,
          category: '品牌動態',
          date: '2025.07.08',
          title: '海龜救援行動！成功釋放五隻受困個體',
          coverimage: 'https://picsum.photos/400/300?random=100',
          content: `
      <p>我們在本月的海龜救援行動中，接獲通報後於岸邊發現五隻受困海龜，經過獸醫評估與簡單處置後，順利將牠們帶回海上放生。這次的行動也再次提醒大家，塑膠繩與廢棄漁網仍是海洋生物巨大的威脅。</p>
      <img src="https://picsum.photos/800/400?random=200" alt="海龜救援現場" />
      <p>我們也同步推動社區教育，邀請在地學校參與救援後的生態講座，讓更多孩子了解人為垃圾對海洋造成的長期影響。未來我們將持續與研究團隊合作，建立更完善的監測與通報機制。</p>
      <img src="https://picsum.photos/800/400?random=201" alt="教育推廣活動" />
    `,
        },
        {
          id: 2,
          category: '活動花絮',
          date: '2025.07.15',
          title: '淨灘活動圓滿落幕，清出 2 噸廢棄物',
          coverimage: 'https://picsum.photos/400/300?random=101',
          content: `
      <p>本次大型淨灘活動由多個企業與社區志工共同響應。</p>
      <img src="https://picsum.photos/800/400?random=202" alt="淨灘活動現場" />
      <p>我們將持續推動減塑行動，並鼓勵民眾以行動支持環保，例如自備水壺、餐具與購物袋。期待更多人參與，讓海岸線逐漸恢復乾淨，讓海洋生物有更安全的棲息地。</p>
      <img src="https://picsum.photos/800/400?random=203" alt="志工合照" />
    `,
        },
        {
          id: 3,
          category: '媒體報導',
          date: '2025.07.21',
          title: '專訪創辦人：十年守護海洋的故事',
          coverimage: 'https://picsum.photos/400/300?random=102',
          content: `
      <p>在這篇專訪中，創辦人分享了組織從草創期一路走來的挑戰，包括資源匱乏、志工培訓與社會大眾對海洋議題的冷感，但也談到一路上看見的改變與希望。</p>
      <img src="https://picsum.photos/800/400?random=204" alt="創辦人訪談" />
      <p>十年間我們完成了無數次的淨灘、復育、講座與校園推廣，更多合作夥伴也逐漸加入。未來我們將朝向數據化管理與跨國合作，讓保育成果能更有效地擴散與落實。</p>
      <img src="https://picsum.photos/800/400?random=205" alt="團隊合影" />
    `,
        },
        {
          id: 4,
          category: '活動花絮',
          date: '2025.04.23',
          title: '親子海洋教育日，寓教於樂',
          coverimage: 'https://picsum.photos/400/300?random=103',
          content: `
      <p>我們舉辦了親子海洋教育日，透過闖關遊戲、實物展示與互動實驗，讓孩子在玩樂中理解海廢的來源與影響。許多家長反映，孩子回家後主動要求減少使用一次性塑膠，令人感動。</p>
      <img src="https://picsum.photos/800/400?random=206" alt="親子教育活動" />
      <p>活動中我們也示範如何分類常見的海洋廢棄物，並提供簡單可行的減塑策略。接下來我們會將教材開源，讓更多學校與社群能自由取用與擴散。</p>
      <img src="https://picsum.photos/800/400?random=207" alt="減塑教學" />
    `,
        },
        {
          id: 5,
          category: '品牌動態',
          date: '2025.02.05',
          title: '企業響應綠色行動，攜手減塑',
          coverimage: 'https://picsum.photos/400/300?random=104',
          content: `
      <p>多家企業宣布加入我們的減塑合作計畫，將逐步淘汰一次性用品，改以可重複使用或環境友善材質取代，並推廣無紙化與綠色辦公室政策。</p>
      <img src="https://picsum.photos/800/400?random=208" alt="企業合作" />
      <p>我們也將提供企業內訓課程，從員工日常的行為著手，讓永續不只是口號，而是能看得見的改變。更多細節將於下季發布。</p>
      <img src="https://picsum.photos/800/400?random=209" alt="內訓課程花絮" />
    `,
        },
        {
          id: 6,
          category: '品牌動態',
          date: '2025.06.18',
          title: '潛水志工完成年度珊瑚復育計畫',
          coverimage: 'https://picsum.photos/400/300?random=105',
          content: `
      <p>今年度的珊瑚復育計畫順利完成，志工們在專業人員指導下於指定海域種下多株珊瑚苗，並進行例行性的健康監測與數據紀錄。</p>
      <img src="https://picsum.photos/800/400?random=210" alt="珊瑚復育" />
      <p>我們也同步強化海域環境評估機制，期望建立更完整的長期監測模型，未來將開放更多名額讓有興趣的潛水員加入志工行列。</p>
      <img src="https://picsum.photos/800/400?random=211" alt="海域監測" />
    `,
        },
        {
          id: 7,
          category: '媒體報導',
          date: '2025.05.30',
          title: '珊瑚礁白化警訊，引發關注',
          coverimage: 'https://picsum.photos/400/300?random=106',
          content: `
      <p>近期監測數據顯示，部分海域的珊瑚礁出現明顯白化現象，科學家警告氣候變遷與海水升溫已對當地生態造成壓力，需要社會各界共同關注。</p>
      <img src="https://picsum.photos/800/400?random=212" alt="珊瑚白化" />
      <p>我們呼籲政府與民間單位合作擬定長期復育策略，並加強針對海域的環境監測，讓保育工作能更精準有效。</p>
      <img src="https://picsum.photos/800/400?random=213" alt="監測儀器" />
    `,
        },
        {
          id: 8,
          category: '活動花絮',
          date: '2025.05.28',
          title: '本季保育講座內容精彩回顧',
          coverimage: 'https://picsum.photos/400/300?random=107',
          content: `
      <p>本季講座邀請了多位學者專家，從珊瑚生態、海洋酸化到塑膠微粒的議題都有涵蓋，幫助民眾以更宏觀的角度理解海洋正在面臨的挑戰。</p>
      <img src="https://picsum.photos/800/400?random=214" alt="講座現場" />
      <p>我們也收集了參與者的回饋，將調整未來講座的主題與形式，讓知識傳遞更具互動性，也會提供線上直播與回放，讓更多人更方便參與。</p>
      <img src="https://picsum.photos/800/400?random=215" alt="講座互動" />
    `,
        },
        {
          id: 9,
          category: '活動花絮',
          date: '2025.05.10',
          title: '自由潛水清除漁網，成效卓著',
          coverimage: 'https://picsum.photos/400/300?random=108',
          content: `
      <p>自由潛水志工組成的行動小隊，於本月進行了多次海底廢棄漁網清除任務，成功回收了數十公斤的廢漁具，減少了海洋生物受困的風險。</p>
      <img src="https://picsum.photos/800/400?random=216" alt="海底清網" />
      <p>這項行動也記錄了海床受廢棄物影響的狀況，我們將持續與研究單位合作，將資料整理成報告，協助後續制定更完善的保育策略。</p>
      <img src="https://picsum.photos/800/400?random=217" alt="回收漁網" />
    `,
        },
        {
          id: 10,
          category: '優惠情報',
          date: '2025.04.30',
          title: '新產品上市：海洋回憶手環',
          coverimage: 'https://picsum.photos/400/300?random=109',
          content: `
      <p>我們與在地設計師合作，推出以回收漁網為材質的海洋回憶手環，每售出一件都將提撥固定比例投入海洋復育計畫，讓消費也能成為一種善意的循環。</p>
      <img src="https://picsum.photos/800/400?random=218" alt="海洋回憶手環" />
      <p>未來也會推出更多與永續材料結合的商品，歡迎大家持續關注我們的品牌動態，一起用行動守護海洋。</p>
      <img src="https://picsum.photos/800/400?random=219" alt="永續商品設計" />
    `,
        },
        {
          id: 11,
          category: '活動花絮',
          date: '2025.04.22',
          title: '活動預告：八月海洋論壇',
          coverimage: 'https://picsum.photos/400/300?random=110',
          content: `
      <p>八月我們將舉辦年度海洋論壇，邀請國內外的學者、環保團體與企業，共同分享在海洋保育、減塑與永續供應鏈上的實務經驗與策略。</p>
      <img src="https://picsum.photos/800/400?random=220" alt="海洋論壇" />
      <p>論壇將提供線上報名與直播服務，詳細議程將於近日公布，敬請期待！</p>
      <img src="https://picsum.photos/800/400?random=221" alt="論壇報名資訊" />
    `,
        },
        {
          id: 12,
          category: '品牌動態',
          date: '2025.04.10',
          title: '與設計師聯名包款搶先看',
          coverimage: 'https://picsum.photos/400/300?random=111',
          content: `
      <p>這次聯名包款選用回收漁網纖維與再生帆布，從材質、染色到製程都力求減少碳排與污染，兼顧實用與永續精神。</p>
      <img src="https://picsum.photos/800/400?random=222" alt="聯名包款" />
      <p>系列商品將於下個月正式發表，並開放限量預購，敬請鎖定我們的社群平台獲取第一手資訊。</p>
      <img src="https://picsum.photos/800/400?random=223" alt="商品細節" />
    `,
        },
        {
          id: 13,
          category: '活動花絮',
          date: '2025.03.22',
          title: '學生志工海岸巡守紀錄',
          coverimage: 'https://picsum.photos/400/300?random=112',
          content: `
      <p>來自多所學校的學生志工，在週末進行了海岸巡守行動，記錄海漂垃圾的分佈情況，並彙整成報告提供給地方政府與研究單位參考。</p>
      <img src="https://picsum.photos/800/400?random=224" alt="學生志工" />
      <p>透過這樣的參與式調查，讓年輕世代更貼近海洋議題，也累積了寶貴的公民科學資料，對未來的政策制定極具參考價值。</p>
      <img src="https://picsum.photos/800/400?random=225" alt="巡守行動" />
    `,
        },
        {
          id: 14,
          category: '媒體報導',
          date: '2025.03.01',
          title: '捐款突破百萬，感謝社會各界支持',
          coverimage: 'https://picsum.photos/400/300?random=113',
          content: `
      <p>感謝所有捐款與支持我們的朋友，讓我們在今年度能持續推動海洋保育、教育推廣與科學監測等多項計畫。每一筆資源都會被妥善運用在最需要的地方。</p>
      <img src="https://picsum.photos/800/400?random=226" alt="感謝支持" />
      <p>我們也會定期公開財務報告與成果，確保透明與信任，同時邀請更多願意伸出援手的夥伴加入，共同讓這片海域更美好。</p>
      <img src="https://picsum.photos/800/400?random=227" alt="計畫成果" />
    `,
        },
      ]
    } catch (err) {
      console.error('讀取失敗', err)
      errorMsg.value = '資料載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  })

  // api_data_end

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

  // categories_array_start

  const categories = ['全部消息', '品牌動態', '優惠情報', '活動花絮']
  const all_categories = ref('全部消息')

  const filter_items = computed(() => {
    return all_categories.value === '全部消息'
      ? allnews.value
      : allnews.value.filter((item) => item.category === all_categories.value)
  })

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
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
    <!--new_nav_start  -->
    <nav class="new_nav">
      <ul>
        <li v-for="category in categories" :key="category">
          <button
            :class="{ active: category === all_categories }"
            @click="
              () => {
                all_categories = category
                current_page = 1
              }
            "
          >
            <h3>
              {{ category }}
            </h3>
          </button>
        </li>
      </ul>
    </nav>

    <!--new_nav_end  -->

    <!-- new_list_start -->
    <section class="new_list">
      <article
        v-for="(item, index) in show_per_page_items"
        :key="item.id"
        :class="{
          reverse: index % 2 === 1,
        }"
      >
        <div class="new_img">
          <img :src="item.coverimage" :alt="item.title" />
        </div>
        <div class="new_info">
          <div class="category_date_wrap">
            <p class="category">{{ item.category }}</p>
            <p class="date">{{ item.date }}</p>
          </div>

          <h3 class="title">{{ item.title }}</h3>
          <p class="desc">{{ extract_summary(item.content) }}</p>

          <RouterLink :to="{ name: 'newinside', params: { id: item.id } }" class="read_more_link">
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
    background-image: url('/src/assets/images/new/newbanner.jpg');
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

  // new_nav_start

  .new_nav {
    max-width: v.$container;
    margin: 0 auto 40px auto;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;

      @include respond(md) {
        flex-wrap: wrap;
        padding: 0px 20px;
        height: 38px;
        margin-bottom: 70px;
      }

      li {
        position: relative;
        padding: 0px 10px;
        line-height: 40px;

        @include respond(md) {
          width: 50%;
          padding: 0px 15px;
          line-height: 38px;
          margin-bottom: 8px;
        }

        &:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background-color: white;
        }

        @include respond(md) {
          &::after {
            display: none;
          }

          &:nth-child(1)::after,
          &:nth-child(3)::after {
            content: '';
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 24px;
            background-color: white;
            display: block;
          }
        }

        button {
          width: 124px;
          line-height: 40px;
          border: none;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          @include respond(md) {
            width: 100%;

            line-height: 38px;
          }

          h3 {
            color: white;
            font-family: v.$font-sans;
            font-size: v.$h3-desktop;

            @include respond(md) {
              min-width: 114px;
            }
          }

          &.active {
            background-color: v.$color-skyblue-light;
            border-radius: 5px;
            h3 {
              color: v.$color-blue-dark;
            }
          }
        }
      }
    }
  }

  // new_nav_end

  // new_list_start

  .new_list {
    max-width: 1040px;
    padding: 0 20px;
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

  //客製化頁碼_給其他頁面參考_start

  // :deep(.my_pagination button) {
  //   border-color: #00bcd4;
  //   color: #00bcd4;
  // }

  // :deep(.my_pagination button.active) {
  //   background-color: #00bcd4;
  //   color: white;
  // }

  // :deep(.my_pagination button:disabled) {
  //   opacity: 0.4;
  //   color: #aaa;
  // }

  // :deep(.my_pagination .arrow svg path) {
  //   stroke: #00bcd4;
  // }

  // :deep(.my_pagination button:disabled svg path) {
  //   stroke: #ccc;
  // }

  //客製化頁碼_給其他頁面參考_end
</style>
