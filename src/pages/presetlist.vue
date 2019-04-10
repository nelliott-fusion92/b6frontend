<script>

  import axios from 'axios'
  import pageheader from '../components/pageheader.vue'
  import bannerblock from '../components/bannerblock.vue'

  //var req = require.context('../../node_modules/@salesforce-ux/design-system/assets/icons/utility/', true, /\.svg$/);
  //req.keys().forEach(req);


  export default {
    props: [
      'api_base',
    ],
    data: function(){
      return {
        listOpen: false,
        selectedName: 'Select an option',
        bannerType: 'presets',
      }
    },
    components: {
      pageheader,
      bannerblock,
    },
    mounted () {
      this.$store.dispatch('GET_PRESETS')
    },
    computed: {
      presets: function() {
        return this.$store.state.presets
      },
    },

  }

</script>

<template>

  <div v-if="loadStatus">

    <pageheader v-bind:title="$route.name" />
    <bannerblock class="bannerblock" v-for="banner in presets" :banner="banner" :isPreset="true" :bannerURL="'/presets/' + banner._id" :key="banner._id" />

  </div>

</template>

<style lang="css" scoped>


  #listbox-id-1 {
    width: 300px;
    left: 155px;
    float: none;
  }
  svg {
    left: 10px;
    height: 100%;

  }
  svg path {
    fill: #000;
    background-size: 20px 20px;
  }

  i {

  }

  .listlink {
    font-family: 'Exo', sans-serif;
    font-weight: normal;
    color: #000;
  }

</style>
