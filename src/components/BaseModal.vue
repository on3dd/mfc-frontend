<template>
  <div class="modal-wrapper">
    <div class="modal"></div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class BaseModal extends Vue {
    protected isChanging = false;
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