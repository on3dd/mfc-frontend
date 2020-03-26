<template>
  <div :id="name" class="travel-ways-group__item" @click="clickHandler" ref="placeholder">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class IconTravelWay extends Vue {
    $refs!: {
      placeholder: HTMLDivElement;
    };

    @Prop({type: String, required: true}) name!: string;

    private clickHandler() {
      this.$emit('changeTravelWay', this.name);
      this.$refs.placeholder.querySelector('.travel-ways-group__item__image')!.classList.add('active');
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/bold-text";

  .travel-ways-group__item {
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
      };
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
</style>