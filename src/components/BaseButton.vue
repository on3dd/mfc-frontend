<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BaseButton"
  }
</script>

<style scoped lang="scss">
  @import "../scss/button";
  @import "../scss/colors";

  .button {
    @include base-button;
    background: $mfc-orange;
    line-height: 60px;
    padding: 0px 30px;
    border-radius: 44px;
    font-size: 36px;
    transition: all .1s ease-out;

    &:hover {
      background: darken($mfc-orange, 10%);
    }
  }
</style>