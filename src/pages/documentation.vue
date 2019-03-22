<script>

  import axios from 'axios'
  import pageheader from '../components/pageheader.vue'
  export default {

    components: {
      pageheader
    },

    mounted () {
      this.$store.dispatch('GET_COMPONENTS')
    },

    computed: {
      components: function() {
        return this.$store.state.components
      }
    }
  }

</script>

<template>

  <div>
      <pageheader v-bind:title="$route.name" />
      Docs
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
