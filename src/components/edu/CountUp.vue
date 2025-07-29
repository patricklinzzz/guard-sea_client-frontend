<script setup>
  import { ref, defineProps, onMounted } from 'vue'

  const props = defineProps({
    number: { type: Number, required: true },
    duration: { type: Number, default: 2000 },
  })

  const displayNumber = ref(0)
  const el = ref(null)
  let hasAnimated = false

  const startCounting = () => {
    if (hasAnimated) return
    hasAnimated = true

    let count = 0
    const steps = 60
    const increment = Math.floor(props.number / steps)
    const interval = props.duration / steps

    const timer = setInterval(() => {
      displayNumber.value += increment
      count++

      if (count >= steps) {
        displayNumber.value = props.number
        clearInterval(timer)
      }
    }, interval)
  }

  onMounted(() => {
    if (props.number <= 5) {
      displayNumber.value = props.number
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting()
        }
      },
      {
        threshold: 0.3,
      }
    )

    if (el.value) {
      observer.observe(el.value)
    }
  })
</script>

<template>
  <h2 ref="el">{{ displayNumber.toLocaleString() }}</h2>
</template>

<style lang="scss" scoped></style>
