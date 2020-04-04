export interface LockingPoolState {
  lockingPool: boolean;
}

export default {
  state: {
    lockingPool: false,
  },
  mutations: {
    lockUI: (state: LockingPoolState) => state.lockingPool = true,
    unlockUI: (state: LockingPoolState) => state.lockingPool = false,
  },
  getters: {
    isUILocked: (state: LockingPoolState) => state.lockingPool,
  },
}