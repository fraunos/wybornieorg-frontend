import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userData: {
      displayHello: true
    },
    userVotes: {},
    deputiesStats: new Map(),
    domain: 'http://wybornie.org',
    loading: 0
  },
  mutations: {
    userVote: (state, props) => {
      Vue.set(state.userVotes, currentVoting(props), props.vote)
    },
    loadingUp (state) {
      state.loading++
    },
    loadingDown (state) {
      state.loading--
    },
    hideHello (state) {
      state.userData.displayHello = false
    },
    setDeputyStat: (state, props) => {
      let temp = state.deputiesStats.get(props.deputyName)
      if (temp === undefined) {
        temp = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (props.vote) {
        temp.niezgodne.delete(currentVoting(props))
        temp.zgodne.add(currentVoting(props))
      } else {
        temp.zgodne.delete(currentVoting(props))
        temp.niezgodne.add(currentVoting(props))
      }
      temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
      state.deputiesStats.set(props.deputyName, temp)
    }
  },
  actions: {

  },
  getters: {
    isMobile: () => {
      return (window.innerHeight / window.innerWidth) > 1
    }
  }
})

function currentVoting (props) {
  return JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie})
}
