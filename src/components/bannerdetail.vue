<script>

  import Bannerdetailitem from './bannerdetailitem.vue'
  import Bannerdisplay from './bannerdisplay.vue'
  import { store, mutations } from '../store'

  export default {
    props: [
      'id',
    ],
    data: function(){
      return {
        isLoaded: false,
        store,
      }
    },
    components: {
      Bannerdetailitem,
      Bannerdisplay,
    },
    beforeMount: function() {
      this.getBanner(this.id)
    },
    methods: {
      getBanner: mutations.getBanner
    },
  }

</script>

<template>

  <div>
    <Bannerdetailitem v-if="isLoaded" v-bind:banner="store.currentBanner" />
    <Bannerdisplay v-if="isLoaded" v-bind:banner="store.currentBanner" />
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
