<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h2 class="modal__header">
        <img src="../assets/images/arrow-right-icon.svg" alt="" class="modal__header__icon">
        Изменение параметров выбора
      </h2>
      <div class="modal__options-list">
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Адрес отправления</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{departurePoint.name}}</span>
            <button
                @click="$emit('selectModal', 'departure-point')"
                class="modal__options-list__item__control__button"
            >Изменить
            </button>
          </div>
        </div>
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Способ передвижения</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{localizedTravelWay}}</span>
            <button
                @click="$emit('selectModal', 'travel-way')"
                class="modal__options-list__item__control__button"
            >Изменить
            </button>
          </div>
        </div>
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Услуга</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{service}}</span>
            <button
                @click="$emit('selectModal', 'service')"
                class="modal__options-list__item__control__button"
            >Изменить
            </button>
          </div>
        </div>
      </div>
      <button
          @click="$emit('closeModal')"
          class="modal__button-close"
      >x
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {Getter} from "vuex-class";
  import DeparturePoint from "@/@types/departurePoint";
  import BaseModal from "@/components/BaseModal.vue";

  @Component
  export default class ModalChangeSelectionOptions extends BaseModal {
    @Getter departurePoint!: DeparturePoint;
    @Getter travelWay!: string;
    @Getter service!: string;

    get localizedTravelWay(): string {
      switch (this.travelWay.trim().toLowerCase()) {
        case 'walking':
          return 'пешком';
        case 'driving':
          return 'автомобиль';
        case 'transit':
          return 'общественный транспорт';
        default:
          return '';
      }
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

    .modal {
      .modal__options-list__item {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>