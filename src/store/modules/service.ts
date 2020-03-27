interface ServiceState {
  service: string;
}

export default {
  state: {
    service: '',
  },
  mutations: {
    updateService(state: ServiceState, service: string) {
      state.service = service;
    },
  },
  getters: {
    service: (state: ServiceState) => state.service,
  },
}