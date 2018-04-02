import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueFire from 'vuefire'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './vuex/store'
import './firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueFire)
Vue.use(router)

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  store,
  router,
  VueResource,
  BootstrapVue,
  render: h => h(App)
})
