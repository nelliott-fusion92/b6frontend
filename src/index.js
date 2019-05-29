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

import moment from 'moment'

Vue.use(LoadScript);
Vue.config.productionTip = true

Vue.mixin({
  methods: {
    createdDate: function(id) {
      return this.formatDate(new Date(parseInt(id.toString().substr(0,8), 16)*1000))
    },
    formatDate: function(date) {
      return moment(date).format('M/DD/YYYY h:mm a')
    }
  },
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
