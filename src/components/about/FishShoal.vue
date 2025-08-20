<!-- src/components/about/FishShoal.vue -->
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { gsap } from 'gsap'
  import { CustomEase } from 'gsap/CustomEase'

  // 註冊 CustomEase 插件
  gsap.registerPlugin(CustomEase)

  // --- 2. Refs ---
  const fishContainerBg = ref(null)
  const fishContainerFg = ref(null)
  let fishCtx

  // --- 3. 魚群數據  ---
  const fishData = [
    {
      id: 6,
      layer: 'foreground',
      color: '#b9a4c8',
      initialY: '15%',
      direction: -1,
      scale: 0.72,
      duration: 24,
      rotation: 8,
    },
    {
      id: 1,
      layer: 'background',
      color: '#a7c4d4',
      initialY: '25%',
      direction: 1,
      scale: 0.4,
      duration: 34,
      rotation: 5,
    },
    {
      id: 15,
      layer: 'background',
      color: '#8db59e',
      initialY: '30%',
      direction: 1,
      scale: 0.45,
      duration: 37,
      rotation: 6,
    },
    {
      id: 11,
      layer: 'foreground',
      color: '#8db59e',
      initialY: '40%',
      direction: -1,
      scale: 0.7,
      duration: 29,
      rotation: 5,
    },
    {
      id: 19,
      layer: 'background',
      color: '#e8a898',
      initialY: '80%',
      direction: 1,
      scale: 0.48,
      duration: 38,
      rotation: 9,
    },
    {
      id: 4,
      layer: 'background',
      color: '#f2d9b7',
      initialY: '60%',
      direction: -1,
      scale: 0.35,
      duration: 45,
      rotation: -5,
    },
    {
      id: 5,
      layer: 'foreground',
      color: '#E0CD8A',
      initialY: '50%',
      direction: 1,
      scale: 0.7,
      duration: 26,
      rotation: -10,
    },
    {
      id: 16,
      layer: 'background',
      color: '#e6c8c3',
      initialY: '65%',
      direction: -1,
      scale: 0.38,
      duration: 42,
      rotation: -6,
    },
    {
      id: 13,
      layer: 'background',
      color: '#a7c4d4',
      initialY: '55%',
      direction: -1,
      scale: 0.4,
      duration: 43,
      rotation: 8,
    },
    {
      id: 7,
      layer: 'foreground',
      color: '#e6c8c3',
      initialY: '65%',
      direction: 1,
      scale: 0.7,
      duration: 27,
      rotation: -10,
    },
    {
      id: 20,
      layer: 'foreground',
      color: '#a7c4d4',
      initialY: '58%',
      direction: -1,
      scale: 0.65,
      duration: 31,
      rotation: 4,
    },
    {
      id: 2,
      layer: 'background',
      color: '#e8a898',
      initialY: '35%',
      direction: -1,
      scale: 0.5,
      duration: 38,
      rotation: -8,
    },
    {
      id: 17,
      layer: 'background',
      color: '#b9a4c8',
      initialY: '50%',
      direction: 1,
      scale: 0.5,
      duration: 35,
      rotation: 12,
    },
    {
      id: 14,
      layer: 'foreground',
      color: '#e8a898',
      initialY: '48%',
      direction: 1,
      scale: 0.68,
      duration: 31,
      rotation: -5,
    },
    {
      id: 9,
      layer: 'background',
      color: '#e6c8c3',
      initialY: '18%',
      direction: -1,
      scale: 0.4,
      duration: 36,
      rotation: -8,
    },
    // [最終修正] 將 initialY 從 10% 改為 15%，避免初始裁切
    {
      id: 8,
      layer: 'foreground',
      color: '#a7c4d4',
      initialY: '15%',
      direction: -1,
      scale: 0.75,
      duration: 25,
      rotation: 8,
    },
    // [最終修正] 將 initialY 從 12% 改為 18%，避免初始裁切
    {
      id: 21,
      layer: 'background',
      color: '#8db59e',
      initialY: '18%',
      direction: 1,
      scale: 0.4,
      duration: 41,
      rotation: 7,
    },
    {
      id: 18,
      layer: 'background',
      color: '#f2d9b7',
      initialY: '20%',
      direction: -1,
      scale: 0.42,
      duration: 39,
      rotation: -4,
    },
    {
      id: 3,
      layer: 'background',
      color: '#8db59e',
      initialY: '75%',
      direction: 1,
      scale: 0.45,
      duration: 31,
      rotation: 10,
    },
    {
      id: 12,
      layer: 'foreground',
      color: '#f2d9b7',
      initialY: '25%',
      direction: 1,
      scale: 0.65,
      duration: 33,
      rotation: -5,
    },
    {
      id: 22,
      layer: 'foreground',
      color: '#b9a4c8',
      initialY: '85%',
      direction: -1,
      scale: 0.68,
      duration: 28,
      rotation: 6,
    },
    {
      id: 10,
      layer: 'background',
      color: '#b9a4c8',
      initialY: '45%',
      direction: 1,
      scale: 0.5,
      duration: 40,
      rotation: 10,
    },
  ]

  // --- 4. GSAP 動畫核心函式 (已修正) ---
  const createFishShoal = () => {
    CustomEase.create(
      'fishEase',
      'M0,0 C0.1,0 0.25,0.2 0.4,0.4 0.5,0.5 0.5,0.5 0.6,0.6 0.75,0.8 0.9,1 1,1'
    )

    if (!fishCtx) {
      fishCtx = gsap.context(() => {})
    }
    fishCtx.add(() => {
      const containerWidth = fishContainerBg.value.offsetWidth
      const offscreenBuffer = 150

      const foregroundFish = fishData.filter((f) => f.layer === 'foreground')
      const backgroundFish = fishData.filter((f) => f.layer === 'background')

      const createShuffledPositions = (group) => {
        let positions = []
        for (let i = 0; i < group.length; i++) {
          positions.push(i / group.length)
        }
        return gsap.utils.shuffle(positions)
      }

      const fgStartPositions = createShuffledPositions(foregroundFish)
      const bgStartPositions = createShuffledPositions(backgroundFish)

      const positionMap = new Map()
      let fgIndex = 0,
        bgIndex = 0
      fishData.forEach((fish) => {
        if (fish.layer === 'foreground') {
          positionMap.set(fish.id, fgStartPositions[fgIndex++])
        } else {
          positionMap.set(fish.id, bgStartPositions[bgIndex++])
        }
      })

      fishData.forEach((fish) => {
        const fishSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        fishSvg.setAttribute('viewBox', '0 0 129 82')
        fishSvg.innerHTML = `
        <g>
          <path class="fish-body" d="M70.822 3.80924C51.4652 4.88134 35.2573 18.3868 26.4446 29.6618L6.81631 15.5446C4.0899 13.5824 0.317903 16.0426 1.16357 19.2323L7.76093 44.133L3.95177 69.6124C3.46353 72.876 7.48401 74.9023 9.97719 72.6533L27.9264 56.4549C37.9302 66.6854 55.5326 78.3182 74.8894 77.2461C104.463 75.6081 126.812 44.9054 126.406 37.5617C125.999 30.2181 100.396 2.17125 70.822 3.80924Z"/>
          <path class="fish-eye" fill="#1c1c1c" d="M91.971 44.9936C89.1203 45.1515 86.6708 42.8126 86.5024 39.7718C86.3339 36.7288 88.5102 34.136 91.3609 33.9781C94.2137 33.8201 96.6609 36.1568 96.8294 39.1999C96.9979 42.2406 94.8217 44.8357 91.971 44.9936Z"/>
        </g>
      `
        const fishBody = fishSvg.querySelector('.fish-body')
        if (fishBody) fishBody.style.fill = fish.color
        fishSvg.style.width = 'auto'
        const container =
          fish.layer === 'foreground' ? fishContainerFg.value : fishContainerBg.value
        if (container) container.appendChild(fishSvg)

        const initialRotation = fish.direction === 1 ? fish.rotation : 180 + fish.rotation

        const tl = gsap.timeline({
          repeat: -1,
          onRepeat: () => {
            // [最終修正] 縮小隨機 Y 軸範圍，建立上下安全區
            gsap.set(fishSvg, { top: `${gsap.utils.random(15, 85)}%` })
          },
        })

        tl.fromTo(
          fishSvg,
          {
            scale: fish.scale,
            rotation: initialRotation,
            top: fish.initialY,
            yPercent: -50,
            x: fish.direction === 1 ? -offscreenBuffer : containerWidth + offscreenBuffer,
          },
          {
            x: fish.direction === 1 ? containerWidth + offscreenBuffer : -offscreenBuffer,
            duration: fish.duration,
            ease: 'fishEase',
          }
        )

        gsap.to(fishSvg, {
          rotation: `${initialRotation + (fish.direction === 1 ? 1 : -1) * 12}`,
          yoyo: true,
          repeat: -1,
          duration: gsap.utils.random(2.5, 4),
          ease: 'sine.inOut',
        })

        gsap.to(fishSvg, {
          yPercent: -50 + gsap.utils.random(-25, 25),
          yoyo: true,
          repeat: -1,
          duration: gsap.utils.random(3, 5),
          ease: 'sine.inOut',
        })

        tl.progress(positionMap.get(fish.id))
      })
    })
  }

  // --- 5. 生命週期 ---
  onMounted(() => {
    requestAnimationFrame(() => {
      createFishShoal()
    })
  })

  onUnmounted(() => {
    if (fishCtx) {
      fishCtx.revert()
    }
  })
</script>
<template>
  <section class="fish-shoal-wrapper">
    <div ref="fishContainerBg" class="fish-container-bg"></div>
    <div ref="fishContainerFg" class="fish-container-fg"></div>
  </section>
</template>

<style lang="scss" scoped>
  .fish-shoal-wrapper {
    position: relative;
    height: 350px;
    pointer-events: none;
    width: 120%;
    /* 把它往左邊推一點，讓它在畫面上保持居中 */
    left: -10%;
    padding: 20px 0;
  }
  .fish-container-bg,
  .fish-container-fg {
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .fish-container-bg {
    z-index: 5;
  }
  .fish-container-fg {
    z-index: 15;
  }

  :deep(svg) {
    position: absolute;
    width: auto;
    height: 70px;
    will-change: transform;
  }
</style>
