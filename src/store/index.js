import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const $ = require('jquery')
export default new Vuex.Store({
  state: {
    projects: [],
    currentProject: [],
    userVotes: {},
    deputiesStats: {}
  },
  mutations: {
    loadProjects (state, data) {
      state.projects = data
    },
    loadProject (state, data) {
      state.currentProject = data
    },
    userVote (state, vote) {
      Vue.set(state.userVotes, state.currentProject.drukNr, vote)
    },
    setDeputyStat (state, {deputy, vote}) {
      if (state.deputiesStats[deputy.name] === undefined) {
        state.deputiesStats[deputy.name] = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (vote) {
        state.deputiesStats[deputy.name].niezgodne.delete(state.currentProject.drukNr)
        state.deputiesStats[deputy.name].zgodne.add(state.currentProject.drukNr)
      } else {
        state.deputiesStats[deputy.name].zgodne.delete(state.currentProject.drukNr)
        state.deputiesStats[deputy.name].niezgodne.add(state.currentProject.drukNr)
      }
    }
  },
  actions: {
    fetchProjects: ({
      commit
    }) => {
      $.get('http://89.70.23.117:3000/dev/projekty')
        .done(data => {
          commit('loadProjects', data)
        })
    },
    fetchProject: ({
      commit
    }, project) => {
      $.get('http://89.70.23.117:3000/dev/projekty/' + project.drukNr)
        .done(data => {
          commit('loadProject', data)
        })
    }
  }
})
