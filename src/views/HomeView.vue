<script setup>
  import Button from '@/components/buttons/button.vue'
</script>

<template>
  <main>
    <section id="banner">
      <img src="@/assets/images/homepage/banner.png" alt="" />
      <article>
        <h1>守護海洋,從了解開始</h1>
        <div id="buttons">
          <Button variant="transparent">了解更多</Button>
          <Button>我想參與</Button>
        </div>
      </article>
      <img src="@/assets/images/homepage/bg1.png" alt="" />
    </section>
    <section id="about_us">
      <article>
        <img src="@/assets/images/homepage/aboutus.png" alt="" />
        <div>
          <h2>關於我們</h2>
          <p>
            我們致力於推廣海洋保育及教育，串連知識、行動與社群。用最簡單的方式，讓每個人都能理解海洋的重要性，成為改變的力量。
          </p>
        </div>
      </article>
    </section>
    <section id="action">
      <h2>我們在做什麼</h2>
      <div>
        <div>
          <img src="@/assets/images/homepage/action1.png" alt="" />
          <h3>海洋守護行動</h3>
          <p>
            從棲地到物種
            <br />
            全面守護海洋生命
          </p>
        </div>
        <div>
          <img src="@/assets/images/homepage/action2.png" alt="" />
          <h3>知識推廣平台</h3>
          <p>
            從認識到行動
            <br />
            學習不止於知識
          </p>
        </div>
        <div>
          <img src="@/assets/images/homepage/action3.png" alt="" />
          <h3>教育推廣</h3>
          <p>
            從教育到實踐
            <br />
            永續海洋新世代
          </p>
        </div>
      </div>
    </section>
    <section id="map">*import互動地圖</section>
    <section id="pollute">
      <h2>汙染資訊</h2>
      <div id="pollute_data">數據...</div>
    </section>
    <section id="coral_reef">珊瑚礁白化危機</section>
    <section id="future_action">未來的行動藍圖</section>
  </main>
</template>

<style scoped lang="scss">
  main {
    @include bg-layer-fixed-dark;
    color: v.$color-white;
  }
  #banner {
    position: relative;
    background-color: v.$color-blue-extra-dark;
    img {
      width: 100%;
      vertical-align: middle;
    }
    article {
      position: absolute;
      top: 25%;
      left: 15%;
      h1 {
        text-shadow: 0 4px 4px #000000ce;
      }
      #buttons {
        margin: 28px 15px 0 0;
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        .button--transparent {
          color: v.$color-orange;
        }
      }
    }
  }
  #about_us {
    position: relative;
    height: 100px;
    article {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      top: -250px;
      left: 20%;
      img {
        height: 300px;
      }
      div {
        width: 40vw;
        margin-top: 5%;
        p {
          margin-top: 23px;
        }
      }
    }
  }
  #action {
    width: 62.5vw;
    margin: auto;
    & > div {
      margin-top: 75px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      & > div {
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        border: 1px solid v.$color-skyblue;
        box-sizing: border-box;
        border-radius: v.$border-radius-md;
        padding: 25px 50px;
        img {
          height: 30%;
        }
        h3 {
          color: v.$color-skyblue-light;
          font-weight: bold;
        }
      }
    }
  }
  #pollute {
    h2 {
      background: url(@/assets/images/homepage/bg2.png) no-repeat center top / 100vw;
      padding: 0 0 15px 18.75vw;
    }
    #pollute_data {
      background-color: v.$color-blue-extra-dark;
      height: 300px; //寫入實際內容記得移除
    }
  }
  #coral_reef {
    background-color: v.$color-blue-extra-dark;
  }
  #future_action {
    background-color: v.$color-blue-extra-dark;
  }
</style>
