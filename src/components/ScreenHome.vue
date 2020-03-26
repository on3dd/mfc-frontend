<template>
  <div class="screen">
    <div class="logo">
      <div class="logo__item">
        <img src="../assets/images/image 2.png" alt="">
      </div>
      <div class="logo__item">
        <img src="../assets/images/logo_bot 2.png" alt="">
      </div>
    </div>
    <div class="title">
      <h1 class="title__text">
        Загруженность <br> МФЦ
      </h1>
    </div>
    <div class="description">
      <h2 class="description__text">Здесь вы можете узнать, какое
        <span class="orange">отделение мфц</span>
        будет наиболее удобным для вас в данный момент</h2>
    </div>
    <div class="button-group">
      <BaseButton>
        <button class="button">Далее</button>
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import BaseButton from "./BaseButton.vue";

  @Component({
    components: {
      BaseButton,
    }
  })
  export default class ScreenHome extends Vue {
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen';
  @import '../scss/colors';

  .screen {
    @include base-screen;
    position: relative;

    .logo {
      display: inline-block;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 100px;

      &__item {
        display: block;

        img {
          float: right;
        }
      }
    }

    @mixin home-text {
      font-weight: bold;
      font-family: "Circe Extra", sans-serif;
      text-transform: uppercase;
      margin-top: 0;
      margin-bottom: 0;
    }

    .title {
      margin-bottom: 65px;

      &__text {
        @include home-text;
        color: $mfc-brown;
        font-size: 90px;
        line-height: 75px;
      }
    }

    .description {
      margin-bottom: 20px;

      &__text {
        @include home-text;
        color: #000000;
        font-size: 50px;
        line-height: 60px;
        width: 800px;

        .orange {
          color: $mfc-orange;
        }
      }
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }
  }

</style>