<script>

  import axios from 'axios'
  import bannerdetailitem from '../components/bannerdetailitem.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    components: {
      pageheader
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div class="error">
      404 Error: {{$route.path}} not found.
    </div>
  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .error {
    color: $errorCol;
  }

</style>
