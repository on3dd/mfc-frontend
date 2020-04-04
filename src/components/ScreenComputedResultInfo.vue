<template>
  <div class="info">
    <aside class="info__logo">
      <img class="info__logo__image" src="../assets/images/mfc-logo-full.svg" alt="">
    </aside>
    <section class="info__data">
      <h2 class="info__data__header">Наиболее удобное отделение</h2>
      <div class="info__data__details">
        <h3 class="info__data__details__header">{{bestOption.name.split(',').slice(1, 3).join(', ').replace('ул.', '')}}</h3>
        <span class="info__data__details__phone">+7 (423) 201-01-56</span>
        <span class="info__data__details__estimated-time">
          <span class="big">Дорога до отделения</span>
          <br>
          и
          <span class="big">получение услуги</span>
          займут около
          <span class="time">~{{bestOption.time}} {{wordDeclension}}</span>
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
              <span
                  class="info__data__statistics__list__item__data__amount">{{statistics.pendingTicketsCount || 0}}</span>
            </div>
          </div>
          <div class="info__data__statistics__list__item">
            <span class="info__data__statistics__list__item__header">
              Обслужено сегодня:
            </span>
            <div class="info__data__statistics__list__item__data">
              <img src="../assets/images/human-icon.svg" alt="" class="info__data__statistics__list__item__data__image">
              <span
                  class="info__data__statistics__list__item__data__amount">{{statistics.completedTicketsCount || 0}}</span>
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
  import PossibleOption from "@/@types/possibleOption";

  @Component
  export default class ScreenComputedResultInfo extends Vue {
    @Getter bestOption!: PossibleOption;
    @Getter statistics!: StatisticsItem;
    @Action fetchStatistics!: () => void;

    async mounted() {
      await this.fetchStatistics();
    }

    private get wordDeclension(): string {
      const dozens = Math.floor(this.bestOption.time / 10);
      switch (this.bestOption.time % 10) {
        case 1:
          if (dozens === 1) return 'минут';
          return 'минута';
        case 2:
        case 3:
        case 4:
          if (dozens === 1) return 'минут';
          return 'минуты';
        default:
          return 'минут';
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';
  @import '../scss/breakpoints';

  .info {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    /*max-width: calc(100% );*/

    @media (min-width: $breakpoint-desktop) {
      margin-bottom: 84px;
    }

    &__logo {
      display: none;
      /*width: 100%;*/
      margin-right: 20px;

      @media (min-width: $breakpoint-phone) {
        display: block;
      }

      @media (min-width: $breakpoint-tablet) {
        margin-right: 35px;
      }

      @media (min-width: $breakpoint-laptop) {
        margin-right: 50px;
      }

      @media (min-width: $breakpoint-desktop) {
        margin-right: 65px;
      }

      &__image {
        @media (min-width: $breakpoint-phone) {
          max-width: 90px;
        }

        @media (min-width: $breakpoint-tablet) {
          max-width: 145px;
        }

        @media (min-width: $breakpoint-laptop) {
          max-width: 225px;
        }

        @media (min-width: $breakpoint-desktop) {
          max-width: 325px;
        }

      }
    }

    &__data {
      display: flex;
      flex-direction: column;
      justify-content: center;


      &__header {
        @include bold-text;
        color: #000000;
        font-size: 18px;
        line-height: 1.5em;
        margin-bottom: 20px;

        @media (max-width: $breakpoint-phone) {
          text-align: center;
        }

        @media (min-width: $breakpoint-tablet) {
          font-size: 24px;
        }

        @media (min-width: $breakpoint-laptop) {
          font-size: 32px;
        }

        @media (min-width: $breakpoint-desktop) {
          font-size: 40px;
        }
      }

      &__details {
        padding: 15px;
        color: #ffffff;
        background: $mfc-orange;
        border-radius: 20px;
        margin-bottom: 35px;
        display: inline-block;

        @media (max-width: $breakpoint-phone) {
          text-align: center;
        }

        @media (min-width: $breakpoint-tablet) {
          padding: 20px;
        }

        @media (min-width: $breakpoint-laptop) {
          padding: 25px;
        }

        @media (min-width: $breakpoint-desktop) {
          padding: 30px;
        }

        &__header {
          @include bold-text;
          display: block;
          font-size: 18px;
          line-height: 1.2em;

          @media (min-width: $breakpoint-tablet) {
            font-size: 24px;
            line-height: 1.5em;
          }

          @media (min-width: $breakpoint-laptop) {
            font-size: 32px;
          }

          @media (min-width: $breakpoint-desktop) {
            font-size: 42px;
          }
        }

        &__phone {
          display: block;
          font-size: 14px;
          line-height: 1.5em;

          @media (min-width: $breakpoint-tablet) {
            font-size: 20px;
          }

          @media (min-width: $breakpoint-laptop) {
            font-size: 28px;
          }

          @media (min-width: $breakpoint-desktop) {
            font-size: 36px;
          }
        }

        &__estimated-time {
          display: block;
          font-size: 14px;
          line-height: 1.1em;

          @media (min-width: $breakpoint-tablet) {
            font-size: 18px;
          }

          @media (min-width: $breakpoint-laptop) {
            font-size: 20px;
          }

          @media (min-width: $breakpoint-desktop) {
            font-size: 24px;
          }

          .big {
            @include bold-text;
          }

          .time {
            @include bold-text;
            display: block;
            font-size: 24px;
            line-height: 1.5em;
            text-transform: none;

            @media (min-width: $breakpoint-tablet) {
              font-size: 42px;
            }

            @media (min-width: $breakpoint-laptop) {
              font-size: 54px;
            }

            @media (min-width: $breakpoint-desktop) {
              font-size: 72px;
            }
          }
        }
      }

      &__statistics {
        &__header {
          @include bold-text;
          font-size: 18px;
          line-height: 1.5em;
          margin-bottom: 4px;

          @media (max-width: $breakpoint-phone) {
            text-align: center;
          }

          @media (min-width: $breakpoint-tablet) {
            font-size: 22px;
            margin-bottom: 8px;
          }

          @media (min-width: $breakpoint-laptop) {
            font-size: 24px;
          }

          @media (min-width: $breakpoint-desktop) {
            font-size: 28px;
          }
        }

        &__list {
          display: flex;

          @media (max-width: $breakpoint-phone) {
            justify-content: center;
          }

          &__item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &:first-child {
              margin-right: 23px;

              @media (min-width: $breakpoint-tablet) {
                margin-right: 40px;
              }

              @media (min-width: $breakpoint-laptop) {
                margin-right: 54px;
              }

              @media (min-width: $breakpoint-desktop) {
                margin-right: 68px;
              }
            }

            @media (max-width: $breakpoint-phone) {
              flex-basis: 100%;
              align-items: center;
            }

            &__header {
              font-size: 14px;
              line-height: 1.5em;
              text-transform: uppercase;

              @media (max-width: $breakpoint-phone) {
                text-align: center;
              }

              @media (min-width: $breakpoint-tablet) {
                font-size: 18px;
              }

              @media (min-width: $breakpoint-laptop) {
                font-size: 22px;
              }

              @media (min-width: $breakpoint-desktop) {
                font-size: 24px;
              }
            }

            &__data {
              display: inline-flex;
              align-items: center;

              &__image {
                margin-left: -20px;
                margin-right: 5px;
                height: 54px;
                width: 54px;

                @media (min-width: $breakpoint-tablet) {
                  height: 72px;
                  width: 72px;
                }

                @media (min-width: $breakpoint-laptop) {
                  height: 90px;
                  width: 90px;
                }

                @media (min-width: $breakpoint-desktop) {
                  height: 106px;
                  width: 106px;
                }
              }

              &__amount {
                @include bold-text;
                font-size: 36px;
                line-height: 1.5em;

                @media (min-width: $breakpoint-desktop) {
                  font-size: 72px;

                }
              }
            }
          }
        }
      }
    }
  }
</style>