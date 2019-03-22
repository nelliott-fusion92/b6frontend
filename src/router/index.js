import Vue from 'vue'
import VueRouter from 'vue-router'
import dotenv from 'dotenv/config'

import Bitcoin from '../pages/bitcoin.vue'
import Bannerlist from '../pages/bannerlist.vue'
import Bannerdetail from '../pages/bannerdetail.vue'
import Presetlist from '../pages/presetlist.vue'
import Presetdetail from '../pages/presetdetail.vue'
import Componentlist from '../pages/components.vue'
import Documentation from '../pages/documentation.vue'
import Errorpage from '../pages/errorpage.vue'

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
      path: '/documentation',
      name: 'documentation',
      component: Documentation,
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
