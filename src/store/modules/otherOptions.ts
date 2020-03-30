interface OtherOptionsState {
  otherOptions: Array<Array<string | number>>;
}

export default {
  state: {
    otherOptions: [],
  },
  mutations: {
    updateOtherOptions(state: OtherOptionsState, options: Array<Array<string | number>>) {
      state.otherOptions = options;
      console.log('state.otherOptions:', state.otherOptions);
    },
  },
  getters: {
    otherOptions: (state: OtherOptionsState) => {
      return state.otherOptions.sort((a: (string | number)[], b: (string | number)[]) => {
        return a[1] < b[1] ? -1 : 1;
      }).slice(0, 4);
    },
  },
}