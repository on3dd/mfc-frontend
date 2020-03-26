<template>
  <div class="input-placeholder">
    <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
    <input class="input" type="text" placeholder="Опа гангнам стайл">
  </div>
</template>

<script>
  export default {
    name: "BaseInput"
  }
</script>

<style scoped lang="scss">
  @import "../scss/colors";

  .input-placeholder {
    position: relative;
    width: 100%;
    height: 90px;
    font-size: 36px;

    .input {
      width: inherit;
      height: inherit;
      border-radius: 80px;
      border: 4px solid $mfc-orange;
      font-size: 1em;
      padding: 0 1em 0 3em;

      &__icon {
        position: absolute;
        top: 50%;
        left: 1em;
        transform: translateY(-50%);
      }
    }
  }
</style>