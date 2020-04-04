<template>
  <div class="input-placeholder">
    <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
    <input type="text">
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class BaseInput extends Vue {
  }
</script>

<style scoped lang="scss">
  @import "../scss/colors";
  @import "../scss/input";

  .input-placeholder {
    @include base-input;
  }
</style>