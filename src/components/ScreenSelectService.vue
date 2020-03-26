<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <h2 class="title__text">
        Выбор услуги
      </h2>
    </div>
    <div class="description">
      <h3 class="description__text">* ДЛЯ БОЛЕЕ ТОЧНОГО РАСЧЁТА ВРЕМЕНИ РЕКОМЕНДУЕТСЯ выбрать необходимую услугу</h3>
    </div>
    <div class="input">
      <BaseInput/>
    </div>
    <div class="button-group">
      <PrevButton/>
      <NextButton/>
    </div>
  </div>
</template>

<script>
  import {Component, Vue} from "vue-property-decorator";
  import MFCLogo from "./MFCLogo.vue";
  import BaseInput from "./BaseInput.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";

  @Component({
    components: {
      MFCLogo,
      BaseInput,
      PrevButton,
      NextButton,
    }
  })
  export default class ScreenSelectService extends Vue {}
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';

  .screen-inner {
    @include screen-inner;
    position: relative;

    .title {
      &__text {
        @include bold-text;
        color: #000000;
        font-size: 36px;
        line-height: 1.5em;
        text-align: center;
      }
    }

    .description {
      margin-bottom: 50px;

      &__text {
        @include bold-text;
        display: block;
        font-size: 28px;
        font-family: 'Circe', sans-serif;
        line-height: 1.5em;
        text-align: center;
        text-transform: lowercase;
        color: $mfc-light-gray;
      }
    }
  }

</style>