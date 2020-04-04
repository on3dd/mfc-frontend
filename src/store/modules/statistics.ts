import {Commit} from "vuex";
import distance from "@/util/distance";
import StatisticsItem from "@/@types/statisticsItem";
import HttpResponse from "@/@types/httpResponse";
import StatisticsItemExtended from "@/@types/statisticsItemExtended";
import {RootState} from "@/store";

export interface StatisticsState {
  statistics: StatisticsItem;
  nearestCenters: Array<StatisticsItemExtended>;
}

export default {
  state: {
    statistics: {},
    nearestCenters: [],
  },
  actions: {
    async fetchStatistics({commit, rootState}: { commit: Commit; rootState: RootState }) {
      const data = await fetch('http://localhost:8080/api/mfcs');
      const body = await data.json() as HttpResponse;
      const statistics = body.body;
      console.log('statistics:', statistics);

      // console.log('rootState.departurePoint.departurePoint:', rootState.departurePoint.departurePoint);

      const nearestCenters = statistics.map((el: StatisticsItem) => {
        const {lat, lng: lan} = rootState.departurePoint.departurePoint.position;
        return {
          ...el,
          distance: distance(lat, lan, el.lat, el.lan, 'k'),
        } as StatisticsItemExtended;
      }).sort((a, b) => a.distance - b.distance).slice(0, 5);

      commit('updateNearestCenters', nearestCenters);
      // commit('updateStatistics', statisticsItem);
    }
  },
  mutations: {
    updateStatistics(state: StatisticsState, statistics: StatisticsItem) {
      state.statistics = statistics;
      console.log(state.statistics);
    },
    updateNearestCenters(state: StatisticsState, centers: Array<StatisticsItemExtended>) {
      state.nearestCenters = centers;
      console.log('state.nearestCenters:', state.nearestCenters);
    }
  },
  getters: {
    statistics: (state: StatisticsState) => state.statistics,
    nearestCenters: (state: StatisticsState) => state.nearestCenters,
  },
}