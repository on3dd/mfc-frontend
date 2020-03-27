import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// TODO Add declaration
// @ts-ignore
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0zt4dGxQo4j_dt9z8dofi1UHQOApc8S0',
    libraries: ["directions", "places", "geocoder"], // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
