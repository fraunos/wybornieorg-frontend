import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Stats from '@/components/Stats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/projekty/:kadencja?/:druk?',
      name: 'projects',
      component: Projects,
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
    }
  ]
})
