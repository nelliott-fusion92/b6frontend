<script>

  import { mapState } from 'vuex'

  export default {
    name: 'Bannerprop',
    props: [
      'value',
      'componentName',
      'type',
      'path',
      'propkey',
      'options',
    ],
    data () {
      return {
        content: this.value,
      }
    },
    computed: {
      components: function() {
        return this.$store.state.components
      },
      term: function(){
        return this.$store.getters.getTerm(this.$vnode.key)
      },
      changed: function() {
        return this.$store.getters.hasChanged(this.path)
      },
      isObject: function(){
        return this.type == 'object'
      }
    },
    methods: {
      handleInput: function(e) {
        console.log(this.path)
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
      resetValue: function(e){
        this.content = this.$store.getters.getOriginal(this.path)
        this.$emit('input', {
          path: this.path,
          val: this.content,
        })
      }
    },
  }

</script>

<template>
  <div class="prop" :class="{ changed: changed, objectpropgroup: isObject }">
    <label>{{$vnode.key}} <span class="type">{{type}}</span> <span class="resetvalue" v-show="changed" @click="resetValue">(reset)</span></label>
    <div class="description">{{term}}</div>
    <div v-if="type === 'color'">
      <div class="colorbox" :style="{backgroundColor: content}"></div>
      <input class="colorinput" v-model="content" @input="handleInput" />
    </div>
    <div v-else-if="options">
      <select :value="content" @input="handleInputSelect">
        <option selected :value="content">{{content}}</option>
        <option v-for="val in options" v-if="val != content" :value="val">{{val}}</option>
        <option value=""></option>
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
        v-for="(subprop, subpropkey) in $store.state.components[this.componentName].editableParameters[this.$vnode.key].props"
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
  @import '../../assets/forms.scss';
  
  .prop {
    border-left: solid 4px #0FF;
    display:inline-block;
    margin: 10px 0 !important;
    padding: 0 10px !important;
    width: 270px;
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
  .colorinput {
    display: inline;
    width: 130px;
    vertical-align: 10px;
  }

  .resetvalue {
    font-size: 12px;
    text-transform: none;
    cursor: pointer;
    color: #FA0;
  }

  .colorbox {
    display: inline-block;
    height: 30px;
    width: 30px;
    border: solid 1px #666;
  }


</style>
