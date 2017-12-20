import Vue from 'vue'
import Router from 'vue-router'
import Voting from '@/components/Voting'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/glosowania/'
    },
    {
      path: '/glosowania/:kadencja(\\d+)?/:posiedzenie(\\d+)?/:glosowanie(\\d+)?',
      name: 'voting',
      component: Voting,
      props: true
    },
    {
      path: '*',
      redirect: '/',
      name: '404',
      component: NotFound
    }
  ]
})
