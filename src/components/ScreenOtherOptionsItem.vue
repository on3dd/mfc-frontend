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

  .other-options__list__item {
    display: flex;
    align-items: center;
    margin-right: 50px;
    margin-bottom: 50px;

    &__image {
      width: 100px;
      margin-right: 40px;
    }

    &__info {
      padding: 20px;
      border: 4px solid #CB9B63;
      border-radius: 20px;

      &__street {
        @include bold-text;
        font-size: 22px;
        line-height: 1.5em;
        margin-bottom: 9px;
      }

      &__estimated-time {
        font-size: 14px;
        line-height: 2em;
        color: #060505;
        text-transform: uppercase;

        .time {
          @include bold-text;
          display: block;
          font-size: 36px;
          line-height: 1.5em;
        }
      }
    }
  }
</style>