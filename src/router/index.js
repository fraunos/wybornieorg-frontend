import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from '@/components/Main'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Dev from '@/components/Dev'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/ostronie',
      name: 'about',
      component: About
    },
    {
      path: '/staty',
      name: 'stats',
      component: Stats
    },
    {
      path: '/dev',
      name: 'dev',
      component: Dev
    }
  ]
})
