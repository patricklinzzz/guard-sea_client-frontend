<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '請選擇',
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const showDropdown = ref(false)
  function selectorOption(option) {
    emit('update:modelValue', option)
    showDropdown.value = false
  }
</script>
<template>
  <div class="status_filter">
    <div class="dropdown_wrapper" @click="showDropdown = !showDropdown">
      <input type="text" readonly :value="modelValue" placeholder="placeholder" />
      <span class="arrow"><i class="fa-solid fa-caret-down"></i></span>
    </div>
    <ul v-if="showDropdown" class="dropdown_list">
      <li v-for="option in options" :key="option" @click="selectorOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .status_filter {
    position: relative;
    width: 160px;

    .dropdown_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px;
      border: 2px solid v.$color-skyblue;
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
    }

    input {
      font-size: v.$sub-desktop;
      border: none;
      background: none;
      outline: none;
      width: 100%;
      cursor: pointer;
      @include respond(md) {
        font-size: v.$sub-mobile;
      }
    }

    .arrow {
      margin-left: 8px;
      color: v.$color-blue-dark;
    }

    .dropdown_list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: v.$color-blue-dark;
      color: #fff;
      border-radius: 6px;
      font-size: v.$sub-desktop;
      border: 3px solid skyblue;

      overflow: hidden;
      z-index: 10;
      li {
        padding: 10px 12px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          background-color: v.$color-blue;
        }
      }

      @include respond(md) {
        font-size: v.$sub-mobile;
      }
    }
  }
</style>
