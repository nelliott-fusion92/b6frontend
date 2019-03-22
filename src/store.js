import axios from 'axios'
import Vue from 'vue'
import _ from 'lodash-es'

export const store = Vue.observable({
  api_base: 'http://localhost:2047/api/',
  debug: true,
  banners: [],
  presets: [],
  currentPreset: {},
  currentBanner: {}
})

let history = []
let historyIndex = 0

function pushState() {
  history.unshift(_.clone(store))
  log('history', history)
}

function log(str, obj) {
  if(!obj) {
    console.log(str)
  }
  else {
    console.log(str, obj)
  }

}

export const mutations = {

  getBanners: function() {
    axios
      .get(`${store.api_base}v1/banners`)
      .then((response) => {
        pushState()
        store.banners = response.data
      })
  },
  getBanner: function(id) {

    axios
      .get(`${store.api_base}v1/banners/${id}`)
      .then((response) => {
        pushState()
        store.currentBanner = response.data
        this.isLoaded = true;
      })

  },
  getPresets: function() {
    axios
      .get(`${store.api_base}v1/presets`)
      .then((response) => {
        pushState()
        store.presets = response.data
      })
  },
  getPreset: function(id) {
    axios
      .get(`${store.api_base}v1/presets/${id}`)
      .then((response) => {
        pushState()
        store.currentPreset = response.data
        this.isLoaded = true;
      })
  },
  setBannerProp: function(path, val) {
    _.set(store.currentBanner, path, val)
  },
}
/*
const createStore = ({ state }) =>
  new Vue({
    data () {
      return { state }
    },
    methods: {
      log: function(str) {
        if(store.debug) {
          console.log(str)
        }
      },
      pushState: function() {
        store.history.unshift(_.clone(store))
        this.log(store.history)
      },
      update: function(key, data) {
        this.pushState()
        store[key] = data
      },
      getBanners: function() {
        axios
          .get(`${store.api_base}v1/banners`)
          .then((response) => {
            this.update('banners', response.data)
          })
      },
      getBanner: function(id) {
        axios
          .get(`${store.api_base}v1/banners/${id}`)
          .then((response) => {
            this.update('currentBanner', response.data)
          })
      },
      getPresets: function() {
        axios
          .get(`${store.api_base}v1/presets`)
          .then((response) => {
            this.update('presets', response.data)
          })
      },
      getPreset: function(id) {
        axios
          .get(`${store.api_base}v1/presets/${id}`)
          .then((response) => {
            this.update('currentPreset', response.data)
          })
      },
      setBannerProp: function(path, val) {
        _.set(this.currentBanner, path, val)
      },
    },
  })

export default createStore({
  state: {
    api_base: 'http://localhost:2047/api/',
    debug: true,
    history: [],
    historyIndex: 0,
    banners: [],
    presets: [],
    currentPreset: {},
    currentBanner: {}
  },
})
*/
