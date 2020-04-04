<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h2 class="modal__header">
        <img src="../assets/images/arrow-right-icon.svg" alt="" class="modal__header__icon">
        Изменение способа передвижения
      </h2>
      <div class="modal__options-list">
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Способ передвижения</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{localizedTravelWay}}</span>
            <button
                @click="isChanging = !isChanging"
                class="modal__options-list__item__control__button"
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
      <div class="modal__change-travel-way">
        <TravelWayGroup
            :is-disabled="!isChanging"
            class="modal__change-travel-way__group"
        />
        <button
            @click="isChanging = !isChanging"
            :disabled="!isChanging"
            class="modal__change-travel-way__button-submit"
        >
          Сохранить
        </button>
      </div>
      <button
          @click="$emit('closeModal')"
          class="modal__button-close"
      >x</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import TravelWayGroup from "@/components/TravelWayGroup.vue";
  import BaseModal from "@/components/BaseModal.vue";

  @Component({
    components: {
      TravelWayGroup,
    }
  })
  export default class ModalChangeTravelWay extends BaseModal {
    @Getter travelWay!: string;

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
  @import '../scss/breakpoints';

  .modal-wrapper {
    @include base-modal;
  }

  .modal {
    &__change-travel-way {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__group {
        margin-bottom: 10px;

        @media (min-width: $breakpoint-desktop) {
          margin-bottom: 0;
        }
      }

      &__button-submit {
        @include base-button($mfc-orange);
        font-size: 12px;
        line-height: 1.5em;
        border-radius: 20px;
        padding: 0 10px;

        @media (min-width: $breakpoint-desktop) {
          font-size: 18px;
          border-radius: 20px;
          padding: 0 10px;
        }

        &[disabled] {
          cursor: not-allowed;
          background-color: $mfc-gray;
        }
      }
    }
  }
</style>