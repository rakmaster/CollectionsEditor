import Vue from 'vue'
import Vuex from 'Vuex'
import Users from './modules/users'
import Monsters from './modules/monsters'

Vue.use(Vuex)

const state = {}

const mutations = {}

const actions = {}

const getters = {}

export default new Vuex.Store({
  modules: {
    users: Users,
    monsters: Monsters
  },
  state,
  mutations,
  actions,
  getters
})
