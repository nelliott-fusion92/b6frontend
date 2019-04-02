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
      'quick',
    ],
    data () {
      return {
        content: this.value,
        original: this.value,
      }
    },
    computed: {
      term: function(){
        return this.$store.getters.getTerm(this.propkey)
      },
      changed: function() {
        return this.content != this.original || this.content !== this.original;
      },
      isObject: function(){
        return this.type == 'object'
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
        this.content = e.target.options[e.target.options.selectedIndex].value
      },
      handleInputObject: function(e) {
        this.$emit('input', e);
      },
    },
  }

</script>

<template>
  <div class="prop" :class="{ changed: changed, objectpropgroup: isObject }">
    <label>{{propkey}} <span class="type">{{type}}</span></label>
    <div class="description">{{term}}</div>
    <div v-if="type === 'color'">
      <input type="color" v-model="content" @input="handleInput" />
    </div>
    <div v-else-if="options">
      <select :value="content" @input="handleInputSelect">
        <option selected :value="content">{{content}}</option>
        <option v-for="val in options" v-if="val != content" :value="val">{{val}}</option>
      </select>
    </div>
    <div v-else-if="type === 'bool'">
      <select :value="content" @input="handleInputSelect">
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    </div>
    <div v-else-if="type === 'object'">
      <Bannerprop
        class="objectprop"
        v-for="(subprop, subpropkey) in $store.state.components[this.componentName].editableParameters[this.propkey].props"
        :componentName="componentName"
        :value="content[subpropkey]"
        :propkey="subpropkey"
        @input="handleInputObject"
        :path="`${path}.${subpropkey}`"
        :type="subprop.type"
        :options="subprop.options"
        :key="subpropkey"
      />
    </div>
    <div v-else>
      <input v-model="content" @input="handleInput" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .prop {
    border-left: solid 4px #0FF;
    display:inline-block;
    margin: 10px 0 !important;
    padding: 0 10px !important;
    width: 350px;
    vertical-align: middle;
    color: #0F0;
    font-family: 'Open Sans';
    font-weight: normal;
  }
  .prop:hover {
    border-left: solid 4px #FF0;
  }
  .objectpropgroup {

    padding: 10px !important;

    background-color: #003600;

    display: block;
    width: 100%;

  }
  .prop label {
    font-family: 'Open Sans';
    font-size: 14px;
  }

  .objectprop {
    border-left: solid 4px #AF0 !important;
    vertical-align:top;
  }
  .objectprop:hover {
    border-left: solid 4px #F09 !important;
  }
  .objectprop label {
    color: #0FF !important;
  }
  .objectprop input, .objectprop select {
    background-color: #002301;
    color: #FF0;
  }
  .description {
    font-size: 11px;
    color: #6DF;
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
  }

  .objectpropgroup .description {
    color: #FFF;
  }
  .objectpropgroup .type {
    color: #FA0;
  }
  .changed {
    border-left: dotted 4px #F90 !important;
  }
  .changed:hover {
    border-left: dotted 4px #FF0 !important;
  }
  .objectprop.changed:hover {
    border-left: dotted 4px #F09 !important;
  }
  .type {
    font-family: 'Open Sans';
    color: #FF00FF;
    font-size: 10px;
    -webkit-font-smoothing: auto;
    font-smoothing: auto;


  }
  .type::before {
    content: ' #';

  }


</style>
