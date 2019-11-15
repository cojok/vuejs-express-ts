import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: window.APP_CONFIG.API_URL
})

Vuex.Store.prototype.$http = instance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
