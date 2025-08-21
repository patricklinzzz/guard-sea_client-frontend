<template>
  <div class="member_page wrapper">
    <div class="member_container">
      <aside class="member_sidebar">
        <div class="user_profile_card">
          <h3 class="greeting">Hi {{ user_name }}~</h3>
          <div class="avatar">
            <img :src="avatar" alt="User Avatar" />
          </div>
        </div>
        <nav class="member_nav">
          <ul>
            <li>
              <router-link class="nav_link" :to="{ name: 'MemberEdit' }">編輯會員資料</router-link>
            </li>

            <li>
              <router-link class="nav_link" :to="{ name: 'MemberEditPwd' }">密碼修改</router-link>
            </li>
            <li>
              <router-link class="nav_link" :to="{ name: 'MemberOrders' }">訂單查詢</router-link>
            </li>
            <li>
              <router-link class="nav_link" :to="{ name: 'MemberEvents' }">活動查詢</router-link>
            </li>
            <li>
              <router-link class="nav_link" :to="{ name: 'MemberCoupons' }">優惠券</router-link>
            </li>

            <li>
              <button @click="logout" class="nav_link nav_action_logout">登出</button>
            </li>
          </ul>
        </nav>
      </aside>

      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import defaultAvatar from '@/assets/images/member-system/avatar.svg'

  const authStore = useAuthStore()
  const router = useRouter()

  const logout = async () => {
    if (confirm('您確定要登出嗎？')) {
      const ok = await authStore.logout()
      if (ok) {
        router.push({ name: 'login' })
      } else {
        alert('登出失敗')
      }
    }
  }

  const user_name = authStore.user.fullname
  const avatar = authStore.user?.avatar_url || defaultAvatar
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use '@/assets/style/typography';

  .wrapper::before {
    @include bg-layer-fixed-dark;
  }

  .member_page {
    background-color: $color-bg-primary-dark;
    padding: 4rem 0;
    min-height: 100vh;
  }

  .member_container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    gap: 30px;
    padding: 0 20px;
  }

  .member_sidebar {
    flex: 0 0 260px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .user_profile_card {
    background-color: $color-bg-light;
    padding: 20px;
    border-radius: $border-radius-md;
    text-align: center;
    .greeting {
      @extend h3;
      color: $color-text-main;
      margin-bottom: 15px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: $border-radius-round;
      overflow: hidden;
      margin: 0 auto;
      border: 2px solid $color-white;
      box-shadow: $shadow-sm;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .member_nav {
    background-color: #f0f2f5;
    border-radius: $border-radius-md;
    overflow: hidden;
    padding: 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .nav_link {
      display: block;
      width: 100%;
      padding: 15px 20px;
      text-decoration: none;
      font-weight: 500;
      transition:
        background-color 0.3s,
        color 0.3s;
      background-color: transparent;
      color: #333333;
      font-size: $p-desktop;
      border: none;
      text-align: left;
      cursor: pointer;

      &:hover {
        background-color: $color-yellow;
        color: $color-text-white;
      }
      &.router-link-exact-active {
        background-color: $color-yellow;
        color: $color-text-white;
      }
    }

    .nav_action_logout {
      &:hover {
        background-color: transparent;
        color: $color-text-main;
      }
    }
  }

  @include respond(md) {
    .member_page {
      padding: 2rem 0;
    }
    .member_container {
      flex-direction: column;
      gap: 20px;
      padding: 0 15px;
    }
    .member_sidebar {
      flex: 1 1 100%;
      width: 100%;
    }
    .member_nav .nav_link {
      font-size: $p-mobile;
      padding: 12px 15px;
    }
  }
</style>
