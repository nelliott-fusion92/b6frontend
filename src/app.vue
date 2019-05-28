<script>

  import Loader from './components/loader.vue'

  export default {
    name: 'app',
    components: {
      Loader,
    },
    computed: {
      api_base: function() {
        return this.$store.state.api_base
      }
    },
    data() {
      return {
        prevHeight: 0,
      };
    },
  }

</script>

<template>
  <div id="app">
    <div id="header">
      <h1>Bannerlink 6</h1>
      <div style="color: rgba(255,255,255,.33); position: relative; top: -15px; margin: 0 0 0 8px; font-size: 10px;">Using {{ api_base }}</div>

      <div id="nav">
        <ul>
          <li><router-link :to="{ name: 'presets' }">Presets</router-link></li>
          <li><router-link :to="{ name: 'banners' }">Single Banners</router-link></li>
          <li><router-link :to="{ name: 'orders' }">Batch Orders</router-link></li>
          <li><router-link :to="{ name: 'components' }">Components</router-link></li>
          <li><router-link :to="{ name: 'purge' }">Purge</router-link></li>
        </ul>
      </div>

    </div>
    <div id="main">
      <transition name="page" mode="out-in">
         <router-view></router-view>
      </transition>
      <div v-if="!loadStatus">
        <Loader />
      </div>
    </div>
    <footer id="footer"><span>© Liquidus Marketing 2019</span></footer>
  </div>

</template>

<style lang="scss">
  @import url('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');
  @import '../assets/reset.scss';
  @import '../assets/theme.scss';
  #app {
    display: grid;
    grid-template-rows: 70px auto $footerHeight;
  }
  #header {
    grid-row-start: 1;
  }
  #main {
    padding: 5px 0 0 15px;
    margin: 28px 0 0 13px;
    grid-row-start: 2;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  #footer {
    grid-row-start: 2;
    grid-row-end: 3;
    text-align: center;
    font-size: 14px;
    border-top: dotted 1px #DFF;
    grid-row-start: 3;
    padding: $footerHeight / 2 + 7 0 0 0;
    margin: 10px 0 0 0;
  }

  #nav {

    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 200;
  }
  #nav a {
    color: #6FE !important;
    text-decoration: none;
    text-shadow: 2px 2px 4px #013;
  }

  #nav a:visited {
    color: #6FE !important;
  }

  #nav a:hover {
    text-decoration: underline;
  }

  #nav ul {
    margin: 0 0 0 8px;
    padding: 0;
  }

  #nav ul li {
    display: inline-block;
    list-style-type: none;
    margin: 0 20px 0 0;
    padding: 0;
    font-size: 14px;
  }
  .page-enter-active, .page-leave-active {
    transition: opacity .4s, transform .4s cubic-bezier(0.685, 0.085, 0.355, 1.000);
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateX(200px) translateX(300px);
  }

</style>
