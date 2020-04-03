import {Commit, Getter, GetterTree} from "vuex";
import StatisticsItem from "@/@types/statisticsItem";
import HttpResponse from "@/@types/httpResponse";
import StatisticsItemExtended from "@/@types/statisticsItemExtended";

interface StatisticsState {
  statistics: StatisticsItem;
}

export default {
  state: {
    statistics: {},
  },
  actions: {
    async fetchStatistics({commit, rootState}: { commit: Commit; rootState: any }) {
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
    }
  },
  getters: {
    statistics: (state: StatisticsState) => state.statistics,
  },
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string): number {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344
    }

    if (unit === "N") {
      dist = dist * 0.8684
    }

    return dist;
  }
}