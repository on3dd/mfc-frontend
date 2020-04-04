<template>
  <div
      :class="['travel-ways-group', isDisabled ? 'disabled' : '']"
  >
    <IconTravelWay
        @changeTravelWay="changeTravelWay($event)"
        :is-disabled="isDisabled"
        name="walking"
    >
      <img
          :class="{'travel-ways-group__item__image': true, active: travelWay === 'walking'}"
          src="../assets/images/afoot-icon.svg"
          alt="Пешком">
      <span class="travel-ways-group__item__text">Пешком</span>
    </IconTravelWay>
    <IconTravelWay
        @changeTravelWay="changeTravelWay($event)"
        :is-disabled="isDisabled"
        name="driving"
    >
      <img
          :class="{'travel-ways-group__item__image': true, active: travelWay === 'driving'}"
          src="../assets/images/car-icon.svg"
          alt="На машине">
      <span class="travel-ways-group__item__text">Авто</span>
    </IconTravelWay>
    <IconTravelWay
        @changeTravelWay="changeTravelWay($event)"
        :is-disabled="isDisabled"
        name="transit"
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
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import IconTravelWay from '@/components/IconTravelWay.vue'

  @Component({
    components: {
      IconTravelWay,
    }
  })
  export default class TravelWayGroup extends Vue {
    @Prop({type: Boolean, required: true}) isDisabled!: boolean;

    @Getter travelWay!: string;
    @Mutation updateTravelWay!: (travelWay: string) => void;

    changeTravelWay(travelWay: string) {
      this.updateTravelWay(travelWay);
      sessionStorage.setItem('travelWay', travelWay);

      this.$emit('select');
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/bold-text";

  .travel-ways-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
    transition: all .1s ease-out;

    &.disabled {
      filter: grayscale(100%);
    }

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
    }
  }
</style>