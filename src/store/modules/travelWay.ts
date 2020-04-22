interface TravelWayState {
  travelWay: string;
}

export default {
  state: {
    travelWay: '',
  },
  mutations: {
    updateTravelWay(state: TravelWayState, travelWay: string) {
      state.travelWay = travelWay;
      console.log(state.travelWay);
    },
  },
  getters: {
    travelWay: (state: TravelWayState) => state.travelWay,
  },
}