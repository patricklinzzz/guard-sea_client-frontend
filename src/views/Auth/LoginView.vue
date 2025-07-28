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
          <div v-if="currentMode === 'login'" key="login">
            <h2>登入</h2>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="login-email">電子郵件</label>
                <input type="email" id="login-email" v-model="email" required />
              </div>
              <div class="form-group">
                <label for="login-password">密碼</label>
                <div class="password-wrapper">
                  <input
                    :type="passwordFieldType"
                    id="login-password"
                    v-model="password"
                    required
                  />
                  <span class="toggle-password" @click="togglePasswordVisibility">
                    <i
                      :class="passwordFieldType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </span>
                </div>
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

          <div v-else-if="currentMode === 'register'" key="register">
            <h2>註冊</h2>
            <form @submit.prevent="handleRegister">
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="name" required />
              </div>
              <div class="form-group">
                <label for="gender">性別</label>
                <input type="text" id="gender" v-model="gender" required />
              </div>
              <div class="form-group">
                <label for="register-email">電子郵件</label>
                <div class="input-with-button">
                  <input type="email" id="register-email" v-model="email" required />
                  <button type="button" class="btn-verify" @click="sendVerificationCode">
                    發送驗證碼
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="register-password">密碼</label>
                <div class="password-wrapper">
                  <input
                    :type="passwordFieldType"
                    id="register-password"
                    v-model="password"
                    required
                  />
                  <span class="toggle-password" @click="togglePasswordVisibility">
                    <i
                      :class="passwordFieldType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </span>
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
                  required
                  placeholder="電子郵件"
                />
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
  import { ref } from 'vue'

  const currentMode = ref('login')
  const email = ref('')
  const password = ref('')
  const passwordFieldType = ref('password')
  const name = ref('')
  const gender = ref('')
  const termsAccepted = ref(false)
  const rememberMe = ref(false)

  const changeMode = (mode) => {
    currentMode.value = mode
    email.value = ''
    password.value = ''
    name.value = ''
    gender.value = ''
    termsAccepted.value = false
    rememberMe.value = false
  }

  const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  const handleLogin = () => {
    console.log('Logging in with:', email.value, password.value, rememberMe.value)
    alert('登入功能僅為展示')
  }

  const handleRegister = () => {
    if (!termsAccepted.value) {
      alert('請先閱讀並同意服務條款與隱私政策')
      return
    }
    console.log('Registering with:', name.value, gender.value, email.value, password.value)
    alert('註冊功能僅為展示')
  }

  const handleForgotPassword = () => {
    console.log('Password reset requested for:', email.value)
    alert('密碼重設信已寄出（此為展示訊息）')
  }

  const sendVerificationCode = () => {
    console.log('Sending verification code to:', email.value)
    alert('哈哈不給你')
  }
</script>

<style scoped lang="scss">
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
    min-height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
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
      input:not([type='checkbox']) {
        width: 100%;
        padding: 12px 15px;
        background-color: $color-white;
        border: $border-hairline solid $border-color-gray;
        border-radius: $border-radius-md;
        font-size: $p-desktop;
        color: $color-black;
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
