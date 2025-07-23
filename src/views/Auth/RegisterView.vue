<template>
  <div class="register-page">
    <div class="background-overlay"></div>

    <main class="register-main">
      <div class="welcome-section">
        <h1>Join us !</h1>
        <div class="diver-container">
          <img src="@/assets/images/member-system/diver.png" alt="Scuba Diver" class="diver-img">
          
    
          <img src="@/assets/images/member-system/bubble.png" alt="bubble" class="bubble bubble-1" />
          <img src="@/assets/images/member-system/bubble.png" alt="bubble" class="bubble bubble-2" />
          <img src="@/assets/images/member-system/bubble.png" alt="bubble" class="bubble bubble-3" />
          <img src="@/assets/images/member-system/bubble.png" alt="bubble" class="bubble bubble-4" />
          <img src="@/assets/images/member-system/bubble.png" alt="bubble" class="bubble bubble-5" />
        </div>
      </div>

      <div class="form-section">
        <h2>註冊</h2>
        <form @submit.prevent="handleRegister">
          
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="name" required>
          </div>

          <div class="form-group">
            <label for="gender">性別</label>
            <select id="gender" v-model="gender" required>
              <option disabled value="">請選擇</option>
              <option>男</option>
              <option>女</option>
              <option>不透露</option>
            </select>
          </div>

          <div class="form-group">
            <label for="email">電子郵件</label>
            <div class="input-with-button">
              <input type="email" id="email" v-model="email" required>
              <button type="button" class="btn-verify">發送驗證碼</button>
            </div>
          </div>

          <div class="form-group">
            <label for="password">密碼</label>
            <div class="password-wrapper">
              <input :type="passwordFieldType" id="password" v-model="password" required>
              <span class="toggle-password" @click="togglePasswordVisibility">
                <i :class="passwordFieldType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span>
            </div>
          </div>

          <div class="form-options terms-agreement">
            <label class="remember-me">
              <input type="checkbox" v-model="termsAccepted">
              我已閱讀並同意服務條款與隱私政策
            </label>
          </div>

          <button type="submit" class="btn-submit">註冊</button>
        </form>

        <div class="login-link">
          已有帳戶？ <a href="#">請在此登入。</a>
        </div>

        <div class="social-login-divider">
          <span>或其他方式註冊</span>
        </div>
        <div class="social-login-icons">
          <a href="#" class="social-icon google"><i class="fab fa-google"></i></a>
          <a href="#" class="social-icon line"><i class="fab fa-line"></i></a>
          <a href="#" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const name = ref('');
const gender = ref('');
const email = ref('');
const password = ref('');
const termsAccepted = ref(false);

const passwordFieldType = ref('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const handleRegister = () => {
  if (!termsAccepted.value) {
    alert('請先閱讀並同意服務條款與隱私政策');
    return;
  }
  console.log('Registering with:', {
    name: name.value,
    gender: gender.value,
    email: email.value,
    password: password.value,
    terms: termsAccepted.value
  });
  alert('註冊功能僅為展示');
};
</script>

<style scoped lang="scss">
@use '@/assets/style/variables' as *;
@use '@/assets/style/mixins' as *;

.register-page {
  background-color: $color-bg-primary-dark;
  color: $color-text-white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: $font-sans;
}

.background-overlay {
  @include bg-layer-fixed-dark;
  background: radial-gradient(circle, #ffffff0d 0%, rgba(255, 255, 255, 0) 60%);
}

.register-main {
  display: flex;
  width: 100%;
  max-width: $container;
  padding: 20px;
  gap: 100px;
  align-items: center;
  justify-content: center;
  z-index: 5;

  @include respond(md) {
    flex-direction: column;
    gap: 20px;
  }
}

.welcome-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: $h1-desktop;
    font-family: $font-serif-tc;
    font-weight: $font-bold;
    letter-spacing: $letter-spacing-wide;
    line-height: $line-height-normal;
    margin-bottom: 20px;

    @include respond(md) {
      font-size: $h1-mobile;
    }
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
  bottom: 40px;
  left: 30px;

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
.bubble-1 { width: 30px; top: 115px; left: -100px; }
.bubble-2 { width: 20px; top: 205px; left: -20px; }
.bubble-3 { width: 25px; top: 340px; left: -60px; }
.bubble-4 { width: 22px; top: 365px; left: 295px; }
.bubble-5 { width: 15px; top: 280px; left: 365px; }

.form-section {
  width: 400px;
  max-width: 450px;

  h2 {
    font-size: $h1-desktop;
    font-family: $font-serif-tc;
    font-weight: $font-bold;
    letter-spacing: $letter-spacing-wide;
    line-height: $line-height-normal;
    text-align: center;
    margin-bottom: 30px;

    @include respond(md) {
      font-size: $h1-mobile;
    }
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-size: $p-desktop;
      font-family: $font-sans;
      color: $color-white;
      line-height: $line-height-relaxed;

      @include respond(md) {
        font-size: $p-mobile;
      }
    }

    input:not([type="checkbox"]), select {
      width: 100%;
      padding: 12px 15px;
      background-color: $color-white;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: $p-desktop;
      color: $color-black;
      box-sizing: border-box;
      font-family: inherit;

      @include respond(md) {
        font-size: $p-mobile;
      }
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
    }

    .input-with-button {
      position: relative;

      input {
        padding-right: 120px;
      }

      .btn-verify {
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        height: 32px;
        padding: 0 15px;
        background-color: $color-white;
        color: $color-black;
        border: 1px solid #ccc;
        border-radius: $border-radius-sm;
        cursor: pointer;
        font-size: $sub-desktop;

        &:hover {
          background-color: $color-gray-light;
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
  }

  .form-options {
    margin-bottom: 30px;
    text-align: center;
  }

  .remember-me {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    input[type="checkbox"] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 1px solid $color-gray;
      border-radius: 4px;
      background-color: $color-white;
      position: relative;
      cursor: pointer;

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
  }

  .btn-submit {
    width: 100%;
    padding: 15px;
    background-color: $color-accent;
    border: none;
    border-radius: $border-radius-md;
    color: $color-white;
    font-size: $p-desktop;
    font-weight: $font-bold;
    cursor: pointer;

    &:hover {
      background-color: $color-orange-hover;
    }

    @include respond(md) {
      font-size: $p-mobile;
    }
  }

 .login-link {
  text-align: center;
  margin: 20px 0;
  font-size: $p-desktop;
  color: $color-white;

  @include respond(md) {
    font-size: $p-mobile;
  }

  a {
    color: $color-white;
    text-decoration: none;
    font-weight: $font-bold;

    &:hover {
      text-decoration: underline;
    }
  }
}

  .social-login-divider {
    margin: 30px 0;
    display: flex;
    align-items: center;
    gap: 15px;

    .sub-text {
      font-size: $sub-desktop;
      color: $color-text-sub;

      @include respond(md) {
        font-size: $sub-mobile;
      }
    }

    &::before, &::after {
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

      &.google { background-color: #DB4437; }
      &.line { background-color: #00B900; }
      &.facebook { background-color: #1877F2; }
    }
  }

  @include respond(md) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.footer-wrapper::before {
  @include bg-layer-fixed-dark;
}
</style>
