<script>

  import bannerdetailitem from './bannerdetailitem.vue'
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
      bannerdetailitem
    },
    beforeMount: function() {
      this.getPreset(this.id)
    },
    methods: {
      getPreset: mutations.getPreset
    },
  }

</script>

<template>

  <div>
    <bannerdetailitem v-if="isLoaded" v-bind:banner="store.currentPreset" />
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
