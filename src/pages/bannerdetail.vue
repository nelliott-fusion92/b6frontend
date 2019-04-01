<script>

  import { isArray, isObject } from 'lodash-es'

  import Bannerdetailitem from '../components/bannerdetailitem.vue'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Bannerdetailitem,
      Bannerdisplay,
      Bannerprop,
      pageheader,
    },
    beforeMount () {
      this.$store.dispatch('GET_COMPONENTS')
    },
    mounted () {
      this.$store.dispatch('GET_BANNER', this.id)
    },
    computed: {
      banner: function() {
        return this.$store.state.currentBanner
      },
    },
    methods: {
      isObject: function(type) {
        if(type == 'object'){
          return true
        }
        return false
      },
      test: function(e) {
        console.log(e)
        this.$store.dispatch('SET_BANNER_PROPERTY', e)
      },
      undo: function() {
        this.$store.commit('undo')
      },
    },
  }

</script>

<template>

  <div v-if="loadStatus">
    <pageheader v-bind:title="$route.name" />
    <Bannerdetailitem v-if="banner._id" v-bind:banner="banner" />
    <div class="banner-state" v-for="(state, key) in banner.states">
      <span class="state-title">{{ state.name }}</span>
      <div class="component" v-for="(comp, compkey) in state.components">
        <span class="component-title">{{ comp.name }}</span>
        <Bannerprop
          v-for="(prop, propkey) in $store.state.components[comp.name].editableParameters"
          :value="comp.options[propkey]"
          :componentName="comp.name"
          :propkey="propkey"
          @input="test"
          :path="`states[${key}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :key="propkey"
        />
        <div class="prop" v-if="prop.type != 'object' " v-for="(prop, compkey) in $store.state.components[comp.name].editableParameters">
          <label>{{compkey}} ({{prop.type}})</label>
          <div v-if="prop.type ==='color'">
            <input @input="test" type="color" v-model="comp.options[compkey]" />
          </div>
          <div v-else-if="prop.options">
            <select @input="test" type="color" v-model="comp.options[compkey]" value="comp.options[compkey]">
              <option v-for="op in prop.options" v-bind:value="op">{{op}}</option>
            </select>
          </div>
          <div v-else>
            <input @input="test" v-model="comp.options[compkey]" />
          </div>
        </div>
        <div class="prop objectprop" v-else>
          <label class="objectlabel">{{compkey}}</label>
          <div class="nestedprops" v-for="(subprop, subkey) in $store.state.components[comp.name].editableParameters[compkey].props">
            <label>{{subkey}} ({{subprop.type}})</label>
            <input v-model="comp.options[compkey][subkey]" />
          </div>
        </div>
      </div>
    </div>
    <div @click="undo">Undo</div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  input, select {
    display: block;
    margin: 2px 0 11px 0;
    background-color: #013043;
    border: none;
    border-radius: 2px;
    outline: none;
    padding: 5px;
    color: #0EF;
    font-size: 12px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 2px 2px 2px #000920;
    width: 300px;
  }
  input[type='color'] {
    width: 30px;
    height: 30px;
    padding: 0;
    background-color: rgba(0,0,0,0);
    box-shadow: none;
  }
  label {
    color: #AF6 !important;
    font-weight: bold;
    font-family: 'Exo';
    font-size: 12px;
    text-transform: uppercase;
  }
  .objectlabel {
    color: #0F0 !important;
  }
  .component-title {
    display: block;
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  .banner-state {
    color: #2383FF;
    font-size: 18px;
    padding: 10px;
  }
  .banner-state div {
    margin: 0 0 0 10px;
    padding: 10px;
  }
  .state-title {
    display: block;
    margin: 0 0 10px 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;

  }
  .component:nth-child(odd) {
    background-color: #001122;
  }
  .prop {
    display:none;
    width: 350px;
    color: #0F0;
  }
  .objectprop {
    background-color: #034710;
    display: none;
  }
  .objectprop input {
    background-color: #014330;
    color: #AF0;
  }
  .bannerprops::-webkit-scrollbar { width: 10px !important; opacity: 0.5 !important; }
  .bannerprops {
    background-color: #001828 !important;
    color: #14AEFE;
    padding: 20px 10px;
    margin: 10px 0;
    border: solid 1px #005270;
    overflow-x: hidden;
    overflow-y: auto;
    width: 500px;
    max-height: 900px;
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    box-sizing: content-box;
    overflow-y: scroll;
  }


</style>
