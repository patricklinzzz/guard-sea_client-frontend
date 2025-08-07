<template>
  <div class="loading_container" v-show="!isCompleted"  @click.stop>
    <h2>守護蔚藍大海，揭曉生態脈動</h2>
    <h3>汪洋大海之奧秘，即將解鎖...</h3>
    <div class="dugong_container">
      <img :src="dugong" class="dugong" :style="{ left: progress + '%' }" />
    </div>
    <div class="bar_container">
      <div class="bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-text">{{ progress }}%</div>
  </div>

  <div v-show="isCompleted" class="content-wrapper">
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import dugong from '@/assets/images/loading/dugong.gif'
  const emit = defineEmits(['loaded'])

  const progress = ref(0)
  const isCompleted = ref(false)

  let totalResources = 0
  let loadedResources = 0

  const updateProgress = () => {
    loadedResources++
    progress.value = Math.floor((loadedResources / totalResources) * 100)

    if (loadedResources >= totalResources) {
      setTimeout(() => {
        isCompleted.value = true
        emit('loaded')
      }, 500)
    }
  }

  const monitorResources = () => {
    const images = document.querySelectorAll('img')
    const videos = document.querySelectorAll('video')
    const resourcesToLoad = [...images, ...videos]
    totalResources = resourcesToLoad.length

    if (totalResources === 0) {
      updateProgress()
      return
    }

    resourcesToLoad.forEach((resource) => {
      if (resource.tagName === 'IMG') {
        if (resource.complete) {
          updateProgress()
        } else {
          resource.addEventListener('load', updateProgress, { once: true })
          resource.addEventListener('error', updateProgress, { once: true })
        }
      } else if (resource.tagName === 'VIDEO') {
        if (resource.readyState >= 2) {
          updateProgress()
        } else {
          resource.addEventListener('loadeddata', updateProgress, { once: true })
          resource.addEventListener('error', updateProgress, { once: true })
        }
      }
    })
  }

  onMounted(() => {
    monitorResources()
  })
</script>

<style lang="scss" scoped>
  .loading_container {
    color: v.$color-black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #fff url('@/assets/images/loading/bg.png') center center / cover;
    z-index: 9999;
    transition: opacity 0.5s ease-in-out;
    .dugong_container {
      width: 50vw;
      min-width: 320px;
      height: 100px;
      position: relative;
      .dugong {
        position: absolute;
        top: 0;
        width: 120px;
        z-index: 2;
        transition: left 0.3s ease-out;
        animation: sway 2s ease-in-out infinite;
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg) translateX(-50%);
          }
          50% {
            transform: rotate(2deg) translateX(-50%);
          }
        }
      }
    }
    .bar_container {
      width: 50vw;
      min-width: 320px;
      height: 30px;
      background: #76c6e8;
      .bar {
        height: 100%;
        background: #012038;
        transition: width 0.3s ease-out;
      }
    }
  }
</style>
