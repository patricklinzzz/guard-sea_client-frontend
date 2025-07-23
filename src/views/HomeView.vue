<script setup>
import Button from '@/components/buttons/button.vue';
import { ref } from 'vue';

const message = ref('456');
const say123 = () => {
  message.value = '123'
}
const say456 = () => {
  message.value = '456'
}
</script>

<template>
  <main>
    <Button @click="say123">確定報名</Button>
    <Button variant="gray">回活動頁面</Button>
    <Button variant="transparent">加入購物車</Button>
    <Button variant="round" @click="say456"><i class="fa-solid fa-chevron-right"></i></Button>
    <p>{{ message }}</p>
  </main>
</template>
