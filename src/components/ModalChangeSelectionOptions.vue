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
            <span class="modal__options-list__item__control__header">Текущий адрес</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Способ передвижения</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">Текущий способ</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Услуга</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">Текущая услуга</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
      </div>
      <button class="modal__button-close">x</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class ModalChangeSelectionOptions extends Vue {
  }
</script>

<style scoped lang="scss">
  @import '../scss/bold-text';
  @import '../scss/button';
  @import '../scss/colors';
  @import '../scss/modal';

  .modal-wrapper {
    @include base-modal;
    display: none;
  }

  .modal {}
</style>