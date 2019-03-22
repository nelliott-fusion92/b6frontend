import '@babel/polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import _ from 'lodash-es'
import router from './router'
import LoadScript from 'vue-plugin-load-script';
import store from './store'

Vue.use(LoadScript);
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    loadStatus: function() {
      if(this.$store.state.loadStatus === 'COMPLETE')
        return true
      return false
    }
  }
})

const BL6 = new Vue({
  store,
  el: '#app',
  router,
  template: '<app/>',
  components: { App },
})
