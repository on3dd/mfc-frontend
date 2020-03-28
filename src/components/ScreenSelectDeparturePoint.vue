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
          :data="points.map((el) => el.name)"
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
  import BaseDatalist from "./BaseDatalist.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";
  import DeparturePoint from "@/types/departurePoint";

  @Component({
    components: {
      MFCLogo,
      BaseDatalist,
      PrevButton,
      NextButton,
    }
  })
  export default class ScreenSelectDeparturePoint extends Vue {
    @Mutation updateDeparturePoint!: (departurePoint: DeparturePoint) => void;

    private points: DeparturePoint[] = [
      {
        name: 'Сквер им. Суханова',
        position: {
          lat: 43.118096,
          lng: 131.891598
        }
      },
      {
        name: 'Покровский парк',
        position: {
          lat: 43.125259,
          lng: 131.892088
        }
      },
      {
        name: 'Набережная Спортивной гавани',
        position: {
          lat: 43.117884,
          lng: 131.877352
        }
      },
      {
        name: 'Сквер "Писательский"',
        position: {
          lat: 43.12988,
          lng: 131.909459
        }
      },
      {
        name: 'Военно-исторический музей Тихоокеанского флота',
        position: {
          lat: 43.112769,
          lng: 131.890472
        }
      },];

    private changeDeparturePoint(pointName: string) {
      const departurePoint = this.points.find((el) => el.name === pointName.trim());
      if (departurePoint === undefined) return;

      this.updateDeparturePoint(departurePoint);
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