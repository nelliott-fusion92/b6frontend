import Vue from 'vue'
import VueRouter from 'vue-router'
import dotenv from 'dotenv/config'

import Bitcoin from '../components/bitcoin.vue'
import Bannerlist from '../components/bannerlist.vue'
import Bannerdetail from '../components/bannerdetail.vue'
import Presetlist from '../components/presetlist.vue'
import Presetdetail from '../components/presetdetail.vue'
import Componentlist from '../components/components.vue'
import Errorpage from '../components/errorpage.vue'

Vue.use(VueRouter)

const api_base = 'http://localhost:2047/api/'

export default new VueRouter({
  routes: [
    {
      path: '/bitcoin',
      name: 'bitcoin',
      component: Bitcoin
    },
    {
      path: '/banners',
      name: 'banners',
      component: Bannerlist,
      props: {
        api_base: api_base
      }
    },
    {
      path: '/banners/:id',
      name: 'banner',
      component: Bannerdetail,
      props: (route) => ({
        id: route.params.id,
        api_base: api_base
      })
    },
    {
      path: '/presets',
      name: 'presets',
      component: Presetlist,
      props: {
        api_base: api_base
      }
    },
    {
      path: '/presets/:id',
      name: 'preset',
      component: Presetdetail,
      props: (route) => ({
        id: route.params.id,
        api_base: api_base
      })
    },
    {
      path: '/components',
      name: 'components',
      component: Componentlist,
      props: {
        api_base: api_base
      }
    },
    {
      path: '*',
      name: 'error',
      component: Errorpage
    },
  ]
})
