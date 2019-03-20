<script>

  import axios from 'axios'
  import bannerlistitem from './bannerlistitem.vue'

  export default {
    props: [
      'api_base'
    ],
    data: function(){
      return {
        banners: null,
      }
    },
    components: {
      bannerlistitem
    },
    mounted () {
      axios
        .get(`${this.api_base}v1/presets`)
        .then((response) => {
          this.banners = response.data
        })
    }
  }

</script>

<template>

  <div>
    <bannerlistitem v-for="banner in banners" v-bind:banner="banner" urlRoot="preset" :key="banner._id" />
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
