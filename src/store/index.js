import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const $ = require('jquery')
export default new Vuex.Store({
  state: {
    projects: [],
    currentProject: [],
    userVotes: {},
    deputiesStats: new Map()
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
      let temp = state.deputiesStats.get(deputy.name)
      if (temp === undefined) {
        temp = {
          zgodne: new Set(),
          niezgodne: new Set()
        }
      }
      if (vote) {
        temp.niezgodne.delete(state.currentProject.drukNr)
        temp.zgodne.add(state.currentProject.drukNr)
      } else {
        temp.zgodne.delete(state.currentProject.drukNr)
        temp.niezgodne.add(state.currentProject.drukNr)
      }
      temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
      state.deputiesStats.set(deputy.name, temp)
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
