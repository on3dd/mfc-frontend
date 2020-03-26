<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <div class="title__text">
        Откуда вы планируете добираться?
      </div>
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
  export default class ScreenDeparturePoint extends Vue {}
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';

  .screen-inner {
    @include screen-inner;
    position: relative;

    .title {
      margin-bottom: 65px;

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