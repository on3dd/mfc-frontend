interface DeparturePointState {
  departurePoint: string;
}

export default {
  state: {
    departurePoint: '',
  },
  mutations: {
    updateDeparturePoint(state: DeparturePointState, point: string) {
      state.departurePoint = point;
    },
  },
  getters: {
    departurePoint: (state: DeparturePointState) => state.departurePoint,
  },
}