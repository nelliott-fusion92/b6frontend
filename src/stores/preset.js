export default Presetstore = {
  state: {
    presets: [],
    currentPreset: {},
  },
  actions: {

    GET_PRESETS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/presets`)
      commit('setPresets', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_PRESET: async function({ commit }, pid) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/presets/${pid}`)
      commit('setCurrentPreset', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    SAVE_PRESET_AS_NEW_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING PRESET AS NEW BANNER')
      let newBanner = await ax.post(`${this.state.api_base}v1/banners`, {
        data: this.state.currentPreset,
        headers: { 'content-type': 'application/json' },
      })
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

  },

  getters: {


  },

  mutations: {

    setCurrentPreset: function(currentState, data) {
      currentState.currentPreset = data
    },

    setPresets: function(currentState, data) {
      currentState.presets = data
    },

  }

}
