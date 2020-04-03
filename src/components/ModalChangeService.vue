<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h2 class="modal__header">
        <img src="../assets/images/arrow-right-icon.svg" alt="" class="modal__header__icon">
        Изменение услуги
      </h2>
      <div class="modal__options-list">
        <div class="modal__options-list__item">
          <h3 class="modal__options-list__item__header">Услуга</h3>
          <div class="modal__options-list__item__control">
            <span class="modal__options-list__item__control__header">{{service}}</span>
            <button class="modal__options-list__item__control__button">Изменить</button>
          </div>
        </div>
      </div>
      <div class="modal__search">
        <BaseDatalist
            @select="changeService"
            name="select-service"
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
  export default class ModalChangeService extends Vue {
    @Getter service!: string;
    @Mutation updateService!: (service: string) => void;

    private currentService = this.service;

    private changeService(service: string) {
      this.currentService = service;
    }

    private submit() {
      this.updateService(this.currentService);
      sessionStorage.setItem('service', JSON.stringify(this.currentService));
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