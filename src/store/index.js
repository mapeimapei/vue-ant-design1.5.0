import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

// const moduleA = {
//   state,
//   mutations,
//   actions,
//   getters,
// }

// const moduleB = {
//   state: {



//   },
//   mutations: {


//   },
//   actions: {


//   }
// }

const store = new Vuex.Store({
  // modules: {
  //   moduleA: moduleA,
  //   moduleB: moduleB
  // }
  state,
  mutations,
  actions,
  getters,
  
  
});
export default store
