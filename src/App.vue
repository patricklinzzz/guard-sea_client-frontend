<script setup>
  import { RouterView, useRoute } from 'vue-router'
  import Header from '@/components/common/header.vue'
  import Footer from '@/components/common/footer.vue'

  import { ref, computed, provide } from 'vue'

  //重新測驗頁面邏輯
  const route = useRoute()
  const quizPageKey = ref(0)
  const calculatedRouterViewKey = computed(() => {
    if (route.name === 'quiz') {
      return quizPageKey.value
    }
    return route.fullPath
  })


  const forceQuizRefresh = () => {
    quizPageKey.value++ 
  }

  provide('forceQuizRefresh', forceQuizRefresh)
</script>

<template>
  <Header></Header>
  <RouterView :key="calculatedRouterViewKey" />
  <Footer></Footer>
</template>

<style scoped></style>
