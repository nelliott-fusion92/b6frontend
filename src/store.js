import axios from 'axios'
import { set } from 'lodash-es'

export default {
  api_base: 'http://localhost:2047/api/',
  debug: true,
  history: [],
  historyIndex: 0,
  pushState: () => {
    this.history.unshift(this.state)
  },
  state: {
    banners: [],
    presets: [],
    currentPreset: {},
    currentBanner: {}
  },
  update: (key, data) => {
    this.pushState()
    this.state[key] = data
  },
  mutations: {
    getBanners: () => {
      axios
        .get(`${this.api_base}v1/banners`)
        .then((response) => {
          this.update('banners', response.data)
        })
    },
    getBanner: (id) => {
      axios
        .get(`${this.api_base}v1/banners/${id}`)
        .then((response) => {
          this.update('currentBanner', response.data)
        })
    },
    getPresets: () => {
      axios
        .get(`${this.api_base}v1/presets`)
        .then((response) => {
          this.update('presets', response.data)
        })
    },
    getPreset: (id) => {
      axios
        .get(`${this.api_base}v1/presets/${id}`)
        .then((response) => {
          this.update('currentPreset', response.data)
        })
    },
    setBannerProp: (path, val) => {
      _.set(this.currentBanner, path, val)
    },
  }
}
