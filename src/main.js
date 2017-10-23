// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import moment from 'moment'

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
