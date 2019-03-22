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
    <div class="wrapper">
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
      <div id="main">
        <pageheader v-bind:title="$route.name" />
        <router-view></router-view>
        <div class="push"></div>
      </div>
    </div>
    <footer id="footer">© Liquidus 2019</footer>
  </div>

</template>

<style lang="scss">
  @import url('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');
  @import '../assets/reset.scss';
  @import '../assets/theme.scss';
  #app {
    height: 100%;
  }
  #header {
    height: 70px;
  }
  #main {
    padding: 5px 0 0 15px;
  }
  .wrapper {
    min-height: 100%;
    margin-bottom: $footerHeight * -1;
  }
  #footer, .push {
    height: $footerHeight;
  }

  #footer {
    text-align: center;
    padding: $footerHeight / 2 - 6 0 0 0;
    color: #FFF;
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
