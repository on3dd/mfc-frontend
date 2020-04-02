<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class BaseButton extends Vue {
    @Prop({type: Boolean, required: false}) isDisabled!: boolean;
  }
</script>

<style scoped lang="scss">
  @import "../scss/button";
  @import "../scss/colors";

  .button {
    @include base-button($mfc-orange);
    line-height: 60px;
    padding: 0 30px;
    border-radius: 44px;
    font-size: 36px;
  }
</style>