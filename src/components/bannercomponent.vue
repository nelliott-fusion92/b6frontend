<script>
  import _ from 'lodash-es'
  import Bannerprop from '../components/bannerprop.vue'

  export default {
    props: [
      'statekey',
      'compkey',
      'component',
    ],
    data: function() {
      return {
        showComponentProps: false,
        showAdvanced: false,
        showProps: false,
      }
    },
    components: {
      Bannerprop,
    },
    methods: {
      setBannerProperty: function(e) {
        this.$store.dispatch('SET_BANNER_PROPERTY', e)
      },
      toggleVisible: function(propSet){
        this[propSet] = !this[propSet]
      },
      isQuick: function(comp, prop) {
        let index = this.$store.state.components[comp].quickSettings.indexOf(prop)
        if(index < 0){
          return false
        }
        else {
          return true
        }
      }
    },
    computed: {
      quick: function(){
        let x = _.filter(this.$store.state.components[this.component.name].editableParameters, (op, key) => {
          if(this.$store.state.components[this.component.name].quickSettings.indexOf(key) >= 0)
          return op
        })
        console.log(x)
        return x
      },
      advanced: function(){

        let x = _.filter(this.$store.state.components[this.component.name].editableParameters, (op, key) => {
          if(this.$store.state.components[this.component.name].quickSettings.indexOf(key) < 0)
          return op
        })

        console.log(x)
        return x
      },
      coverpage: function() {
        return this.component.name == 'Coverpage'
      }
    }
  }

</script>

<template>

  <div v-if="loadStatus">
    <span @click="toggleVisible('showProps')" class="component-title">[ C{{compkey}} ] {{ component.name }}</span>
    <div class="component-body" v-show="showProps">
      <div class="sectionlabel" title="Properties that all components share">
        Component-level properties
        <span class="togglebutton" @click="toggleVisible('showComponentProps')"v-show="showComponentProps">(hide)</span>
        <span class="togglebutton" @click="toggleVisible('showComponentProps')"v-show="!showComponentProps">(show)</span>
      </div>

      <div v-show="showComponentProps" class="component-props propgroup">
        <Bannerprop
          v-for="(prop, propkey) in $store.state.components.Component.editableParameters"
          :key="propkey"
          :value="component.options[propkey] || $store.state.components.Component.defaults[propkey]"
          :componentName="component.name"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`states[${statekey}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
        />
      </div>
      <div class="sectionlabel">
        <span v-show="showAdvanced">Advanced Settings</span>
        <span v-show="!showAdvanced">Quick Settings</span>
        <span class="togglebutton" @click="toggleVisible('showAdvanced')"v-show="showAdvanced"> (show quick)</span>
        <span class="togglebutton" @click="toggleVisible('showAdvanced')"v-show="!showAdvanced"> (show advanced)</span>
      </div>
      <div v-show="showAdvanced" class="propgroup">
        <Bannerprop
          v-for="(prop, propkey) in $store.state.components[component.name].editableParameters"
          :key="propkey"
          :value="component.options[propkey] || $store.state.components[component.name].defaults[propkey]"
          :componentName="component.name"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`states[${statekey}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
          :quick="isQuick(component.name, propkey)"
        />
      </div>
      <div v-show="!showAdvanced" class="propgroup">
        <Bannerprop
          v-for="(prop, propkey) in $store.state.components[component.name].editableParameters"
          v-if="isQuick(component.name, propkey)"
          :key="propkey"
          :value="component.options[propkey] || $store.state.components[component.name].defaults[propkey]"
          :componentName="component.name"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`states[${statekey}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
          :quick="isQuick(component.name, propkey)"
        />
      </div>
      <div v-if="coverpage" class="coverpage"><img :src="component.options.imgUrl" /></div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .component-title {
    display: block;
    background-color: #212121;
    padding: 10px;
    font-family: 'Exo', sans-serif;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    color: #FFF;
    user-select:none;

    border-bottom: solid 1px #4A4A4A;

  }
  .component-title:hover {
    color: #AF0;
  }
  .component-props {

  }
  .component-body {
    padding: 10px;
    border: dotted 1px #333;
    border-top: none;
    overflow: auto;
  }
  .togglebutton {
    cursor: pointer;
    font-weight: 400;
    color: #7FF;
  }
  .quicksettings {
    color: #1AF;
  }
  .sectionlabel{
    color: #EEE;
    padding: 0 0 5px 0;
  }
  .propgroup {
    border-bottom: dotted 1px #0FF;
    margin: 0 0 10px 0;
  }
  .coverpage {

  }


</style>
