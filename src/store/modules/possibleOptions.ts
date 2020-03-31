import PossibleOption from "@/@types/possibleOption";

interface PossibleOptionsState {
  possibleOptions: Array<PossibleOption>;
}

export default {
  state: {
    possibleOptions: [],
  },
  mutations: {
    updatePossibleOptions(state: PossibleOptionsState, options: Array<PossibleOption>) {
      state.possibleOptions = options;
      console.log('state.possibleOptions:', state.possibleOptions);
    },
  },
  getters: {
    possibleOptions: (state: PossibleOptionsState) => {
      console.log('possible options current state:', state.possibleOptions);
      return state.possibleOptions.sort((a: PossibleOption, b: PossibleOption) => a.time - b.time).slice(1, 5);
    },
    bestOption: (state: PossibleOptionsState) => {
      if (state.possibleOptions.length === 0) {
        return {
          name: 'Неизвестная, 99, Владивосток',
          time: 99,
        }
      }

      return state.possibleOptions.sort((a: PossibleOption, b: PossibleOption) => a.time - b.time)[0];
    },
    length: (state: PossibleOptionsState) => {
      return state.possibleOptions.length;
    }
  },
}