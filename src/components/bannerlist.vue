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
        .get(`${this.api_base}v1/banners`)
        .then((response) => {
          this.banners = response.data
        })
    }
  }
</script>

<template>
  <div>
    <div v-if="banners">
      <bannerlistitem v-for="banner in banners" v-bind:banner="banner" urlRoot="banner" :key="banner._id" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
