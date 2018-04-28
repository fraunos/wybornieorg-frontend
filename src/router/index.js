import Vue from 'vue'
import Router from 'vue-router'
import MainApp from '@/components/MainApp'
import Home from '@/components/Home'
import Voting from '@/components/Voting'
import NotFound from '@/components/NotFound'
import Loading from '@/components/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/wczytaj/:dane?',
      name: 'loading',
      component: Loading,
      props: true
    },
    {
      path: '/:kadencja(\\d+)?/:posiedzenie(\\d+)?/:glosowanie(\\d+)?',
      props: true,
      redirect: '/glosowania/:kadencja(\\d+)?/:posiedzenie(\\d+)?/:glosowanie(\\d+)?'
    },
    {
      path: '/glosowania/',
      children: [
        {
          path: ':kadencja(\\d+)?/:posiedzenie(\\d+)?/:glosowanie(\\d+)?',
          name: 'voting',
          component: Voting,
          props: true
        }
      ],
      name: 'main-app',
      component: MainApp
    },
    {
      path: '*',
      redirect: '/',
      name: '404',
      component: NotFound
    }
  ]
})
