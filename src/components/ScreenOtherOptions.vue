<template>
  <div class="other-options">
    <h2 class="other-options__header">Другие варианты</h2>
    <div class="other-options__list">
      <div class="other-options__list__item">
        <img src="../assets/images/mfc-logo-full.svg" alt="" class="other-options__list__item__image">
        <div class="other-options__list__item__info">
          <h3 class="other-options__list__item__info__street">Верхнепортовая ул., 76А</h3>
          <span class="other-options__list__item__info__estimated-time">
            получение услуги займет примерно
            <span class="time">~ 25 минут</span>
          </span>
        </div>
      </div>
      <div class="other-options__list__item">
        <img src="../assets/images/mfc-logo-full.svg" alt="" class="other-options__list__item__image">
        <div class="other-options__list__item__info">
          <h3 class="other-options__list__item__info__street">Верхнепортовая ул., 76А</h3>
          <span class="other-options__list__item__info__estimated-time">
            получение услуги займет примерно
            <span class="time">~ 25 минут</span>
          </span>
        </div>
      </div>
      <div class="other-options__list__item">
        <img src="../assets/images/mfc-logo-full.svg" alt="" class="other-options__list__item__image">
        <div class="other-options__list__item__info">
          <h3 class="other-options__list__item__info__street">Верхнепортовая ул., 76А</h3>
          <span class="other-options__list__item__info__estimated-time">
            получение услуги займет примерно
            <span class="time">~ 25 минут</span>
          </span>
        </div>
      </div>
      <div class="other-options__list__item">
        <img src="../assets/images/mfc-logo-full.svg" alt="" class="other-options__list__item__image">
        <div class="other-options__list__item__info">
          <h3 class="other-options__list__item__info__street">Верхнепортовая ул., 76А</h3>
          <span class="other-options__list__item__info__estimated-time">
            получение услуги займет примерно
            <span class="time">~ 25 минут</span>
          </span>
        </div>
      </div>
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

  @Component
  export default class ScreenOtherOptions extends Vue {}
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/button';
  @import '../scss/colors';

  .other-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 60px;
    background: $mfc-beige;

    &__header {
      @include bold-text;
      font-size: 36px;
      line-height: 1.5em;
      text-align: center;
      margin-bottom: 43px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      /*max-width: 1000px;*/
      justify-content: center;
      margin-bottom: 120px;

      &__item {
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
    }

    .appointment {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__header {
        @include bold-text;
        font-size: 24px;
        line-height: 1.5em;
        text-align: center;
        margin-bottom: 10px;
      }

      &__button {
        @include base-button;
        @include bold-text;
        font-size: 24px;
        line-height: 1.5em;
        background: $mfc-orange;
        border-radius: 80px;
        padding: 30px 60px;
        margin-bottom: 40px;
      }
    }
  }
</style>