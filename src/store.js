import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash-es'

const ax = axios.create({
  headers: {
    'x-liquidus': process.env.API_SECRET,
  },
})

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
  'COMPLETE',
  'ERROR'
]

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //api_base: 'https://bl6l.liquidus.net/api/',
    api_base: process.env.BANNERLINK6_API_URL,
    b6_base: process.env.BANNERLINK6_URL,
    debug: true,
    banners: [],
    bannersQuery: {
      skip: 0,
      limit: 10,
      name: '',
    },
    filteredBanners: [],
    presets: [],
    orders: [],
    currentOrder: {},
    components: [],
    customTypes: {},
    terms: {},
    ensembles: [],
    currentPreset: {},
    currentBanner: {},
    originalBanner: {},
    bannerSavingStatus: '',
    loadStatus: 'COMPLETE',
    bannerlistFilters: [],
  },
  actions: {

    AUTH: async function({ commit }){
      let r = await ax.post(
        `https://login.microsoftonline.com/${ process.env.TENANT_ID }/oauth2/token`, {
          data: {
            response_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            resource: 'https://graph.microsoft.com',
          }
        }
      )
      console.log(r)
    },

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
      const data = await ax.delete(`${this.state.api_base}v1/banners/${bid}`)
      this.dispatch('GET_BANNERS')
    },

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

    GET_COMPONENTS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/components`)
      commit('setComponents', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_CUSTOMTYPES: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/customtypes`)
      commit('setCustomTypes', data.data)
      commit('changeLoadingStatus', 'COMPLETE')
    },

    GET_TERMS: async function({ commit }) {
      commit('changeLoadingStatus', 'LOADING')
      const data = await ax.get(`${this.state.api_base}v1/terms`)
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
      await ax.post(`${this.state.api_base}v1/presets`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

    SAVE_BANNER_AS_NEW_BANNER: async function({ commit }) {
      commit('changeBannerSavingStatus', 'SAVING AS NEW BANNER')
      let newBanner = await ax.post(`${this.state.api_base}v1/banners`, {
        data: this.state.currentBanner,
        headers: { 'content-type': 'application/json' },
      })
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

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

    GENERATE_TEST_ARRAY: async function({ commit }) {
      const banners = [
        {
"_id": "5ce704096ac63d1418f4d69a",
"name": "B",
"id_counter": 14797342,
"description": "Controlled by arrows, expandable on mobile tap",
"protected": false,
"order_id": null,
"initWidth": 728,
"initHeight": 90,
"width": 728,
"height": 315,
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://www.walgreens.com/offers/offers.jsp/weeklyad?view=weeklyad",
"fallbackImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 5,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
},
{
"name": "Weather",
"options": {}
}
],
"states": [
{
"name": "Coverpage",
"preview": true,
"components": [
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 728,
"height": 90,
"backgroundColor": "",
"backgroundImage": "",
"clickAction": "nextState",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 0,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": null,
"anim": {}
},
"autoSwitch": null,
"id": 0
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": -1,
"animation": {
"itemDelay": 1000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/RightArrow_Blue.png",
"width": 21,
"height": 29,
"xOffset": 187,
"yOffset": 141
},
"animateArrows": false,
"image": {
"x": 0,
"y": 0,
"width": 150,
"height": 150
},
"groupTextFields": true,
"textContainer": {
"x": 170,
"y": 0,
"width": 140,
"height": 182
},
"titleText": {
"x": 0,
"y": 5,
"width": 140,
"font": "13px arial",
"alignment": "left",
"color": "rgb(170, 170, 170)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 140,
"font": "bold 24px arial",
"alignment": "left",
"color": "rgb(34, 187, 214)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "Card",
"card": {
"width": 312,
"height": 230,
"backgroundColor": "",
"border": ""
},
"mainCard": {
"xOffset": 0,
"yOffset": 50,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 320,
"yOffset": 50,
"scale": 0.67,
"opacity": 0.4
},
"badge": {},
"badges": [],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "#FFF",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING-Background_All.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 0
},
{
"name": "Button",
"options": {
"name": "Button",
"buttonImage": "",
"rolloverImage": "",
"buttonText": "Shop Now",
"buttonStyle": "width: 90px; text-align: center; font-family: Arial; font-weight: bold; padding: 12px 10px; font-size: 12px; background-color: #0199CD; border-radius: 4px;",
"buttonOverStyle": "",
"id": 1,
"stateID": 1,
"x": 320,
"y": 265,
"width": 90,
"height": 24,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 1
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "",
"id": 2,
"stateID": 1,
"x": 528,
"y": 215,
"width": 200,
"height": 100,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 2
},
{
"name": "MapV2",
"options": {
"name": "MapV2",
"mapBtn": {
"x": 3,
"y": 270,
"width": 300,
"height": 60,
"font": "9px Verdana",
"color": "#000",
"backgroundColor": "rgba(255,255,255,1)",
"backgroundImage": null
},
"mapFull": {
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"font": "12px Verdana",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING_mapview_All.jpg",
"backgroundColor": "rgba(255,255,255,)"
},
"address": {
"x": 23,
"y": 270,
"color": "rgba(0,0,0,0)",
"font": "10px Arial",
"alignment": "left"
},
"mapPin": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Anchor_Blue.png",
"y": 0,
"width": 4
},
"pinInfo": "font-size: 11px; color: #000;",
"closeBtn": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Close_Blue.png",
"x": 696,
"y": 10,
"width": 22,
"height": 22
},
"zipX": 313,
"zipY": 270,
"mapWidth": 728,
"mapHeight": 241,
"updateLocationText": "Update",
"updateLocationStyle": "cursor: pointer; position: absolute; left: 430px; top: 275px; text-align: center; color: #333; text-decoration: underline;",
"viewMapText": "View Map",
"viewMapStyle": "cursor: pointer; position: absolute; left: 22px; top: 295px; color: #333; font-size: 10px; text-decoration: underline;",
"id": 3,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 3
}
],
"in": {
"duration": 0,
"init": {},
"anim": {}
},
"out": {
"duration": 0,
"anim": {}
},
"autoSwitch": null,
"id": 1
}
],
"macroSettings": [],
},
{
"name": "B2",
"id_counter": 14797342,
"description": "Controlled by arrows, expandable on mobile tap",
"protected": "false",
"order_id": null,
"initWidth": 728,
"initHeight": 90,
"width": 728,
"height": 315,
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://www.walgreens.com/offers/offers.jsp/weeklyad?view=weeklyad",
"fallbackImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 5,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
},
{
"name": "Weather",
"options": {}
}
],
"states": [
{
"name": "Coverpage",
"preview": true,
"components": [
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 728,
"height": 90,
"backgroundColor": "",
"backgroundImage": "",
"clickAction": "nextState",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 0,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": null,
"anim": {}
},
"autoSwitch": null,
"id": 0
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": -1,
"animation": {
"itemDelay": 1000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/RightArrow_Blue.png",
"width": 21,
"height": 29,
"xOffset": 187,
"yOffset": 141
},
"animateArrows": false,
"image": {
"x": 0,
"y": 0,
"width": 150,
"height": 150
},
"groupTextFields": true,
"textContainer": {
"x": 170,
"y": 0,
"width": 140,
"height": 182
},
"titleText": {
"x": 0,
"y": 5,
"width": 140,
"font": "13px arial",
"alignment": "left",
"color": "rgb(170, 170, 170)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 140,
"font": "bold 24px arial",
"alignment": "left",
"color": "rgb(34, 187, 214)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "Card",
"card": {
"width": 312,
"height": 230,
"backgroundColor": "",
"border": ""
},
"mainCard": {
"xOffset": 0,
"yOffset": 50,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 320,
"yOffset": 50,
"scale": 0.67,
"opacity": 0.4
},
"badge": {},
"badges": [],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "#FFF",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING-Background_All.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 0
},
{
"name": "Button",
"options": {
"name": "Button",
"buttonImage": "",
"rolloverImage": "",
"buttonText": "Shop Now",
"buttonStyle": "width: 90px; text-align: center; font-family: Arial; font-weight: bold; padding: 12px 10px; font-size: 12px; background-color: #0199CD; border-radius: 4px;",
"buttonOverStyle": "",
"id": 1,
"stateID": 1,
"x": 320,
"y": 265,
"width": 90,
"height": 24,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 1
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "",
"id": 2,
"stateID": 1,
"x": 528,
"y": 215,
"width": 200,
"height": 100,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 2
},
{
"name": "MapV2",
"options": {
"name": "MapV2",
"mapBtn": {
"x": 3,
"y": 270,
"width": 300,
"height": 60,
"font": "9px Verdana",
"color": "#000",
"backgroundColor": "rgba(255,255,255,1)",
"backgroundImage": null
},
"mapFull": {
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"font": "12px Verdana",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING_mapview_All.jpg",
"backgroundColor": "rgba(255,255,255,)"
},
"address": {
"x": 23,
"y": 270,
"color": "rgba(0,0,0,0)",
"font": "10px Arial",
"alignment": "left"
},
"mapPin": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Anchor_Blue.png",
"y": 0,
"width": 4
},
"pinInfo": "font-size: 11px; color: #000;",
"closeBtn": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Close_Blue.png",
"x": 696,
"y": 10,
"width": 22,
"height": 22
},
"zipX": 313,
"zipY": 270,
"mapWidth": 728,
"mapHeight": 241,
"updateLocationText": "Update",
"updateLocationStyle": "cursor: pointer; position: absolute; left: 430px; top: 275px; text-align: center; color: #333; text-decoration: underline;",
"viewMapText": "View Map",
"viewMapStyle": "cursor: pointer; position: absolute; left: 22px; top: 295px; color: #333; font-size: 10px; text-decoration: underline;",
"id": 3,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 3
}
],
"in": {
"duration": 0,
"init": {},
"anim": {}
},
"out": {
"duration": 0,
"anim": {}
},
"autoSwitch": null,
"id": 1
}
],
"macroSettings": [],
},
{
"name": "B3WAL3333",
"_id": "5ce6f8fb2c132110b563782d",
"id_counter": null,
"description": "In-banner video that goes to another slide when complete.  Clicking video triggers company click.",
"protected": "false",
"order_id": null,
"initWidth": 300,
"initHeight": 250,
"width": 300,
"height": 250,
"color": "#FFF",
"backgroundColor": "#000",
"companyURL": "http://liquidus.net",
"fallbackImage": "https://images-na.ssl-images-amazon.com/images/I/51Atw18IZ5L._SX425_.jpg",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"limit": 10,
"radius": 1,
"listingLimit": 3,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
}
],
"states": [
{
"name": "Cover State",
"preview": true,
"components": [
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://i.pinimg.com/originals/60/04/30/600430c1d22c731b94cf4e7dae6b398a.gif",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 300,
"height": 250,
"backgroundColor": "rgba(0,0,0,1)",
"backgroundImage": "",
"clickAction": "nextState",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null
}
],
"in": {
"duration": 600,
"init": {
"top": 250
},
"anim": {
"top": 0
}
},
"out": {
"duration": 600,
"anim": {
"opacity": 0
}
},
"autoSwitch": null
},
{
"name": "Video State",
"preview": false,
"components": [
{
"name": "InBannerVideo",
"options": {
"name": "InBannerVideo",
"videoUrl": "http://bl6l.liquidus.net/public/assets/video/moonbeamrider.mp4",
"controls": true,
"autoPlay": true,
"autoMute": true,
"showPlay": true,
"showStop": false,
"showMute": true,
"showSeekbar": false,
"showFullscreen": false,
"onComplete": "nextState",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 300,
"height": 250,
"backgroundColor": "#000",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null
}
],
"in": {
"duration": 500,
"init": {
"opacity": 0
},
"anim": {
"opacity": 1
}
},
"out": {
"duration": null,
"anim": {}
},
"autoSwitch": null
}
],
"macroSettings": []
},{
"name": "B44",
"id_counter": 6213691,
"description": "Carousel and IBV intro",
"protected": false,
"initWidth": 300,
"initHeight": "600",
"width": 300,
"height": "600",
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://walmart.com",
"fallbackImage": "https://bl6l.liquidus.net/public/assets/img/wal600/fallback.png",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 10,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
}
],
"states": [
{
"name": "Video State",
"preview": true,
"components": [
{
"name": "InBannerVideo",
"options": {
"name": "InBannerVideo",
"videoUrl": "https://ibvl.liquidus.net/genericAssets/walmart/201904/GetOutdoorsSouth/Patio%20&%20Garden/300x600/WMT_RM_APRIL_GO_SOUTH_300x600_TK_031219_V05.mp4",
"controls": false,
"autoPlay": true,
"autoMute": true,
"showPlay": false,
"showStop": false,
"showMute": false,
"showSeekbar": false,
"showFullscreen": false,
"onComplete": "nextState",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 300,
"height": 600,
"backgroundColor": "#000",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": 500,
"anim": {
"x": -300
}
},
"autoSwitch": null
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": 2,
"animation": {
"itemDelay": 2000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6l.liquidus.net/public/assets/img/wal600/Walmart_Nov2018_300x250_NE_RightArrow.png",
"width": 30,
"height": 122,
"xOffset": 122,
"yOffset": 370
},
"animateArrows": false,
"image": {
"x": 50,
"y": 110,
"width": 210,
"height": 210
},
"groupTextFields": true,
"textContainer": {
"x": 10,
"y": 10,
"width": 160,
"height": 60
},
"titleText": {
"x": 0,
"y": 0,
"width": 160,
"font": "18px TRMBogle-Regular",
"alignment": "left",
"color": "rgb(0, 51, 51)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 160,
"font": "20px TRMBogle-Black",
"alignment": "left",
"color": "rgb(0, 51, 51)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "SwappedText",
"card": {
"width": 300,
"height": 400,
"backgroundColor": "rgba(0,0,0,0)",
"border": "none"
},
"mainCard": {
"xOffset": 0,
"yOffset": 200,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 300,
"yOffset": 200,
"scale": 1,
"opacity": 0
},
"badge": {
"x": 180,
"y": 10
},
"badges": [
{
"tagID": 6010,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/Rollback.png"
},
{
"tagID": 6011,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/New.png"
},
{
"tagID": 6013,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/OnlyAt.png"
}
],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 300,
"height": 600,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "https://bl6l.liquidus.net/public/assets/img/wal600/Walmart_GetOutdoorsSouth_April2019_300x600_Background.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 0
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6l.liquidus.net/public/assets/img/wal600/ShopNow.png",
"id": 1,
"stateID": 1,
"x": 104,
"y": 160,
"width": 91,
"height": 23,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 1
}
],
"in": {
"duration": 450,
"init": {
"left": 300
},
"anim": {
"left": 0
}
},
"out": {
"duration": 450,
"init": null,
"anim": {
"left": -300
}
},
"autoSwitch": null
}
],
"macroSettings": []
}]
      commit('changeBannerSavingStatus', 'SAVING PRESET AS NEW BANNER')
      let newBanner = await ax.post(`${this.state.api_base}v1/banners`, {
        //data: this.state.currentPreset,
        data: banners,
        headers: { 'content-type': 'application/json' },
      })
      .catch((err) => {
        commit('changeBannerSavingStatus', 'ERROR SAVING BANNER')
      })

      console.log(newBanner.data)
      commit('setCurrentBanner', newBanner.data)
      commit('changeBannerSavingStatus', 'COMPLETE')
      return true

    },

    TEST_BANNER_UPDATE: async function({ commit }) {
      const banners = [
        {
"name": "B",
"id_counter": 14797342,
"description": "Controlled by arrows, expandable on mobile tap",
"protected": "false",
"order_id": null,
"initWidth": 728,
"initHeight": 90,
"width": 728,
"height": 315,
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://www.walgreens.com/offers/offers.jsp/weeklyad?view=weeklyad",
"fallbackImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 5,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
},
{
"name": "Weather",
"options": {}
}
],
"states": [
{
"name": "Coverpage",
"preview": true,
"components": [
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 728,
"height": 90,
"backgroundColor": "",
"backgroundImage": "",
"clickAction": "nextState",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 0,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": null,
"anim": {}
},
"autoSwitch": null,
"id": 0
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": -1,
"animation": {
"itemDelay": 1000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/RightArrow_Blue.png",
"width": 21,
"height": 29,
"xOffset": 187,
"yOffset": 141
},
"animateArrows": false,
"image": {
"x": 0,
"y": 0,
"width": 150,
"height": 150
},
"groupTextFields": true,
"textContainer": {
"x": 170,
"y": 0,
"width": 140,
"height": 182
},
"titleText": {
"x": 0,
"y": 5,
"width": 140,
"font": "13px arial",
"alignment": "left",
"color": "rgb(170, 170, 170)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 140,
"font": "bold 24px arial",
"alignment": "left",
"color": "rgb(34, 187, 214)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "Card",
"card": {
"width": 312,
"height": 230,
"backgroundColor": "",
"border": ""
},
"mainCard": {
"xOffset": 0,
"yOffset": 50,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 320,
"yOffset": 50,
"scale": 0.67,
"opacity": 0.4
},
"badge": {},
"badges": [],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "#FFF",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING-Background_All.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 0
},
{
"name": "Button",
"options": {
"name": "Button",
"buttonImage": "",
"rolloverImage": "",
"buttonText": "Shop Now",
"buttonStyle": "width: 90px; text-align: center; font-family: Arial; font-weight: bold; padding: 12px 10px; font-size: 12px; background-color: #0199CD; border-radius: 4px;",
"buttonOverStyle": "",
"id": 1,
"stateID": 1,
"x": 320,
"y": 265,
"width": 90,
"height": 24,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 1
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "",
"id": 2,
"stateID": 1,
"x": 528,
"y": 215,
"width": 200,
"height": 100,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 2
},
{
"name": "MapV2",
"options": {
"name": "MapV2",
"mapBtn": {
"x": 3,
"y": 270,
"width": 300,
"height": 60,
"font": "9px Verdana",
"color": "#000",
"backgroundColor": "rgba(255,255,255,1)",
"backgroundImage": null
},
"mapFull": {
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"font": "12px Verdana",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING_mapview_All.jpg",
"backgroundColor": "rgba(255,255,255,)"
},
"address": {
"x": 23,
"y": 270,
"color": "rgba(0,0,0,0)",
"font": "10px Arial",
"alignment": "left"
},
"mapPin": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Anchor_Blue.png",
"y": 0,
"width": 4
},
"pinInfo": "font-size: 11px; color: #000;",
"closeBtn": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Close_Blue.png",
"x": 696,
"y": 10,
"width": 22,
"height": 22
},
"zipX": 313,
"zipY": 270,
"mapWidth": 728,
"mapHeight": 241,
"updateLocationText": "Update",
"updateLocationStyle": "cursor: pointer; position: absolute; left: 430px; top: 275px; text-align: center; color: #333; text-decoration: underline;",
"viewMapText": "View Map",
"viewMapStyle": "cursor: pointer; position: absolute; left: 22px; top: 295px; color: #333; font-size: 10px; text-decoration: underline;",
"id": 3,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 3
}
],
"in": {
"duration": 0,
"init": {},
"anim": {}
},
"out": {
"duration": 0,
"anim": {}
},
"autoSwitch": null,
"id": 1
}
],
"macroSettings": [],
},
{
"name": "B2",
"id_counter": 14797342,
"description": "Controlled by arrows, expandable on mobile tap",
"protected": "false",
"order_id": null,
"initWidth": 728,
"initHeight": 90,
"width": 728,
"height": 315,
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://www.walgreens.com/offers/offers.jsp/weeklyad?view=weeklyad",
"fallbackImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 5,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
},
{
"name": "Weather",
"options": {}
}
],
"states": [
{
"name": "Coverpage",
"preview": true,
"components": [
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_Cover_All.jpg",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 728,
"height": 90,
"backgroundColor": "",
"backgroundImage": "",
"clickAction": "nextState",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 0,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": null,
"anim": {}
},
"autoSwitch": null,
"id": 0
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": -1,
"animation": {
"itemDelay": 1000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6.liquidus.net/public/assets/img/wags/RightArrow_Blue.png",
"width": 21,
"height": 29,
"xOffset": 187,
"yOffset": 141
},
"animateArrows": false,
"image": {
"x": 0,
"y": 0,
"width": 150,
"height": 150
},
"groupTextFields": true,
"textContainer": {
"x": 170,
"y": 0,
"width": 140,
"height": 182
},
"titleText": {
"x": 0,
"y": 5,
"width": 140,
"font": "13px arial",
"alignment": "left",
"color": "rgb(170, 170, 170)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 140,
"font": "bold 24px arial",
"alignment": "left",
"color": "rgb(34, 187, 214)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "Card",
"card": {
"width": 312,
"height": 230,
"backgroundColor": "",
"border": ""
},
"mainCard": {
"xOffset": 0,
"yOffset": 50,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 320,
"yOffset": 50,
"scale": 0.67,
"opacity": 0.4
},
"badge": {},
"badges": [],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "#FFF",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING-Background_All.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 0
},
{
"name": "Button",
"options": {
"name": "Button",
"buttonImage": "",
"rolloverImage": "",
"buttonText": "Shop Now",
"buttonStyle": "width: 90px; text-align: center; font-family: Arial; font-weight: bold; padding: 12px 10px; font-size: 12px; background-color: #0199CD; border-radius: 4px;",
"buttonOverStyle": "",
"id": 1,
"stateID": 1,
"x": 320,
"y": 265,
"width": 90,
"height": 24,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 1
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "",
"id": 2,
"stateID": 1,
"x": 528,
"y": 215,
"width": 200,
"height": 100,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 2
},
{
"name": "MapV2",
"options": {
"name": "MapV2",
"mapBtn": {
"x": 3,
"y": 270,
"width": 300,
"height": 60,
"font": "9px Verdana",
"color": "#000",
"backgroundColor": "rgba(255,255,255,1)",
"backgroundImage": null
},
"mapFull": {
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"font": "12px Verdana",
"backgroundImage": "https://bl6.liquidus.net/public/assets/img/wags/728x90/Walgreens_728x90_EXPANDING_mapview_All.jpg",
"backgroundColor": "rgba(255,255,255,)"
},
"address": {
"x": 23,
"y": 270,
"color": "rgba(0,0,0,0)",
"font": "10px Arial",
"alignment": "left"
},
"mapPin": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Anchor_Blue.png",
"y": 0,
"width": 4
},
"pinInfo": "font-size: 11px; color: #000;",
"closeBtn": {
"img": "https://bl6.liquidus.net/public/assets/img/wags/Close_Blue.png",
"x": 696,
"y": 10,
"width": 22,
"height": 22
},
"zipX": 313,
"zipY": 270,
"mapWidth": 728,
"mapHeight": 241,
"updateLocationText": "Update",
"updateLocationStyle": "cursor: pointer; position: absolute; left: 430px; top: 275px; text-align: center; color: #333; text-decoration: underline;",
"viewMapText": "View Map",
"viewMapStyle": "cursor: pointer; position: absolute; left: 22px; top: 295px; color: #333; font-size: 10px; text-decoration: underline;",
"id": 3,
"stateID": 1,
"x": 0,
"y": 0,
"width": 728,
"height": 315,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": 1,
"id": 3
}
],
"in": {
"duration": 0,
"init": {},
"anim": {}
},
"out": {
"duration": 0,
"anim": {}
},
"autoSwitch": null,
"id": 1
}
],
"macroSettings": [],
},{
"name": "B3",
"id_counter": 6213691,
"description": "Carousel and IBV intro",
"protected": false,
"initWidth": 300,
"initHeight": "600",
"width": 300,
"height": "600",
"color": "#FFF",
"backgroundColor": "#fff",
"companyURL": "https://walmart.com",
"fallbackImage": "https://bl6l.liquidus.net/public/assets/img/wal600/fallback.png",
"services": [
{
"name": "NAPI",
"options": {
"zipLimit": 1,
"radius": 100,
"listingLimit": 10,
"storeLimit": 5,
"departmentid": 5321
}
},
{
"name": "Liquidus",
"options": {}
}
],
"states": [
{
"name": "Video State",
"preview": true,
"components": [
{
"name": "InBannerVideo",
"options": {
"name": "InBannerVideo",
"videoUrl": "https://ibvl.liquidus.net/genericAssets/walmart/201904/GetOutdoorsSouth/Patio%20&%20Garden/300x600/WMT_RM_APRIL_GO_SOUTH_300x600_TK_031219_V05.mp4",
"controls": false,
"autoPlay": true,
"autoMute": true,
"showPlay": false,
"showStop": false,
"showMute": false,
"showSeekbar": false,
"showFullscreen": false,
"onComplete": "nextState",
"id": 0,
"stateID": 0,
"x": 0,
"y": 0,
"width": 300,
"height": 600,
"backgroundColor": "#000",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 0
}
],
"in": {
"duration": null,
"init": {},
"anim": {}
},
"out": {
"duration": 500,
"anim": {
"x": -300
}
},
"autoSwitch": null
},
{
"name": "Carousel State",
"preview": false,
"components": [
{
"name": "CarouselV2",
"options": {
"name": "CarouselV2",
"autoSlide": false,
"stopOnLastProduct": false,
"interactionMode": "none",
"loop": -1,
"autoslideProducts": 2,
"animation": {
"itemDelay": 2000,
"animationTime": 0.45,
"ease": "Power2.easeOut"
},
"arrows": {
"imgUrl": "https://bl6l.liquidus.net/public/assets/img/wal600/Walmart_Nov2018_300x250_NE_RightArrow.png",
"width": 30,
"height": 122,
"xOffset": 122,
"yOffset": 370
},
"animateArrows": false,
"image": {
"x": 50,
"y": 110,
"width": 210,
"height": 210
},
"groupTextFields": true,
"textContainer": {
"x": 10,
"y": 10,
"width": 160,
"height": 60
},
"titleText": {
"x": 0,
"y": 0,
"width": 160,
"font": "18px TRMBogle-Regular",
"alignment": "left",
"color": "rgb(0, 51, 51)"
},
"dealText": {
"x": 0,
"y": 0,
"width": 160,
"font": "20px TRMBogle-Black",
"alignment": "left",
"color": "rgb(0, 51, 51)"
},
"dealFormat": {
"dollarSymbolStyle": "",
"dotStyle": "",
"dollarAmountStyle": "",
"centsAmountStyle": "",
"centsSymbolStyle": ""
},
"cardTemplate": "SwappedText",
"card": {
"width": 300,
"height": 400,
"backgroundColor": "rgba(0,0,0,0)",
"border": "none"
},
"mainCard": {
"xOffset": 0,
"yOffset": 200,
"scale": 1,
"opacity": 1
},
"sideCard": {
"xOffset": 300,
"yOffset": 200,
"scale": 1,
"opacity": 0
},
"badge": {
"x": 180,
"y": 10
},
"badges": [
{
"tagID": 6010,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/Rollback.png"
},
{
"tagID": 6011,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/New.png"
},
{
"tagID": 6013,
"imgUrl": "https://images.liquidus.net/cpg/walmart/2018nov/OnlyAt.png"
}
],
"id": 0,
"stateID": 1,
"x": 0,
"y": 0,
"width": 300,
"height": 600,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "https://bl6l.liquidus.net/public/assets/img/wal600/Walmart_GetOutdoorsSouth_April2019_300x600_Background.jpg",
"clickAction": "",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 0
},
{
"name": "Coverpage",
"options": {
"name": "Coverpage",
"imgUrl": "https://bl6l.liquidus.net/public/assets/img/wal600/ShopNow.png",
"id": 1,
"stateID": 1,
"x": 104,
"y": 160,
"width": 91,
"height": 23,
"backgroundColor": "rgba(0,0,0,0)",
"backgroundImage": "",
"clickAction": "companyClick",
"clickThruURL": "",
"rolloverAction": "",
"rolloutAction": ""
},
"stateID": null,
"id": 1
}
],
"in": {
"duration": 450,
"init": {
"left": 300
},
"anim": {
"left": 0
}
},
"out": {
"duration": 450,
"init": null,
"anim": {
"left": -300
}
},
"autoSwitch": null
}
],
"macroSettings": []
}]
      commit('changeBannerSavingStatus', 'UPDATING EXISTING BANNER')
      await ax.put(`${this.state.api_base}v1/banners`, {
        data: banners,
        headers: { 'content-type': 'application/json' },
      })
      .catch(error => {
        console.log(error)
        commit('changeBannerSavingStatus', `ERROR: ${ error }`)
      })
      commit('changeBannerSavingStatus', 'COMPLETE')
      console.log('complete')
      return true
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

      return true

    },

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
    getBannerProperty: (state) => (path) => {
      return _.get(state.currentBanner, path)
    },
    getTerm: (state => (term) => {
      return _.get(state.terms, term, '(no definition found)')
    }),
    getComponents: (state => {
      return state.components
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

    changeLoadingStatus: function(currentState, data) {
      currentState.loadStatus = data;
    },

    changeBannerSavingStatus: function(currentState, data) {
      currentState.bannerSavingStatus = data;
    },

    setCurrentBanner: function(currentState, data) {
      currentState.currentBanner = _.cloneDeep(data)
      currentState.originalBanner = _.cloneDeep(data)
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

    setOrders: function(currentState, data) {
      currentState.orders = data
    },
    setCurrentOrder: function(currentState, data) {
      currentState.currentOrder = data
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
