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
    <div class="component-item" v-if="components" v-for="component in components">
      {{component.name}}
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .component-item {
    font-size: 16px;
    font-weight: bold;
    font-family: 'Exo', sans-serif;
    color: #EE5;
    text-shadow: 1px 1px 4px rgba(255, 205, 0, .5);
    line-height: 20px;
    padding: 0 0 0 15px;

  }
</style>
