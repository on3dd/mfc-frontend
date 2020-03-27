interface TimeState {
  time: number;
}

export default {
  state: {
    time: '',
  },
  mutations: {
    updateTime(state: TimeState, time: number) {
      state.time = time;
      console.log('state.time:', state.time);
    },
  },
  getters: {
    time: (state: TimeState) => state.time,
  },
}