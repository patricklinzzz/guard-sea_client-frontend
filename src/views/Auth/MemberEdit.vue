<template>
  <div class="member_page wrapper">
    <div class="member_container">
      <aside class="member_sidebar">
        <div class="user_profile_card">
          <h3 class="greeting">Hi Jay~</h3>
          <div class="avatar">
            <img src="@/assets/images/member-system/head.png" alt="User Avatar" />
          </div>
        </div>
        <nav class="member_nav">
          <ul>
            <li><a href="#" class="nav_link is_active">編輯會員資料</a></li>
            <li><a href="#" class="nav_link">密碼修改</a></li>
            <li><a href="#" class="nav_link">訂單查詢</a></li>
            <li><a href="#" class="nav_link">活動查詢</a></li>
            <li><a href="#" class="nav_link">優惠券</a></li>
            <li><a href="#" class="nav_link">登出</a></li>
          </ul>
        </nav>
      </aside>

      <main class="member_content">
        <div class="content_header">
          <h1>會員專區</h1>
        </div>
        <div class="content_body">
          <h3>編輯會員資料</h3>
          <form @submit.prevent="handleProfileUpdate">
            <div class="avatar_editor">
              <img
                src="@/assets/images/member-system/head.png"
                alt="Avatar"
                class="avatar_placeholder"
              />
              <button type="button" class="edit_avatar_btn">
                <i class="fas fa-pencil-alt"></i>
              </button>
            </div>

            <div class="form_grid">
              <div class="form_group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="formData.name" />
              </div>
              <div class="form_group">
                <label for="email">電子郵件</label>
                <input type="email" id="email" v-model="formData.email" disabled />
              </div>
              <div class="form_group">
                <label for="phone">手機號碼</label>
                <input type="tel" id="phone" v-model="formData.phone" />
              </div>
              <div class="form_group">
                <label for="gender">性別</label>
                <input type="text" id="gender" v-model="formData.gender" />
              </div>
              <div class="form_group">
                <label for="address">地址</label>
                <input type="text" id="address" v-model="formData.address" />
              </div>
              <div class="form_group">
                <label for="birthdate">生日</label>
                <div class="input_with_icon">
                  <input
                    type="text"
                    id="birthdate"
                    v-model="formData.birthdate"
                    placeholder="年 / 月 / 日"
                  />
                  <i class="fas fa-calendar-alt"></i>
                </div>
              </div>
              <div class="form_group">
                <label for="password">密碼</label>
                <input
                  type="password"
                  id="password"
                  v-model="formData.password"
                  placeholder="********"
                  disabled
                />
              </div>

              <div class="form_actions">
                <button type="submit" class="btn btn_save">儲存變更</button>
                <button type="button" class="btn btn_cancel" @click="cancelChanges">
                  取消變更
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  let originalData = {}

  const formData = ref({
    name: 'Jay',
    email: 'jay123243@gmail.com',
    phone: '0900000000',
    gender: '男',
    address: '',
    birthdate: '',
    password: '********',
  })

  onMounted(() => {
    originalData = structuredClone(formData.value)
  })

  const handleProfileUpdate = () => {
    console.log('Updating profile:', formData.value)

    originalData = structuredClone(formData.value)
    alert('會員資料已儲存')
  }

  const cancelChanges = () => {
    formData.value = structuredClone(originalData)
    console.log('Changes cancelled and form has been reset.')
  }
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use '@/assets/style/typography';
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  $color-sidebar-bg: #f0f2f5;
  $color-sidebar-text: $color-black;

  .member_page {
    background-color: $color-bg-primary-dark;
    padding: 4rem 0;
    min-height: 100vh;

    @include respond(md) {
      padding: 2rem 0;
    }
  }

  .member_container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    gap: 30px;
    padding: 0 20px;

    @include respond(md) {
      flex-direction: column;
      gap: 20px;
      padding: 0 15px;
    }
  }

  .member_sidebar {
    flex: 0 0 260px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include respond(md) {
      flex: 1 1 100%;
      width: 100%;
    }
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
    background-color: $color-sidebar-bg;
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
      padding: 15px 20px;
      text-decoration: none;
      font-weight: 500;
      transition:
        background-color 0.3s,
        color 0.3s;

      background-color: transparent;
      color: $color-sidebar-text;
      font-size: $p-desktop;

      &:hover {
        background-color: $color-yellow;
        color: $color-text-white;
      }
      @include respond(md) {
        font-size: $p-mobile;
        padding: 12px 15px;
      }
    }
  }

  // Main Content
  .member_content {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;

    .content_header {
      padding: 20px 40px;
      border-bottom: $border-hairline solid #e0e0e0;

      h1 {
        margin: 0;
        color: $color-text-main;
        text-align: center;
      }
    }

    .content_body {
      padding: 30px 40px;

      h3 {
        color: $color-text-main;
        margin-bottom: 30px;
        text-align: center;
      }
    }

    @include respond(md) {
      .content_header,
      .content_body {
        padding: 20px;
      }
      .content_body h3 {
        font-size: $h3-mobile;
      }
    }
  }

  .avatar_editor {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 40px;

    .avatar_placeholder {
      width: 100%;
      height: 100%;
      border-radius: $border-radius-round;
      object-fit: cover;
    }

    .edit_avatar_btn {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 36px;
      height: 36px;
      background-color: $color-blue;
      color: $color-white;
      border-radius: $border-radius-round;
      border: 2px solid $color-white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: $color-blue-dark;
      }
    }
  }

  form {
    max-width: 450px;
    margin: 0 auto;

    .form_grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      @include respond(md) {
        gap: 15px;
      }
    }

    .form_group {
      label {
        display: block;
        margin-bottom: 8px;
        color: $color-text-main;
        font-size: $p-desktop;
        @include respond(md) {
          font-size: $p-mobile;
        }
      }

      input:not([type='checkbox']) {
        width: 100%;
        height: $input-height-desktop;
        padding: 0 15px;
        background-color: $color-white;
        border: $border-base solid $border-color-gray;
        border-radius: $border-radius-sm;
        font-size: $p-desktop;
        color: $color-black;

        &:disabled {
          background-color: #eee;
          cursor: not-allowed;
        }

        @include respond(md) {
          height: $input-height-mobile;
          font-size: $p-mobile;
        }
      }
    }

    .input_with_icon {
      position: relative;
      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        color: $color-gray;
      }
    }

    .form_actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-top: 25px;

      .btn {
        width: 100%;
        height: $button-height-desktop;
        border-radius: $border-radius-sm;
        color: $color-white;
        font-size: $p-desktop;
        font-weight: $font-bold;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn_save {
        background-color: $color-orange;
        border: none;
        &:hover {
          background-color: $color-orange-hover;
        }
      }

      .btn_cancel {
        background-color: $color-yellow;
        border: none;
        &:hover {
          background-color: $color-yellow-hover;
        }
      }

      @include respond(md) {
        .btn {
          height: $button-height-mobile;
          font-size: $p-mobile;
        }
      }
    }
  }
</style>
