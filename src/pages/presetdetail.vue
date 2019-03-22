<script>

  import bannerdetailitem from '../components/bannerdetailitem.vue'

  export default {
    props: [
      'id',
    ],
    mounted () {
      this.$store.dispatch('GET_PRESET', this.id)
    },
    components: {
      bannerdetailitem
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
    <bannerdetailitem v-if="preset" v-bind:banner="preset" />
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
