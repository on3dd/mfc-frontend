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
            <span class="modal__options-list__item__control__header">{{departurePoint}}</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
      </div>
      <div class="modal__search">
        <BaseDatalist
            @select="changeDeparturePoint"
            name="select-departure-point"
            class="modal__search__input"
            :data="['first', 'second', 'third', 'fourth', 'fifth', 'sixth']"
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

  @Component({
    components: {
      BaseDatalist,
    }
  })
  export default class ModalChangeDeparturePoint extends Vue {
    @Getter departurePoint!: string;
    @Mutation updateDeparturePoint!: (departurePoint: string) => void;

    private currentDeparturePoint = this.departurePoint;

    private changeDeparturePoint(departurePoint: string) {
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