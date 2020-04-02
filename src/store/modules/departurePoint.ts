import Vue from "vue";
import DeparturePoint from "@/@types/departurePoint";

interface DeparturePointState {
  departurePoint: DeparturePoint;
  points: DeparturePoint[];
}

export default {
  state: {
    departurePoint: '',
    points: [
      {
        name: 'Сквер им. Суханова',
        position: {
          lat: 43.118096,
          lng: 131.891598
        }
      },
      {
        name: 'Покровский парк',
        position: {
          lat: 43.125259,
          lng: 131.892088
        }
      },
      {
        name: 'Набережная Спортивной гавани',
        position: {
          lat: 43.117884,
          lng: 131.877352
        }
      },
      {
        name: 'Сквер "Писательский"',
        position: {
          lat: 43.12988,
          lng: 131.909459
        }
      },
      {
        name: 'Военно-исторический музей Тихоокеанского флота',
        position: {
          lat: 43.112769,
          lng: 131.890472
        }
      },
    ],
  },
  mutations: {
    // TODO: Fix reactivity issue
    updateDeparturePoint(state: DeparturePointState, point: DeparturePoint) {
      state.departurePoint = point;
      console.log('current departure point:', state.departurePoint);

      const userPositionIdx = state.points.findIndex((el: DeparturePoint) => el.name === point.name);
      if (userPositionIdx === -1) {
        Vue.set(state, 'points', [point, ...state.points]);
      } else {
        Vue.set(state.points, userPositionIdx, point);
      }
      // console.log('all departure points:', state.points);
    },
  },
  getters: {
    departurePoint: (state: DeparturePointState) => state.departurePoint,
    points: (state: DeparturePointState) => state.points,
    pointNames: (state: DeparturePointState) => state.points.map((el: DeparturePoint) => el.name),
  },
}