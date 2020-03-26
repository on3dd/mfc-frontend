interface TravelWayState {
  name: string;
}

export default {
  state: {
    name: 'afoot',
  },
  mutations: {
    updateTravelWay(state: TravelWayState, name: string) {
      state.name = name;
    },
  },
  getters: {
    name: (state: TravelWayState) => state.name,
  },
}