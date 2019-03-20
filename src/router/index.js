import Vue from 'vue'
import VueRouter from 'vue-router'
import Bitcoin from '../components/bitcoin.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/bitcoin',
      name: 'bitcoin',
      component: Bitcoin
    }
  ]
})
