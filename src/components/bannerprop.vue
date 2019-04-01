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
    ],
    data () {
      return {
        content: this.value
      }
    },
    methods: {
      handleInput: function() {
        this.$emit('input', {
          path: this.path,
          val: this.content,
        });
      },
      handleInputObject: function(e) {        
        this.$emit('input', e);
      },
    },
  }

</script>

<template>
  <div class="bannerprop">
    <div v-if="type === 'color'">
      color
    </div>
    <div v-else-if="type === 'object'">
      <label>{{propkey}}</label>
      <Bannerprop
        v-for="(subprop, subpropkey) in $store.state.components[this.componentName].editableParameters[this.propkey].props"
        :key="subpropkey"
        :value="content[subpropkey]"
        :propkey="subpropkey"
        @input="handleInputObject"
        :path="`${path}.${subpropkey}`"
        :type="subprop.type"
      />
    </div>
    <div v-else>
      <label>{{propkey}}</label>
      <input v-model="content" @input="handleInput" />
    </div>
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

</style>
