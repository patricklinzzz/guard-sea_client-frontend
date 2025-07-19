<script setup></script>


<template>
  <h3>暫時的導覽列，之後header的dropdown設計完後這頁可以刪掉</h3>
  <nav>
    <router-link to="/edu/species">生物圖鑑</router-link>
    <router-link to="/edu/causes">滅絕原因</router-link>
    <router-link to="/edu/quiz">知識測驗</router-link>
  </nav>
</template>

<style lang="scss" scoped>
nav{
  a{
    display: block;
    margin-top: 10px;
  }
}
</style>
