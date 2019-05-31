export default Bannerstore = {
  state: {
    banners: [],
    bannersQuery: {
      skip: 0,
      limit: 10,
      name: '',
    },
    filteredBanners: [],
    currentBanner: {},
    originalBanner: {},
  },
  actions: {

    GET_BANNERS: async function({ commit }) {
      //store.dispatch('AUTH')
      commit('changeLoadingStatus', 'LOADING')
      const banners = await ax.get(`${this.state.api_base}v1/banners`, {
        params: {
          limit: this.state.bannersQuery.limit,
          skip: this.state.bannersQuery.skip,
          name: this.state.bannersQuery.name,
        },
      })
      commit('setBanners', banners.data)
      commit('applyBannerlistFilters')
      commit('changeLoadingStatus', 'COMPLETE')
    },

    PURGE_BANNERS: async function({ commit }) {
      //store.dispatch('AUTH')
      commit('changeLoadingStatus', 'LOADING')
      const banners = await ax.get(`${this.state.api_base}v1/purge`)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    TURN_BANNERS_PAGE: async function({ commit }, payload) {
      commit('turnBannersPage', payload)
      this.dispatch('GET_BANNERS')
    },

    SET_BANNERLIST_FILTER: async function({ commit }, payload) {
      commit('setBannerlistFilter', payload)
      commit('applyBannerlistFilters')
    },

    RESET_BANNERLIST_FILTERS: async function({ commit }) {
      commit('resetBannerlistFilters')
      commit('applyBannerlistFilters')
    },

    GET_BANNER: async function({ commit }, bid) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/banners/${bid}`)
      commit('setCurrentBanner', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    DELETE_BANNER: async function({ commit }, bid) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.delete(`${this.state.api_base}v1/banners/${bid}`)
      this.dispatch('GET_BANNERS')
    },

    SET_BANNER_PROPERTY: function({ commit }, payload) {
      commit('setBannerProperty', payload)
    },

    SAVE_BANNER_AS_NEW_PRESET: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING AS NEW PRESET')
      await ax.post(`${this.state.api_base}v1/presets`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('changeBannerSavingStatus', 'COMPLETE')

    },

    SAVE_BANNER_AS_NEW_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING AS NEW BANNER')
      let newBanner = await ax.post(`${this.state.api_base}v1/banners`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')

    },

    REGENERATE_BANNER: async function({ commit }, data) {
      console.log('regen')
      console.log(data)
      commit('changeBannerSavingStatus', 'UPDATING EXISTING BANNER')
      await ax.post(`${this.state.api_base}v1/banners/${data._id}`, {
        data: data,
        headers: { 'content-type': 'application/json' },
      })
      .catch(error => {
        console.log(error)
        commit('changeBannerSavingStatus', `ERROR: ${ error }`)
      })
      console.log('regen')
      commit('changeBannerSavingStatus', 'COMPLETE')
      console.log('complete')
      return true

    },

    UPDATE_BANNER: async function({ commit }) {
      console.log('update')
      commit('changeBannerSavingStatus', 'UPDATING EXISTING BANNER')

      let newBanner = await ax.post(`${this.state.api_base}v1/banners/${this.state.currentBanner._id}`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      .catch(error => {
        console.log(error)
        commit('changeBannerSavingStatus', `ERROR: ${ error }`)
      })

      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      
    },
  },

  getters: {

    getBannerProperty: (state) => (path) => {
      return _.get(state.currentBanner, path)
    },

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

    setBannerlistFilter: function(currentState, data) {
      try {
        _.remove(currentState.bannerlistFilters, (f) => {
          return f.field == data.field && f.operator == data.operator
        })
      }
      catch(err){}

      if(data.value){
        currentState.bannerlistFilters.push(data)
      }

      if(currentState.bannerlistFilters.length == 0){

      }
    },

    resetBannerlistFilters: function(currentState) {
      currentState.bannerlistFilters = []
    },

    applyBannerlistFilters: function(currentState, data) {
      currentState.filteredBanners = _.cloneDeep(currentState.banners)

      _.each(currentState.bannerlistFilters, (f) => {
        currentState.filteredBanners = _.filter(currentState.filteredBanners, (b) => {
          switch(f.operator) {
            case '=':
            return _.get(b, f.field) == f.value
            break;
            case '^':
            return _.get(b, f.field).toString().toLowerCase().indexOf(f.value.toString().toLowerCase()) > -1;
            break;
            case '>':
            return _.get(b, f.field) > f.value
            break;
            case '<':
            return _.get(b, f.field) < f.value
            break;
            case '>=':
            return _.get(b, f.field) >= f.value
            break;
            case '<=':
            return _.get(b, f.field) <= f.value
            break;
          }
        })

      })
    },

    turnBannersPage: function(currentState, data) {
      currentState.bannersQuery.limit = data.limit
      currentState.bannersQuery.skip = data.skip
    },

    changeBannerSavingStatus: function(currentState, data) {
      currentState.bannerSavingStatus = data
    },

    setCurrentBanner: function(currentState, data) {
      currentState.currentBanner = _.cloneDeep(data)
      currentState.originalBanner = _.cloneDeep(data)
    },

    setBanners: function(currentState, data) {
      currentState.banners = data
    },

    setBannerProperty: function(currentState, payload) {
      pushState()
      console.log(payload.path)
      console.log('Was: ' + this.getters.getBannerProperty(payload.path))
      _.set(currentState.currentBanner, payload.path, payload.val)
      console.log('Is now: ' + this.getters.getBannerProperty(payload.path))
    },

  }

}
