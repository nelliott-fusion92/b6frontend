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

const r = new VueRouter({
  routes: [
    {
      path: '/bitcoin',
      name: 'bitcoin',
      component: Bitcoin,
    },
    {
      path: '/banners',
      name: 'banners',
      component: Bannerlist,
    },
    {
      path: '/banners/:id',
      name: 'banner',
      component: Bannerdetail,
      props: (route) => ({
        id: route.params.id,
      })
    },
    {
      path: '/presets',
      name: 'presets',
      component: Presetlist,
    },
    {
      path: '/presets/:id',
      name: 'preset',
      component: Presetdetail,
      props: (route) => ({
        id: route.params.id,
      })
    },
    {
      path: '/components',
      name: 'components',
      component: Componentlist,
    },
    {
      path: '*',
      name: 'error',
      component: Errorpage,
    },
  ],
})

r.beforeEach((to, from, next) => {
  // auth check here
  next()
})

export default r
