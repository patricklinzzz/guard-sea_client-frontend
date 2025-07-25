<template>
  <div class="forgot-password-page wrapper">
    <div class="background-overlay"></div>

    <main class="forgot-password-main">
      <div class="welcome-section">
        <h1>Welcome !</h1>
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
        <h1>忘記密碼</h1>
        <p class="subtitle subtitle--white">密碼重設信將寄至您的信箱</p>
        <form @submit.prevent="handlePasswordReset">
          <div class="form-group">
            <label for="email">電子郵件</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="請輸入您的電子郵件"
              required
            />
          </div>
          <button type="submit" class="btn-confirm">確認</button>
        </form>
        <div class="back-to-login-link">
          <router-link to="/login">回登入</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const email = ref('')

  const handlePasswordReset = () => {
    if (email.value) {
      console.log('Password reset request for:', email.value)
      alert(`密碼重設信已寄至： ${email.value} (此為展示功能)`)
    } else {
      alert('請輸入您的電子郵件')
    }
  }
</script>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  .forgot-password-page {
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
  }

  .forgot-password-main {
    display: flex;
    width: 100%;
    max-width: $container;
    padding: 20px;
    gap: 100px;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }

  .welcome-section {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 20px;
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
    width: 400px;
    max-width: 450px;
    text-align: center;

    h2 {
      margin-bottom: 15px;
    }

    .subtitle {
      font-size: $p-desktop;
      color: $color-text-sub;
      margin-bottom: 40px;

      @include respond(md) {
        font-size: $p-mobile;
        margin-bottom: 30px;
      }
    }

    .form-group {
      margin-bottom: 20px;
      text-align: left;

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

      input {
        width: 100%;
        padding: 12px 15px;
        background-color: $color-white;
        border: 1px solid #ccc;
        border-radius: $border-radius-md;
        font-size: $p-desktop;
        color: $color-black;

        &::placeholder {
          color: $color-gray;
        }

        @include respond(md) {
          font-size: $p-mobile;
        }
      }
    }

    .btn-confirm {
      width: 100%;
      padding: 15px;
      margin-top: 10px;
      background-color: $color-accent;
      border: none;
      border-radius: $border-radius-md;
      color: $color-white;
      font-size: $p-desktop;
      font-weight: $font-bold;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: $color-yellow-hover;
      }

      @include respond(md) {
        font-size: $p-mobile;
      }
    }

    .back-to-login-link {
      margin-top: 30px;

      a {
        color: $color-text-white;
        text-decoration: none;
        font-size: $p-desktop;

        &:hover {
          text-decoration: underline;
        }

        @include respond(md) {
          font-size: $p-mobile;
        }
      }
    }
    .subtitle--white {
      color: $color-text-white;
    }

    @include respond(md) {
      width: 100%;
      padding: 0 10px;
    }
  }
</style>
