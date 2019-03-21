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
      <div class="name">{{ banner.name }}</div>
      <div class="dimensions">{{ banner.width }} x {{ banner.height }}</div>
      <div class="description">{{ banner.description }}</div>
    </div>
  </router-link>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .banner {
    cursor: pointer;
    user-select: none;
    position:relative;
    display: inline-block;
    margin: 0 10px 15px 0;
    width: 200px;
    height: 140px;
    padding: 10px;
    border: solid 1px #055;
    vertical-align: top;
  }

  .name {
    font-weight: bold;
  }

</style>
