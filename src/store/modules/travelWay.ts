interface TravelWayState {
  travelWay: string;
}

export default {
  state: {
    travelWay: 'walking',
  },
  mutations: {
    updateTravelWay(state: TravelWayState, travelWay: string) {
      state.travelWay = travelWay;
    },
  },
  getters: {
    travelWay: (state: TravelWayState) => state.travelWay,
  },
}