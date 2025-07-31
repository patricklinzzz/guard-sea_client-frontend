<script setup>
  import { RouterLink } from 'vue-router'
  import { useCartStore } from '@/stores/cart_store'
  import { computed, ref, onMounted, onUnmounted } from 'vue'

  //手機menu
  const menu_open = ref(false)
  const toggle_menu = () => {
    menu_open.value = !menu_open.value
  }
  //漢堡與x切換
  const change_ham_icon = computed(() => {
    if (menu_open.value) {
      document.body.style.overflow = 'hidden'
      return 'fa-solid fa-xmark'
    } else {
      document.body.style.overflow = 'auto'
      return 'fa-solid fa-bars'
    }
  })
  //桌面版教育下拉選單
  const isedu_dropdown = ref(false)
  const open_edu_dropdown = () => {
    if (window.innerWidth >= 768) {
      isedu_dropdown.value = true
    }
  }
  // 滑鼠離開時關閉下拉菜單
  const close_edu_dropdown = () => {
    if (window.innerWidth >= 768) {
      isedu_dropdown.value = false
    }
  }
  // 點擊連結後關閉下拉選單以及選單內教育的>
  const edu_linkclick = () => {
    menu_open.value = false
    dropdown_open.value = false
  }

  //手機版教育下拉選單
  const dropdown_open = ref(false)
  const toggle_dropdown = () => {
    dropdown_open.value = !dropdown_open.value
  }
  const dropdown_arrow = computed(() => {
    if (dropdown_open.value) {
      return 'fa-solid fa-caret-up'
    } else {
      return 'fa-solid fa-caret-up fa-flip-vertical'
    }
  })
  // // 計算購物車總數量
  const cartStore = useCartStore()
  const cartCount = computed(() => cartStore.itemCount)

  //下滑時收起 往上滑出現
  const isNavHidden = ref(false)
  let lastScrollY = 0

  const handleScroll = () => {
    const nowScrollY = window.scrollY
    if (window.scrollY > 85) {
      if (nowScrollY < lastScrollY) {
        isNavHidden.value = false
      } else {
        isNavHidden.value = true
      }
      lastScrollY = nowScrollY
    } else {
      isNavHidden.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <header :class="{ nav_hidden: isNavHidden }">
    <!-- 電腦導覽列 -->
    <div id="navbar">
      <router-link to="/"><img src="../../assets/images/logo.svg" alt="" id="logo" /></router-link>

      <nav id="desktop_nav">
        <!-- 教育hover下拉選單 -->
        <div id="edu_dropdown" @mouseenter="open_edu_dropdown" @mouseleave="close_edu_dropdown">
          <router-link to="/edu">教育</router-link>
          <transition name="slide-fade">
            <div v-if="isedu_dropdown" id="edu_dropdown_menu">
              <ul>
                <li><router-link to="/edu/species">生物圖鑑</router-link></li>
                <li><router-link to="/edu/causes">滅絕原因</router-link></li>
                <li><router-link to="/edu/quiz">知識測驗</router-link></li>
              </ul>
            </div>
          </transition>
        </div>
        <router-link to="/productlist">商品</router-link>
        <router-link to="/event">活動</router-link>
        <router-link to="/new">最新消息</router-link>
        <router-link to="/about">關於我們</router-link>
        <router-link to="/login">
          <i class="fa-solid fa-user"></i>
        </router-link>
        <router-link to="/cart" class="cart-icon">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
      </nav>
      <!-- 手機導覽列 -->
      <nav id="mobile_nav">
        <router-link to="/register">
          <i class="fa-solid fa-user"></i>
        </router-link>
        <router-link to="/cart" class="cart-icon">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
        <i :class="change_ham_icon" @click="toggle_menu"></i>
      </nav>
    </div>
    <!-- 手機導覽展開 -->
    <transition name="fade">
      <div v-if="menu_open" id="md_menu">
        <ul>
          <div id="md_edu_dropdown">
            <router-link to="/edu" @click="edu_linkclick">教育</router-link>
            <i :class="dropdown_arrow" @click="toggle_dropdown"></i>
          </div>
          <ul v-if="dropdown_open">
            <li><router-link to="/edu/species" @click="edu_linkclick">生物圖鑑</router-link></li>
            <li><router-link to="/edu/causes" @click="edu_linkclick">滅絕原因</router-link></li>
            <li><router-link to="/edu/quiz" @click="edu_linkclick">知識測驗</router-link></li>
          </ul>
          <router-link to="/productlist" @click="edu_linkclick">商品</router-link>
          <router-link to="/event" @click="edu_linkclick">活動</router-link>
          <router-link to="/new" @click="edu_linkclick">最新消息</router-link>
          <router-link to="/about" @click="edu_linkclick">關於我們</router-link>
        </ul>
      </div>
    </transition>
  </header>
  <div id="navbar_placeholder"></div>
</template>

<style scoped lang="scss">
  #navbar_placeholder {
    height: 85px;
    background-color: v.$color-blue-dark;
  }
  header {
    background-color: v.$color-blue-dark;
    position: fixed;
    top: 0;
    width: 100%;
    height: 85px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-out;
    #navbar {
      max-width: 1200px;
      height: 85px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      padding-left: 30px;
      padding-right: 30px;

      @include respond(md) {
        padding-left: 15px;
        padding-right: 15px;
      }

      img {
        display: flex;
        justify-content: center;
      }

      #logo {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
      }

      #desktop_nav {
        display: flex;
        align-items: center;
        gap: 30px;
        height: 100%;

        @include respond(md) {
          display: none;
        }

        a {
          color: #fff;
          text-decoration-line: none;
        }

        #edu_dropdown {
          height: 100%;
          position: relative;

          a {
            height: 100%;
            display: flex;
            align-items: center;
          }

          #edu_dropdown_menu {
            position: absolute;
            top: 70px;
            z-index: 1001;

            a {
              width: 100%;
              padding: 5px 20px;
              white-space: nowrap;
              background-color: v.$color-blue;
            }
          }
        }
      }

      #mobile_nav {
        display: none;
        align-items: center;
        gap: 20px;
        height: 100%;

        @include respond(md) {
          display: flex;
        }

        a,
        i {
          color: #fff;
          text-decoration-line: none;
        }

        i {
          font-size: 20px;
        }
      }
    }
  }
  .nav_hidden {
    transform: translateY(-100%);
  }
  #md_menu {
    position: absolute;
    top: 84px;
    background-color: v.$color-blue-dark;
    width: 100vw;
    height: calc(100vh - 85px);
    z-index: 1000;

    & > ul {
      margin: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      ul {
        li {
          a {
            color: #fff;
            text-decoration-line: none;
            padding-left: 3em;
          }
        }
      }

      #md_edu_dropdown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;

        a {
          width: auto;
          flex-grow: 0;
        }

        i {
          text-align: right;
          font-size: 30px;
          flex-grow: 1;
        }
      }

      & > *,
      & > * > a {
        width: 100%;
        font-size: 20px;
        letter-spacing: 1%;
        line-height: 150%;
        color: #fff;
        padding: 10px 0;
        border-bottom: 1px solid #fff;
        text-decoration-line: none;
      }

      a:last-child,
      & > * > a {
        border: 0;
      }
    }
  }

  a:hover,
  i:hover {
    color: v.$color-skyblue !important;
  }

  // 漢堡動畫
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  // 教育下拉選單動畫
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20%);
    opacity: 0;
  }
  .cart-icon {
    position: relative;
    display: inline-block;

    i {
      font-size: 20px;
    }

    .cart-count {
      position: absolute;
      top: -6px;
      right: -10px;
      min-width: 18px;
      height: 18px;
      background: red;
      color: white;
      font-size: 12px;
      padding: 0 6px;
      border-radius: 999px;
      font-weight: bold;
      line-height: 18px;
      text-align: center;
    }
  }
</style>
