<template>
  <main class="member_content">
    <div class="content_header">
      <h1>會員專區</h1>
    </div>
    <div class="content_body">
      <h3>密碼修改</h3>
      <form @submit.prevent="handlePasswordUpdate">
        <div class="form_group">
          <label for="old_password">舊密碼</label>
          <input type="password" id="old_password" v-model="passwordData.oldPassword" />
        </div>
        <div class="form_group">
          <label for="new_password">修改密碼</label>
          <input type="password" id="new_password" v-model="passwordData.newPassword" />
        </div>
        <div class="form_group">
          <label for="confirm_password">請再次輸入新密碼</label>
          <input type="password" id="confirm_password" v-model="passwordData.confirmPassword" />
        </div>
        <div class="form_actions">
          <button type="submit" class="btn btn_save">儲存變更</button>
          <button type="button" class="btn btn_cancel" @click="resetForm">取消變更</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue'

  const passwordData = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handlePasswordUpdate = () => {
    if (!passwordData.value.oldPassword || !passwordData.value.newPassword) {
      alert('請填寫所有欄位！')
      return
    }
    if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
      alert('新密碼與確認密碼不相符！')
      return
    }
    console.log('正在更新密碼:', passwordData.value)
    alert('密碼已成功修改！')
    resetForm()
  }

  const resetForm = () => {
    passwordData.value.oldPassword = ''
    passwordData.value.newPassword = ''
    passwordData.value.confirmPassword = ''
  }
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use '@/assets/style/typography';

  .member_content {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;
  }
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
  form {
    max-width: 450px;
    margin: 0 auto;
  }
  .form_group {
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 8px;
      color: $color-text-main;
      font-size: $p-desktop;
    }
    input {
      width: 100%;
      height: $input-height-desktop;
      padding: 0 15px;
      background-color: $color-white;
      border: $border-base solid $border-color-gray;
      border-radius: $border-radius-sm;
      font-size: $p-desktop;
      color: $color-black;
      &::placeholder {
        color: $color-gray;
      }
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
      border: none;
    }
    .btn_save {
      background-color: $color-orange;
      &:hover {
        background-color: $color-orange-hover;
      }
    }
    .btn_cancel {
      background-color: $color-yellow;
      &:hover {
        background-color: $color-yellow-hover;
      }
    }
  }
  @include respond(md) {
    .member_content {
      width: 100%;
    }
    .content_header,
    .content_body {
      padding: 20px;
    }
    .content_body h3 {
      font-size: $h3-mobile;
    }
    .form_group {
      label {
        font-size: $p-mobile;
      }
      input {
        height: $input-height-mobile;
        font-size: $p-mobile;
      }
    }
    .form_actions .btn {
      height: $button-height-mobile;
      font-size: $p-mobile;
    }
  }
</style>
