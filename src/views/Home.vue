<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <section
          v-if="screen === 0"
          :key="screen"
          :class="['screen', screen === 0 ? 'active' : '']"
      >
        <ScreenHome/>
        <img class="mfc-logo" src="../assets/images/mfc-logo.svg" alt="Лого МФЦ">
      </section>
      <section
          v-else-if="screen === 1"
          :key="screen"
          :class="['screen', screen === 1 ? 'active' : '']"
      >
        <ScreenSelectDeparturePoint/>
      </section>
      <section
          v-else-if="screen === 2"
          :key="screen"
          :class="['screen', screen === 2 ? 'active' : '']"
      >
        <ScreenSelectTravelWay/>
      </section>
      <section
          v-else-if="screen === 3"
          :key="screen"
          :class="['screen', screen === 3 ? 'active' : '']"
      >
        <ScreenSelectService/>
      </section>
      <section
          v-else
          :key="screen"
          :class="['screen', screen === 4 ? 'active' : '']"
      >
        <section
            v-if="isUILocked"
            :key="isUILocked"
            style="width: 100%;z-index: 100;"
        >
          <BasePreloader/>
        </section>
        <section style="width: 100%;">
          <ScreenComputedResult @showModal="showModal"/>
          <ScreenOtherOptions/>
        </section>
      </section>
    </transition>
    <transition name="fade" mode="out-in">
      <ModalChangeSelectionOptions
          v-if="isMainModalVisible"
          @selectModal="selectModal"
          @closeModal="closeModal"
      />
      <ModalChangeDeparturePoint
          v-else-if="activeModal === 'departure-point'"
          :key="activeModal"
          @closeModal="closeModal"
      />
      <ModalChangeTravelWay
          v-else-if="activeModal === 'travel-way'"
          :key="activeModal"
          @closeModal="closeModal"
      />
      <ModalChangeService
          v-else-if="activeModal === 'service'"
          :key="activeModal"
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
  import BasePreloader from "@/components/BasePreloader.vue";

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
      BasePreloader,
    }
  })
  export default class Home extends Vue {
    @Getter screen!: number;
    @Getter isUILocked!: boolean;

    private isMainModalVisible = false;
    private activeModal = '';

    mounted() {
      document.addEventListener('click', (evt: MouseEvent) => {
        if (!(this.isMainModalVisible || (this.activeModal !== ''))) return;
        if ((evt.target as HTMLElement).classList.contains('modal-wrapper')) {
          this.isMainModalVisible = false;
          this.activeModal = '';
        }
      });
    }

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

  .fade-enter, .fade-leave-to {
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
