<script>

  import axios from 'axios'
  import bannerdetailitem from '../components/bannerdetailitem.vue'

  export default { }

</script>

<template>

  <div class="error">
    404 Error: {{$route.path}} not found.
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .error {
    color: $errorCol;
  }

</style>
