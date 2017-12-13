import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_RECORDS = 'SET_RECORDS'

const state = {
  records: {},
  page: 1,
  perPage: 20
}

const mutations = {
  [SET_RECORDS] (state, input) {
    state.records[input.collection] = input.records
    console.log(state.records)
  }
}

const actions = {
  async setRecords ({ state, commit, rootState }, input) {
    commit('SET_RECORDS', {
      collection: input,
      records: await rootState.db.collection(input).find({}).execute()
    })
  },
  async setRecord ({ state, commit, rootState }, input) {
    await rootState.db.collection(input.collection)
      .updateOne({ _id: input.id }, { $set: input.set })
      .then(response => {
        console.log(response)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
