import {PlaceResult} from "vue2-google-maps";
<template>
  <div class="input-placeholder">
    <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
    <gmap-autocomplete
        class="input"
        :types="['address']"
        :componentRestrictions="{country:'ru'}"
        @place_changed="getAddressData">
      <template v-slot:input="slotProps">
        <BaseInput
            ref="input"
            @listeners="slotProps.listeners"
            @attrs="slotProps.attrs"/>
      </template>
    </gmap-autocomplete>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {google} from "vue2-google-maps";
  import BaseInput from "@/components/BaseInput.vue";

  @Component({
    components: {
      BaseInput,
    }
  })
  export default class BaseInputWithAutocomplete extends Vue {
    $refs!: {
      input: HTMLInputElement;
    };

    private getAddressData(result: google.maps.places.PlaceResult) {
      console.log('getAddressData result', result);

      if (result.address_components === undefined) return;

      this.$emit('select', {
        name: [result.address_components[0].short_name, result.address_components[2].short_name].join(', '),
        position: {
          lat: result.geometry?.location.lat(),
          lng: result.geometry?.location.lng(),
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/colors";
  @import "../scss/input";
  @import "../scss/breakpoints";

  .input-placeholder {
    @include base-input;


    .input {
      &:focus {
        border-radius: 20px 20px 0 0;

        @media (min-width: $breakpoint-tablet) {
          border-radius: 30px 30px 0 0;
        }

        @media (min-width: $breakpoint-laptop) {
          border-radius: 40px 40px 0 0;
        }

        @media (min-width: $breakpoint-desktop) {
          border-radius: 50px 50px 0 0;
        }
      }
    }
  }
</style>