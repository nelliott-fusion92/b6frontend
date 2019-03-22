<script>

  import axios from 'axios'

  export default {

    components: {

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
    Docs
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
