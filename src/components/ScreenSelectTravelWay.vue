<template>
  <div class="screen-inner">
    <MFCLogo/>
    <div class="title">
      <h2 class="title__text">
        Выбор способа передвижения
      </h2>
    </div>
    <TravelWayGroup @select="isDisabled = false"/>
    <div class="button-group">
      <PrevButton/>
      <NextButton :isDisabled="isDisabled"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MFCLogo from "./MFCLogo.vue";
  import BaseInput from "./BaseInput.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";
  import TravelWayGroup from "./TravelWayGroup.vue";

  @Component({
    components: {
      MFCLogo,
      BaseInput,
      PrevButton,
      NextButton,
      TravelWayGroup,
    }
  })
  export default class ScreenSelectTravelWay extends Vue {
    private isNextButtonDisabled = sessionStorage.getItem('travelWay') === null;

    private get isDisabled(): boolean {
      return this.isNextButtonDisabled;
    }

    private set isDisabled(val: boolean) {
      this.isNextButtonDisabled = val;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      margin-top: 55px;
      margin-bottom: 40px;
      max-width: 90%;
      align-self: center;

      @media (min-width: $breakpoint-desktop) {
        margin-top: 105px;
        margin-bottom: 30px;
      }

      &__text {
        @include bold-text;
        color: #000000;
        font-size: 28px;
        line-height: 32px;
        text-align: center;

        @media (min-width: $breakpoint-desktop) {
          font-size: 36px;
          line-height: 1.5em;
        }
      }
    }
  }

</style>