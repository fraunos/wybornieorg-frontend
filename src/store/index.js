import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userVotes: {},
    deputiesStats: new Map()
  },
  mutations: {
    userVote (state, props) {
      Vue.set(state.userVotes, props.projectNr, props.vote)
    },
    setDeputyStat (state, {deputy, projectNr, vote}) {
      let temp = state.deputiesStats.get(deputy.name)
      if (temp === undefined) {
        temp = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (vote) {
        temp.niezgodne.delete(projectNr)
        temp.zgodne.add(projectNr)
      } else {
        temp.zgodne.delete(projectNr)
        temp.niezgodne.add(projectNr)
      }
      temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
      state.deputiesStats.set(deputy.name, temp)
    }
  },
  actions: {
  }
})
