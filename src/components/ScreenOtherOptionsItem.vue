<template>
  <div class="other-options__list__item">
    <img src="../assets/images/mfc-logo-full.svg" alt="" class="other-options__list__item__image">
    <div class="other-options__list__item__info">
      <h3 class="other-options__list__item__info__street">{{street}}</h3>
      <span class="other-options__list__item__info__estimated-time">
        получение услуги займет примерно
        <span class="time">~{{estimatedTime}} минут</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class ScreenOtherOptionsItem extends Vue {
    @Prop({type: String, required: true}) street!: string;
    @Prop({type: Number, required: true}) estimatedTime!: number;
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/button';
  @import '../scss/colors';
  @import '../scss/breakpoints';

  .other-options__list__item {
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    @media (min-width: $breakpoint-laptop) {
      margin-right: 20px;
    }

    @media (min-width: $breakpoint-desktop) {
      margin-right: 50px;
    }

    &__image {
      max-width: 40px;
      margin-right: 20px;

      @media (min-width: $breakpoint-tablet) {
        max-width: 60px;
        margin-right: 25px;
      }

      @media (min-width: $breakpoint-laptop) {
        max-width: 80px;
        margin-right: 30px;
      }

      @media (min-width: $breakpoint-desktop) {
        max-width: 100px;
        margin-right: 40px;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;

      padding: 20px;
      border: 4px solid #CB9B63;
      border-radius: 20px;

      @media (min-width: $breakpoint-tablet) {
        max-width: 340px;
      }

      &__street {
        @include bold-text;
        font-size: 14px;
        line-height: 1.5em;
        margin-bottom: 5px;

        @media (min-width: $breakpoint-tablet) {
          font-size: 18px;
          margin-bottom: 9px;
        }

        @media (min-width: $breakpoint-laptop) {
          font-size: 20px;
        }

        @media (min-width: $breakpoint-desktop) {
          font-size: 22px;
        }
      }

      &__estimated-time {
        font-size: 14px;
        line-height: 1em;
        color: #060505;
        text-transform: uppercase;

        @media (min-width: $breakpoint-tablet) {
          line-height: 1.5em;
        }

        @media (min-width: $breakpoint-desktop) {
          line-height: 2em;
        }

        .time {
          @include bold-text;
          display: block;
          font-size: 18px;
          line-height: 1em;
          margin-top: 5px;

          @media (min-width: $breakpoint-tablet) {
            font-size: 24px;
            line-height: 1.5em;
            margin-top: 0;
          }

          @media (min-width: $breakpoint-laptop) {
            font-size: 30px;
          }

          @media (min-width: $breakpoint-desktop) {
            font-size: 36px;
          }
        }
      }
    }
  }
</style>