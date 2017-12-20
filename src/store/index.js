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
    loading: 0,
    isMobile: (window.innerHeight / window.innerWidth) > 1
  },
  mutations: {
    userVote (state, props) {
      Vue.set(state.userVotes, JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie}), props.vote)
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
    setDeputyStat (state, props) {
      let temp = state.deputiesStats.get(props.deputyName)
      if (temp === undefined) {
        temp = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (props.vote) {
        temp.niezgodne.delete(JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie}))
        temp.zgodne.add(JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie}))
      } else {
        temp.zgodne.delete(JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie}))
        temp.niezgodne.add(JSON.stringify({kadencja: props.kadencja, posiedzenie: props.posiedzenie, glosowanie: props.glosowanie}))
      }
      temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
      state.deputiesStats.set(props.deputyName, temp)
    }
  },
  actions: {
  }
})
