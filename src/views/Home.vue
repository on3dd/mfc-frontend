<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <div
          v-if="screen === 0"
          :key="screen"
          v-cloak
          :class="['screen', screen === 0 ? 'active' : '']"
      >
        <ScreenHome/>
        <img class="mfc-logo" src="../assets/images/mfc-logo.svg" alt="Лого МФЦ">
      </div>
      <div
          v-else-if="screen === 1"
          :key="screen"
          v-cloak
          :class="['screen', screen === 1 ? 'active' : '']"
      >
        <ScreenSelectDeparturePoint/>
      </div>
      <div
          v-else-if="screen === 2"
          :key="screen"
          v-cloak
          :class="['screen', screen === 2 ? 'active' : '']"
      >
        <ScreenSelectTravelWay/>
      </div>
      <div
          v-else-if="screen === 3"
          :key="screen"
          v-cloak
          :class="['screen', screen === 3 ? 'active' : '']"
      >
        <ScreenSelectService/>
      </div>
      <div
          v-else
          :key="screen"
          v-cloak
          :class="['screen', screen === 4 ? 'active' : '']"
      >
        <ScreenComputedResult
            @showModal="showModal"
            v-cloak
        />
        <ScreenOtherOptions v-cloak/>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <ModalChangeSelectionOptions
          v-if="isMainModalVisible"
          v-cloak
          @selectModal="selectModal"
          @closeModal="closeModal"
      />
      <ModalChangeDeparturePoint
          v-else-if="activeModal === 'departure-point'"
          :key="activeModal"
          v-cloak
          @closeModal="closeModal"
      />
      <ModalChangeTravelWay
          v-else-if="activeModal === 'travel-way'"
          :key="activeModal"
          v-cloak
          @closeModal="closeModal"
      />
      <ModalChangeService
          v-else-if="activeModal === 'service'"
          :key="activeModal"
          v-cloak
          @closeModal="closeModal"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import ScreenHome from '@/components/ScreenHome.vue';
  import ScreenSelectDeparturePoint from '@/components/ScreenSelectDeparturePoint.vue';
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
      ScreenSelectDeparturePoint,
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  .home {
    .screen {
      display: none;

      &.active {
        display: flex;
        flex-direction: column;
        align-items: center;
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
