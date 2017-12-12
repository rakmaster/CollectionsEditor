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
  async setUser ({ commit, rootGetters }, input) {
    commit('SET_USER', await rootGetters.client.login(input))
  },
  unsetUser ({ commit }) {
    commit('UNSET_USER')
  }
}

const getters = {
  user: state => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
