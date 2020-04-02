<template>
  <div class="logo">
    <div class="logo__list">
      <div class="logo__item">
        <img
            class="logo__item__first"
            src="../assets/images/image 2.svg"
            alt="">
      </div>
      <div class="logo__item">
        <img
            class="logo__item__second"
            src="../assets/images/logo_bot 2.png"
            alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MFCLogo"
  }
</script>

<style scoped lang="scss">
  @import "../scss/breakpoints";

  .logo {
    display: block;
    /*display: inline-flex;*/
    /*flex-direction: column;*/
    /*align-items: flex-start;*/

    &__list {
      display: inline-flex;
      flex-direction: column;

      @media (min-width: $breakpoint-desktop)  {
        align-items: flex-end;
      }
    }

    &__item {
      display: block;

      &__second {
        display: none;

        @media (min-width: $breakpoint-desktop) {
          display: block;
        }
      }
    }
  }
</style>