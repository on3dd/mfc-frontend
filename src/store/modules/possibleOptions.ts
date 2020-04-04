import PossibleOption from "@/@types/possibleOption";

export interface PossibleOptionsState {
  possibleOptions: Array<PossibleOption>;
}

export default {
  state: {
    possibleOptions: [],
  },
  actions: {

  },
  mutations: {
    updatePossibleOptions(state: PossibleOptionsState, options: Array<PossibleOption>) {
      state.possibleOptions = options.sort((a: PossibleOption, b: PossibleOption) => a.time - b.time);
      console.log('state.possibleOptions:', state.possibleOptions);
    },
  },
  getters: {
    possibleOptions: (state: PossibleOptionsState) => {
      console.log('possible options current state:', state.possibleOptions);
      return state.possibleOptions.slice(1, 5);
    },

    bestOption: (state: PossibleOptionsState) => {
      if (state.possibleOptions.length === 0) {
        return {
          name: 'Владивосток, Неизвестная, 99',
          time: 99,
        }
      }

      return state.possibleOptions[0];
    },

    length: (state: PossibleOptionsState) => {
      return state.possibleOptions.length;
    }
  },
}