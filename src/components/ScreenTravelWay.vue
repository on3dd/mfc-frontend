<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <h2 class="title__text">
        Выбор способа передвижения
      </h2>
    </div>
    <div class="travel-ways-group">
      <div class="travel-ways-group__item">
        <img class="travel-ways-group__item__image active" src="../assets/images/afoot-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Пешком</span>
      </div>
      <div class="travel-ways-group__item">
        <img class="travel-ways-group__item__image" src="../assets/images/car-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Автомобиль</span>
      </div>
      <div class="travel-ways-group__item">
        <img class="travel-ways-group__item__image" src="../assets/images/bus-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Общественный транспорт</span>
      </div>
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
  export default class ScreenTravelWay extends Vue {}
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';

  .screen-inner {
    @include screen-inner;
    position: relative;

    .title {
      margin-bottom: 30px;

      &__text {
        @include bold-text;
        color: #000000;
        font-size: 36px;
        line-height: 1.5em;
        text-align: center;
      }
    }

    .travel-ways-group {
      display: flex;
      justify-content: space-around;

      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__image {
          margin-bottom: 13px;

          &.active {
            filter: brightness(75%);
          };
        }

        &__text {
          @include bold-text;
          display: block;
          font-size: 24px;
          text-align: center;
          text-transform: lowercase;
          max-width: 170px;
        }
      }
    }
  }

</style>