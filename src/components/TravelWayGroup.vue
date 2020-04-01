<template>
  <div class="travel-ways-group">
    <IconTravelWay
        name="walking"
        @changeTravelWay="changeTravelWay($event)"
    >
      <img
          :class="{'travel-ways-group__item__image': true, active: travelWay === 'walking'}"
          src="../assets/images/afoot-icon.svg"
          alt="Пешком">
      <span class="travel-ways-group__item__text">Пешком</span>
    </IconTravelWay>
    <IconTravelWay
        name="driving"
        @changeTravelWay="changeTravelWay($event)"
    >
      <img
          :class="{'travel-ways-group__item__image': true, active: travelWay === 'driving'}"
          src="../assets/images/car-icon.svg"
          alt="На машине">
      <span class="travel-ways-group__item__text">Авто</span>
    </IconTravelWay>
    <IconTravelWay
        name="transit"
        @changeTravelWay="changeTravelWay($event)"
    >
      <img
          :class="{'travel-ways-group__item__image': true, active: travelWay === 'transit'}"
          src="../assets/images/bus-icon.svg"
          alt="Общественным транспортом">
      <span class="travel-ways-group__item__text">Общественный транспорт</span>
    </IconTravelWay>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import IconTravelWay from '@/components/IconTravelWay.vue'

  @Component({
    components: {
      IconTravelWay,
    }
  })
  export default class TravelWayGroup extends Vue {
    @Getter travelWay!: string;
    @Mutation updateTravelWay!: (name: string) => void;

    mounted() {
      this.updateTravelWay('walking');
    }

    changeTravelWay(name: string) {
      this.updateTravelWay(name);
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
        transition: all .2s ease-out;
        filter: grayscale(100%) brightness(150%);

        &:hover {
          filter: grayscale(100%) brightness(125%);
        }

        &.active {
          filter: none;
        }
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