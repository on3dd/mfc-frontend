<template>
  <div class="screen-inner">
    <MFCLogo/>
    <div class="ready">
      <h2 class="ready__text">Готово!</h2>
    </div>
    <ScreenComputedResultInfo/>
    <div class="change-data">
      <button
          @click="$emit('showModal')"
          class="change-data__button"
      >
        Изменить данные для поиска
      </button>
    </div>
    <div class="map-placeholder">
      <ScreenComputedResultMap/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import MFCLogo from "./MFCLogo.vue";
  import ScreenComputedResultInfo from "./ScreenComputedResultInfo.vue";
  import ScreenComputedResultMap from "./ScreenComputedResultMap.vue";
  import PossibleOption from "@/@types/possibleOption";

  @Component({
    components: {
      MFCLogo,
      ScreenComputedResultInfo,
      ScreenComputedResultMap,
    }
  })
  export default class ScreenComputedResult extends Vue {
    @Getter bestOption!: PossibleOption;
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';
  @import '../scss/button';
  @import "../scss/breakpoints";

  .screen-inner {
    @include screen-inner;
    height: 100%;
    position: relative;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/

    .ready {
      margin-top: 20px;
      font-size: 28px;
      margin-bottom: 1em;

      @media (min-width: $breakpoint-tablet) {
        font-size: 34px;
      }

      @media (min-width: $breakpoint-laptop) {
        font-size: 40px;
      }

      @media (min-width: $breakpoint-desktop) {
        margin-top: 25px;
        font-size: 48px;
      }

      &__text {
        @include bold-text;
        color: $mfc-orange;
        font-size: inherit;
        line-height: 1.5em;
        text-align: center;
      }
    }

    .change-data {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      @media (min-width: $breakpoint-tablet) {
        margin-bottom: 35px;
      }

      @media (min-width: $breakpoint-laptop) {
        margin-bottom: 50px;
      }

      @media (min-width: $breakpoint-desktop) {
        margin-bottom: 70px;
      }

      &__button {
        @include base-button($mfc-orange);
        border-radius: 20px;
        font-size: 14px;
        line-height: 1em;
        padding: 10px 15px;

        @media (min-width: $breakpoint-tablet) {
          padding: 12.5px 20px;
          font-size: 24px;
        }

        @media (min-width: $breakpoint-laptop) {
          padding: 15px 25px;
          font-size: 32px;
        }

        @media (min-width: $breakpoint-desktop) {
          padding: 20px 30px;
          font-size: 44px;
        }
      }
    }

    .map-placeholder {
      width: 100%;
      height: 360px;
      overflow: hidden;
      margin-bottom: 40px;
      border-radius: 20px;

      @media (min-width: $breakpoint-tablet) {
        height: 440px;
      }

      @media (min-width: $breakpoint-laptop) {
        height: 520px;
        border-radius: 30px;
      }

      @media (min-width: $breakpoint-desktop) {
        height: 620px;
        border-radius: 40px;
      }
    }
  }
</style>