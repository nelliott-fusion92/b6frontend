import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash-es'

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function log(str, obj) {
  if(!obj) {
    console.log(str)
  }
  else {
    console.log(str, obj)
  }
}

const loadStatuses = [
  'LOADING',
  'COMPLETE'
]

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    api_base: 'http://localhost:2047/api/',
    debug: true,
    banners: [],
    presets: [],
    components: [],
    ensembles: [],
    currentPreset: {},
    currentBanner: {},
    loadStatus: 'LOADING',
  },
  actions: {

    GET_BANNERS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/banners`)
      commit('setBanners', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_BANNER: async function({ commit }, payload) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/banners/${payload}`)
      commit('setCurrentBanner', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_PRESETS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/presets`)
      commit('setPresets', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_PRESET: async function({ commit }, payload) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/presets/${payload}`)
      commit('setCurrentPreset', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_COMPONENTS: async function({ commit }) {
      const data = await axios.get(`${this.state.api_base}v1/components`)
      commit('setComponents', data.data)
    },

    GET_ENSEMBLES: async function({ commit }) {
      const data = []
      commit('getEnsembles', data)
    },

    SET_BANNER_PROPERTY: function({ commit }, payload) {
      console.log(payload)
      commit('setBannerProperty', payload)

    },

  },

  getters: {
    getBannerProperty: (state) => (path) => {
      //console.log(eval('state.currentBanner.' + prop))
      const v = _.get(state.currentBanner, path)
      return v
    },
  },

  mutations: {

    undo: function(currentState, data){
      console.log('undo')
      currentState.currentBanner = history[0].currentBanner
    },

    redo: function(currentState, data){

    },

    changeLoadingStatus: function(currentState, data) {
      currentState.loadStatus = data;
    },

    setCurrentBanner: function(currentState, data) {
      currentState.currentBanner = data
    },

    setBanners: function(currentState, data) {
      currentState.banners = data
    },

    setCurrentPreset: function(currentState, data) {
      currentState.currentPreset = data
    },

    setPresets: function(currentState, data) {
      currentState.presets = data
    },

    setComponents: function(currentState, data) {
      currentState.components = data
    },

    setEnsembles: function(currentState, data) {
      currentState.ensembles = data
    },

    setBannerProperty: function(currentState, payload) {
      pushState()
      _.set(currentState.currentBanner, payload.path, payload.val)
      console.log(payload.path + ': ' + this.getters.getBannerProperty(payload.path))

    },
  },
})

let history = []
let historyIndex = 0

function pushState() {
  history.unshift(_.clone(store.state))
  log('state pushed', history)
}

export default store
