<script setup>
import { ref } from 'vue'
const categories = ['全部消息', '品牌動態', '優惠情報', '活動花絮']
const all_categories = ref('全部消息')
const current_page = ref(1)
const items_per_page = 4
</script>

<template>
  <!-- banner_start -->
  <section class="banner_400dh_200ph">
    <h1>最新消息</h1>
  </section>

  <!-- banner_end -->

  <!-- new_content_start -->

  <main>
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

    <section>
      <article></article>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis dolor beatae facilis, modi
      sit hic asperiores quas eum? Doloremque in id quibusdam temporibus accusantium? Nam dolores
      nihil ad necessitatibus aut?
    </section>
  </main>

  <!-- new_content_end -->
</template>

<style lang="scss" scoped>
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

main {
  background-color: v.$color-blue-dark;
}

// new_categories_list_start

// new_nav_start

.new_nav {
  padding-top: 50px;
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

// new_categories_list_end
</style>
