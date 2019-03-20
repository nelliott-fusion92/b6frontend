<script>

  import pageheader from './components/pageheader.vue'
  export default {
    name: 'app',
    components: {
      pageheader
    }
  }

</script>

<template>

  <div id="app">
    <div id="header">
      <h1>Bannerlink 6</h1>
      <div id="nav">
        <ul>
          <li><router-link :to="{ name: 'presets' }">Presets</router-link></li>
          <li><router-link :to="{ name: 'banners' }">Generated Banners</router-link></li>
          <li><router-link :to="{ name: 'bitcoin' }">Bitcoin</router-link></li>
          <li><router-link :to="{ name: 'components' }">Components</router-link></li>
        </ul>
      </div>
    </div>
    <pageheader v-bind:title="$route.name" />
    <router-view></router-view>
    <div id="footer">© Liquidus 2019</div>
  </div>

</template>

<style lang="scss">

  @import '../assets/theme.scss';

  #footer {
    position: fixed;
    left: 0;
    bottom: 0;
  }

  #nav ul {
    margin: 0 0 0 28px;
    padding: 0;
  }

  #nav ul li {
    display: inline-block;
    list-style-type: none;
    margin: 0 5px 0 0;
    padding: 0;
  }

</style>
