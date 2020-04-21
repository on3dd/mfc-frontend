import StatisticsItem from "@/@types/statisticsItem";
import {Commit} from "vuex";

interface StatisticsState {
  statistics: StatisticsItem;
}

export default {
  state: {
    statistics: {}
  },
  actions: {
    async fetchStatistics({commit, rootState}: { commit: Commit; rootState: RootState }) {
      const data = await fetch('/api/mfcs');
      const body = await data.json() as HttpResponse;
      const statistics = body.body;
      console.log('statistics:', statistics);

      // console.log('rootState.departurePoint.departurePoint:', rootState.departurePoint.departurePoint);

      const statistics = body.find((el) => el.id === '74b230c6-1d78-39cd-920b-72828a675917');
      console.log(statistics);

      commit('updateStatistics', statistics);
    }
  },
  mutations: {
    updateStatistics(state: StatisticsState, statistics: StatisticsItem) {
      state.statistics = statistics;
      console.log(state.statistics);
    }
  },
  getters: {
    statistics: (state: StatisticsState) => state.statistics,
  },
}
