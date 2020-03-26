<template>
  <div class="logo">
    <div class="logo__item">
      <img src="../assets/images/image 2.png" alt="">
    </div>
    <div class="logo__item">
      <img src="../assets/images/logo_bot 2.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "MFCLogo"
  }
</script>

<style scoped lang="scss">
  .logo {
    display: inline-block;
    flex-direction: column;
    align-items: flex-end;

    &__item {
      display: block;

      img {
        float: right;
      }
    }
  }
</style>