<template>
  <div class="screen-inner">
    <MFCLogo/>
    <section class="screen-inner__info">
      <div class="title">
        <h1 class="title__text">
          Загруженность <br> МФЦ
        </h1>
      </div>
      <div class="description">
        <h2 class="description__text">Здесь вы можете узнать, какое
          <span class="orange">отделение мфц</span>
          будет наиболее удобным для вас в данный момент</h2>
      </div>
      <div class="button-group">
        <NextButton/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MFCLogo from "./MFCLogo.vue";
  import NextButton from "./NextButton.vue";

  @Component({
    components: {
      MFCLogo,
      NextButton,
    }
  })
  export default class ScreenHome extends Vue {
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';
  @import '../scss/breakpoints';

  .screen-inner {
    @include screen-inner;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__info {
      justify-content: flex-end;

      @media (min-width: $breakpoint-desktop) {
        margin-top: 100px;
      }
    }

    .title {
      margin-bottom: 20px;

      @media (min-width: $breakpoint-desktop) {
        margin-bottom: 65px;
      }

      &__text {
        @include bold-text;
        color: #000000;

        font-size: 30px;
        line-height: 1em;

        @media (min-width: $breakpoint-desktop) {
          font-size: 90px;
          line-height: 75px;
        }
      }
    }

    .description {
      margin-bottom: 30px;

      @media (min-width: $breakpoint-desktop) {
        margin-bottom: 20px;
      }

      &__text {
        @include bold-text;
        color: #000000;
        font-size: 14px;
        line-height: 17px;
        width: 65vw;

        @media (min-width: $breakpoint-desktop) {
          font-size: 50px;
          line-height: 60px;
          width: 800px;
        }

        .orange {
          color: $mfc-orange;
        }
      }
    }

    .button-group {
      margin-top: 0;
    }
  }

</style>