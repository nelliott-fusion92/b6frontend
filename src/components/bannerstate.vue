<script>

  import Bannercomponent from '../components/bannercomponent.vue'

  export default {
    props: [
      'statekey',
      'state',
    ],
    data: function(){
      return {
        showComponents: false
      }
    },
    components: {
      Bannercomponent,
    },
    methods: {
      toggleComponents: function() {
        this.showComponents = !this.showComponents
      }
    }
  }

</script>

<template>

  <div>
    <span @click="toggleComponents" class="state-title">[ S{{statekey}} ] {{ state.name }}</span>
    <div v-show="showComponents" class="components">
      <Bannercomponent class="component" v-for="(comp, compkey) in state.components" :component="comp" :statekey="statekey" :compkey="compkey" :key="compkey" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .togglebutton {
    cursor: pointer;
    font-size: 14px;
  }
  .state-title {
    display: block;
    cursor: pointer;
    font-family: 'Exo', sans-serif;
    font-weight: bold;
    color: #0FF;
    user-select:none;
  }
  .state-title:hover {
    color: #AF0;
  }
  .components {
    margin: 10px 0 0 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;
  }
  .component:last-child {
    border-bottom: none;
  }
  .component:nth-child(odd) .component-title {
    background-color: #051530;
  }

</style>
