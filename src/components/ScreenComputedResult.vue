<template>
  <div>
    <div class="screen-inner">
      <MFCLogo style="margin-bottom: 25px;"/>
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
      <div class="map-placeholder"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MFCLogo from "./MFCLogo.vue";
  import ScreenComputedResultInfo from "./ScreenComputedResultInfo.vue";

  @Component({
    components: {
      MFCLogo,
      ScreenComputedResultInfo,
    }
  })
  export default class ScreenComputedResult extends Vue {}
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';
  @import '../scss/button';

  .screen-inner {
    @include screen-inner;
    height: 100%;
    position: relative;

    .ready {
      font-size: 48px;
      margin-bottom: 1em;

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
      margin-bottom: 70px;

      &__button {
        @include base-button;
        background: $mfc-orange;
        border-radius: 20px;
        font-size: 44px;
        line-height: 1em;
        padding: 20px 30px;
      }
    }

    .map-placeholder {
      width: 100%;
      height: 622px;
      border: 1px solid #000000;
      margin-bottom: 70px;
    }
  }
</style>