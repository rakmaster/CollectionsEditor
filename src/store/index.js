import Vue from 'vue'
import Vuex from 'Vuex'
import Users from './modules/users'
import Collections from './modules/collections'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'
import config from '../config'

Vue.use(Vuex)

const Stitch = require('mongodb-stitch')

const SET_CLIENT = 'SET_CLIENT'
const SET_DB = 'SET_DB'

const state = {
  config: config,
  client: null,
  db: null
}

const mutations = {
  [SET_CLIENT] (state) {
    state.client = new Stitch.StitchClient(state.config.stitch.app)
  },
  [SET_DB] (state) {
    state.db = state.client.service('mongodb', 'mongodb-atlas').db(state.config.stitch.db)
  }
}

const actions = {
  setClient ({ commit }) {
    commit('SET_CLIENT')
  },
  setDb ({ commit }) {
    commit('SET_DB')
  }
}

const getters = {
  client: state => state.client,
  db: state => state.db,
  appName: state => state.config.appName
}

let store = new Vuex.Store({
  modules: {
    users: Users,
    collections: Collections
  },
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      paths: ['users.user'],
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) => Cookie.set(key, value, {expires: 3, secure: true}),
        removeItem: key => Cookie.remove(key)
      }
    })
  ]
})

export default store
