<template>
  <button
      @click="increaseScreen"
      :disabled="isDisabled"
      class="button"
  >Далее</button>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import {Mutation} from "vuex-class";
  import BaseButton from './BaseButton.vue';

  @Component
  export default class NextButton extends BaseButton {
    @Mutation increaseScreen!: void;
  }
</script>

<style scoped lang="scss">
  @import "../scss/button";
  @import "../scss/colors";
  @import "../scss/breakpoints";

  .button {
    @include base-button($mfc-orange);
    padding: 0 30px;
    line-height: 40px;
    border-radius: 44px;
    font-size: 24px;
    margin-left: 12px;

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