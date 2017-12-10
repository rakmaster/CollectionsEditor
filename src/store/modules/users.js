import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const stitch = require('mongodb-stitch')
const client = new stitch.StitchClient('dmautomator-mvuay')
// const db = client.service('mongodb', 'mongodb-atlas').db('monsters')

const SET_USER = 'SET_USER'

const state = {
  user: null
}

const mutations = {
  [SET_USER] (state, input) {
    state.user = input
  }
}

const actions = {
  async setUser ({ commit }, input) {
    commit('SET_USER', await client.login(input))
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
