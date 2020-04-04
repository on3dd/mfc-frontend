import Vue from 'vue'
import Vuex from 'vuex'

import screens, {ScreensState} from "@/store/modules/screens";
import departurePoint, {DeparturePointState} from "@/store/modules/departurePoint";
import travelWay, {TravelWayState} from "@/store/modules/travelWay";
import service, {ServiceState} from "@/store/modules/service";
import statistics from "@/store/modules/statistics";
import possibleOptions, {PossibleOptionsState} from "@/store/modules/possibleOptions";
import lockingPool, {LockingPoolState} from "@/store/modules/lockingPool";

Vue.use(Vuex);

export interface RootState {
  screens: ScreensState;
  departurePoint: DeparturePointState;
  travelWay: TravelWayState;
  service: ServiceState;
  possibleOptions: PossibleOptionsState;
  lockingPool: LockingPoolState;
}

export default new Vuex.Store({
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
