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
    <GmapMarker
        :position="destinationPoint"
        :clickable="false"
        :draggable="false"
        :icon="mfcMarkerGreen"
    />
  </GmapMap>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {Getter, Mutation} from "vuex-class";
  import DeparturePoint from "@/types/departurePoint";
  import Position from "@/types/position";
  import { google, googleMaps } from 'vue2-google-maps'

  declare global {
    interface Window {
      google: {
        maps: googleMaps;
      };
    }
  }

  @Component
  export default class ScreenComputedResultMap extends Vue {
    $refs!: {
      map: any;
    };

    @Getter departurePoint!: DeparturePoint;
    @Getter travelWay!: string;
    @Mutation updateTime!: (mins: number) => void;
    @Mutation updateOtherOptions!: (otherOptions: Array<Array<string | number>>) => void;

    @Watch('departurePoint')
    onDeparturePointChange() {
      this.drawRoute();
      this.calculateOtherOptionsTime();
    }

    @Watch('travelWay')
    onTravelWayChange() {
      this.drawRoute();
      this.calculateOtherOptionsTime();
    }


    private readonly zoom = 14;

    private readonly destinationPoint: Position = {
      lat: 43.125979,
      lng: 131.900173,
    };

    private readonly userMarker = {
      url: require('../assets/images/human-geo-icon.svg'),
      size: {width: 52, height: 52, f: 'px', b: 'px'},
      // scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
    };

    private readonly mfcMarkerGreen = {
      url: require('../assets/images/mfc-icon-green.svg'),
      size: {width: 52, height: 52, f: 'px', b: 'px'},
      scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
    };

    private readonly mfcMarkerYellow = {
      url: require('../assets/images/mfc-icon-yellow.svg'),
      size: {width: 52, height: 52, f: 'px', b: 'px'},
      scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
    };

    private readonly mfcMarkerRed = {
      url: require('../assets/images/mfc-icon-red.svg'),
      size: {width: 52, height: 52, f: 'px', b: 'px'},
      scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
    };

    private readonly mfcs = [
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
      this.$gmapApiPromiseLazy().then(async () => {
        await this.initMap();
        await this.drawRoute();
        await this.drawMFCMarkers();
        await this.calculateOtherOptionsTime();
      })
    }

    private async initMap() {
      return new Promise((resolve, reject) => {
        console.log('g:', window.google);
        this.trafficLayer = new window.google.maps.TrafficLayer();
        console.log('trafficLayer:', this.directionsService);
        this.trafficLayer.setMap(this.$refs.map.$mapObject);

        this.directionsService = new window.google.maps.DirectionsService();
        console.log('directionsService:', this.directionsService);

        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        console.log('directionsDisplay:', this.directionsDisplay);
        this.directionsDisplay.setMap(this.$refs.map.$mapObject);
        this.directionsDisplay.setOptions({suppressMarkers: true});

        resolve();
      });
    }

    private async drawRoute() {
      return new Promise((resolve, reject) => {
        const vm = this;
        vm.directionsService.route({
          origin: this.departurePoint.position, // Can be coord or also a search query
          destination: this.destinationPoint,
          travelMode: this.travelWay.toUpperCase(),
        } as google.maps.DirectionsRequest, (response: any, status: any) => {
          if (status === 'OK') {
            vm.directionsDisplay.setDirections(response); // draws the polygon to the map
            const estimatedTime = response.routes[0].legs[0].duration.text.split(" ")[0];
            this.updateTime(estimatedTime);
            resolve();
          } else {
            console.log('Directions request failed due to ' + status);
            reject();
          }
        })
      });
    }

    private async drawMFCMarkers() {
      return new Promise((resolse, reject) => {
        this.geocoder = new window.google.maps.Geocoder();

        this.mfcs.forEach(async (currentMFC: string) => {
          this.geocoder.geocode(
              {address: currentMFC},
              (results: any, status: any) => {
                if (status === "OK") {
                  const marker = new window.google.maps.Marker({
                    icon: this.marker(),
                    map: this.$refs.map.$mapObject,
                    position: results[0].geometry.location,
                  } as unknown as google.maps.ReadonlyMarkerOptions);
                } else {
                  console.log("Address error:" + status);
                }
              }
          );
        });

        resolse();
      });
    }

    private async calculateOtherOptionsTime(): Promise<void> {
      return new Promise((resolse, reject) => {
        const vm = this;
        this.geocoder = new window.google.maps.Geocoder();

        const otherOptions = Array<Array<string | number>>();
        this.mfcs.forEach(async (currentMFC: string) => {
          this.geocoder.geocode(
              {address: currentMFC},
              (results: any, status: any) => {
                if (status === "OK") {
                  vm.directionsService.route({
                    origin: this.departurePoint.position, // Can be coord or also a search query
                    destination: results[0].geometry.location,
                    travelMode: this.travelWay.toUpperCase(),
                  } as google.maps.DirectionsRequest, (response: any, status: any) => {
                    if (status === 'OK') {
                      const estimatedTime = response.routes[0].legs[0].duration.text.split(" ")[0];
                      otherOptions.push([currentMFC, estimatedTime]);
                      console.log(`${currentMFC} estimatedTime: ${estimatedTime}`);
                    } else {
                      console.log(`${currentMFC} directions request failed due to ${status}`);
                    }
                  })
                } else {
                  console.log(`${currentMFC} address error: ${status}`);
                }
              }
          );
        });

        this.updateOtherOptions(otherOptions);
        resolse();
      });
    }

    marker() {
      const x = Math.round(Math.random() * 3);

      switch (x) {
        case 1:
          return this.mfcMarkerGreen;
        case 2:
          return this.mfcMarkerYellow;
        default:
          return this.mfcMarkerRed;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>