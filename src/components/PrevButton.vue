<template>
  <button @click="decreaseScreen" class="button">Назад</button>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import {Mutation} from "vuex-class";
  import BaseButton from './BaseButton.vue';

  @Component
  export default class NextButton extends BaseButton {
    @Mutation decreaseScreen!: void;
  }
</script>

<style scoped lang="scss">
  @import "../scss/button";
  @import "../scss/colors";
  @import "../scss/breakpoints";

  .button {
    @include base-button($mfc-gray);
    padding: 0 30px;
    border-radius: 44px;
    font-size: 24px;
    line-height: 1.5em;
    margin-left: 12px;

    @media (min-width: $breakpoint-tablet) {
      font-size: 28px;
      padding: 5px 30px;
    }

    @media (min-width: $breakpoint-laptop) {
      font-size: 32px;
    }

    @media (min-width: $breakpoint-desktop) {
      font-size: 36px;
      line-height: 60px;
      padding: 0 30px;
    }

    &[disabled] {
      background: $mfc-gray;
    }
  }
</style>