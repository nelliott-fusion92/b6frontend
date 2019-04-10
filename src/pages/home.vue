<script>

  import pageheader from '../components/pageheader.vue'

  export default {
    components: {
      pageheader
    },
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div>
      Welcome to Bannerlink 6
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
