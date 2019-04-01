<script>

  import { mapState } from 'vuex'

  export default {
    name: 'Bannerprop',
    props: [
      'value',
      'componentName',
      'type',
      'path',
      'key',
      'propkey',
      'options',
    ],
    data () {
      return {
        content: this.value
      }
    },
    methods: {
      handleInput: function(e) {
        this.$emit('input', {
          path: this.path,
          val: this.content,
        })
      },
      handleInputSelect: function(e) {
        this.$emit('input', {
          path: this.path,
          val: e.target.options[e.target.options.selectedIndex].value,
        })
        console.log(e.target.options[e.target.options.selectedIndex].value)
      },
      handleInputObject: function(e) {
        this.$emit('input', e);
      },
    },
  }

</script>

<template>
  <div class="prop">
    <label>{{propkey}}</label>
    <div v-if="type === 'color'">
      <input type="color" v-model="content" @input="handleInput" />
    </div>
    <div v-else-if="options">
      <select :value="content" @input="handleInputSelect">
        <option value=""></option>
        <option selected :value="content">{{content}}</option>        
        <option v-for="val in options" v-if="val != content" :value="val">{{val}}</option>
      </select>
    </div>
    <div v-else-if="type === 'object'">
      <Bannerprop
        class="objectprop"
        v-for="(subprop, subpropkey) in $store.state.components[this.componentName].editableParameters[this.propkey].props"
        :key="subpropkey"
        :componentName="componentName"
        :value="content[subpropkey]"
        :propkey="subpropkey"
        @input="handleInputObject"
        :path="`${path}.${subpropkey}`"
        :type="subprop.type"
      />
    </div>
    <div v-else>
      <input v-model="content" @input="handleInput" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  input, select {
    display: block;
    margin: 5px 0 11px 0;
    height: 24px;
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
    display:block;
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
  .prop {
    display:inline-block;
    width: 350px;
    color: #0F0;
    vertical-align:top;
  }
  .objectprop {
    padding: 10px;
    background-color: #034710;
    vertical-align:top;
  }
  .objectprop input {
    background-color: #014330;
    color: #AF0;
  }

</style>
