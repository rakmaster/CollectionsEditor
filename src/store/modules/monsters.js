import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const stitch = require('mongodb-stitch')
const client = new stitch.StitchClient('dmautomator-mvuay')
const db = client.service('mongodb', 'mongodb-atlas').db('monsters')

const SET_MONSTERS = 'SET_MONSTERS'

const state = {
  monsters: [],
  page: 1,
  perPage: 20
}

const mutations = {
  [SET_MONSTERS] (state, input) {
    state.monsters = input
  }
}

const actions = {
  async setMonsters ({ commit }) {
    commit('SET_MONSTERS', await db.collection('monsters').find({}).execute())
  },
  async setMonster ({ commit }, input) {
    await db.collection('monsters')
      .updateOne({ _id: input.id }, { $set: input.set })
      .then(response => {
        console.log(response)
      })
  }
}

const getters = {
  monsters: state => { if (state.monsters) { return state.monsters.splice(0, state.page * state.perPage) } else { return [] } }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
