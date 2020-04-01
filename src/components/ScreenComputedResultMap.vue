<template>
  <GmapMap
      :center="departurePoint.position"
      :zoom="zoom"
      style="width: 100%; height: 100%"
      ref="map"
  >
    <GmapMarker
        :position="departurePoint.position"
        :clickable="false"
        :draggable="false"
        :icon="userMarker"
    />
  </GmapMap>
</template>

<script lang="ts">
  import {Component, Watch} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import {google, googleMaps} from 'vue2-google-maps';
  import MFCMarkers from "@/components/MFCMarkers";
  import DeparturePoint from "@/@types/departurePoint";
  import PossibleOption from "@/@types/possibleOption";

  declare global {
    interface Window {
      google: {
        maps: googleMaps;
      };
    }
  }

  @Component
  export default class ScreenComputedResultMap extends MFCMarkers {
    $refs!: {
      map: any;
    };

    @Getter departurePoint!: DeparturePoint;
    @Getter travelWay!: string;
    @Getter bestOption!: PossibleOption;
    @Mutation updatePossibleOptions!: (possibleOptions: Array<PossibleOption>) => void;

    @Watch('departurePoint')
    async onDeparturePointChange() {
      await this.calculateOptionsTime();
      await this.drawRoute();
    }

    @Watch('travelWay')
    async onTravelWayChange() {
      await this.calculateOptionsTime();
      await this.drawRoute();
    }

    private readonly zoom = 14;

    private readonly mfcs = [
      'Партизанский просп., 28А, Владивосток',
      '​100-летия Владивостока проспект, 44, Владивосток',
      '​Невельского, 13, Владивосток',
      '​Давыдова, 9, Владивосток',
      '​Верхнепортовая, 76а, Владивосток',
      '​Борисенко, 102, Владивосток',
      'Экипажная, 10, пос. Русский, Владивостокский городской округ, Приморский край',
    ];


    // Google Maps API stuff
    private trafficLayer!: google.maps.TrafficLayer;
    private directionsService!: google.maps.DirectionsService;
    private directionsDisplay!: google.maps.DirectionsRenderer;
    private geocoder!: google.maps.Geocoder;

    async mounted() {
      await this.$refs.map.$mapPromise;
      await this.initMap();
      await this.calculateOptionsTime();
      await this.drawRoute();
    }

    private async initMap() {
      return new Promise((resolve) => {
        this.trafficLayer = new window.google.maps.TrafficLayer();
        this.trafficLayer.setMap(this.$refs.map.$mapObject);

        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();

        this.directionsDisplay.setMap(this.$refs.map.$mapObject);
        this.directionsDisplay.setOptions({suppressMarkers: true});

        resolve();
      });
    }

    private async calculateOptionsTime(): Promise<void> {
      this.geocoder = new window.google.maps.Geocoder();

      const possibleOptions = Array<PossibleOption>();

      const geocodeAddress = (currentMFC: string) => {
        return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          this.geocoder.geocode(
              {address: currentMFC},
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

      const processAddress = (results: google.maps.GeocoderResult[]) => {
        return new Promise<google.maps.DirectionsResult>((resolve, reject) => {
          new window.google.maps.Marker({
            icon: this.marker(),
            map: this.$refs.map.$mapObject,
            position: results[0].geometry.location,
          } as unknown as google.maps.ReadonlyMarkerOptions);

          this.directionsService.route({
                origin: this.departurePoint.position, // Can be coord or also a search query
                destination: results[0].geometry.location,
                travelMode: this.travelWay.toUpperCase(),
              } as google.maps.DirectionsRequest,
              (response: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
                if (status === "OK") {
                  resolve(response);
                } else {
                  reject(status);
                }
              }
          )
        })
      };

      const buildRoute = (
          currentMFC: string,
          results: google.maps.GeocoderResult[],
          response: google.maps.DirectionsResult
      ) => {
        return new Promise<void>((resolve) => {
          const estimatedTime = Math.ceil(response.routes[0].legs[0].duration.value / 60);
          console.log(`${currentMFC} estimatedTime: ${estimatedTime} minutes`);

          possibleOptions.push({
            name: currentMFC,
            time: Number(estimatedTime),
            position: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
          });

          resolve();
        })
      };

      for (const currentMFC of this.mfcs) {
        const results = await geocodeAddress(currentMFC);
        const response = await processAddress(results);
        await buildRoute(currentMFC, results, response);
      }

      console.log('possibleOptions length:', possibleOptions.length);
      this.updatePossibleOptions(possibleOptions);
    }

    private async drawRoute() {
      const processRoute = () => {
        return new Promise<google.maps.DirectionsResult>((resolve, reject) => {
          this.directionsService.route({
                origin: this.departurePoint.position, // Can be coord or also a search query
                destination: this.bestOption.position,
                travelMode: this.travelWay.toUpperCase(),
              } as google.maps.DirectionsRequest,
              (response: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
                if (status === 'OK') {
                  resolve(response);
                } else {
                  reject(`Directions request failed due to ${status}`);
                }
              })
        });
      };

      const response = await processRoute();
      this.directionsDisplay.setDirections(response); // draws the polygon to the map
    }
  }
</script>

<style scoped lang="scss">

</style>