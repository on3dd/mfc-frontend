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
  import {Component, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import DeparturePoint from "@/types/departurePoint";
  import Position from "@/types/position";
  // TODO Add declarations
  //@ts-ignore
  // import DirectionsRenderer from './DirectionsRenderer.js';
  import {gmapApi} from 'vue2-google-maps';

  @Component({})
  export default class ScreenComputedResultMap extends Vue {
    $refs!: {
      map: any;
    };

    @Getter departurePoint!: DeparturePoint;
    @Getter travelWay!: string;

    private readonly zoom = 14;

    private readonly destinationPoint: Position = {
      lat: 43.125979,
      lng: 131.900173,
    };

    private readonly userMarker = {
      url: require('../assets/images/human-geo-icon.svg'),
      size: {width: 52, height: 52, f: 'px', b: 'px'},
      scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
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

    private trafficLayer!: any;
    private directionsService!: any;
    private directionsDisplay!: any;

    mounted() {
      // @ts-ignore
      this.$gmapApiPromiseLazy().then(() => {
        this.getRoute();
      })
    }

    private getRoute() {
      console.log('g:', google);

      this.trafficLayer = new google.maps.TrafficLayer();
      console.log('trafficLayer:', this.directionsService);
      this.trafficLayer.setMap(this.$refs.map.$mapObject);

      this.directionsService = new google.maps.DirectionsService();
      console.log('directionsService:', this.directionsService);

      this.directionsDisplay = new google.maps.DirectionsRenderer();
      console.log('directionsDisplay:', this.directionsDisplay);
      this.directionsDisplay.setMap(this.$refs.map.$mapObject);

      const vm = this;
      vm.directionsService.route({
        origin: this.departurePoint.position, // Can be coord or also a search query
        destination: this.destinationPoint,
        travelMode: this.travelWay.toUpperCase(),
      }, (response: Response, status: any) => {
        if (status === 'OK') {
          vm.directionsDisplay.setDirections(response) // draws the polygon to the map
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    }

    get google(): Function {
      console.log(gmapApi);
      return gmapApi;
    }

  }
</script>

<style scoped lang="scss">

</style>