<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h2 class="modal__header">
        <img src="../assets/images/arrow-right-icon.svg" alt="" class="modal__header__icon">
        Изменение адреса отправления
      </h2>
      <div class="modal__options-list">
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Адрес отправления</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{departurePoint.name}}</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
      </div>
      <div class="modal__search">
        <BaseDatalist
            @select="changeDeparturePoint"
            name="select-departure-point"
            class="modal__search__input"
            :data="points.map((el) => el.name)"
        />
        <button
            @click="submit"
            class="modal__search__button-submit"
        >Сохранить</button>
      </div>
      <button
          @click="$emit('closeModal')"
          class="modal__button-close"
      >x</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import BaseDatalist from "./BaseDatalist.vue";
  import DeparturePoint from "@/types/departurePoint";

  @Component({
    components: {
      BaseDatalist,
    }
  })
  export default class ModalChangeDeparturePoint extends Vue {
    @Getter departurePoint!: DeparturePoint;
    @Mutation updateDeparturePoint!: (departurePoint: DeparturePoint) => void;

    private points: DeparturePoint[] = [
      {
        name: 'Сквер им. Суханова',
        position: {
          lat: 43.118096,
          lng: 131.891598
        }
      },
      {
        name: 'Покровский парк',
        position: {
          lat: 43.125259,
          lng: 131.892088
        }
      },
      {
        name: 'Набережная Спортивной гавани',
        position: {
          lat: 43.117884,
          lng: 131.877352
        }
      },
      {
        name: 'Сквер "Писательский"',
        position: {
          lat: 43.12988,
          lng: 131.909459
        }
      },
      {
        name: 'Военно-исторический музей Тихоокеанского флота',
        position: {
          lat: 43.112769,
          lng: 131.890472
        }
      },];

    private currentDeparturePoint = this.departurePoint;

    private changeDeparturePoint(pointName: string) {
      const departurePoint = this.points.find((el) => el.name === pointName);
      if (departurePoint === undefined) return;

      this.currentDeparturePoint = departurePoint;
    }

    private submit() {
      this.updateDeparturePoint(this.currentDeparturePoint);
    }
  }
</script>

<style scoped lang="scss">
  @import '../scss/bold-text';
  @import '../scss/button';
  @import '../scss/colors';
  @import '../scss/modal';

  .modal-wrapper {
    @include base-modal;
  }

  .modal {

  }
</style>