<script>

  import axios from 'axios'
  import pageheader from '../components/pageheader.vue'

  export default {

    components: {
      pageheader
    },
    props: [
      'component',
    ],
    data: function() {
      return {
        active: false
      }
    },

    methods: {
      getTerm: function(cname) {
        return this.$store.getters.getTerm(cname)
      },
      toggle: function() {
        this.active = !this.active
      }
    },

    computed: {
      components: function() {
        return this.$store.state.components
      }
    }
  }

</script>

<template>
  <div>
    <div @click="toggle" class="component-item">{{component.name}}</div>
    <div :class="{ shown: !active }" class="editableparams">
      <ul>
        <li v-for="(value, key) in component.editableParameters">
          <span class="paramname">{{key}}</span> <span class="type">#{{value.type}}</span>
          <div class="default" v-if="component.defaults[key]">Default: {{component.defaults[key]}}</div>
          <div class="description">{{ getTerm(key) }}</div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .component-item {
    font-size: 18px;
    font-weight: bold;
    font-family: 'Exo', sans-serif;
    color: #EE5;
    text-shadow: 1px 1px 4px rgba(255, 205, 0, .5);
    line-height: 20px;
    margin: 0 0 5px 0;
    cursor: pointer;
  }
  .shown {
    display: none;
  }
  .editableparams ul li {
    padding: 0 0 0 10px;
    margin: 0 0 10px 10px;
    border-left: solid 2px #38AE35;
  }
  .paramname {
    text-transform: uppercase;
    font-size: 14px;
    font-family: 'Roboto';
    color: #af52df;
  }
  .type {
    text-transform: uppercase;
    font-size: 11px;
    color: #0FF;
  }
  .default {
    color: #CCC;
  }
  .description {
    font-style: italic;
    margin: 2px 0 5px 0;
  }
</style>
