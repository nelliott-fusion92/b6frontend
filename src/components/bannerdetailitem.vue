<script>

  export default {
    props: [
      'banner'
    ],
  }

</script>

<template>

  <div v-if="this.banner.name" class="bannerdetail">
    <div>
      <h3 class="name">{{ this.banner.name }}</h3>
      <div class="dimensions">{{ this.banner.width }} x {{ this.banner.height }}</div>
      <div class="description">{{ this.banner.description }}</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .name {
    font-size: 28px;
    font-weight: bold;

  }
  .bannerdetail {
    margin: 0 0 10px 0;
  }

</style>
