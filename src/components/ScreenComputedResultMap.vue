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
    onDeparturePointChange() {
      this.calculateOptionsTime()
          .then(() => this.drawRoute());
    }

    @Watch('travelWay')
    onTravelWayChange() {
      this.calculateOptionsTime()
          .then(() => this.drawRoute());
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
    private trafficLayer!: any;
    private directionsService!: any;
    private directionsDisplay!: any;
    private geocoder!: any;

    async mounted() {
      // @ts-ignore
      this.$gmapApiPromiseLazy().then(() => {
        this.initMap();
        this.calculateOptionsTime()
            .then(() => this.drawRoute());
      })
    }

    private async initMap() {
      return new Promise((resolve, reject) => {
        // console.log('g:', window.google);
        this.trafficLayer = new window.google.maps.TrafficLayer();
        // console.log('trafficLayer:', this.directionsService);
        this.trafficLayer.setMap(this.$refs.map.$mapObject);

        this.directionsService = new window.google.maps.DirectionsService();
        // console.log('directionsService:', this.directionsService);

        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        // console.log('directionsDisplay:', this.directionsDisplay);
        this.directionsDisplay.setMap(this.$refs.map.$mapObject);
        this.directionsDisplay.setOptions({suppressMarkers: true});

        resolve();
      });
    }

    private calculateOptionsTime(): Promise<void> {
      return new Promise<void>(async (resolve) => {
        const vm = this;
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
            const marker = new window.google.maps.Marker({
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
          return new Promise<any>((resolve) => {
            const estimatedTime = response.routes[0].legs[0].duration.text.split(" ")[0];
            possibleOptions.push({
              name: currentMFC,
              time: Number(estimatedTime),
              position: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              },
            });
            console.log(`${currentMFC} estimatedTime: ${estimatedTime}`);

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
        resolve();
      });
    }

    // TODO: refactor it with promises
    private async drawRoute() {
      return new Promise((resolve, reject) => {
        const vm = this;
        console.log('drawRoute bestOption.position', this.bestOption.position);
        vm.directionsService.route({
          origin: this.departurePoint.position, // Can be coord or also a search query
          destination: this.bestOption.position,
          travelMode: this.travelWay.toUpperCase(),
        } as google.maps.DirectionsRequest, (response: any, status: any) => {
          if (status === 'OK') {
            vm.directionsDisplay.setDirections(response); // draws the polygon to the map
            resolve();
          } else {
            console.log('Directions request failed due to ' + status);
            reject();
          }
        })
      });
    }
  }
</script>

<style scoped lang="scss">

</style>