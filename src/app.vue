<script>
  export default {
    name: 'app'
  }
</script>

<template>
  <div id="app">
    <div id="header">
      <h1>Bitcoin Price Checker</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/theme.scss';
  .full-width {
    width: 100%;
    color: $col
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
