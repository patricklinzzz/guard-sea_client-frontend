<script setup>
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart_store'
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import Button from '@/components/buttons/button.vue'
  import defaultAvatar from '@/assets/images/member-system/avatar.svg'

  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const cartStore = useCartStore()
  const cartCount = computed(() => cartStore.itemCount)

  const isActive = (path) => computed(() => route.path.startsWith(path))
  const isEdu = isActive('/edu')
  const isProd = isActive('/productlist')
  const isEvent = isActive('/event')
  const isNew = isActive('/new')

  const avatar = authStore.user?.avatar_url || defaultAvatar
  const menu_open = ref(false)
  const isedu_dropdown = ref(false)
  const ismember_dropdown = ref(false)
  const dropdown_open = ref(false)
  const isNavHidden = ref(false)
  let lastScrollY = 0

  const checkAndRedirectToCart = (event) => {
    if (!authStore.isLoggedIn) {
      event.preventDefault()
      alert('請先登入以查看購物車內容！')
      router.push({ path: '/login', query: { redirect: '/cart' } })
    }
  }

  const logout = async () => {
    if (confirm('您確定要登出嗎？')) {
      const ok = await authStore.logout()
      if (ok) {
        menu_open.value = false
        router.push({ name: 'login' })
      } else {
        alert('登出失敗')
      }
    }
  }

  const toggle_menu = () => {
    menu_open.value = !menu_open.value
  }
  const change_ham_icon = computed(() => {
    if (menu_open.value) {
      document.body.style.overflow = 'hidden'
      return 'fa-solid fa-xmark'
    } else {
      document.body.style.overflow = 'auto'
      return 'fa-solid fa-bars'
    }
  })
  const open_edu_dropdown = () => {
    if (window.innerWidth >= 768) {
      isedu_dropdown.value = true
    }
  }
  const open_member_dropdown = () => {
    if (window.innerWidth >= 768) {
      ismember_dropdown.value = true
    }
  }
  const close_edu_dropdown = () => {
    if (window.innerWidth >= 768) {
      isedu_dropdown.value = false
    }
  }
  const close_member_dropdown = () => {
    if (window.innerWidth >= 768) {
      ismember_dropdown.value = false
    }
  }
  const edu_linkclick = () => {
    menu_open.value = false
    dropdown_open.value = false
  }
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
    <div id="navbar">
      <router-link to="/" @click="edu_linkclick">
        <img src="../../assets/images/logo.svg" alt="" id="logo" />
      </router-link>

      <nav id="desktop_nav">
        <div id="edu_dropdown" @mouseenter="open_edu_dropdown" @mouseleave="close_edu_dropdown">
          <router-link to="/edu" :class="{ 'router-link-active': isEdu }">教育</router-link>
          <transition name="slide-fade">
            <div v-if="isedu_dropdown" id="edu_dropdown_menu">
              <ul>
                <li>
                  <router-link to="/edu/species" @click="edu_linkclick">生物圖鑑</router-link>
                </li>
                <li><router-link to="/edu/causes" @click="edu_linkclick">滅絕原因</router-link></li>
                <li><router-link to="/edu/quiz" @click="edu_linkclick">知識測驗</router-link></li>
              </ul>
            </div>
          </transition>
        </div>
        <router-link to="/productlist" :class="{ 'router-link-active': isProd }">商品</router-link>
        <router-link to="/event" :class="{ 'router-link-active': isEvent }">活動</router-link>
        <router-link to="/new" :class="{ 'router-link-active': isNew }">最新消息</router-link>
        <router-link to="/about">關於我們</router-link>
        <router-link to="/cart" class="cart-icon" @click.prevent="checkAndRedirectToCart">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
        <a
          v-if="authStore.isLoggedIn"
          id="member"
          @mouseenter="open_member_dropdown"
          @mouseleave="close_member_dropdown"
        >
          <img :src="avatar" alt="User Avatar" id="user_avatar" />
          <transition name="slide-fade">
            <div v-if="ismember_dropdown" id="member_dropdown_menu">
              <ul>
                <li>
                  <router-link to="/member" @click="edu_linkclick">會員專區</router-link>
                </li>
                <li><a @click="logout" style="cursor: pointer">登出</a></li>
              </ul>
            </div>
          </transition>
        </a>
        <router-link v-else to="/login">
          <Button variant="transparent">會員登入</Button>
        </router-link>
      </nav>
      <nav id="mobile_nav">
        <router-link v-if="authStore.isLoggedIn" to="/member" @click="edu_linkclick">
          <img :src="avatar" alt="User Avatar" id="user_avatar" />
        </router-link>
        <router-link v-else to="/login" @click="edu_linkclick">
          <i class="fa-solid fa-user"></i>
        </router-link>
        <router-link to="/cart" class="cart-icon" @click.prevent="checkAndRedirectToCart">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
        <i :class="change_ham_icon" @click="toggle_menu"></i>
      </nav>
    </div>
    <transition name="fade">
      <div v-if="menu_open" id="md_menu">
        <ul>
          <div id="md_edu_dropdown">
            <router-link to="/edu" @click="edu_linkclick" :class="{ 'router-link-active': isEdu }">
              教育
            </router-link>
            <i :class="dropdown_arrow" @click="toggle_dropdown"></i>
          </div>
          <ul v-if="dropdown_open">
            <li><router-link to="/edu/species" @click="edu_linkclick">生物圖鑑</router-link></li>
            <li><router-link to="/edu/causes" @click="edu_linkclick">滅絕原因</router-link></li>
            <li><router-link to="/edu/quiz" @click="edu_linkclick">知識測驗</router-link></li>
          </ul>
          <router-link
            to="/productlist"
            @click="edu_linkclick"
            :class="{ 'router-link-active': isProd }"
          >
            商品
          </router-link>
          <router-link
            to="/event"
            @click="edu_linkclick"
            :class="{ 'router-link-active': isEvent }"
          >
            活動
          </router-link>
          <router-link to="/new" @click="edu_linkclick" :class="{ 'router-link-active': isNew }">
            最新消息
          </router-link>
          <router-link to="/about" @click="edu_linkclick">關於我們</router-link>
          <router-link to="/member" v-show="authStore.isLoggedIn" @click="edu_linkclick">
            會員中心
          </router-link>
          <a @click="logout" v-show="authStore.isLoggedIn" style="border: 0px">登出</a>
          <router-link to="/login" v-show="!authStore.isLoggedIn" @click="edu_linkclick">
            登入會員
          </router-link>
        </ul>
      </div>
    </transition>
  </header>
  <div id="navbar_placeholder"></div>
</template>

<style scoped lang="scss">
  #user_avatar {
    width: 40px;
    vertical-align: middle;
    @include respond(md) {
      width: 30px;
    }
  }
  Button {
    color: v.$color-orange !important;
  }
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
    z-index: 1001;
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
          &.router-link-active {
            color: v.$color-skyblue;
          }
        }
        #member {
          display: flex;
          align-items: center;
          position: relative;
          height: 100%;
          #member_dropdown_menu {
            position: absolute;
            right: 0;
            top: 70px;
            z-index: 1001;
            background-color: v.$color-blue;
            li {
              min-width: 100%;
              padding: 5px 20px;
              white-space: nowrap;
            }
          }
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
            background-color: v.$color-blue;
            a {
              width: 100%;
              padding: 5px 20px;
              white-space: nowrap;
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
    height: calc(100vh - 84px);
    z-index: 1000;

    & > ul {
      margin: 0px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      li {
        a {
          color: #fff;
          text-decoration-line: none;
          padding-left: 3em;
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
        &.router-link-active {
          color: v.$color-skyblue;
        }
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
