<template>
  <div class="travel-ways-group" ref="travelWaysGroup">
    <IconTravelWay name="afoot" @changeTravelWay="changeTravelWay($event)">
      <img class="travel-ways-group__item__image active" src="../assets/images/afoot-icon.svg" alt="Пешком">
      <span class="travel-ways-group__item__text">Пешком</span>
    </IconTravelWay>
    <IconTravelWay name="car" @changeTravelWay="changeTravelWay($event)">
      <img class="travel-ways-group__item__image" src="../assets/images/car-icon.svg" alt="Пешком">
      <span class="travel-ways-group__item__text">Авто</span>
    </IconTravelWay>
    <IconTravelWay name="bus" @changeTravelWay="changeTravelWay($event)">
      <img class="travel-ways-group__item__image" src="../assets/images/bus-icon.svg" alt="Пешком">
      <span class="travel-ways-group__item__text">Общественный транспорт</span>
    </IconTravelWay>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Mutation} from "vuex-class";
  import IconTravelWay from '@/components/IconTravelWay.vue'

  @Component({
    components: {
      IconTravelWay,
    }
  })
  export default class TravelWayGroup extends Vue {
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
  @import "../scss/bold-text";

  .travel-ways-group {
    width: 100%;
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
</style>