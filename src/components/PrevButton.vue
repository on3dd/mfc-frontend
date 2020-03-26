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

  .button {
    @include base-button;
    background: $mfc-gray;
    line-height: 60px;
    padding: 0 30px;
    border-radius: 44px;
    font-size: 36px;
    transition: all .1s ease-out;

    &:hover {
      background: darken($mfc-gray, 10%);
    }
  }
</style>