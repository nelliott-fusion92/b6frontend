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
        showAdvanced: true,
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
      editableParameters: function() {
        return this.$store.state.components[this.component.name].editableParameters
      },
      quick: function(){
        let x = _.filter(this.$store.state.components[this.component.name].editableParameters, (op, key) => {
          if(this.$store.state.components[this.component.name].quickSettings.indexOf(key) >= 0){
            op.name = key
            return op
          }
        })

        let obj = {}
        _.each(x, (xx) => {
          obj[xx.name] = { type: xx.type }
        })
        return obj
      },

    }
  }

</script>

<template>

  <div v-if="loadStatus">
    <span @click="toggleVisible('showProps')" class="component-title">{{ component.name }}</span>
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
          v-for="(prop, propkey) in editableParameters"
          :key="propkey"
          :value="component.options[propkey] || $store.state.components[component.name].defaults[propkey]"
          :componentName="component.name"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`states[${statekey}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
        />
      </div>
      <div v-show="!showAdvanced" class="propgroup">
        <Bannerprop
          v-for="(prop, propkey) in quick"
          :key="propkey"
          :value="component.options[propkey] || $store.state.components[component.name].defaults[propkey]"
          :componentName="component.name"
          :propkey="propkey"
          @input="setBannerProperty"
          :path="`states[${statekey}].components[${compkey}].options.${propkey}`"
          :type="prop.type"
          :options="prop.options"
        />
      </div>
      <div class="preview">
        <h3>Preview</h3>
        <div v-if="component.name === 'Coverpage'" class="coverpage"><img :src="component.options.imgUrl" /></div>
        <div

        v-if="component.name === 'Textfield'"
        :style="{
          color: component.options.color,
          textAlign: component.options.alignment,
          font: component.options.font,
          textShadow: component.options.shadow,
          userSelect: component.options.userSelect
        }"
        >
          {{component.options.text}}
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .component-title {
    display: block;
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
  .component-title:hover {
    color: #FF0;
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

</style>
