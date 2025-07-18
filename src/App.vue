<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/common/header.vue'
import Footer from '@/components/common/footer.vue'
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<style scoped>

</style>
