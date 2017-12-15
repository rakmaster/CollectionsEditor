import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_USER = 'SET_USER'
const UNSET_USER = 'UNSET_USER'

const state = {
  user: null
}

const mutations = {
  [SET_USER] (state, input) {
    state.user = input
  },
  [UNSET_USER] (state) {
    state.user = null
  }
}

const actions = {
  setUser ({ commit }, input) {
    commit('SET_USER', input)
  },
  unsetUser ({ commit }) {
    commit('UNSET_USER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
