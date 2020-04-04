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
            <button
                class="modal__options-list__item__control__button"
                @click="isChanging = !isChanging"
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
      <div class="modal__search">
        <BaseDatalist
            @select="changeDeparturePoint"
            :data="points.map((el) => el.name)"
            :is-disabled="!isChanging"
            name="select-departure-point"
            class="modal__search__input"
        />
        <button
            @click="submit"
            :disabled="!isChanging"
            class="modal__search__button-submit"
        >Сохранить
        </button>
      </div>
      <button
          @click="$emit('closeModal')"
          class="modal__button-close"
      >
        x
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import BaseModal from "./BaseModal.vue";
  import BaseDatalist from "./BaseDatalist.vue";
  import DeparturePoint from "@/@types/departurePoint";

  @Component({
    components: {
      BaseDatalist,
    }
  })
  export default class ModalChangeDeparturePoint extends BaseModal {
    @Getter points!: DeparturePoint[];
    @Getter departurePoint!: DeparturePoint;
    @Mutation updateDeparturePoint!: (departurePoint: DeparturePoint) => void;

    private currentDeparturePoint = this.departurePoint;

    private changeDeparturePoint(pointName: string) {
      const departurePoint = this.points.find((el) => el.name === pointName.trim());
      if (departurePoint === undefined) return;

      this.currentDeparturePoint = departurePoint;
    }

    private submit() {
      this.updateDeparturePoint(this.currentDeparturePoint);
      sessionStorage.setItem('departurePoint', JSON.stringify(this.currentDeparturePoint));
      this.isChanging = false;
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
</style>