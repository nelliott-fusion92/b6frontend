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
    //api_base: 'https://bl6l.liquidus.net/api/',
    api_base: process.env.BANNERLINK6_API_URL,
    b6_base: process.env.BANNERLINK6_URL,
    debug: true,
    banners: [],
    presets: [],
    components: [],
    customTypes: {},
    terms: {},
    ensembles: [],
    currentPreset: {},
    currentBanner: {},
    originalBanner: {},
    bannerSavingStatus: '',
    loadStatus: 'COMPLETE',
  },
  actions: {

    GET_BANNERS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const banners = await axios.get(`${this.state.api_base}v1/banners`)
      commit('setBanners', banners.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_BANNER: async function({ commit }, payload) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/banners/${payload}`)
      commit('setCurrentBanner', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    DELETE_BANNER: async function({ commit }, payload) {
      const data = await axios.delete(`${this.state.api_base}v1/banners/${payload}`)
      this.dispatch('GET_BANNERS')
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
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/components`)
      commit('setComponents', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_CUSTOMTYPES: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/customtypes`)
      commit('setCustomTypes', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_TERMS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await axios.get(`${this.state.api_base}v1/terms`)
      commit('setTerms', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_ENSEMBLES: async function({ commit }) {
      const data = []
      commit('getEnsembles', data)
    },

    SET_BANNER_PROPERTY: function({ commit }, payload) {
      commit('setBannerProperty', payload)
    },

    SAVE_BANNER_AS_NEW_PRESET: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING AS NEW PRESET')
      await axios.post(`${this.state.api_base}v1/presets`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

    SAVE_BANNER_AS_NEW_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING AS NEW BANNER')
      let newBanner = await axios.post(`${this.state.api_base}v1/banners`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

    SAVE_PRESET_AS_NEW_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING PRESET AS NEW BANNER')
      let newBanner = await axios.post(`${this.state.api_base}v1/banners`, {
        data: this.state.currentPreset,
        headers: { 'content-type': 'application/json' },
      })

      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

    UPDATE_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'UPDATING EXISTING BANNER')
      let newBanner = await axios.post(`${this.state.api_base}v1/banners/${this.state.currentBanner._id}`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')

      return true

    },

  },

  getters: {
    getBannerProperty: (state) => (path) => {
      //console.log(eval('state.currentBanner.' + prop))
      const v = _.get(state.currentBanner, path)
      console.log(v)
      return v
    },
    getTerm: (state => (term) => {
      return _.get(state.terms, term, '(no definition found)')
    }),
    hasChanged: (state) => (path) => {
      if(_.isObject(_.get(state.currentBanner, path))){
        return false
      }
      return _.get(state.currentBanner, path) != _.get(state.originalBanner, path)
    },
    getOriginal: (state) => (path) => {
      return _.get(state.originalBanner, path)
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

    changeBannerSavingStatus: function(currentState, data) {
      currentState.bannerSavingStatus = data;
    },

    setCurrentBanner: function(currentState, data) {
      currentState.currentBanner = _.cloneDeep(data)
      currentState.originalBanner = _.cloneDeep(data)
      console.log(currentState.currentBanner)
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

    setCustomTypes: function(currentState, data) {
      currentState.customTypes = data
    },

    setTerms: function(currentState, data) {
      currentState.terms = data
    },

    setEnsembles: function(currentState, data) {
      currentState.ensembles = data
    },

    setBannerProperty: function(currentState, payload) {
      pushState()
      console.log(payload.path)
      console.log('Was: ' + this.getters.getBannerProperty(payload.path))
      _.set(currentState.currentBanner, payload.path, payload.val)
      console.log('Is now: ' + this.getters.getBannerProperty(payload.path))
    },
  },
})

let history = []
let historyIndex = 0

function pushState() {
  history.unshift(_.clone(store.state))
  //log('state pushed', history)
}

export default store
