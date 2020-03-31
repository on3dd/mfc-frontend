import {Component, Vue} from 'vue-property-decorator';

@Component
export default class MFCMarkers extends Vue {
  protected readonly userMarker = {
    url: require('../assets/images/human-geo-icon.svg'),
    size: {width: 52, height: 52, f: 'px', b: 'px'},
    // scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
  };

  protected readonly mfcMarkerGreen = {
    url: require('../assets/images/mfc-icon-green.svg'),
    size: {width: 52, height: 52, f: 'px', b: 'px'},
    scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
  };

  protected readonly mfcMarkerYellow = {
    url: require('../assets/images/mfc-icon-yellow.svg'),
    size: {width: 52, height: 52, f: 'px', b: 'px'},
    scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
  };

  protected readonly mfcMarkerRed = {
    url: require('../assets/images/mfc-icon-red.svg'),
    size: {width: 52, height: 52, f: 'px', b: 'px'},
    scaledSize: {width: 36, height: 36, f: 'px', b: 'px'},
  };

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