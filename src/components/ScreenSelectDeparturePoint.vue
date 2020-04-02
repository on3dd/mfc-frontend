<template>
  <div class="screen-inner">
    <MFCLogo style="margin-bottom: 100px;"/>
    <div class="title">
      <h2 class="title__text">
        Откуда вы планируете добираться?
      </h2>
    </div>
    <div class="input">
      <BaseDatalist
          @select="changeDeparturePoint"
          name="select-service"
          :data="pointNames"
          placeholder="Ваше местоположение"
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
  import {Getter, Mutation} from "vuex-class";
  import MFCLogo from "./MFCLogo.vue";
  import BaseDatalist from "./BaseDatalist.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";
  import DeparturePoint from "@/@types/departurePoint";

  @Component({
    components: {
      MFCLogo,
      BaseDatalist,
      PrevButton,
      NextButton,
    }
  })
  export default class ScreenSelectDeparturePoint extends Vue {
    @Getter points!: DeparturePoint[];
    @Getter pointNames!: string[];
    @Mutation updateDeparturePoint!: (departurePoint: DeparturePoint) => void;

    mounted() {
      this.fetchGeolocation();
    }

    private fetchGeolocation() {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
      };

      const success = (pos: Position) => {
        const crd = pos.coords;

        console.log('Ваше текущее метоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);

        const departurePoint = {
          name: 'Мое местоположение - определено автоматически',
          position: {
            lat: crd.latitude,
            lng: crd.longitude,
          }
        };

        this.updateDeparturePoint(departurePoint);
        sessionStorage.setItem('departurePoint', JSON.stringify(departurePoint))
      };

      const error = (err: PositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }

    private changeDeparturePoint(pointName: string) {
      const departurePoint = this.points.find((el) => el.name === pointName.trim());
      if (departurePoint === undefined) return;

      this.updateDeparturePoint(departurePoint);
      sessionStorage.setItem('departurePoint', JSON.stringify(departurePoint))
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