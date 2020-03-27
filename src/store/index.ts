import Vue from 'vue'
import Vuex from 'vuex'

import screens from "@/store/modules/screens";
import departurePoint from "@/store/modules/departurePoint";
import travelWay from "@/store/modules/travelWay";
import service from "@/store/modules/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    screens,
    departurePoint,
    travelWay,
    service,
  }
})
