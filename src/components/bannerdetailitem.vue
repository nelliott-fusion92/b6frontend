<script>

  import axios from 'axios'

  export default {
    props: [
      'banner',
    ]
  }

</script>

<template>

  <div v-if="banner" class="bannerdetail">
    <div>
      <h3 class="name">{{ banner.name }}</h3>
      <div class="dimensions">{{ banner.width }} x {{ banner.height }}</div>
      <div class="description">{{ banner.description }}</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .name {
    font-size: 18px;
    font-weight: bold;

  }
  .bannerdetail {
    margin: 0 0 10px 0;
  }

</style>
