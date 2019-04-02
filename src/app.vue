<script>

  export default {
    name: 'app',
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
      <div id="nav">
        <ul>
          <li><router-link :to="{ name: 'presets' }">Presets</router-link></li>
          <li><router-link :to="{ name: 'banners' }">Generated Banners</router-link></li>
          <li><router-link :to="{ name: 'bitcoin' }">Bitcoin</router-link></li>
          <li><router-link :to="{ name: 'components' }">Components</router-link></li>
          <li><router-link :to="{ name: 'documentation' }">Documentation</router-link></li>
          <li><router-link :to="{ name: 'ensembles' }">Ensembles</router-link></li>
        </ul>
      </div>
    </div>
    <div id="main">
      <transition name="page" mode="out-in">
         <router-view></router-view>
      </transition>
      <div v-if="!loadStatus">
        <svg class="loader" version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
         <path fill="rgba(0, 100, 255, .5)" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
          c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" transform="rotate(191.877 50 50)">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
          </path>
         <path fill="rgba(0, 130, 255, .5)" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
          c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" transform="rotate(-23.7542 50 50)">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur=".5s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"></animateTransform>
          </path>
         <path fill="rgba(0, 200, 255, .5)" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
          L82,35.7z" transform="rotate(191.877 50 50)">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>
      <div class="push"></div>
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

  .loader {
    width: 50px;
    height: 50px;
    position: fixed;
  }

</style>
