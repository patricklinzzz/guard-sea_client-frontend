<!-- src/components/buttons/CategoryButtons.vue -->
<script setup>
  const props = defineProps({
    categories: {
      type: Array,
      required: true,
    },
    currentCategory: {
      type: String,
      required: true,
    },
  })
  const emit = defineEmits(['update:currentCategory'])

  const handleClick = (category) => {
    emit('update:currentCategory', category)
  }
</script>

<template>
  <nav class="new_nav">
    <ul>
      <li v-for="category in categories" :key="category">
        <button :class="{ active: category === currentCategory }" @click="handleClick(category)">
          <h3>{{ category }}</h3>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
  .new_nav {
    max-width: v.$container;
    margin: 0 auto 40px auto;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;

      @include respond(md) {
        flex-wrap: wrap;
        padding: 0px 20px;
        height: 38px;
        margin-bottom: 80px;
      }

      li {
        position: relative;
        padding: 0px 10px;
        line-height: 40px;

        @include respond(md) {
          width: 50%;
          padding: 0px 15px;
          line-height: 38px;
          margin-bottom: 8px;
        }

        &:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background-color: white;
        }

        @include respond(md) {
          &::after {
            display: none;
          }

          &:nth-child(odd)::after {
            content: '';
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 24px;
            background-color: white;
            display: block;
          }
        }

        button {
          width: 124px;
          line-height: 40px;
          border: none;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          @include respond(md) {
            width: 100%;
            line-height: 38px;
          }

          h3 {
            color: white;
            font-family: v.$font-sans;

            @include respond(md) {
              min-width: 114px;
              font-size: 22px;
            }
          }

          &.active {
            background-color: v.$color-skyblue-light;
            border-radius: 5px;
            h3 {
              color: v.$color-blue-dark;
            }
          }
        }
      }
    }
  }
</style>
