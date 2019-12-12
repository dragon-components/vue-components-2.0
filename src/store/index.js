import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import main from './module/main'
import modules from './module/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    main,
    ...modules
  }
})
