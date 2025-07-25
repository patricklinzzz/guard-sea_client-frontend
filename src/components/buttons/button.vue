<script setup>
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'round', 'gray', 'transparent'].includes(value),
    },
  })

  const emit = defineEmits(['click'])
  const handleClick = (event) => {
    emit('click', event)
  }
</script>

<template>
  <button :class="['button', `button--${variant}`]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  .button {
    cursor: pointer;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: v.$p-mobile;
    background-color: v.$color-orange;
    padding: 11px 18px;
    line-height: v.$line-height-relaxed;
    letter-spacing: v.$letter-spacing-normal;
    border-radius: v.$border-radius-sm;
    height: 48px;
    &:hover {
      background-color: v.$color-orange-hover;
    }

    &:active {
      background-color: v.$color-orange-active;
    }

    @include respond(md) {
      padding: 9px 18px;
      height: 44px;
    }

    &--round {
      border-radius: v.$border-radius-round;
      width: 47px;
      height: 47px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      @include respond(md) {
        width: 21px;
        height: 21px;
      }
    }

    &--gray {
      background-color: #e0e0e0;
      color: #333;
      font-weight: normal;
      &:hover {
        background-color: #bbb;
      }

      &:active {
        background-color: v.$color-gray;
      }
    }

    &--transparent {
      background-color: #00000000;
      border: 1.5px solid v.$color-orange;
      color: v.$color-black;
      box-sizing: border-box;
      &:hover {
        background-color: v.$color-gray-light;
      }
      &:active {
        background-color: #f4f4f4;
      }
    }
  }
</style>
