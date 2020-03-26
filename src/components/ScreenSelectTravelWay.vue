<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <h2 class="title__text">
        Выбор способа передвижения
      </h2>
    </div>
    <div class="travel-ways-group" ref="travelWaysGroup">
      <IconTravelWay name="afoot" @changeTravelWay="changeTravelWay($event)">
        <img class="travel-ways-group__item__image active" src="../assets/images/afoot-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Пешком</span>
      </IconTravelWay>
      <IconTravelWay name="car" @changeTravelWay="changeTravelWay($event)">
        <img class="travel-ways-group__item__image" src="../assets/images/afoot-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Авто</span>
      </IconTravelWay>
      <IconTravelWay name="bus" @changeTravelWay="changeTravelWay($event)">
        <img class="travel-ways-group__item__image" src="../assets/images/afoot-icon.svg" alt="Пешком">
        <span class="travel-ways-group__item__text">Общественный транспорт</span>
      </IconTravelWay>
    </div>
    <div class="button-group">
      <PrevButton/>
      <NextButton/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Mutation} from "vuex-class";
  import MFCLogo from "./MFCLogo.vue";
  import BaseInput from "./BaseInput.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";
  import IconTravelWay from "./IconTravelWay.vue";

  @Component({
    components: {
      MFCLogo,
      BaseInput,
      PrevButton,
      NextButton,
      IconTravelWay,
    }
  })
  export default class ScreenSelectTravelWay extends Vue {
    $refs!: {
      travelWaysGroup: HTMLElement;
    };

    @Mutation updateTravelWay!: (name: string) => void;

    changeTravelWay(name: string) {
      this.updateTravelWay(name);
      this.$refs.travelWaysGroup.querySelector('div > .active')!.classList.remove('active');
    }
  }
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
          cursor: pointer;
          transition: all .1s ease-out;

          &:hover {
            filter: brightness(90%);
          }

          &.active {
            filter: brightness(75%);
          }
        ;
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