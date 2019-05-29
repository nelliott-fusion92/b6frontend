<script>

  import pageheader from '../components/pageheader.vue'
  import Component from '../components/component.vue'

  export default {

    components: {
      pageheader,
      Component,
    },

    created () {
      this.$store.dispatch('GET_TERMS')
      this.$store.dispatch('GET_COMPONENTS')
    },

    methods: {
      getTerm: function(cname) {
        return this.$store.getters.getTerm(cname)
      },
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
    <Component v-if="components" v-for="component in components" :component="component" :key="component.name" />
  </div>

</template>

<style lang="scss" scoped>


</style>
