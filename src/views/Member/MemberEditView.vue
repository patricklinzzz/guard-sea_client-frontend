<script setup>
  import { ref, onMounted } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import defaultAvatar from '@/assets/images/member-system/avatar.svg'
  import { useAuthStore } from '@/stores/auth'
  import axios from 'axios'

  const authStore = useAuthStore()
  const baseUrl = import.meta.env.VITE_API_BASE

  const user = authStore.user
  const formData = ref({
    avatar_url: user.avatar_url || defaultAvatar,
    name: user.fullname || '',
    email: user.email || '',
    phone: user.phone_number || '',
    gender: user.gender || '',
    address: user.address || '',
    birthdate: user.birthday || null,
  })

  let originalData = {}

  onMounted(() => {
    originalData = JSON.parse(JSON.stringify(formData.value))
  })

  const handleProfileUpdate = async () => {
    console.log('Updating profile:', formData.value)
    const formD = new FormData()
    formD.append('name', formData.value.name)
    formD.append('email', formData.value.email)
    formD.append('phone', formData.value.phone)
    formD.append('gender', formData.value.gender)
    formD.append('address', formData.value.address)
    formD.append('birthdate', formData.value.birthdate)
    if(uploaded_avatar.value){
      formD.append('avatar_url', uploaded_avatar.value)
    } 
    

    try {
      const apiUrl = `${baseUrl}/members/edit_member.php`
      const response = await axios.post(apiUrl, formD)
      console.log('edit successfully:', response.data)
    } catch (err) {
      console.error('Post Error:', err)
    }
    originalData = JSON.parse(JSON.stringify(formData.value))

    alert('會員資料已儲存')
  }

  const cancelChanges = () => {
    formData.value = JSON.parse(JSON.stringify(originalData))
    console.log('Changes cancelled and form has been reset.')
  }
  const avatar_input = ref(null)
  const uploaded_avatar = ref(null)
  const avatar_change = () => {
    avatar_input.value.click()
  }
  const file_change = (e) => {
    const files = e.target.files
    uploaded_avatar.value = files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      formData.value.avatar_url = e.target.result
    }

    reader.readAsDataURL(files[0])
  }
  const reset = () => {
    uploaded_avatar.value = 'reset'
    formData.value.avatar_url = defaultAvatar
  }
</script>

<template>
  <main class="member_content">
    <div class="content_header">
      <h1>會員專區</h1>
    </div>
    <div class="content_body">
      <h3>編輯會員資料</h3>
      <button @click="reset">reset</button>
      <form @submit.prevent="handleProfileUpdate">
        <div class="avatar_editor">
          
          <input
            ref="avatar_input"
            @change="file_change"
            accept="image/*"
            type="file"
            id="p_file"
          />
          <img :src="formData.avatar_url" alt="Avatar" class="avatar_placeholder" />
          <button type="button" @click="avatar_change" class="edit_avatar_btn">
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
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">不透露</option>
              </select>
            </div>
          </div>
          <div class="form_group">
            <label for="address">地址</label>
            <input type="text" id="address" v-model="formData.address" />
          </div>

          <div class="form_group">
            <label>
              生日
              <VueDatePicker
                id="birthdate"
                v-model="formData.birthdate"
                placeholder="年 / 月 / 日"
                format="yyyy/MM/dd"
                model-type="yyyy-MM-dd"
                :max-date="new Date()"
                :enable-time-picker="false"
                auto-apply
                teleport-center
                :clearable="false"
              ></VueDatePicker>
            </label>
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

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use '@/assets/style/typography';

  #p_file {
    display: none;
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
