<template>
  <div class="screen-inner">
    <MFCLogo/>
    <section class="screen-inner__info">
      <div class="title">
        <h2 class="title__text">
          Откуда вы планируете добираться?
        </h2>
      </div>
      <div class="input-section">
        <BaseInputWithAutocomplete
            @select="changeDeparturePoint"
            :value="inputValue"
        />
      </div>
      <div class="button-group">
        <PrevButton/>
        <NextButton/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import MFCLogo from "./MFCLogo.vue";
  import BaseInputWithAutocomplete from "./BaseInputWithAutocomplete.vue";
  import BaseDatalist from "./BaseDatalist.vue";
  import PrevButton from "./PrevButton.vue";
  import NextButton from "./NextButton.vue";
  import DeparturePoint from "@/@types/departurePoint";
  import {google, googleMaps} from "vue2-google-maps";

  declare global {
    interface Window {
      google: {
        maps: googleMaps;
      };
    }
  }

  @Component({
    components: {
      MFCLogo,
      BaseInputWithAutocomplete,
      BaseDatalist,
      PrevButton,
      NextButton,
    }
  })
  export default class ScreenSelectDeparturePoint extends Vue {
    @Getter points!: DeparturePoint[];
    @Getter pointNames!: string[];
    @Mutation updateDeparturePoint!: (departurePoint: DeparturePoint) => void;

    private inputValue = '';

    private geocoder!: google.maps.Geocoder;
    private declare $gmapApiPromiseLazy: () => Promise<void>;


    async mounted() {
      this.$gmapApiPromiseLazy().then(() => {
        // console.log('google', window.google);
        this.geocoder = new window.google.maps.Geocoder();
        // console.log('geocoder:', this.geocoder);
        this.fetchGeolocation();
      });
    }

    private fetchGeolocation() {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
      };

      const success = async (pos: Position) => {
        const crd = pos.coords;

        // console.log('Ваше текущее метоположение:');
        // console.log(`Широта: ${crd.latitude}`);
        // console.log(`Долгота: ${crd.longitude}`);
        console.log(`Geocoding accuracy: ${crd.accuracy} meters.`);

        const geocodeDeparturePoint = ({lat, lng}: { lat: number; lng: number }) => {
          return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            this.geocoder.geocode(
                {
                  location: {
                    lat,
                    lng
                  }
                },
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                  if (status === "OK") {
                    resolve(results);
                  } else {
                    reject(status);
                  }
                }
            )
          })
        };

        const results = await geocodeDeparturePoint({lat: crd.latitude, lng: crd.longitude});
        // console.log('reverse geocoding results:', results);

        const address = results[0].formatted_address.split(',').slice(0, 3).join(',');
        const departurePoint = {
          name: address,
          position: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          }
        };

        this.updateDeparturePoint(departurePoint);
        sessionStorage.setItem('departurePoint', JSON.stringify(departurePoint));

        this.inputValue = address;
      };

      const error = (err: PositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }

    private changeDeparturePoint(departurePoint: DeparturePoint) {
      this.updateDeparturePoint(departurePoint);
      sessionStorage.setItem('departurePoint', JSON.stringify(departurePoint))
    }
  }
</script>

<style scoped lang="scss">
  @import '../scss/screen-inner';
  @import '../scss/bold-text';
  @import '../scss/colors';
  @import "../scss/breakpoints";

  .screen-inner {
    @include screen-inner;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      margin-top: 55px;
      margin-bottom: 75px;

      @media (min-width: $breakpoint-tablet) {
        margin-top: 105px;
        margin-bottom: 65px;
      }

      &__text {
        @include bold-text;
        color: #000000;
        font-size: 28px;
        line-height: 32px;
        text-align: center;

        @media (min-width: $breakpoint-tablet) {
          font-size: 36px;
          line-height: 1.5em;
        }
      }
    }
  }

</style>