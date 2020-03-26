interface ScreensState {
  screen: number;
}

export default {
  state: {
    screen: 0,
  },
  mutations: {
    increaseScreen({state}: {state: ScreensState}) {
      state.screen += 1;
    },

    decreaseScreen({state}: {state: ScreensState}) {
      state.screen -= 1;
    }
  },
  getters: {
    screen: (state: ScreensState) => state.screen,
  },
}