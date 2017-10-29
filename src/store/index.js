import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userVotes: {},
    deputiesStats: new Map(),
    domain: 'http://wybornie.org'
    loading: 0
  },
  mutations: {
    userVote (state, props) {
      Vue.set(state.userVotes, JSON.stringify({drukNr: props.drukNr, kadencja: props.kadencja}), props.vote)
    },
    loadingUp (state) {
      state.loading++
    },
    loadingDown (state) {
      state.loading--
    },
    setDeputyStat (state, props) {
      let temp = state.deputiesStats.get(props.deputyName)
      if (temp === undefined) {
        temp = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (props.vote) {
        temp.niezgodne.delete(JSON.stringify({drukNr: props.druk, kadencja: props.kadencja}))
        temp.zgodne.add(JSON.stringify({drukNr: props.druk, kadencja: props.kadencja}))
      } else {
        temp.zgodne.delete(JSON.stringify({drukNr: props.druk, kadencja: props.kadencja}))
        temp.niezgodne.add(JSON.stringify({drukNr: props.druk, kadencja: props.kadencja}))
      }
      temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
      state.deputiesStats.set(props.deputyName, temp)
    }
  },
  actions: {
  }
})
