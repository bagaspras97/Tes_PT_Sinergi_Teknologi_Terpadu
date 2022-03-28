import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    // modules: {
    //   // example
    // },

    state() {
      return {
        arrData: [],
      };
    },
    mutations: {
      addNewData(state, payload) {
        const newData = {
          nik: payload.nik,
          name: payload.name,
          gender: payload.gender,
          program: payload.program,
          age: payload.age,
        };
        state.arrData.unshift(newData);
      },
      removeData(state, payload) {
        state.arrData = state.arrData.filter((data) => {
          return data.nik != payload.nik;
        });
      },
    },

    actions: {
      editData({ commit, state }, payload) {
        const itemDeleted = state.arrData.filter((data) => {
          return data.nik === payload.nik;
        });

        commit("removeData", itemDeleted[0]);
        commit("addNewData", payload);
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
