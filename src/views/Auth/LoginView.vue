<template>
  <div class="login-page">
    <div class="background-overlay"></div>

    <main class="login-main">
      <div class="welcome-section">
        <h1>Welcome !</h1>
        <div class="diver-container">
          <img src="@/assets/images/member-system/diver.png" alt="Scuba Diver" class="diver-img">
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
          <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-line"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
        </div>
         <div class="register-link">
            還沒有帳戶嗎? <a href="#">立即註冊</a>
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');


$primary-bg: #0D2A40;
$accent-color: #FFC107;
$text-color: #FFFFFF;
$input-bg: #FFFFFF;
$input-text-color: #333;
$divider-color: #5A7A90;


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
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 60%);
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
}

.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-right: 5%;

  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px; 
  }
  
  .diver-container {
    position: relative;
    .diver-img {
      max-width: 450px;
      width: 100%;
    }
  }
}

.form-section {
  flex: 1;
  padding: 0 5%;
  max-width: 450px;

  h2 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
    }
    input {
      width: 100%;
      padding: 12px 15px;
      background-color: $input-bg;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      color: $input-text-color;
      box-sizing: border-box;
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
      color: #888;
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 30px;

    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .forgot-password {
      color: $text-color;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
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
    &::before, &::after {
      content: '';
      flex-grow: 1;
      height: 1px;
      background-color: $divider-color;
    }
  }

  .social-login-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    .social-icon {
      color: $text-color;
      font-size: 24px;
      border: 1px solid $divider-color;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: all 0.3s;
      
      &:hover {
        color: $primary-bg;
        background-color: $text-color;
        border-color: $text-color;
      }
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
}




@media (max-width: 320px) {
  .login-page {
    padding-top: 5vh;
  }
  .form-section {
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
      .social-icon {
        width: 45px;
        height: 45px;
        font-size: 20px;
      }
    }
  }
}
</style>