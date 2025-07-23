<template>
  <div class="login-page">
    <div class="background-overlay"></div>

    <main class="login-main">
      <div class="welcome-section">
        <h1>Welcome !</h1>
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
        <h2>登入</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">電子郵件</label>
            <input type="email" id="email" v-model="email" required>
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
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              記住我
            </label>
            <a href="#" class="forgot-password">忘記密碼?</a>
          </div>
          <button type="submit" class="btn-login">登入</button>
        </form>
        <div class="social-login-divider">
          <span>或其他方式登入</span>
        </div>
        <div class="social-login-icons">
          <a href="#" class="social-icon google"><i class="fab fa-google"></i></a>
          <a href="#" class="social-icon line"><i class="fab fa-line"></i></a>
          <a href="#" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
         <div class="register-link">
            還沒有帳戶嗎? 還沒有帳戶嗎？<router-link to="/register">立即註冊</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const passwordFieldType = ref('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value, rememberMe.value);
  alert('登入功能僅為展示');
};
</script>

<style lang="scss" scoped>
$color-black: #333333;
$color-gray: #999999;
$primary-bg: #012038;
$accent-color: #F7AA2A;
$text-color: #FFFFFF;
$input-bg: #FFFFFF;
$input-text-color: $color-black;
$divider-color: $color-gray;

.login-page {
  background-color: $primary-bg;
  color: $text-color;
  min-height: 100vh;
  width: 100%;
  font-family: 'Helvetica Neue', 'Arial', '微軟正黑體', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #ffffff0d 0%, rgba(255, 255, 255, 0) 60%);
  pointer-events: none;
}

.login-main {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 5;
  gap: 100px;
}

.welcome-section {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 0;
  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
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

.form-section {
  flex: 0 0 auto;
  padding: 0;
  width: 400px;
  max-width: 450px;

  h2 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input:not([type="checkbox"]) {
    width: 100%;
    padding: 12px 15px;
    background-color: $input-bg;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    color: $input-text-color;
    box-sizing: border-box;
  }


  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid $divider-color;
    border-radius: 4px;
    background-color: $input-bg; 
    vertical-align: middle;
    cursor: pointer;
    margin: 0;
    position: relative;
    top: -1px;
    transition: all 0.2s;
  }

  input[type="checkbox"]:checked {
    background-color: $accent-color;
    border-color: $accent-color;
  }

  input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 4px;
    height: 9px;
    border: solid $primary-bg;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .password-wrapper {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: $color-gray;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 30px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
  }

  .forgot-password {
    color: $text-color;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .btn-login {
    width: 100%;
    padding: 15px;
    background-color: $accent-color;
    border: none;
    border-radius: 8px;
    color: $primary-bg;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: darken($accent-color, 10%);
    }
  }

  .social-login-divider {
    margin: 30px 0;
    text-align: center;
    color: $divider-color;
    display: flex;
    align-items: center;
    gap: 15px;
    &::before,
    &::after {
      content: '';
      flex-grow: 1;
      height: 1px;
      background-color: $divider-color;
    }
  }

  .register-link {
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
    a {
      color: $accent-color;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .social-login-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .social-icon {
    color: #FFFFFF;
    font-size: 24px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: filter 0.3s;
    border: none;
    &:hover {
      filter: brightness(0.9);
    }
  }

  .social-icon.google {
    background-color: #DB4437;
  }

  .social-icon.line {
    background-color: #00B900;
  }

  .social-icon.facebook {
    background-color: #1877F2;
  }

  @media (max-width: 320px) {
    padding: 0 20px;
    h2 {
      font-size: 28px;
    }
    .form-options {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .social-login-icons {
      gap: 15px;
    }
    .social-icon {
      width: 45px;
      height: 45px;
      font-size: 20px;
    }
  }
}

@media (max-width: 768px) {
  .welcome-section {
    display: none;
  }
}
</style>