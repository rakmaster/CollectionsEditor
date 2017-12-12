import Vue from 'vue'
import Vuex from 'Vuex'
import Users from './modules/users'
import Monsters from './modules/monsters'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

Vue.use(Vuex)

const Stitch = require('mongodb-stitch')

const SET_CLIENT = 'SET_CLIENT'
const SET_DB = 'SET_DB'

const state = {
  client: null,
  db: null
}

const mutations = {
  [SET_CLIENT] (state) {
    state.client = new Stitch.StitchClient('dmautomator-mvuay')
  },
  [SET_DB] (state) {
    state.db = state.client.service('mongodb', 'mongodb-atlas').db('monsters')
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
  db: state => state.db
}

let store = new Vuex.Store({
  modules: {
    users: Users,
    monsters: Monsters
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
