import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userData: {
      displayHello: true
    },
    userVotes: {},
    domain: 'http://wybornie.org',
    votingsCache: {},
    loading: 0
  },
  mutations: {
    userVote: (state, props) => {
      Vue.set(state.userVotes, props.numbers, props.vote)
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
