<template>
  <div class="info">
    <aside class="info__logo">
      <img class="info__logo__image" src="../assets/images/mfc-logo-full.svg" alt="">
    </aside>
    <section class="info__data">
      <h2 class="info__data__header">Наиболее удобное отделение</h2>
      <div class="info__data__details">
        <h3 class="info__data__details__header">Партизанский просп., 28А</h3>
        <span class="info__data__details__phone">+7 (423) 201-01-56</span>
        <span class="info__data__details__estimated-time">
          <span class="big">Дорога до отделения</span>
          <br>
          и
          <span class="big">получение услуги</span>
          займут около
          <span class="time">~{{time}} минут</span>
        </span>
      </div>
      <section class="info__data__statistics">
        <h2 class="info__data__statistics__header">Статистика загруженности</h2>
        <div class="info__data__statistics__list">
          <div class="info__data__statistics__list__item">
            <span class="info__data__statistics__list__item__header">
              В очереди:
            </span>
            <div class="info__data__statistics__list__item__data">
              <img src="../assets/images/human-icon.svg" alt="" class="info__data__statistics__list__item__data__image">
              <span class="info__data__statistics__list__item__data__amount">{{statistics.pendingTicketsCount || 0}}</span>
            </div>
          </div>
          <div class="info__data__statistics__list__item">
            <span class="info__data__statistics__list__item__header">
              Обслужено сегодня:
            </span>
            <div class="info__data__statistics__list__item__data">
              <img src="../assets/images/human-icon.svg" alt="" class="info__data__statistics__list__item__data__image">
              <span class="info__data__statistics__list__item__data__amount">{{statistics.completedTicketsCount || 0}}</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter, Action} from "vuex-class";
  import StatisticsItem from "@/@types/statisticsItem";

  @Component
  export default class ScreenComputedResultInfo extends Vue {
    @Getter time!: number;
    @Getter statistics!: StatisticsItem;
    @Action fetchStatistics!: () => void;

    async mounted() {
      this.fetchStatistics();
    }
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';

  .info {
    display: flex;
    justify-content: center;
    margin-bottom: 84px;

    &__logo {
      margin-right: 65px;

      &__image {
        max-width: 325px;
      }
    }

    &__data {
      &__header {
        @include bold-text;
        color: #000000;
        font-size: 40px;
        line-height: 1.5em;
        margin-bottom: 20px;
      }

      &__details {
        padding: 30px;
        color: #ffffff;
        background: $mfc-orange;
        border-radius: 20px;
        margin-bottom: 35px;

        &__header {
          @include bold-text;
          display: block;
          font-size: 42px;
          line-height: 1.5em;
        }

        &__phone {
          display: block;
          font-size: 36px;
          line-height: 1.5em;
        }

        &__estimated-time {
          display: block;
          font-size: 24px;
          line-height: 28px;

          .big {
            @include bold-text;
          }

          .time {
            @include bold-text;
            display: block;
            font-size: 72px;
            line-height: 1.5em;
            text-transform: none;
          }
        }
      }

      &__statistics {

        &__header {
          @include bold-text;
          font-size: 28px;
          line-height: 1.5em;
          margin-bottom: 8px;
        }

        &__list {
          display: flex;

          &__item {
            margin-right: 68px;

            &__header {
              font-size: 24px;
              line-height: 1.5em;
              text-transform: uppercase;
            }
            
            &__data {
              display: flex;
              align-items: center;

              &__image {
                margin-left: -20px;
                margin-right: 5px;
              }

              &__amount {
                @include bold-text;
                font-size: 72px;
                line-height: 1.5em;
              }
            }
          }
        }
      }
    }
  }
</style>