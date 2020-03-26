<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <h2 class="title__text">
        Выбор способа передвижения
      </h2>
    </div>
    <TravelWayGroup/>
    <div class="button-group">
      <PrevButton/>
      <NextButton/>
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
  }

</style>