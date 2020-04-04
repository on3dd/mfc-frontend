<template>
  <GmapMap
      :center="departurePoint.position"
      :zoom="zoom"
      :options="mapOptions"
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
  import {Action, Getter, Mutation} from "vuex-class";
  import {google, googleMaps} from 'vue2-google-maps';
  import MFCMarkers from "@/components/MFCMarkers";
  import DeparturePoint from "@/@types/departurePoint";
  import PossibleOption from "@/@types/possibleOption";
  import StatisticsItemExtended from "@/@types/statisticsItemExtended";

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
      map: google.maps.Map & HTMLElement;
    };

    @Getter departurePoint!: DeparturePoint;
    @Getter travelWay!: string;
    @Getter service!: string;
    @Getter nearestCenters!: StatisticsItemExtended[];
    @Getter bestOption!: PossibleOption;
    @Mutation updatePossibleOptions!: (possibleOptions: Array<PossibleOption>) => void;
    @Mutation lockUI!: () => void;
    @Mutation unlockUI!: () => void;
    @Action fetchStatistics!: () => void;

    @Watch('departurePoint')
    onDeparturePointChange() {
      this.recalculate();
    }

    @Watch('travelWay')
    onTravelWayChange() {
      this.recalculate();
    }

    @Watch('service')
    onServiceChange() {
      this.recalculate();
    }

    private readonly zoom = 14;
    private readonly mapOptions = {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };

    // Google Maps API stuff
    private trafficLayer!: google.maps.TrafficLayer;
    private directionsService!: google.maps.DirectionsService;
    private directionsDisplay!: google.maps.DirectionsRenderer;
    private geocoder!: google.maps.Geocoder;

    async mounted() {
      this.lockUI();
      await this.$refs.map.$mapPromise;
      await this.fetchStatistics();
      await this.initMap();
      await this.calculateOptionsTime();
      await this.drawRoute();
      this.unlockUI();
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

    private async recalculate() {
      sessionStorage.removeItem('possibleOptions');

      this.lockUI();
      await this.calculateOptionsTime();
      await this.drawRoute();
      this.unlockUI();
    }

    private async calculateOptionsTime() {
      const storedPossibleOptions = sessionStorage.getItem('possibleOptions');
      if (storedPossibleOptions !== null) {
        const possibleOptions = JSON.parse(storedPossibleOptions);

        possibleOptions.forEach((option: PossibleOption) => {
          new window.google.maps.Marker({
            icon: this.marker(),
            map: this.$refs.map.$mapObject,
            position: option.position,
          } as unknown as google.maps.ReadonlyMarkerOptions);
        });

        this.updatePossibleOptions(possibleOptions);
      } else {
        this.geocoder = new window.google.maps.Geocoder();

        const possibleOptions = Array<PossibleOption>();

        const processAddress = (center: StatisticsItemExtended) => {
          return new Promise<google.maps.DirectionsResult>((resolve, reject) => {
            const position = {
              lat: center.lat,
              lng: center.lan,
            };

            new window.google.maps.Marker({
              icon: this.marker(),
              map: this.$refs.map.$mapObject,
              position: position,
            } as unknown as google.maps.ReadonlyMarkerOptions);

            this.directionsService.route({
                  origin: this.departurePoint.position, // Can be coord or also a search query
                  destination: position,
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
            center: StatisticsItemExtended,
            response: google.maps.DirectionsResult
        ) => {
          return new Promise<void>((resolve) => {
            const estimatedTime = Math.ceil(response.routes[0].legs[0].duration.value / 60);
            console.log(`${currentMFC} estimatedTime: ${estimatedTime} minutes`);

            possibleOptions.push({
              name: currentMFC,
              time: Number(estimatedTime),
              position: {
                lat: center.lat,
                lng: center.lan,
              },
            });

            resolve();
          })
        };

        for (let i = 0; i < this.nearestCenters.length; i++) {
          const response = await processAddress(this.nearestCenters[i]);
          await buildRoute(this.nearestCenters[i].organizationAddress, this.nearestCenters[i], response);
        }

        this.updatePossibleOptions(possibleOptions);
        sessionStorage.setItem('possibleOptions', JSON.stringify(possibleOptions));
      }
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

      console.log('drawRoute bestOption:', this.bestOption);

      const response = await processRoute();
      this.directionsDisplay.setDirections(response); // draws the polygon to the map
    }
  }
</script>

<style scoped lang="scss">

</style>