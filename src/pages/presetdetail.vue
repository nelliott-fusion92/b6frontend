<script>

  import bannerdetailitem from '../components/bannerdetailitem.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    mounted () {
      this.$store.dispatch('GET_PRESET', this.id)
    },
    components: {
      bannerdetailitem,
      pageheader
    },
    computed: {
      preset: function() {
        return this.$store.state.currentPreset
      }
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div v-if="loadStatus">
      <bannerdetailitem v-if="preset" v-bind:banner="preset" />
    </div>
  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
