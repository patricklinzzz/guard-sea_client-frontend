<script setup>
  defineProps({
    coupon: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  })
</script>
<template>
  <div class="coupon">
    <div class="coupon_value" :class="{ active: isActive }">
      <h3>購物金 ${{ coupon.value }}</h3>
    </div>
    <div class="coupon_txt">
      <h3 class="coupon_title">{{ coupon.title }}</h3>
      <p class="coupon_code">優惠代碼: {{ coupon.coupon_code }}</p>
      <p class="coupon_date">{{ coupon.validityPeriod }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .coupon {
    display: flex;
    padding: 0.5rem;
    border: 2px solid #ccc;
    width: 35vw;
    cursor: pointer;
    align-items: center;
    border-radius: v.$border-radius-sm;
    column-gap: 1rem;
    @include respond(md) {
      width: 90vw;
    }
    .coupon_value {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 10vw;
      height: 10vw;
      aspect-ratio: 1 / 1;
      background-color: #999999;
      color: #fff;
      font-weight: 500;
      transition: all 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      line-height: v.$line-height-normal;

      @include respond(md) {
        width: 28vw;
        height: 28vw;
        aspect-ratio: 1 / 1;
      }
      &.active {
        background-color: #ec6c26;
      }
    }
    .coupon_txt {
      h3 {
        margin-bottom: 0.5rem;
        line-height: v.$line-height-normal;
        color: v.$color-text-main;
      }
      .coupon_title {
        font-weight: bold;
        line-height: v.$line-height-normal;
        color: v.$color-text-main;
      }
      .coupon_date {
        color: v.$color-text-main;
      }
      .coupon_code {
        color: v.$color-text-main;
      }
    }
  }
</style>
