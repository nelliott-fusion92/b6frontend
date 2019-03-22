import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { App },
  data: () => {
    return store.state
  }
})
