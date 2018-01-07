import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import config from '../config'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({user: state.user})
})

const SET_USER = 'SET_USER'
const UNSET_USER = 'UNSET_USER'

const Stitch = require('mongodb-stitch')
const CLIENT = new Stitch.StitchClient(config.stitch.app)
const DB = CLIENT.service('mongodb', 'mongodb-atlas').db(config.stitch.db)

const state = {
  config: config,
  client: CLIENT,
  db: DB,
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

const getters = {
  appName: state => state.config.appName,
  client: state => state.client,
  collections: state => state.config.collections
}

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
