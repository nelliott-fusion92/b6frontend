import Vue from 'vue'
import VueRouter from 'vue-router'
import dotenv from 'dotenv/config'

import Home from '../pages/home.vue'
import Bannerlist from '../pages/bannerlist.vue'
import Bannerdetail from '../pages/bannerdetail.vue'
import BannerdetailV2 from '../pages/bannerdetailv2.vue'
import Presetlist from '../pages/presetlist.vue'
import Presetdetail from '../pages/presetdetail.vue'
import Componentlist from '../pages/components.vue'
import Orderlist from '../pages/orderlist.vue'
import Orderdetail from '../pages/orderdetail.vue'
import Documentation from '../pages/documentation.vue'
import Ensembles from '../pages/ensembles.vue'
import Purge from '../pages/Purge.vue'
import Errorpage from '../pages/errorpage.vue'

Vue.use(VueRouter)

const api_base = process.env.BANNERLINK6_API_URL

const r = new VueRouter({
  routes: [
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
      path: '/bannersv2/:id',
      name: 'bannerv2',
      component: BannerdetailV2,
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
      path: '/orders',
      name: 'orders',
      component: Orderlist,
    },
    {
      path: '/orders/:id',
      name: 'order',
      component: Orderdetail,
      props: (route) => ({
        id: route.params.id,
      }),
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
      path: '/ensembles',
      name: 'ensembles',
      component: Ensembles,
    },
    {
      path: '/purge',
      name: 'purge',
      component: Purge,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
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
