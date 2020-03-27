<template>
  <div class="home">
    <div
        v-if="screen === 0"
        :class="{'screen': true, active: screen === 0}"
    >
      <ScreenHome/>
      <img class="mfc-logo" src="../assets/images/mfc-logo.svg" alt="Лого МФЦ">
    </div>
    <div
        v-else-if="screen === 1"
        :key="screen"
        :class="{'screen': true, active: screen === 1}"
    >
      <ScreenDeparturePoint/>
    </div>
    <div
        v-else-if="screen === 2"
        :key="screen"
        :class="{'screen': true, active: screen === 2}"
    >
      <ScreenSelectTravelWay/>
    </div>
    <div
        v-else-if="screen === 3"
        :key="screen"
        :class="{'screen': true, active: screen === 3}"
    >
      <ScreenSelectService/>
    </div>
    <div
        v-else
        :key="screen"
        :class="{'screen': true, active: screen === 4}"
    >
      <ScreenComputedResult @showModal="showModal"/>
      <ScreenOtherOptions/>
    </div>
    <ModalChangeSelectionOptions
        v-if="isMainModalVisible"
        @selectModal="selectModal"
        @closeModal="closeModal"
    />
    <ModalChangeDeparturePoint
        v-if="activeModal === 'departure-point'"
        @closeModal="closeModal"
    />
    <ModalChangeTravelWay
        v-if="activeModal === 'travel-way'"
        @closeModal="closeModal"
    />
    <ModalChangeService
        v-if="activeModal === 'service'"
        @closeModal="closeModal"
    />
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

    private isMainModalVisible = false;
    private activeModal = '';

    private showModal() {
      this.isMainModalVisible = true;
    }

    private selectModal(name: string) {
      this.isMainModalVisible = false;
      this.activeModal = name;
    }

    private closeModal() {
      this.activeModal = '';
      this.isMainModalVisible = false;
    }
  }
</script>

<style scoped lang="scss">
  .home {
    .screen {
      display: none;
      opacity: 0;
      transition: opacity .2s ease-out;

      &.active {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 1;
      }
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
