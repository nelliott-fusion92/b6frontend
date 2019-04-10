<script>

  import axios from 'axios'
  import bannerblock from '../components/bannerblock.vue'
  import pageheader from '../components/pageheader.vue'
  import confirmation from '../components/confirmation.vue'

  export default {
    props: [
      'api_base',
    ],
    data: function(){
      return {
        listOpen: false,
        selectedName: 'Select an option',
      }
    },
    components: {
      bannerblock,
      pageheader,
      confirmation,
    },
    mounted () {
      this.$store.dispatch('GET_BANNERS')
    },
    computed: {
      banners: function() {
        return this.$store.state.banners
      },
    },


  }

</script>

<template>

  <div v-if="loadStatus">

    <pageheader v-bind:title="$route.name" />
    <bannerblock class="bannerblock" v-for="banner in banners" :banner="banner" :isPreset="false" :bannerURL="'/banners/' + banner._id" :key="banner._id" />

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
