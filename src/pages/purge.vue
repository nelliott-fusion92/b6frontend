<script>

  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
    ],
    data: function(){
      return {
      }
    },
    components: {
      pageheader,
    },
    async mounted () {
      await this.$store.dispatch('PURGE_BANNERS')
    },
    computed: {

    },
    methods: {

    }


  }

</script>

<template>

  <div>

    <pageheader v-bind:title="$route.name" />



  </div>

</template>

<style lang="css" scoped>

  .disabled {
    opacity: .5;
    pointer-events: none;
  }
  #listbox-id-1 {
    width: 300px;
    left: 155px;
    float: none;
  }
  svg {
    left: 10px;
    height: 100%;

  }
  svg path {
    fill: #000;
    background-size: 20px 20px;
  }

  i {

  }

  #filters {
    padding: 5px;
    border-bottom: dotted 1px #999;
    margin: 0 0 10px 0;
  }

  .listlink {
    font-family: 'Exo', sans-serif;
    font-weight: normal;
    color: #000;
  }

  .error {
    color: #F00 !important;
  }
  .loading-display {
    margin: 0 0 5px 0;
  }
  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  .animateflicker {
     -webkit-animation: flickerAnimation .5s infinite;
     -moz-animation: flickerAnimation .5s infinite;
     -o-animation: flickerAnimation .5s infinite;
      animation: flickerAnimation .5s infinite;
      color: #FF0 !important;
  }

</style>
