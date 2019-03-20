<script>
  import axios from 'axios'
  import bannerdetailitem from './bannerdetailitem.vue'

  export default {
    props: [
      'id',
      'api_base'
    ],
    data: function(){
      return {
        banner: null
      }
    },
    components: {
      bannerdetailitem
    },
    mounted () {
      axios
        .get(`${this.api_base}v1/presets/${this.id}`)
        .then((response) => {
          this.banner = response.data
        })
    }
  }
</script>

<template>
  <div>
    <bannerdetailitem v-if="banner" v-bind:banner="banner" />
  </div>
</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
