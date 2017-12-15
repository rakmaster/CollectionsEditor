import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_RECORDS = 'SET_RECORDS'

const state = {
  records: {},
  page: 0,
  perPage: 20
}

const mutations = {
  [SET_RECORDS] (state, input) {
    state.records = {...state.records, [input.collection]: input.records}
  }
}

const actions = {
  async setRecords ({ state, commit, rootState }, input) {
    let lastId = 0
    if (state.records[input]) {
      lastId = state.records[input][(state.records[input].length - 1)]
    }
    commit('SET_RECORDS', {collection: input, records: await rootState.db.collection(input).find().sort({'_id': 1}).limit(state.perPage).execute()})
  },
  async setRecord ({ state, commit, rootState }, input) {
    await rootState.db.collection(input.collection)
      .updateOne({ _id: input.id }, { $set: input.set })
      .then(response => {
        console.log(response)
      })
  },
  async addRecords ({ state, commit, rootState }, input) {
    let current = state.records[input]
    let lastId = current[(current.length - 1)]._id
    return rootState.db.collection(input).find({'_id': {$gt: lastId}}).sort({'_id': 1}).limit(state.perPage).execute().then(response => {
      response.forEach(el => {
        current.push(el)
      })
      state.page++
      return response.length
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
