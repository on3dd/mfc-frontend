<template>
  <div class="home">
    <div v-if="screen === 0" class="screen">
      <ScreenHome/>
      <img class="mfc-logo" src="../assets/images/mfc-logo.svg" alt="Лого МФЦ">
    </div>
    <div v-else-if="screen === 1" :key="screen" class="screen">
      <ScreenDeparturePoint/>
    </div>
    <div v-else-if="screen === 2" :key="screen" class="screen">
      <ScreenSelectTravelWay/>
    </div>
    <div v-else-if="screen === 3" :key="screen" class="screen">
      <ScreenSelectService/>
    </div>
    <div v-else :key="screen" class="screen">
      <ScreenComputedResult/>
      <ScreenOtherOptions/>
    </div>
    <ModalChangeSelectionOptions/>
    <ModalChangeDeparturePoint/>
    <ModalChangeTravelWay/>
    <ModalChangeService/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import ScreenHome from '@/components/ScreenHome.vue';
  import ScreenDeparturePoint from '@/components/ScreenDeparturePoint.vue';
  import ScreenSelectTravelWay from '@/components/ScreenSelectTravelWay.vue';
  import ScreenSelectService from "@/components/ScreenSelectService.vue";
  import ScreenComputedResult from "@/components/ScreenComputedResult.vue";
  import ScreenOtherOptions from "@/components/ScreenOtherOptions.vue";
  import ModalChangeSelectionOptions from "@/components/ModalChangeSelectionOptions.vue";
  import ModalChangeDeparturePoint from "@/components/ModalChangeDeparturePoint.vue";
  import ModalChangeTravelWay from "@/components/ModalChangeTravelWay.vue";
  import ModalChangeService from "@/components/ModalChangeService.vue";

  @Component({
    components: {
      ScreenHome,
      ScreenDeparturePoint,
      ScreenSelectTravelWay,
      ScreenSelectService,
      ScreenComputedResult,
      ScreenOtherOptions,
      ModalChangeSelectionOptions,
      ModalChangeDeparturePoint,
      ModalChangeTravelWay,
      ModalChangeService,
    }
  })
  export default class Home extends Vue {
    @Getter screen!: number;
  }
</script>

<style scoped lang="scss">
  .home {
    .screen {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .mfc-logo {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: -1;
    }
  }
</style>
