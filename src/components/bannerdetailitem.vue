<script>
  import axios from 'axios'

  export default {
    props: [
      'banner',
    ]
  }
</script>

<template>

  <div class="bannerdetail">
    <div>
      <div class="name">{{ banner.name }}</div>
      <div class="dimensions">{{ banner.width }} x {{ banner.height }}</div>
      <div class="description">{{ banner.description }}</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .bannerdetail {
    margin: 0 0 10px 0;
  }

</style>
