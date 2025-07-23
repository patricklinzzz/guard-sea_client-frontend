<script setup>


import { ref,reactive, computed } from 'vue'

// api_data_start
const allnews = reactive([
  { id:1,
    category:'品牌動態',
    date: '2025.07.08',
    coverimage:"https://picsum.photos/200/300?random=1",
    title:'淡水河口淨灘紀錄！一天清出1.2噸垃圾',
    description:'超過300位民眾參與週末的河口淨灘行動，不僅撿拾了超過1.2噸的塑膠瓶、寶特瓶與漁具，也喚起許多人對水域生態的關切。活動由地方環保團體發起，並獲得多所學校及社區居民響應。'
  },
  {
    id:2,
    category:'活動花絮',
    date:'2025.07.15',
    coverimage:'https://picsum.photos/200/300?random=2',
    title:'海洋保育講座，迴響熱烈',
    description:'本季的海洋保育系列講座圓滿落幕，感謝每一位參與者的熱情支持。我們探討了珊瑚白化、海洋酸化等重要議題，並分享了如何在日常生活中實踐環保。'
  },
  {
    id:3,
    category:'媒體報導',
    date:'2025.07.02',
    coverimage:'https://picsum.photos/200/300?random=3',
    title:'GuardSea 獲評年度最佳環保組織',
    description:'知名環保雜誌《綠色地球》將 GuardSea 評為年度最佳環保組織，表彰我們在推動海洋保育及環境教育方面的卓越貢獻。'
  },
  {
    id:4,
    category:'品牌動態',
    date:'2025.06.28',
    coverimage:'https://picsum.photos/200/300?random=4',
    title:'我們的新夥伴：海龜救援隊',
    description:'GuardSea 正式與國際海龜救援組織合作，未來將共同投入資源，建立更完善的傷病海龜救護網絡，為這些溫柔的海洋生物提供一個安全的家。'
  },
  {
    id:5,
    category:'活動花絮',
    date:'2025.06.20',
    coverimage:'https://picsum.photos/200/300?random=5',
    title:'親子淨灘日，大手牽小手愛地球',
    description:'上週末的親子淨灘活動吸引了超過50個家庭參與，孩子們在玩樂中學習環保知識，親手為沙灘撿起垃圾，是最好的環境教育。'
  },
  {
    id:6,
    category:'優惠情報',
    date:'2025.06.11',
    coverimage:'https://picsum.photos/200/300?random=6',
    title:'環保餐具推廣計畫啟動',
    description:'為了減少一次性塑膠垃圾，我們啟動了環保餐具推廣計畫，與多家餐廳合作，提供可重複使用的餐具租借服務，邀請大家一同響應。'
  },
 {
    id:7,
    category:'媒體報導',
    date:'2025.06.05',
    coverimage:'https://picsum.photos/200/300?random=7',
    title:'專訪創辦人：守護海洋的初心',
    description:'《遠見》雜誌本期專訪了 GuardSea 的創辦人，深入探討他創立組織的初衷，以及對未來海洋環境的願景與挑戰。'
  },
 {
    id:8,
    category:'活動花絮',
    date:'2025.05.28',
    coverimage:'https://picsum.photos/200/300?random=7',
    title:'珊瑚礁復育潛水活動全紀錄',
    description:'我們的專業潛水團隊成功在指定海域完成了本年度第一階段的珊瑚礁復育工作，種下了超過200株珊瑚苗，為海底花園注入新生命。'
  },

])

// api_data_end

// categories_array_start

const categories = ['全部消息', '品牌動態', '優惠情報', '活動花絮']
const all_categories = ref('全部消息')

// categories_array_end
const current_page = ref(1)
const items_per_page = 4

const filter_news = computed(()=>{
  return all_categories.value === '全部消息' ? allnews
  : allnews.filter(item=>item.category === all_categories.value)

}) 


</script>

<template>

  <!-- banner_start -->
  <section class="banner_400dh_200ph">
    <h1>最新消息</h1>
  </section>

  <!-- banner_end -->

  <!-- new_content_start -->

  <main class="wrapper">
    <!--new_nav_start  -->
    <nav class="new_nav">
      <ul>
        <li v-for="category in categories" :key="category">
          <button
            :class="{ active: category === all_categories }"
            @click="all_categories = category"
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
      <article v-for="item in filter_news" :key="item.id">
          <div>
            <img :src="item.coverimage" :alt="item.title">
          </div>
          <div class="new_info">
            <p class="tag">{{item.category}}</p>
            <p class="date">{{item.date}}</p>
            <h3 class="title">{{item.title}}</h3>
            <p class="desc">{{ item.description }}</p>
          </div>
          <RouterLink :to="{name: 'newinside',params:{id:item.id}}">閱讀全文</RouterLink>
      </article>
    </section>

    <!-- new_list_end -->
  </main>

  <!-- new_content_end -->
</template>

<style lang="scss" scoped>

.wrapper::before {
  @include bg-layer-fixed-dark;
}
// banner_start
.banner_400dh_200ph {
  background-image: url('/src/assets/images/new/newbanner.jpg');
  width: 100%;
  height: 400px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  

  @include respond(md) {
    height: 200px;

    background-position: 49% center;
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
  margin: 0 auto;

  ul {
    display: flex;

    justify-content: center;
    height: 40px;
    align-items: center;
  }

  li {
    border-right: 1px solid white;
    padding: 0px 10px;
    height: 100%;
    button {
      width: 124px;
      height: 100%;
      border: none;
      background-color: transparent;
      display: block;
      cursor: pointer;

      h3 {
        color: white;
        font-family: v.$font-sans;
        font-size: v.$h3-desktop;

        @include respond(md) {
          font-size: v.$h3-mobile;
        }
      }

      &.active {
        background-color: v.$color-skyblue;
        border-radius: 5px;
        h3 {
          color: v.$color-blue-dark;
        }
      }
    }
  }
}

// new_nav_end

// new_list_start

.new_list .new_info{
  color: white;
}
//new_list_end

</style>
