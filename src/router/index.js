import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Votings from '@/components/Votings'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Stats from '@/components/Stats'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/glosowania/:kadencja?/:posiedzenie?/:glosowanie?',
      name: 'votings',
      component: Votings,
      props: true
    },
    {
      path: '/ostronie',
      name: 'ostronie',
      component: About
    },
    {
      path: '/statystyki',
      name: 'stats',
      component: Stats
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: Contact
    },
    {
      path: '*',
      // redirect: '/',
      name: '404',
      component: NotFound
    }
  ]
})
