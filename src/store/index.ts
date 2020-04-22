import Vue from 'vue'
import Vuex from 'vuex'

import screens from "@/store/modules/screens";
import departurePoint from "@/store/modules/departurePoint";
import travelWay from "@/store/modules/travelWay";
import service from "@/store/modules/service";
import statistics from "@/store/modules/statistics";
import possibleOptions from "@/store/modules/possibleOptions";
import lockingPool from "@/store/modules/lockingPool";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    screens,
    departurePoint,
    travelWay,
    service,
    statistics,
    possibleOptions,
    lockingPool,
  }
})
