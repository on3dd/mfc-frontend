<template>
  <div class="other-options">
    <h2 class="other-options__header">Другие варианты</h2>
    <div class="other-options__list">
      <ScreenOtherOptionsItem
          v-for="(item, idx) in possibleOptions"
          :key="idx"
          :street="item.name.split(',').slice(0,2).join()"
          :estimated-time="item.time"
      />
    </div>
    <div class="appointment">
      <h2 class="appointment__header">
        Если вы не нашли для себя подходящего варианта, <br>
        можно перенести посещение мфц
      </h2>
      <button class="appointment__button">
        Записаться на более удобное время
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from "vuex-class";
  import ScreenOtherOptionsItem from "./ScreenOtherOptionsItem.vue";
  import PossibleOption from "@/@types/possibleOption";

  @Component({
    components: {
      ScreenOtherOptionsItem,
    }
  })
  export default class ScreenOtherOptions extends Vue {
    @Getter possibleOptions!: Array<PossibleOption>;
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/button';
  @import '../scss/colors';
  @import '../scss/breakpoints';

  .other-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px 40px;
    background: $mfc-beige;

    @media (min-width: $breakpoint-tablet) {
      padding: 25px 45px;
    }

    @media (min-width: $breakpoint-laptop) {
      padding: 30px 50px;
    }

    @media (min-width: $breakpoint-desktop) {
      padding: 60px;
    }

    &__header {
      @include bold-text;
      font-size: 14px;
      margin-bottom: 16px;
      line-height: 1.5em;
      text-align: center;

      @media (min-width: $breakpoint-tablet) {
        font-size: 22px;
        margin-bottom: 25px;
      }

      @media (min-width: $breakpoint-laptop) {
        font-size: 28px;
        margin-bottom: 34px;
      }

      @media (min-width: $breakpoint-desktop) {
        font-size: 36px;
        margin-bottom: 43px;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;

      @media (min-width: $breakpoint-tablet) {
        flex-direction: row;
      }

      @media (min-width: $breakpoint-desktop) {
        max-width: 1200px;
        margin-bottom: 120px;
      }
    }

    .appointment {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__header {
        @include bold-text;
        font-size: 14px;
        line-height: 1.5em;
        text-align: center;
        margin-bottom: 5px;

        @media (min-width: $breakpoint-tablet) {
          font-size: 18px;
          margin-bottom: 10px;
        }

        @media (min-width: $breakpoint-laptop) {
          font-size: 22px;
        }

        @media (min-width: $breakpoint-desktop) {
          font-size: 24px;
        }
      }

      &__button {
        @include base-button($mfc-orange);
        @include bold-text;
        font-size: 14px;
        line-height: 1em;
        border-radius: 20px;
        padding: 10px 20px;
        margin-bottom: 40px;

        @media (min-width: $breakpoint-tablet) {
          font-size: 18px;
          line-height: 1.5em;
          border-radius: 40px;
          padding: 17.5px 40px;
        }

        @media (min-width: $breakpoint-laptop) {
          font-size: 22px;
          border-radius: 60px;
          padding: 25px 50px;
        }

        @media (min-width: $breakpoint-desktop) {
          font-size: 24px;
          border-radius: 80px;
          padding: 30px 60px;
        }
      }
    }
  }
</style>