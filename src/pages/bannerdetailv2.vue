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
      await this.$store.dispatch('GET_COMPONENTS')
      await this.$store.dispatch('GET_CUSTOMTYPES')
      await this.$store.dispatch('GET_TERMS')
      await this.$store.dispatch('GET_BANNER', this.id)
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
        return this.$store.getters.getCurrentBanner()
      },
      components: function() {
        return this.$store.state.components
      },
      sharedComponentParameters: function() {
        return this.$store.state.components.Component.editableParameters
      }

    },
    methods: {
      componentProp: function(n, p) {
        console.log(n)
        return this.$store.state.components[n].editableParameters[p] || this.$store.state.components.Component.editableParameters[p]
      },

      editableParameters: function(n) {
        return this.$store.state.components[n].editableParameters
      },
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
        this.$store.dispatch('UPDATE_STATES', _.map(document.getElementById('statelist').childNodes, (n) => {
          let index = n.attributes.index.value
          n.removeAttribute('index')
          return this.banner.states[index]
        }))

        console.log(this.$store.state.currentBanner)




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

    <div class="bannerdetails">
      <div v-for="state in banner.states" class="state">
        <div>
          {{state.name}}
        </div>
        <div v-for="component in state.components" class="component">
          <div>
            {{component.name}}
          </div>

          <div v-for="(def, key) in sharedComponentParameters" class="sharedprop">
            <div>
              {{key}}: {{def.type}} <br />
              {{ component.options[key] }}
            </div>
          </div>

          <div v-for="(def, key) in editableParameters(component.name)" class="prop">
            <div>
              {{key}}: {{def.type}} <br />
              {{ component.options[key] }}
            </div>
          </div>
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
  .bannerdetails div {
    margin: 0 0 0 10px;
  }
  .state {
    color: #2EE;
  }

  .component {
    color: #EE0;
  }
  .prop {
    color: #2F2;
  }
  .sharedprop {
    color: #52F;
  }
  .description {
    margin: 10px 0;
    font-family: 'Open Sans', sans;
    color: #0FF;
  }

  .error {
    color: #F00 !important;
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
