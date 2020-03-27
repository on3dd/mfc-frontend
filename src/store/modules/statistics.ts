import StatisticsItem from "@/types/statisticsItem";
import {Commit} from "vuex";

interface StatisticsState {
  statistics: StatisticsItem;
}

export default {
  state: {
    statistics: {}
  },
  actions: {
    async fetchStatistics({commit}: {commit: Commit}) {
      //74b230c6-1d78-39cd-920b-72828a675917
      const data = await fetch('http://www.mfc-25.ru/queue/server.json',
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            }
          });
      const body = await data.json() as Array<StatisticsItem>;
      console.log(body);

      const statistics = body.find((el) => el.id === '74b230c6-1d78-39cd-920b-72828a675917');
      console.log(statistics);

      commit('updateStatistics', statistics);
    }
  },
  mutations: {
    updateStatistics(state: StatisticsState, statistics: StatisticsItem) {
      state.statistics = statistics;
    }
  },
  getters: {
    statistics: (state: StatisticsState) => state.statistics,
  },
}