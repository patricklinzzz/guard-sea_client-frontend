<template>
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
            <div class="select_wrapper">
              <select id="gender" v-model="formData.gender">
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="不指定">不指定</option>
              </select>
            </div>
          </div>
          <div class="form_group">
            <label for="address">地址</label>
            <input type="text" id="address" v-model="formData.address" />
          </div>

          <div class="form_group">
            <label for="birthdate">生日</label>
            <VueDatePicker
              id="birthdate"
              v-model="formData.birthdate"
              placeholder="年 / 月 / 日"
              format="yyyy/MM/dd"
              :max-date="new Date()"
              :enable-time-picker="false"
              auto-apply
              teleport-center
              :clearable="false"
            ></VueDatePicker>
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
            <button type="button" class="btn btn_cancel" @click="cancelChanges">取消變更</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

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
    originalData = JSON.parse(JSON.stringify(formData.value))
  })

  const handleProfileUpdate = () => {
    console.log('Updating profile:', formData.value)
    originalData = JSON.parse(JSON.stringify(formData.value))
    alert('會員資料已儲存')
  }

  const cancelChanges = () => {
    formData.value = JSON.parse(JSON.stringify(originalData))
    console.log('Changes cancelled and form has been reset.')
  }
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use '@/assets/style/typography';

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
      width: 100%;
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

      input:not([type='checkbox']),
      select {
        width: 100%;
        height: $input-height-desktop;
        padding: 0 15px;
        background-color: $color-white;
        border: $border-base solid $border-color-gray;
        border-radius: $border-radius-sm;
        font-size: $p-desktop;
        color: $color-black;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

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

    .select_wrapper {
      position: relative;

      &::after {
        content: '▼';
        font-size: 12px;
        color: $color-gray;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        pointer-events: none;
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

  :deep(.dp__input) {
    height: $input-height-desktop;
    border: $border-base solid $border-color-gray;
    border-radius: $border-radius-sm;
    font-size: $p-desktop;
    color: $color-black;
    background-color: $color-white;
    padding-left: 15px;

    &::placeholder {
      color: $color-gray;
      font-size: $p-desktop;
    }

    @include respond(md) {
      height: $input-height-mobile;
      font-size: $p-mobile;
      &::placeholder {
        font-size: $p-mobile;
      }
    }
  }

  :deep(.dp__input_icon) {
    left: auto;
    right: 0;
    padding: 0 12px;
    height: 100%;
  }

  :deep(.dp__clear_icon) {
    display: none;
  }
</style>
