import Vue from 'vue'
import Vuex from 'Vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'
import config from '../config'

Vue.use(Vuex)

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
  plugins: [
    createPersistedState({
      paths: ['user'],
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) => Cookie.set(key, value, {expires: 3, secure: true}),
        removeItem: key => Cookie.remove(key)
      }
    })
  ]
})

export default store
