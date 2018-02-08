// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import moment from 'moment'

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

fontawesome.library.add(solid)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.moment = moment
moment.locale('pl')

Vue.use(VueResource)
Vue.use(router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  http: { root: '/root' },
  template: '<App/>',
  components: { App }
}).$mount('#app')
