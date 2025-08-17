<template>
  <div class="auth-page wrapper">
    <div class="background-overlay"></div>

    <main class="auth-main">
      <div class="welcome-section">
        <h1 class="welcome-title" :class="{ 'is-hidden': currentMode === 'forgotPassword' }">
          {{ currentMode === 'login' ? 'Welcome' : 'Join us !' }}
        </h1>

        <div class="diver-container">
          <img src="@/assets/images/member-system/diver.png" alt="Scuba Diver" class="diver-img" />
          <img
            src="@/assets/images/member-system/bubble.png"
            alt="bubble"
            class="bubble bubble-1"
          />
          <img
            src="@/assets/images/member-system/bubble.png"
            alt="bubble"
            class="bubble bubble-2"
          />
          <img
            src="@/assets/images/member-system/bubble.png"
            alt="bubble"
            class="bubble bubble-3"
          />
          <img
            src="@/assets/images/member-system/bubble.png"
            alt="bubble"
            class="bubble bubble-4"
          />
          <img
            src="@/assets/images/member-system/bubble.png"
            alt="bubble"
            class="bubble bubble-5"
          />
        </div>
      </div>

      <div class="form-section">
        <transition name="fade" mode="out-in">
          <!-- 登入表單 -->
          <div v-if="currentMode === 'login'" key="login">
            <h2>登入</h2>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="login-username">帳號</label>
                <input
                  type="text"
                  id="login-username"
                  v-model="username"
                  :class="{ 'has-error': usernameError }"
                  @input="clearError('username')"
                  autocomplete="username"
                />
                <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
              </div>
              <div class="form-group">
                <label for="login-password">密碼</label>
                <div class="password-wrapper">
                  <input
                    :type="passwordFieldType"
                    id="login-password"
                    v-model="password"
                    :class="{ 'has-error': passwordError }"
                    @input="clearError('password')"
                    autocomplete="current-password"
                  />
                  <span class="toggle-password" @click="togglePasswordVisibility">
                    <i
                      :class="passwordFieldType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </span>
                </div>
                <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
              </div>
              <div class="form-options-login">
                <label class="remember-me">
                  <input type="checkbox" v-model="rememberMe" />
                  記住我
                </label>
                <a href="#" class="forgot-password" @click.prevent="changeMode('forgotPassword')">
                  忘記密碼？
                </a>
              </div>
              <button type="submit" class="btn-submit">登入</button>
            </form>
            <div class="switch-mode-link">
              還沒有帳戶嗎?
              <a @click="changeMode('register')">立即註冊</a>
            </div>
            <div class="social-login-wrapper">
              <div class="social-login-divider"><span class="sub-text">或其他方式</span></div>
              <div class="social-login-icons">
                <a href="#" class="social-icon google"><i class="fab fa-google"></i></a>
                <a href="#" class="social-icon line"><i class="fab fa-line"></i></a>
                <a href="#" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>
              </div>
            </div>
          </div>

          <!-- 註冊表單 -->
          <div v-else-if="currentMode === 'register'" key="register">
            <h2>註冊</h2>
            <form @submit.prevent="handleRegister">
              <div class="form-group">
                <label for="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  :class="{ 'has-error': nameError }"
                  @input="clearError('name')"
                />
                <div v-if="nameError" class="error-message">{{ nameError }}</div>
              </div>
              <div class="form-group">
                <label for="gender">性別</label>
                <select
                  id="gender"
                  v-model="gender"
                  :class="{ 'has-error': genderError }"
                  @change="clearError('gender')"
                >
                  <option value="" disabled>請選擇性別</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">不透露</option>
                </select>
                <div v-if="genderError" class="error-message">{{ genderError }}</div>
              </div>
              <div class="form-group">
                <label for="register-email">電子郵件</label>
                <input
                  type="email"
                  id="register-email"
                  v-model="email"
                  :class="{ 'has-error': emailError }"
                  @input="clearError('email')"
                />
                <div v-if="emailError" class="error-message">{{ emailError }}</div>
              </div>
              <div class="form-group">
                <label for="register-username">帳號</label>
                <input
                  type="text"
                  id="register-username"
                  v-model="username"
                  :class="{ 'has-error': usernameError }"
                  @input="clearError('username')"
                />
                <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
              </div>
              <div class="form-group">
                <label for="register-password">密碼 (至少6個字元)</label>
                <div class="password-wrapper">
                  <input
                    :type="passwordFieldType"
                    id="register-password"
                    v-model="password"
                    :class="{ 'has-error': passwordError }"
                    @input="clearError('password')"
                  />
                  <span class="toggle-password" @click="togglePasswordVisibility">
                    <i
                      :class="passwordFieldType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </span>
                </div>
                <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
              </div>
              <div class="form-group">
                <label for="register-password-confirm">確認密碼</label>
                <div class="password-wrapper">
                  <input
                    :type="passwordFieldType"
                    id="register-password-confirm"
                    v-model="passwordConfirm"
                    :class="{ 'has-error': passwordConfirmError }"
                    @input="clearError('passwordConfirm')"
                  />
                </div>
                <div v-if="passwordConfirmError" class="error-message">
                  {{ passwordConfirmError }}
                </div>
              </div>
              <div class="terms-agreement">
                <label class="remember-me">
                  <input type="checkbox" v-model="termsAccepted" />
                  <span class="sub-text">我已閱讀並同意服務條款與隱私政策</span>
                </label>
              </div>
              <button type="submit" class="btn-submit">註冊</button>
            </form>
            <div class="login-link">
              已有帳戶？
              <a @click="changeMode('login')">請在此登入</a>
            </div>
            <div class="social-login-wrapper">
              <div class="social-login-divider"><span class="sub-text">或其他方式</span></div>
              <div class="social-login-icons">
                <a href="#" class="social-icon google"><i class="fab fa-google"></i></a>
                <a href="#" class="social-icon line"><i class="fab fa-line"></i></a>
                <a href="#" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>
              </div>
            </div>
          </div>

          <!-- 忘記密碼表單 -->
          <div v-else key="forgotPassword">
            <h2>忘記密碼</h2>
            <p class="form-subtitle">密碼重設信將寄至您的信箱</p>
            <form @submit.prevent="handleForgotPassword">
              <div class="form-group">
                <label for="forgot-email">電子郵件</label>
                <input
                  type="email"
                  id="forgot-email"
                  v-model="email"
                  :class="{ 'has-error': emailError }"
                  @input="clearError('email')"
                />
                <div v-if="emailError" class="error-message">{{ emailError }}</div>
              </div>
              <button type="submit" class="btn-submit">確認</button>
            </form>
            <a class="back-to-login-link" @click="changeMode('login')">回登入</a>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import axios from 'axios'

  const router = useRouter()
  const authStore = useAuthStore()

  const API_BASE_URL = import.meta.env.VITE_API_BASE

  const currentMode = ref('login')
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const passwordFieldType = ref('password')
  const name = ref('')
  const gender = ref('')
  const termsAccepted = ref(false)
  const rememberMe = ref(false)

  const usernameError = ref('')
  const nameError = ref('')
  const genderError = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const passwordConfirmError = ref('')

  onMounted(() => {
    const storedUsername = localStorage.getItem('rememberedUsername')
    if (storedUsername) {
      username.value = storedUsername
      rememberMe.value = true
    }
  })

  const clearAllErrors = () => {
    usernameError.value = ''
    nameError.value = ''
    genderError.value = ''
    emailError.value = ''
    passwordError.value = ''
    passwordConfirmError.value = ''
  }

  const clearError = (field) => {
    if (field === 'username') usernameError.value = ''
    if (field === 'name') nameError.value = ''
    if (field === 'gender') genderError.value = ''
    if (field === 'email') emailError.value = ''
    if (field === 'password') passwordError.value = ''
    if (field === 'passwordConfirm') passwordConfirmError.value = ''
  }

  const changeMode = (mode) => {
    currentMode.value = mode
    username.value = ''
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
    name.value = ''
    gender.value = ''
    termsAccepted.value = false
    rememberMe.value = false
    clearAllErrors()
  }

  const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  const handleLogin = async () => {
    clearAllErrors()
    if (!username.value || !password.value) {
      if (!username.value) usernameError.value = '請輸入帳號'
      if (!password.value) passwordError.value = '請輸入密碼'
      return
    }

    const payload = {
      username: username.value,
      password: password.value,
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/members/login.php`, payload)

      if (rememberMe.value) {
        localStorage.setItem('rememberedUsername', username.value)
      } else {
        localStorage.removeItem('rememberedUsername')
      }
      authStore.login(response.data.member)
      router.push({ path: '/member' })
    } catch (error) {
      if (error.response) {
        console.error('後端回應錯誤:', error.response.data.error)
        alert(error.response.data.error)
      } else if (error.request) {
        console.error('請求錯誤:', error.request)
        alert('登入失敗，伺服器無回應。')
      } else {
        console.error('前端設定錯誤:', error.message)
        alert('登入失敗，請檢查前端設定。')
      }
    }
  }

  const handleRegister = async () => {
    clearAllErrors()
    let isValid = true

    if (!username.value) {
      usernameError.value = '請輸入帳號'
      isValid = false
    }

    if (!name.value) {
      nameError.value = '請輸入姓名'
      isValid = false
    }
    if (!gender.value) {
      genderError.value = '請選擇性別'
      isValid = false
    }
    if (!email.value) {
      emailError.value = '請輸入電子郵件'
      isValid = false
    }

    if (!password.value) {
      passwordError.value = '請輸入密碼'
      isValid = false
    } else if (password.value.length < 6) {
      passwordError.value = '密碼長度不能少於6個字元'
      isValid = false
    }

    if (password.value !== passwordConfirm.value) {
      passwordConfirmError.value = '兩次輸入的密碼不一致'
      isValid = false
    }

    if (!isValid) return

    if (!termsAccepted.value) {
      alert('請先閱讀並同意服務條款與隱私政策')
      return
    }

    const payload = {
      username: username.value,
      name: name.value,
      gender: gender.value,
      email: email.value,
      password: password.value,
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/members/register.php`, payload)
      alert(response.data.message)
      changeMode('login')
    } catch (error) {
      if (error.response) {
        console.error('後端回應錯誤:', error.response.data.error)
        alert(error.response.data.error)
      } else if (error.request) {
        console.error('請求錯誤:', error.request)
        alert('註冊失敗，伺服器無回應。')
      } else {
        console.error('前端設定錯誤:', error.message)
        alert('註冊失敗，請檢查前端設定。')
      }
    }
  }

  const handleForgotPassword = () => {
    if (!email.value) {
      emailError.value = '請輸入電子郵件'
      return
    }
    console.log('Password reset requested for:', email.value)
    // alert('密碼重設信已寄出（此為展示訊息）')
    alert('密碼重設功能尚未開放')
  }

</script>

<style scoped lang="scss">
  /* 您的 SCSS 樣式碼維持不變，此處省略 */
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;
  @use 'sass:color';

  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  .auth-page {
    background-color: $color-bg-primary-dark;
    color: $color-text-white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    @include respond(md) {
      align-items: flex-start;
    }
  }
  .background-overlay {
    @include bg-layer-fixed-dark;
  }

  .auth-main {
    display: flex;
    width: 100%;
    max-width: $container;
    padding: 20px;
    gap: 100px;

    align-items: flex-start;
    justify-content: center;
    z-index: 5;
    margin-top: 5rem;
    margin-bottom: 8rem;

    @include respond(md) {
      margin-top: 0;
      margin-bottom: 2rem;
      gap: 0;
    }
  }

  .welcome-section {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .welcome-title {
      margin-bottom: 20px;
      font-family: 'Times New Roman', Times, serif;
      font-size: 48px;
      font-style: italic;

      transition: visibility 0.2s ease;
    }

    .welcome-title.is-hidden {
      visibility: hidden;
    }

    @include respond(md) {
      display: none;
    }
  }

  .diver-container {
    position: relative;
    width: 450px;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: floatAnimation 5s ease-in-out infinite;
    .diver-img {
      max-width: 100%;
      transform: scaleX(-1);
      position: relative;
      z-index: 1;
    }
  }
  .bubble {
    position: absolute;
    z-index: 0;
  }
  .bubble-1 {
    width: 30px;
    top: 115px;
    left: -100px;
  }
  .bubble-2 {
    width: 20px;
    top: 205px;
    left: -20px;
  }
  .bubble-3 {
    width: 25px;
    top: 340px;
    left: -60px;
  }
  .bubble-4 {
    width: 22px;
    top: 365px;
    left: 295px;
  }
  .bubble-5 {
    width: 15px;
    top: 280px;
    left: 365px;
  }

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .form-section {
    width: 400px;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    padding: 3rem 0;

    @include respond(md) {
      padding: 2rem 0;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 22px;

      label {
        display: block;
        margin-bottom: 8px;
        color: $color-text-white;
        font-family: $font-sans;
        font-size: $p-desktop;
        @include respond(md) {
          font-size: $p-mobile;
        }
      }
      input:not([type='checkbox']),
      select {
        width: 100%;
        padding: 12px 15px;
        background-color: $color-white;
        border: $border-hairline solid $border-color-gray;
        border-radius: $border-radius-md;
        font-size: $p-desktop;
        color: $color-black;
        &.has-error {
          border-color: $color-yellow;
        }
      }
      select {
        appearance: none;
      }
      .error-message {
        color: $color-yellow;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        left: 0;
        padding-top: 4px;
      }
    }
    input[type='checkbox'] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: $border-hairline solid $color-gray;
      border-radius: $border-radius-sm;
      background-color: $color-white;
      position: relative;
      cursor: pointer;
      flex-shrink: 0;
      margin-right: 8px;
      &:checked {
        background-color: $color-accent;
        border-color: $color-accent;
        &::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 4px;
          height: 9px;
          border: solid $color-bg-primary-dark;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }
    .password-wrapper {
      position: relative;
      .toggle-password {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        cursor: pointer;
        color: $color-gray;
      }
    }
    .remember-me {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .form-options-login {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .forgot-password {
        color: $color-text-white;
        text-decoration: none;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .terms-agreement {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 30px;
    }

    .btn-submit {
      width: 100%;
      padding: 15px;
      background-color: $color-yellow;
      border: none;
      border-radius: $border-radius-md;
      color: $color-white;
      font-size: $p-desktop;
      font-weight: $font-bold;
      cursor: pointer;
      &:hover {
        background-color: $color-yellow-hover;
      }
    }

    .switch-mode-link,
    .login-link {
      text-align: center;
      margin-top: 30px;
      a {
        color: $color-text-highlight;
        text-decoration: none;
        font-weight: $font-bold;
        cursor: pointer;
        margin-left: 5px;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .form-subtitle {
      text-align: center;
      color: $color-text-sub;
      margin-bottom: 30px;
    }
    .back-to-login-link {
      display: block;
      text-align: center;
      margin-top: 30px;
      color: $color-text-white;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    .social-login-wrapper {
      margin-top: auto;
      padding-top: 30px;
    }
    .social-login-divider {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
      &::before,
      &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background-color: $color-text-sub;
      }
    }
    .social-login-icons {
      display: flex;
      justify-content: center;
      gap: 20px;
      .social-icon {
        font-size: 24px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: $color-white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        transition: filter 0.3s;
        &:hover {
          filter: brightness(0.9);
        }
        &.google {
          background-color: #db4437;
        }
        &.line {
          background-color: #00b900;
        }
        &.facebook {
          background-color: #1877f2;
        }
      }
    }

    .input-with-button {
      position: relative;

      input {
        width: 100%;
        padding-right: 140px;
      }

      .btn-verify {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        padding: 8px 12px;
        background-color: $color-white;
        border: $border-hairline solid $border-color-gray;
        border-radius: $border-radius-sm;
        font-size: $sub-desktop;
        color: $color-black;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
          background-color: color.adjust($color-white, $lightness: -5%);
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
