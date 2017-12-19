// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueStitch from './VueStitch'
import Vuetify from 'vuetify'
import infiniteScroll from 'vue-infinite-scroll'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(VueStitch)
Vue.use(infiniteScroll)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
