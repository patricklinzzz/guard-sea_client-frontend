<script setup>
    import { computed } from 'vue'

    // 定義 props，提供元件彈性配置
    const props = defineProps({
        imgSrc: { type: String, required: true }, // 圖片來源
        alt: { type: String, default: 'animated animal' },

        size: { type: Number, default: 160 },        // 桌機尺寸
        sizeMobile: { type: Number, default: 100 },  // 手機尺寸（未使用到也可擴充）

        endLeft: { type: String, default: '20%' },   // 動物游到的位置
        bottom: { type: String, default: '20px' },
        zIndex: { type: Number, default: 0 },

        animationDuration: { type: String, default: '12s' },
        direction: { type: String, default: 'ltr' }, // 游動方向 ltr=左→右，rtl=右→左

        showBubbles: { type: Boolean, default: true },
        bubbleLeft: { type: String, default: '90%' },
        bubbleCount: { type: Number, default: 6 }
    })

    // 包裹圖的外層 div 動畫樣式
    const wrapperStyle = computed(() => ({
        width: `${props.size}px`,
        height: `${props.size}px`,
        bottom: props.bottom,
        left: props.endLeft,
        zIndex: props.zIndex,
        '--duration': props.animationDuration
    }))

    const bubbleContainerStyle = computed(() => ({
        left: props.bubbleLeft
    }))


    // 每顆氣泡的隨機樣式（讓氣泡更自然）
    const bubbleStyle = (n) => {
        const size = 6 + Math.random() * 6         // 氣泡大小 6~12px
        const duration = 3 + Math.random() * 3     // 動畫時間 3~6 秒
        const left = 5 + Math.random() * 30        // 氣泡起始位置偏移
        const drift = (Math.random() * 20 - 10).toFixed(1) + 'px' // 水平飄移
        const opacity = Math.random().toFixed(2)   // 不同透明度

        // 每顆氣泡的平均 left（例如共 6 顆就是 10%, 25%, 40%, ...）
        const baseLeft = (n - 1) * (100 / props.bubbleCount)
        const randomOffset = Math.random() * 5 - 2.5 // 隨機微調（±2.5%）
        const total_left = baseLeft + randomOffset

        return {
            '--size': `${size}px`,
            '--duration': `${duration}s`,
            '--opacity': opacity,
            '--left': `${total_left}%`,
            '--drift': drift,
            animationDelay: `${n * 0.5}s`
        }
    }
</script>

<template>
    <div
        class="animal-wrap"
        :style="wrapperStyle"
        :class="{ reverse: direction === 'rtl' }"
    >
        <!-- 動物圖片 -->
        <img class="animal" :src="imgSrc" :alt="alt" />

        <!-- 氣泡群組（可開關） -->
        <div 
            class="bubbles" 
            v-if="showBubbles"
            :style="bubbleContainerStyle"
        >
            <!-- v-for 產生多顆氣泡，每顆樣式與動畫隨機 -->
            <span
                v-for="n in bubbleCount"
                :key="n"
                class="bubble"
                :style="bubbleStyle(n)"
            ></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .animal-wrap {
    position: absolute;
    pointer-events: none;
    animation: swim-across var(--duration) ease-out forwards;

    @include respond(md) {
        width: 100px !important;
        height: 100px !important;
        bottom: 10px !important;
    }

    &.reverse {
        animation: swim-back var(--duration) ease-out forwards;
    }
    }

    .animal {
    width: 100%;
    animation: float-updown 4s ease-in-out infinite;
    }

    /* 游動動畫：左→右 */
    @keyframes swim-across {
    0% {
        transform: translateX(-200%);
    }
    100% {
        transform: translateX(0);
    }
    }

    /* 游動動畫：右→左 */
    @keyframes swim-back {
    0% {
        transform: translateX(200%);
    }
    100% {
        transform: translateX(0);
    }
    }

    /* 動物上下浮動動畫 */
    @keyframes float-updown {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-25px);
    }
    }

    /* 氣泡區容器 */
    .bubbles {
        position: absolute;
        bottom: 20px;
        left: 60%;
        width: 40px;
        height: 100%;
        z-index: 1;
    }

    /* 每顆氣泡的樣式與動畫（由 JS 傳入變數控制） */
    .bubble {
        position: absolute;
        bottom: 0;
        border-radius: 50%;
        background-color: rgba(115, 194, 230, 0.486);
        animation: bubble-float var(--duration) linear infinite;
        width: var(--size);
        height: var(--size);
        opacity: var(--opacity);
        left: var(--left);
    }

    /* 氣泡上升動畫 + 左右飄移 */
    @keyframes bubble-float {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    50% {
        transform: translate(var(--drift), -60px) scale(1.1);
    }
    100% {
        transform: translate(var(--drift), -120px) scale(0.6);
        opacity: 0;
    }
    }
</style>

<!-- 引入範例：

<script setup>
    import AnimatedAnimal from '@/components/event/AnimatedAnimal.vue'
    import turtle from '@/assets/images/dec/seaturtle.svg'
    import dolphin from '@/assets/images/dec/dolphin.svg'
</script>

<template>
<div class="swim">
    <AnimatedAnimal
        :imgSrc="turtle"
        alt="Sea Turtle"
        :sizeMobile="100"
        :size="160"
        direction="rtl"
        endLeft="70%"
        bottom="20px"
        :showBubbles="true"
        :bubbleLeft="'15%'"
        :animationDuration="'12s'"
        :zIndex="3"
    />

    <AnimatedAnimal
        :imgSrc="dolphin"
        alt="Dolphin"
        :size="140"
        :sizeMobile="100"
        direction="rtl"
        endLeft="60%"
        bottom="20px"
        :showBubbles="true"
        :bubbleLeft="'10%'"
        :animationDuration="'15s'"
        :zIndex="3"
    />
</div>
</template> 

<style>
.swim {
    position: relative;
}
</style>

-->