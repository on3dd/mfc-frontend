import DeparturePoint from "@/@types/position";

interface DeparturePointState {
  departurePoint: DeparturePoint;
}

export default {
  state: {
    departurePoint: '',
  },
  mutations: {
    updateDeparturePoint(state: DeparturePointState, point: DeparturePoint) {
      state.departurePoint = point;
      console.log(state.departurePoint);
    },
  },
  getters: {
    departurePoint: (state: DeparturePointState) => state.departurePoint,
  },
}