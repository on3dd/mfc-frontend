<template>
  <div class="other-options">
    <h2 class="other-options__header">Другие варианты</h2>
    <div class="other-options__list">
      <ScreenOtherOptionsItem
          v-for="(item, idx) in otherOptions"
          :key="idx"
          :street="item[0].split(',').slice(0,2).join()"
          :estimated-time="item[1]"
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

  @Component({
    components: {
      ScreenOtherOptionsItem,
    }
  })
  export default class ScreenOtherOptions extends Vue {
    @Getter otherOptions!: Array<Array<string | number>>;

    private options = [
      {
        street: 'Верхнепортовая ул., 76А',
        time: 25,
      },
      {
        street: 'Верхнепортовая ул., 76А',
        time: 25,
      },
      {
        street: 'Верхнепортовая ул., 76А',
        time: 25,
      },
      {
        street: 'Верхнепортовая ул., 76А',
        time: 25,
      },
    ]
  }
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
      max-width: 1200px;
      justify-content: center;
      margin-bottom: 120px;
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
        @include base-button($mfc-orange);
        @include bold-text;
        font-size: 24px;
        line-height: 1.5em;
        border-radius: 80px;
        padding: 30px 60px;
        margin-bottom: 40px;
      }
    }
  }
</style>