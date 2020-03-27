<template>
  <gmap-map
      :center="center"
      :zoom="12.5"
      style="width: 100%; height: 100%"
  />
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class ScreenComputedResultMap extends Vue {
    $refs!: {
      map: HTMLDivElement;
    };

    private center = {
      lat: 43.119809,
      lng: 131.886924
    };
  }
</script>

<style scoped lang="scss">

</style>