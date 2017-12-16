import Vue from 'vue'
import Vuex from 'Vuex'
import Users from './modules/users'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'
import config from '../config'

Vue.use(Vuex)

const Stitch = require('mongodb-stitch')
const CLIENT = new Stitch.StitchClient(config.stitch.app)
const DB = CLIENT.service('mongodb', 'mongodb-atlas').db(config.stitch.db)

const state = {
  config: config,
  client: CLIENT,
  db: DB
}

const mutations = {}

const actions = {}

const getters = {
  appName: state => state.config.appName,
  client: state => state.client,
  collections: state => state.config.collections
}

let store = new Vuex.Store({
  modules: {
    users: Users
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
