<script>

  import _ from 'lodash-es'
  import Sortable from 'sortablejs'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannercomponent from '../components/bannercomponent.vue'
  import Bannerstate from '../components/bannerstate.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import Services from '../components/services.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Services,
      Bannerdisplay,
      Bannercomponent,
      Bannerstate,
      Bannerprop,
      pageheader,
    },
    async created () {

      await this.$store.dispatch('GET_BANNER', this.id)
      await this.$store.dispatch('GET_COMPONENTS')
      await this.$store.dispatch('GET_CUSTOMTYPES')
      await this.$store.dispatch('GET_TERMS')

      console.log(document.getElementById('statelist'))
      this.sortable = new Sortable(document.getElementById('statelist'), {
        animation: 400,
        sort: true,
        dragClass: 'sortable-drag',
        dataIdAttr: 'index',
	      easing: "cubic-bezier(.17,.67,.47,.93)",
          onEnd: (e) => {
        		this.stateOrderChanged(e)
        	},
      })
    },

    computed: {
      bannerSavingStatus: function() {
        return this.$store.state.bannerSavingStatus
      },
      isSavingComplete: function() {
        return this.$store.state.bannerSavingStatus == 'COMPLETE' || this.$store.state.bannerSavingStatus.indexOf('ERROR') > -1
      },
      isError: function() {
        return this.$store.state.bannerSavingStatus.indexOf('ERROR') > -1
      },
      banner: function() {
        return this.$store.state.currentBanner
      },
      components: function() {
        return this.$store.state.components
      },
      newStateOrder: function() {
        return _.map(document.getElementById('statelist').childNodes, (n) => {
          return this.banner.states[n.attributes.index.value]
        })
      }
    },
    methods: {
      undo: function() {
        this.$store.commit('undo')
      },
      saveBanner: function(){
        console.log(this.$store.state.currentBanner)
        this.$store.dispatch('SAVE_BANNER_AS_NEW_BANNER')
      },
      saveAsPreset: function() {
        this.$store.dispatch('SAVE_BANNER_AS_NEW_PRESET')
      },
      updateBanner: function() {
        this.$store.dispatch('UPDATE_BANNER')
      },
      previewBanner: function() {
        window.open(`${this.$store.state.b6_base}banner/${this.banner._id}`)
      },
      setBannerProperty: function(e) {
        this.$store.dispatch('SET_BANNER_PROPERTY', e)
      },
      stateOrderChanged: function(e) {
        console.log(document.getElementById('statelist').childNodes)
        _.map(document.getElementById('statelist').childNodes, (n) => {
          return this.banner.states[n.attributes.index.value]
        })

        console.log(this.newStateOrder)




        //console.log(this.options)
      }
    },
  }

</script>

<template>

  <div v-if="loadStatus && banner && components">
    <pageheader :title="banner['name']" />
    <div class="description">{{banner.description}}</div>
    <div class="greenbtn" @click="previewBanner">Preview</div><br /><br />

    <div class="panel">
      <h3>Banner Details</h3>
      <div class="panelbody">
        <Bannerprop
          v-for="(prop, propkey) in components.Banner.editableParameters"
          :key="propkey"
          :value="banner[propkey]"
          componentName="Banner"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`${propkey}`"
          :type="prop.type"
          :options="prop.options"
        />

      </div>
    </div>
    <div class="panel">
      <h3>NAPI</h3>
      <div class="panelbody">
        <Bannerprop
          v-for="(prop, propkey) in components.NAPI.editableParameters"
          :key="propkey"
          :value="banner.services[0].options[propkey]"
          componentName="NAPI"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`services[0].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
        />
      </div>
    </div>
    <div class="panel bigpanel">
      <h3>States</h3>
      <div class="panelbody bigpanelbody">
        <div id="statelist" class="statelist">
          <Bannerstate :index="key" class="banner-state" v-for="(state, key) in banner.states" :statekey="key" :state="state" :key="key" />
        </div>
      </div>
    </div>
    <div @click="updateBanner" class="greenbtn">Save</div>
    <div @click="saveBanner" class="greenbtn">Save as new</div>
    <div @click="saveAsPreset" class="greenbtn">Save as preset</div>
    <span :class="{ animateflicker : !isSavingComplete, error : isError }" class="loading-display">{{bannerSavingStatus}}</span>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .description {
    margin: 10px 0;
    font-family: 'Open Sans', sans;
    color: #0FF;
  }

  .error {
    color: #F00 !important;
  }

  .panel {
    display: inline-block;
    width: 350px;
    margin: 0 5px 8px 0;
    vertical-align:top;
    background: #050505;
    border: solid 1px #4A4A4A;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .panel h3 {
    background-color: #212121;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    color: #FFF;
    user-select:none;
    border-bottom: solid 1px #4A4A4A;
  }
  .panelbody {
    padding: 10px;
    height: 400px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .bigpanel {
    display: block;
    width: auto;
    height: auto;
    max-height: none;
  }
  .bigpanel h3 {
    margin: 0;
  }
  .bigpanelbody {
    padding: 0;
    height: auto;
    max-height: none;
  }
  .statelist {
    width: 100%;
    display: inline-block;
  }
  .sortable-drag {
    border: solid 1px #f00;
    transform: scale(1.5);
    background-color: #FFF;
    opacity: 1 !important;
  }
  .sortable-chosen {

    border: solid 1px #f00;
    border-bottom: solid 1px #f00 !important;
    z-index: 100;
  }
  .bannerid {
    font-size: 14px;

  }
  .banner-state {
    font-size: 16px;
    padding: 15px 10px;
    background-color: #050505;
    border-bottom: solid 1px #222;
    box-sizing: border-box;
  }
  .banner-state:last-child {
    border-bottom: none;
  }
  .banner-state:nth-child(even) {
    background-color: #101010;
  }
  .banner-state div {
    //margin: 0 0 0 10px;
    //padding: 10px;
  }
  .biginput {
    font-size: 16px;
    height: auto;
    width: 400px;
  }
  .smallinput {
    font-size: 14px;
    width: 60px;
    display: inline-block;
  }
  .state-title {
    display: block;
    margin: 0 0 10px 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;
    background-color: #000111;
  }
  .component:nth-child(odd) {
    background-color: #000104;
  }
  .banner-state:nth-child(even) {
    background-color: #101010;
  }

  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  .animateflicker {
     -webkit-animation: flickerAnimation .5s infinite;
     -moz-animation: flickerAnimation .5s infinite;
     -o-animation: flickerAnimation .5s infinite;
      animation: flickerAnimation .5s infinite;
      color: #FF0 !important;
  }
  .loading-display {
    color: #0FF;
    margin: 0 0 0 5px;
  }

</style>
