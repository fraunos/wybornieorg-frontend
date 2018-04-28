import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userVotes: {},
    domain: 'http://89.69.164.147',
    votingsCache: {},
    loading: 0
  },
  mutations: {
    userVote: (state, props) => {
      if (props.vote === null) {
        Vue.delete(state.userVotes, props.numbers)
      } else {
        Vue.set(state.userVotes, props.numbers, props.vote ? 1 : -1)
      }
    },
    loadingUp (state) {
      state.loading++
    },
    loadingDown (state) {
      state.loading--
    },
    loadSavedData: (state, props) => {
      state.userVotes = props
    },
    cacheVoting: (state, props) => {
      console.log('caching ' + props.numbers)
      Vue.set(state.votingsCache, props.numbers, props.data)
    }
  },
  actions: {
  },
  getters: {
    isMobile: () => {
      return (window.innerHeight / window.innerWidth) > 1
    },
    currentVoting: (state) => (prop) => {
      return state.votingsCache[prop]
    }
  }
})
