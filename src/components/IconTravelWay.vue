<template>
  <div
      @click="clickHandler"
      :id="name"
      class="travel-ways-group__item"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class IconTravelWay extends Vue {
    @Prop({type: String, required: true}) name!: string;
    @Prop({type: Boolean, required: true}) isDisabled!: boolean;

    private clickHandler() {
      if (this.isDisabled) return;
      this.$emit('changeTravelWay', this.name);
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/bold-text";
  @import "../scss/breakpoints";

  .travel-ways-group__item {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    max-width: 86px;

    @media (min-width: $breakpoint-tablet) {
      max-width: 125px;
    }

    @media (min-width: $breakpoint-laptop) {
      max-width: 180px;
    }

    @media (min-width: $breakpoint-desktop) {
      max-width: 256px;
    }

    &__image {
      height: 86px;
      width: 86px;
      margin-bottom: 13px;
      cursor: pointer;
      transition: all .1s ease-out;


      @media (min-width: $breakpoint-tablet) {
        height: 172px;
        width: 172px;
      }

      @media (min-width: $breakpoint-laptop) {
        height: 228px;
        width: 228px;
      }

      @media (min-width: $breakpoint-desktop) {
        height: 256px;
        width: 256px;
      }

      &:hover {
        filter: brightness(90%);
      }

      &.active {
        filter: brightness(75%);
      };
    }

    &__text {
      @include bold-text;
      display: block;
      font-size: 14px;
      line-height: 12px;
      text-align: center;
      text-transform: lowercase;

      @media (min-width: $breakpoint-tablet) {
        font-size: 24px;
        line-height: 1.5rem;
        max-width: 170px;
      }
    }
  }
</style>