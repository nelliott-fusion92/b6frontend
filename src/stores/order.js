export default Presetstore = {
  state: {
    presets: [],
    currentPreset: {},
  },
  actions: {

    GET_ORDERS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      let orders = await ax.get(`${this.state.api_base}v1/orders`, {
        headers: { 'content-type': 'application/json' },
      })

      commit('setOrders', orders.data)
      commit('changeLoadingStatus', 'COMPLETE')

      return true

    },

    REGENERATE_ORDER: async function({ commit }) {


      return true

    },

    GET_ORDER: async function({ commit }, id) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/orders/${id}`)
      commit('setCurrentOrder', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    DELETE_ORDER: async function({ commit }, id) {
      const data = await ax.delete(`${this.state.api_base}v1/orders/${id}`)
      this.dispatch('GET_ORDERS')
    },

    CREATE_ORDER: async function({ commit }) {

      let newOrder = await ax.post(`${this.state.api_base}v1/orders`, {
        //data: this.state.currentPreset,
        data: {
          name: 'Mothers Day Sale',
          client: 'Walgreens',
        },
        headers: { 'content-type': 'application/json' },
      })

      return true

    },

  },

  getters: {


  },

  mutations: {

    setOrders: function(currentState, data) {
      currentState.orders = data
    },
    setCurrentOrder: function(currentState, data) {
      currentState.currentOrder = data
    },

  }

}
