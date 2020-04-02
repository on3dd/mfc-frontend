<template>
  <div class="screen-inner">
    <MFCLogo/>
    <div class="title">
      <h2 class="title__text">
        Выбор услуги
      </h2>
    </div>
    <div class="description">
      <h3 class="description__text">* ДЛЯ БОЛЕЕ ТОЧНОГО РАСЧЁТА ВРЕМЕНИ РЕКОМЕНДУЕТСЯ выбрать необходимую услугу</h3>
    </div>
    <div class="input">
      <BaseDatalist
          @select="changeService"
          name="select-service"
          :data="['first', 'second', 'third', 'fourth', 'fifth', 'sixth']"
          placeholder="Выберите услугу"
      />
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
  import BaseDatalist from "./BaseDatalist.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";

  @Component({
    components: {
      MFCLogo,
      BaseInput,
      BaseDatalist,
      PrevButton,
      NextButton,
    }
  })
  export default class ScreenSelectService extends Vue {
    @Mutation updateService!: (service: string) => void;

    private changeService(service: string) {
      this.updateService(service);
      sessionStorage.setItem('service', service);
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
      margin-bottom: 1rem;
      max-width: 90%;
      align-self: center;

      @media (min-width: $breakpoint-desktop) {
        margin-top: 105px;
        margin-bottom: 30px;
      }

      &__text {
        @include bold-text;
        color: #000000;
        font-size: 36px;
        line-height: 1.5em;
        text-align: center;
      }
    }

    .description {
      margin-bottom: 45px;

      @media (min-width: $breakpoint-desktop) {
        margin-bottom: 50px;
      }

      &__text {
        @include bold-text;
        display: block;
        font-family: 'Circe', sans-serif;
        font-size: 14px;
        line-height: 1.2em;
        text-align: center;
        text-transform: lowercase;
        color: $mfc-light-gray;

        @media (min-width: $breakpoint-desktop) {
          font-size: 28px;
          line-height: 1.5em;
        }
      }
    }
  }

</style>