<script>
  import axios from 'axios'

  export default {
    props: [
      'banner',
      'urlRoot'
    ]
  }
</script>

<template>
  <router-link :to="{ name: this.urlRoot, params: { id: this.banner._id } }">
    <div class="banner">
      <div v-if="banner">
        <div class="name">{{ banner.name }}</div>
        <div class="dimensions">{{ banner.width }} x {{ banner.height }}</div>
        <div class="description">{{ banner.description }}</div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .banner {
    margin: 0 0 10px 0;
  }

  .name {
    font-weight: bold;
  }

</style>
