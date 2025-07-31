<script setup>
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const increment = () => emit('update:modelValue', props.modelValue + 1)
  const decrement = () => {
    if (props.modelValue > props.min) {
      emit('update:modelValue', props.modelValue - 1)
    }
  }
</script>

<template>
  <div class="quantity_control">
    <button @click="decrement"><i class="fa-solid fa-minus"></i></button>
    <input type="number" :value="modelValue" readonly />
    <button @click="increment"><i class="fa-solid fa-plus"></i></button>
  </div>
</template>

<style lang="scss" scoped>
  .quantity_control {
    display: flex;
    overflow: hidden;
    border-radius: v.$border-radius-sm;
    border: 2px solid v.$color-blue;

    input {
      width: 92px;
      text-align: center;
      border: none;
      outline: none;
      font-size: v.$p-desktop;
      padding: 0;
      
    }
    button {
      width: 35px;
      border: none;
      outline: none;
      background: v.$color-blue;
      color: v.$color-white;
      height: 100%;
      font-size: v.$p-desktop;
      cursor: pointer;
      @include respond(md) {
        width: 27px;
      }
    }
  }
</style>
